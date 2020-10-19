import argparse
import json
import os

# define output
OUTPUT_FILE = "analyzed.json"

# define content type
TASK_SET = {"zap", "container"}

# define colors
COLOR_PASS = "brightgreen"
COLOR_FAIL = "orange"
COLOR_UNK = "lightgrey"

# define required message
MSG_UNK = "Unknown"
MSG_LIST_ZAP = ["low", "medium", "high"]
MSG_LIST_CONTAINER = ["medium", "high", "critical"]

# define fault-tolerent criteria
# false: count cannot be larget than 0
# true: count can be larger than 0
FAULT_TOLERANT_CRITERIA_ZAP = {
    "low": True,
    "medium": False,
    "high": False,
    "information": True
}

FAULT_TOLERANT_CRITERIA_CONTAINER = {
    "unknown": True,
    "negligible": True,
    "low": True,
    "medium": True,
    "high": False,
    "critical": False
}


def summarize_status(data, criteria):
    """
    according to the criteria, judge the given data a status
    True as Pass, False as Fail

    Args:
        data (dict): a dict which records the risk counts {key (str): value (int)}
        criteria (dict): a dict which denote fault tolerant criteria
    Returns:
        status (bool): True as Pass, False as Fail
    """
    status = True
    for target_risk, count in data.items():
        for risk, fault_tolerant in criteria.items():
            if not target_risk.lower().startswith(risk):
                continue
            if not fault_tolerant and count > 0:
                status = False
    return status



def _check_field(data_dict, input_key):
    for existed_key in data_dict:
        if existed_key.lower().startswith(input_key):
            # note that it should be use == to judge
            # but the riskdesc in zap is ambiguous, e.g. Low (Medium)
            return True, data_dict[existed_key]
    return False, 0


def fetch_message(data, label_list):
    """
    fetch target label from data

    Args:
        data (dict): a dict which records the risk counts {key (str): value (int)}
        label_list (list): a list which container target label that message would be shown
    Returns:
        (str): message string

    """
    msg = []

    for risk in label_list:
        _, count = _check_field(data, risk)
        msg.append("{}{}".format(risk[0].upper(), count))

    return "/".join(msg)


def badge_json(content="status",color=COLOR_UNK, msg=MSG_UNK):
    """ Initail a badge json """
    return {"label": content, "color": color, "message": msg}


def zap(data):
    """
    parse zap data with criteria and message list for zap into a dict

    Args:
        data (dict): a dict loaded from zap's report json file
    Returns:
        (dict): a dict contains "status":bool and "msg": str
    """
    status = False
    msg = ""
    count_dict = {}

    # get count
    for site_info in data["site"]:
        for info in site_info["alerts"]:
            risk = info.get("riskdesc")
            if risk not in count_dict:
                count_dict[risk] = 0
            count_dict[risk] += 1

    print(count_dict)

    status = summarize_status(count_dict, FAULT_TOLERANT_CRITERIA_ZAP)
    msg = fetch_message(count_dict, MSG_LIST_ZAP)

    return {"status":status, "msg": msg}


def container(data):
    """
    parse container data with criteria and message list for container into a dict

    Args:
        data (dict): a dict loaded from container's report json file
    Returns:
        (dict): a dict contains "status":bool and "msg": str
    """
    status = False
    msg = ""
    count_dict = {}

    # get count
    for vulnerability in data["vulnerabilities"]:
        severity = vulnerability["severity"]
        if severity not in count_dict:
            count_dict[severity] = 0
        count_dict[severity] += 1

    print(count_dict)

    status = summarize_status(count_dict, FAULT_TOLERANT_CRITERIA_CONTAINER)
    msg = fetch_message(count_dict, MSG_LIST_CONTAINER)

    return {"status":status, "msg": msg}


def analyze_status(data, content=""):
    """
    use different analyzer to parse status and message content,
    and output an analyzed data

    Args:
        data (dict): report json data
        content (str): task type
    Returns:
        analyzed (dict): analyzed result with 
            "label": str,
            "color": str,
            "message": str
    """
    
    result = {}
    if content == "container":
        result = container(data)
    elif content == "zap":
        result = zap(data)

    analyzed = badge_json(content)

    if result:
        if result["status"]:
            analyzed["color"] = COLOR_PASS
        else:
            analyzed["color"] = COLOR_FAIL

        analyzed["message"] = result.get("msg", MSG_UNK)
    else:
        analyzed["color"] = COLOR_UNK
        analyzed["message"] = MSG_UNK

    return analyzed


def save_json(data, output_path):
    dir_name = os.path.dirname(output_path)
    if dir_name and not os.path.exists(dir_name):
        os.makedirs(dir_name, exist_ok=True)

    with open(output_path, 'w') as wf:
        json.dump(data, wf)

    print("save {} done".format(output_path))


def load_json(json_path):
    with open(json_path, 'r') as rf:
        data = json.load(rf)
    print("load {} done".format(json_path))
    return data


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--json_path", type=str,
                        help="json file path")
    parser.add_argument("--task", type=str, required=True,
                         help="zap/container")
    parser.add_argument("-o", "--output_path", type=str,
                        help="output json file path")
    return parser.parse_args()


if __name__ == '__main__':
    args = get_args()
    valid = True

    task = args.task.lower()

    # check path
    if not os.path.exists(args.json_path):
        print("input file not exist:{}".format(args.json_path))
        valid = False
    elif os.path.splitext(args.json_path)[-1] != ".json":
        print("wrong file format, only json format is accetped")
        valid = False
    # check task
    elif task not in TASK_SET:
        print("unknown task type")
        valid = False

    if valid:
        print("Valid input, Start to analyze ...")
        input_data = load_json(args.json_path)
        analyzed_data = analyze_status(input_data, task)
    else:
        print("Invalid input, Create json with unknown message")
        analyzed_data = badge_json(task)

    print("Analyzed result: {}".format(analyzed_data))
    print("output path: {}".format(args.output_path))
    save_json(analyzed_data, args.output_path)
    print("---------------------------")


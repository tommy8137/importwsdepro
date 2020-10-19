## How to use getPolicyByUser
- description: get permission by userID
- input:
  - userID (String): emplid in user table
  - qyery  (Object): 
  ```
  {
    action: value of List, CreateNextStatus, Edit, Export, View,
    resource: defined resource ex: me_bom_projects
  }
  ```
- return: (Object)
  ```
  {
    "List": {
        "allow": [
            "me_bom_projects"
        ],
        "deny": []
    },
    "CreateNextStatus": {
        "allow": [
            "me_bom_projects"
        ],
        "deny": []
    },
    "Edit": {
        "allow": [
            "me_bom_projects"
        ],
        "deny": []
    },
    "Export": {
        "allow": [
            "me_bom_projects"
        ],
        "deny": [
            "me_bom_projects.bom_item.system_cost",
            "me_bom_projects.bom_item.source_cost"
        ]
    },
    "View": {
        "allow": [
            "me_bom_projects"
        ],
        "deny": [
            "me_bom_projects.bom_item.system_cost",
            "me_bom_projects.bom_item.source_cost"
        ]
    }
  } 
  ```

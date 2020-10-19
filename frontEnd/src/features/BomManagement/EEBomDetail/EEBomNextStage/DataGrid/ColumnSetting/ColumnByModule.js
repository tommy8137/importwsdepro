import ColumnByPN from './ColumnByPN';

let jumpColumnList = ['qty', 'sub_total_suggestion_cost'];
const columns = ColumnByPN.filter(item => !jumpColumnList.includes(item.key));


export default columns;

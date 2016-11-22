import MultiConditionalFilter from './component/MultiConditionalFilter';
import conditionTypeFactory from './config/conditionTypeFactory';
import Condition from './config/Condition';
import Selection from './config/Selection';

const ConditionType = conditionTypeFactory(Condition);

export default MultiConditionalFilter
export { Condition, Selection, conditionTypeFactory, ConditionType }

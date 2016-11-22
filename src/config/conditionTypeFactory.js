import Condition from './Condition';

export default function conditionTypeFactory(conditionClass = Condition) {
  const generateCondition = (defaultLabel, callback) => ({ label = defaultLabel, ...rest }) => new conditionClass({
    label, callback, ...rest
  });

  return {
    greater: generateCondition('Greater Than', (v, e) => v > e),
    greaterEqual: generateCondition('Greater Or Equal To', (v, e) => v >= e),
    less: generateCondition('Less Than', (v, e) => v < e),
    lessEqual: generateCondition('Less Or Equal To', (v, e) => v <= e),
    equal: generateCondition('Equal To', (v, e) => v === e),
    includes: generateCondition('Contains', (v, e) => v.includes(e)),
  };
}

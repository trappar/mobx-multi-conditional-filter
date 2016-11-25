import BaseConfig from './BaseConfig';
import DefaultInput from '../component/DefaultInput';

export default class Condition extends BaseConfig {
  static defaultRender = DefaultInput;

  constructor(options) {
    const {
      placeholder,
      processExpected,
      callback,
      callOnEmptyExpected = false,
      defaultExpected = '',
      render,
    } = options;

    super(options);

    this.placeholder = placeholder;
    this.processExpected = processExpected;
    this.callback = callback;
    this.callOnEmptyExpected = callOnEmptyExpected;
    this.defaultExpected = defaultExpected;
    this.render = render === undefined ? this.constructor.defaultRender : render;
  }

  apply(value, expected) {
    const processedValue = super.apply(value);
    const processedExpected = this.processExpected ? this.processExpected(expected) : expected;

    return (expected || this.callOnEmptyExpected || !this.render)
      ? this.callback && this.callback(processedValue, processedExpected)
      : true;
  }
}
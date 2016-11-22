import BaseConfig from './BaseConfig';
import DefaultInput from '../component/DefaultInput';

export default class Condition extends BaseConfig {
  static defaultRender = DefaultInput;

  constructor(options) {
    const {
      placeholder,
      callback = () => true,
      processOnEmpty = false,
      defaultExpected = '',
      render,
    } = options;

    super(options);

    this.placeholder = placeholder;
    this.callback = callback;
    this.processOnEmpty = processOnEmpty;
    this.defaultExpected = defaultExpected;
    this.render = render === undefined ? this.constructor.defaultRender : render;
  }

  apply(value, expected) {
    const selectedValue = super.apply(value);
    return (expected || this.processOnEmpty) ? this.callback(selectedValue, expected) : true;
  }
}
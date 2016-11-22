import BaseConfig from './BaseConfig';

export default class Subselection extends BaseConfig {
  constructor(options) {
    super(options);

    this.children = options.children;
  }
}
import uuid from 'uuid';

export default class Subselection {
  constructor({
    selector,
    label,
  }) {
    this.selector = selector;
    this.label = label;
    this.key = uuid.v4();
  }

  apply(item) {
    return this.selector ? this.selector(item) : item;
  }
}
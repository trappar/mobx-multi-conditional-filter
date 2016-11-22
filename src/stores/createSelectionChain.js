import { observable } from 'mobx';

export default function createSelectionChain(config) {
  return observable({
    config,
    child: Array.isArray(config.children) ? createSelectionChain(config.children[0]) : null,
    expected: config.hasOwnProperty('defaultExpected') ? config.defaultExpected : null,
  });
}

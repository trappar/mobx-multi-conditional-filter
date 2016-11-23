import React, { Component, PropTypes } from 'react';
import Condition from '../config/Condition';
import Selection from '../config/Selection';
import ConditionChain from '../component/ConditionChain';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import createSelectionChain from '../stores/createSelectionChain';
import PropsProvider from 'props-provider';

@observer
export default class MultiConditionalFilter extends Component {
  static propTypes = {
    config: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.instanceOf(Condition),
        PropTypes.instanceOf(Selection)
      ])
    ).isRequired,
    items: PropTypes.array.isRequired,
    labelComponent: PropsProvider.PropType,
    labelClassName: PropTypes.string,
    selectComponent: PropsProvider.PropType,
    selectClassName: PropTypes.string,
    removeComponent: PropsProvider.PropType,
    removeClassName: PropTypes.string,
    removeAtEnd: PropTypes.bool,
    nbspBetweenElements: PropTypes.bool,
    children: PropsProvider.PropType,
  };
  static defaultProps = {
    nbspBetweenElements: true,
    removeAtEnd: false,
  };

  @observable chains;

  constructor(props) {
    super(props);

    this.baseSelection = new Selection({ children: this.props.config });

    this.chains = [];
  }

  handleAddChain = () => this.chains.push(createSelectionChain(this.baseSelection));
  handleRemoveChain = chain => () => this.chains.remove(chain);

  callChain(chain, item) {
    const { config, child, expected } = chain;
    item = config.apply(item, expected);
    return chain.child ? this.callChain(child, item) : item;
  }

  @computed get filteredItems() {
    return this.chains.reduce(
      (items, chain) => items.filter(item => this.callChain(chain, item)),
      this.props.items
    );
  }

  createFilter = (chain, i) => {
    const { removeComponent, removeClassName, removeAtEnd, nbspBetweenElements, ...restProps } = this.props;
    delete restProps.items;
    delete restProps.config;

    const remove = (
      <PropsProvider onClick={this.handleRemoveChain(chain)}>
        {
          removeComponent ||
          (({ onClick }) => (
            <button className={removeClassName} onClick={onClick}>
              X
            </button>
          ))
        }
      </PropsProvider>
    );
    const conditionChain = (
      <ConditionChain
        chain={chain}
        {...restProps}
      />
    );

    return (
      <div key={i}>
        {removeAtEnd ? conditionChain : remove}
        {nbspBetweenElements && '\u00A0'}
        {removeAtEnd ? remove : conditionChain}
      </div>
    )
  };

  render() {
    return (
      <PropsProvider
        filters={this.chains.map(this.createFilter)}
        addFilter={this.handleAddChain}
        filteredItems={this.filteredItems}
      >
        {this.props.children}
      </PropsProvider>
    );
  }
}
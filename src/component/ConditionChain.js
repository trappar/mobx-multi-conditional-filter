import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Condition from '../config/Condition';
import Selection from '../config/Selection';
import createSelectionChain from '../stores/createSelectionChain';
import PropsProvider from 'props-provider';

@observer
export default class ConditionChain extends Component {
  static propTypes = {
    chain: PropTypes.shape({
      config: PropTypes.oneOfType([
        PropTypes.instanceOf(Condition),
        PropTypes.instanceOf(Selection)
      ]).isRequired,
      child: PropTypes.object,
      expected: PropTypes.any,
    }).isRequired,
    labelComponent: PropsProvider.PropType,
    labelClassName: PropTypes.string,
    selectComponent: PropsProvider.PropType,
    selectClassName: PropTypes.string,
    nbspBetweenElements: PropTypes.bool,
  };

  handleSelect = (event) => {
    const chain = this.props.chain;
    const selectedChildConfig = chain.config.children.find(config => config.key === event.target.value);

    if (selectedChildConfig) {
      chain.child = createSelectionChain(selectedChildConfig);
    }
  };
  setValue = value => this.props.chain.expected = value;

  render() {
    const { chain: { config, child, expected }, ...restProps } = this.props;

    if (child) {
      const selectControl = config.children.length === 1
          ?
          (<PropsProvider label={config.children[0].label}>
            {
              this.props.labelComponent ||
              (({ label }) => <label className={this.props.labelClassName}>{label}</label>)
            }
          </PropsProvider>)
          :
          (<PropsProvider
            options={config.children.map(config => ({ value: config.key, label: config.label }))}
            onChange={this.handleSelect}
            currentValue={child.config.key}
          >
            {
              this.props.selectComponent ||
              (({ options, onChange, currentValue }) => (
                <select className={this.props.selectClassName} value={currentValue} onChange={onChange}>
                  {options.map(({ value, label }) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {label}
                    </option>
                  ))}
                </select>
              ))
            }
          </PropsProvider>)
        ;

      return (
        <span>
          {selectControl}
          {this.props.nbspBetweenElements && '\u00A0'}
          <ConditionChain chain={child} {...restProps} />
        </span>
      );
    } else {
      return config.render && <PropsProvider
          value={expected}
          setValue={this.setValue}
          placeholder={config.placeholder}
        >
          {config.render}
        </PropsProvider>;
    }
  }
}

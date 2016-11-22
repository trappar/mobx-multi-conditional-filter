import React, { PropTypes } from 'react';
import { mount } from 'enzyme';
import MultiConditionalFilter, { Condition } from '../';

const DisplayFilteredItems = ({ filters, filteredItems, addFilter }) => (
  <div>
    <a onClick={addFilter}>+</a>
    {filters}
    {filteredItems.map((item, i) => <div key={i}>{JSON.stringify(item)}</div>)}
  </div>
);

test('Renders', () => {
  const config = [
    new Condition({
      label: '1',
      placeholder: 'value',
      callback: (v, e) => v === e,
    }),
    new Condition({
      label: '2',
      placeholder: 'value',
      callback: (v, e) => v === 'b',
      callOnEmptyExpected: true,
      render: false,
    }),
    new Condition({
      label: '3',
      callback: (v, e) => v === e,
      defaultExpected: 'asdf',
      processExpected: expected => 'a',
    })
  ];

  const mounted = mount((
    <MultiConditionalFilter nbspBetweenElements={false} items={['a', 'b']} config={config}>
      {DisplayFilteredItems}
    </MultiConditionalFilter>
  ));

  mounted.find('a').simulate('click');
  mounted.find('input').simulate('change', { target: { value: 'a' } });
  expect(mounted.text()).toBe('+X123"a"');

  mounted.find('select').simulate('change', { target: { value: config[1].key } });
  expect(mounted.text()).toBe('+X123"b"');

  mounted.find('select').simulate('change', { target: { value: config[2].key } });
  expect(mounted.text()).toBe('+X123"a"');
});

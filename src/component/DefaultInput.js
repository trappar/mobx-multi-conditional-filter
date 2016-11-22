import React, { PropTypes } from 'react';

const defaultValueHandler = setValue => event => setValue(event.target.value);

export default function DefaultInput({ setValue, ...restProps }) {
  return (
    <input
      type="text"
      onChange={defaultValueHandler(setValue)}
      {...restProps}
    />
  );
}
DefaultInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
};

import { forwardRef } from 'react';
import Select from 'react-select'

const colourStyles = {
  control: (styles) => ({ ...styles, border: 'var(--bs-border-width) solid var(--bs-border-color)', borderRadius: 'unset' }),
};

/**
 * 
 * @type {typeof Select} 
 */
const MultipleSelect = forwardRef((props, ref) => <Select styles={colourStyles} {...props} ref={ref} />)

export default MultipleSelect
import Select from 'react-select'

const colourStyles = {
  control: (styles) => ({ ...styles, border: 'var(--bs-border-width) solid var(--bs-border-color)', borderRadius: 'unset' }),
};

/**
 * 
 * @type {typeof Select} 
 */
const MultipleSelect = (props) => <Select styles={colourStyles} {...props} />

export default MultipleSelect
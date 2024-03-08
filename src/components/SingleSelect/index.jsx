import { forwardRef } from 'react';
import Select from 'react-select';

const colourStyles = {
    control: (styles) => ({ ...styles, border: 'var(--bs-border-width) solid var(--bs-border-color)', borderRadius: 'unset' }),
};

/**
 * 
 * @type {typeof Select} 
 */
const SingleSelect = forwardRef((props, ref) => (
    <Select styles={colourStyles} isMulti={false} {...props} ref={ref} />
));

export default SingleSelect;
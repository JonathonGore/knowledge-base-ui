import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const FieldGroup = ({ id, label, kbOnChange, formKey, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} inputRef={ref => { kbOnChange(ref, formKey); }} />
  </FormGroup>
);

FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  kbOnChange: PropTypes.func,
  formKey: PropTypes.string,
};

export default FieldGroup;

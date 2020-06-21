import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";

const UsagerComboBox = ({ label, onChange, data }) => {
  return (
    <Autocomplete
      name="UsagerComboBox"
      autoComplete
      options={data}
      onChange={(event, value) => onChange(value)}
      includeInputInList
      getOptionLabel={(item) => `${item.prenom} ${item.nom} (${item.contrat.societe})`}
      renderInput={(params) => <TextField {...params} label={label} margin="normal" />}
    />
  );
};

UsagerComboBox.defaultProps = {
  label: "Usager",
};
UsagerComboBox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.any,
  data: PropTypes.array,
};

export default UsagerComboBox;

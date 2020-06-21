import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "@material-ui/core";

import { ContratType_options, getLabel } from "../../enums";

var moment = require("moment");
require("moment/locale/fr");

moment.locale("fr");
const useStyles = makeStyles(() => ({
  root: {},
}));

const ContratItem = (props) => {
  const { className, contrat, ...rest } = props;

  const classes = useStyles();

  return (
    <TableRow hover {...rest} className={clsx(classes.root, className)}>
      <TableCell>
        <Link to={`/contrat/${contrat.id}`}>{contrat.societe}</Link>
      </TableCell>
      <TableCell align="center">
        {getLabel(ContratType_options, contrat.type_contrat)}
      </TableCell>
      <TableCell>{moment(contrat.date_lancement).format("DD MMM YYYY")}</TableCell>
      <TableCell align="center">{contrat.nb_sites.count}</TableCell>
      <TableCell align="center">{contrat.nb_usagers.count}</TableCell>
    </TableRow>
  );
};

ContratItem.propTypes = {
  className: PropTypes.string,
  contrat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    societe: PropTypes.string,
    type_contrat: PropTypes.string,
    date_lancement: PropTypes.string,
    nb_usagers: PropTypes.exact({
      count: PropTypes.number,
    }),
    nb_sites: PropTypes.exact({
      count: PropTypes.number,
    }),
  }).isRequired,
};

export default ContratItem;

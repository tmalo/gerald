import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  nature: {
    marginRight: theme.spacing(1),
  },
}));

const SiteItem = (props) => {
  const { className, site, ...rest } = props;

  const classes = useStyles();

  return (
    <TableRow hover {...rest} className={clsx(classes.root, className)}>
      <TableCell>{site.libelle}</TableCell>
      <TableCell>{site.adresse_rue}</TableCell>
      <TableCell>
        {site.adresse_codepostal} {site.adresse_ville}
      </TableCell>
      <TableCell>{site.adresse_pays}</TableCell>
      <TableCell align="center">{site.nb_usagers.count}</TableCell>
    </TableRow>
  );
};

SiteItem.propTypes = {
  className: PropTypes.string,
  site: PropTypes.shape({
    id: PropTypes.string,
    libelle: PropTypes.string,
    adresse_rue: PropTypes.string,
    adresse_ville: PropTypes.string,
    adresse_codepostal: PropTypes.string,
    adresse_pays: PropTypes.string,
    nb_usagers: PropTypes.exact({
      count: PropTypes.number,
    }),
  }).isRequired,
};

export default SiteItem;

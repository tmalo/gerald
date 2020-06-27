import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "@material-ui/core";

import { default as StatusBullet } from "../StatusBullet";
import { default as LastCall } from "../LastCall";
import { Nature_options, statusColors } from "enums";

const useStyles = makeStyles((theme) => ({
  root: {},
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
}));

const DemandeItem = (props) => {
  const { className, demande, ...rest } = props;

  const classes = useStyles();

  return (
    <TableRow hover {...rest} className={clsx(classes.root, className)}>
      <TableCell>
        <div className={classes.statusContainer}>
          <StatusBullet
            className={classes.status}
            color={statusColors[demande.difficulte]}
            size="sm"
          />
          <Link to={`/demande/${demande.id}`}>{demande.slug}</Link>
        </div>
      </TableCell>
      <TableCell>
        <Link to={`/contrat/${demande.contrat.id}`}>{demande.contrat.societe}</Link>
      </TableCell>
      <TableCell>
        <Link to={`/contact/${demande.contact.id}`}>
          {demande.contact.prenom} {demande.contact.nom}
        </Link>
      </TableCell>
      <TableCell>{demande.objet}</TableCell>
      <TableCell>
        <LastCall
          className={classes.statusContainer}
          label={
            Nature_options.filter((n) => n.value === demande.lastContact.nature).shift()
              .label
          }
          nature={demande.lastContact.nature}
          callDate={demande.lastContact.date}
        />
      </TableCell>
    </TableRow>
  );
};

DemandeItem.propTypes = {
  className: PropTypes.string,
  demande: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    contrat: PropTypes.shape({
      id: PropTypes.string,
      societe: PropTypes.string,
    }).isRequired,
    contact: PropTypes.shape({
      id: PropTypes.string,
      nom: PropTypes.string,
      prenom: PropTypes.string,
    }).isRequired,
    objet: PropTypes.string,
    difficulte: PropTypes.number,
    lastContact: PropTypes.shape({
      nature: PropTypes.string,
      date: PropTypes.string,
    }),
  }).isRequired,
};

export default DemandeItem;

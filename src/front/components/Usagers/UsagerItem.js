import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "@material-ui/core";
import { default as StatusBullet } from "../StatusBullet";
import LastCall from "../LastCall";
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

const UsagerItem = (props) => {
  const { className, usager, ...rest } = props;

  const classes = useStyles();
  const lastDemande = usager.demandes[0];
  const lastTalk = usager.conversations[0];

  return (
    <TableRow hover {...rest} className={clsx(classes.root, className)}>
      <TableCell>{usager.nom}</TableCell>
      <TableCell>{usager.prenom}</TableCell>
      <TableCell>{usager.telephone}</TableCell>
      <TableCell>
        <StatusBullet
          className={classes.status}
          color={statusColors[lastDemande.difficulte]}
          size="sm"
        />
        <Link to={`/demande/${lastDemande.slug}`}>{lastDemande.slug}</Link>
      </TableCell>
      <TableCell>{lastDemande && lastDemande.subject}</TableCell>
      <TableCell>
        {lastTalk && (
          <LastCall
            className={classes.statusContainer}
            label={
              Nature_options.filter((n) => n.value === lastTalk.nature).shift().label
            }
            nature={lastTalk.nature}
            callDate={lastTalk.date}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

UsagerItem.propTypes = {
  className: PropTypes.string,
  staticContext: PropTypes.any,
  usager: PropTypes.shape({
    id: PropTypes.string,
    nom: PropTypes.string,
    prenom: PropTypes.string,
    telephone: PropTypes.string,
    email: PropTypes.string,
    demandes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        difficulte: PropTypes.number,
        slug: PropTypes.string,
        subject: PropTypes.string,
      })
    ),
    conversations: PropTypes.arrayOf(
      PropTypes.shape({
        nature: PropTypes.string,
        date: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default UsagerItem;

import React from "react";

import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import EditableLabel from "react-inline-editing";
import { Card, CardContent, Grid, Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },
  editLabel: {
    fontFamily: theme.typography.h6.fontFamily,
    fontWeight: theme.typography.h6.fontWeight,
    fontSize: theme.typography.h6.fontSize,
    lineHeight: theme.typography.h6.lineHeight,
  },
  editInput: {
    fontFamily: theme.typography.h5.fontFamily,
    fontWeight: theme.typography.body1.fontWeight,
    fontSize: theme.typography.h5.fontSize,
    lineHeight: theme.typography.h5.lineHeight,
  },
}));

const ContratInfo = (props) => {
  const { className, contrat, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={4} xs={4}>
            <Typography variant="body1">Raison sociale :</Typography>
          </Grid>
          <Grid item md={8} xs={8}>
            <EditableLabel
              labelClassName={classes.editLabel}
              inputClassName={classes.editInput}
              id="societe"
              text={contrat.societe}
            />
          </Grid>

          <Grid item md={4} xs={4}>
            <Typography variant="body1">Adresse :</Typography>
          </Grid>
          <Grid item md={8} xs={8}>
            <EditableLabel
              labelClassName={classes.editLabel}
              inputClassName={classes.editInput}
              id="rue"
              text={contrat.adresse_rue}
            />
            <EditableLabel
              labelClassName={classes.editLabel}
              inputClassName={classes.editInput}
              id="code_postal"
              text={contrat.adresse_codepostal}
            />
            <EditableLabel
              labelClassName={classes.editLabel}
              inputClassName={classes.editInput}
              id="ville"
              text={contrat.adresse_ville}
            />
            <EditableLabel
              labelClassName={classes.editLabel}
              inputClassName={classes.editInput}
              id="pays"
              text={contrat.adresse_pays}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
};

ContratInfo.propTypes = {
  className: PropTypes.string,
  contrat: PropTypes.shape({
    id: PropTypes.string,
    societe: PropTypes.string,
    adresse_rue: PropTypes.string,
    adresse_ville: PropTypes.string,
    adresse_codepostal: PropTypes.string,
    adresse_pays: PropTypes.string,
    type_contrat: PropTypes.string,
    date_signature: PropTypes.string,
    date_lancement: PropTypes.string,
    date_cloture: PropTypes.string,
  }).isRequired,
};

export default ContratInfo;

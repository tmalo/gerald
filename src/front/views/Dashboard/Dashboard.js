import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, CircularProgress } from "@material-ui/core";

import { Query } from "@apollo/react-components";
import mesDemandesQuery from "api/remote/queries/mesDemandes.graphql";

import { DemandeTable } from "components/Demandes";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const formatDemande = (item) => {
  return {
    id: item.id,
    slug: item.slug,
    contrat: item.usager.contrat,
    contact: item.usager,
    objet: item.subject,
    difficulte: Number(item.difficulte),
    lastContact: item.usager.conversations ? item.usager.conversations[0] : undefined,
  };
};

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={4}>
          <Grid item md={12} xs={12}>
            <Query query={mesDemandesQuery}>
              {({ loading, error, data }) => {
                if (loading) return <CircularProgress />;

                if (error) return `Error! ${error}`;

                return <DemandeTable demandes={data.mesDemandes.map(formatDemande)} />;
              }}
            </Query>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;

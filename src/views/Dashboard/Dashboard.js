import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import { DemandeTable } from "../../components/Demandes";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const demandes = [
  {
    slug: "2020-MALO-THIERRY-001",
    contrat: {
      id: "5ede2146a2206313085c3d68",
      societe: "AAA_FORMATION",
    },
    contact: {
      id: "18",
      nom: "MALO",
      prenom: "Thierry",
    },
    objet: "Aide à domicile pour ma mère",
    difficulte: 1,
    lastContact: {
      nature: "MAIL",
      date: "2020-06-14 15:52:34",
    },
  },
  {
    slug: "2020-MALO-THIERRY-002",
    contrat: {
      id: "5ede2146a2206313085c3d68",
      societe: "AAA_FORMATION",
    },
    contact: {
      id: "18",
      nom: "MALO",
      prenom: "Thierry",
    },
    objet: "Aide à domicile pour ma mère",
    difficulte: 3,
    lastContact: {
      nature: "LTTR",
      date: "2020-06-14 15:52:34",
    },
  },
  {
    slug: "2020-MALO-THIERRY-003",
    contrat: {
      id: "5ede2146a2206313085c3d68",
      societe: "AAA_FORMATION",
    },
    contact: {
      id: "18",
      nom: "MALO",
      prenom: "Thierry",
    },
    objet: "Aide à domicile pour ma mère",
    difficulte: 1,
    lastContact: {
      nature: "CALL",
      date: "2020-06-15 16:32:34",
    },
  },
  {
    slug: "2020-MALO-THIERRY-004",
    contrat: {
      id: "5ede2146a2206313085c3d68",
      societe: "AAA_FORMATION",
    },
    contact: {
      id: "18",
      nom: "MALO",
      prenom: "Thierry",
    },
    objet: "Aide à domicile pour ma mère",
    difficulte: 2,
    lastContact: {
      nature: "ESPB",
      date: "2020-06-14 16:52:34",
    },
  },
];

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={4}>
          <Grid item md={12} xs={12}>
            <DemandeTable demandes={demandes} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;

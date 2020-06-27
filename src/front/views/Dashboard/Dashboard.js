import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import { DemandeTable } from "components/Demandes";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const mesDemandes=[
  {
    "id": "5ee11b2c683be82733001c05",
    "slug": "20200610-MALO-THIERRY-009",
    "subject": "fgfh",
    "difficulte": "1",
    "etape": 1,
    "usager": {
      "id": "5ede22c60037ce1320ec9044",
      "nom": "MALO",
      "prenom": "Thierry",
      "contrat": {
        "id": "5ede2146a2206313085c3d68",
        "societe": "Banque Postale"
      },
      "conversations": [
        {
          "nature": "CALL",
          "date": "2020-06-20T14:53:28.000+02:00"
        }
      ]
    }
  },
  {
    "id": "5edf595516aad303b013b932",
    "slug": "20200609-MALO-THIERRY-001",
    "subject": "dfdf",
    "difficulte": "1",
    "etape": 1,
    "usager": {
      "id": "5ede22c60037ce1320ec9044",
      "nom": "MALO",
      "prenom": "Thierry",
      "contrat": {
        "id": "5ede2146a2206313085c3d68",
        "societe": "Banque Postale"
      },
      "conversations": [
        {
          "nature": "CALL",
          "date": "2020-06-20T14:53:28.000+02:00"
        }
      ]
    }
  },
  {
    "id": "5ede41353cef021452ff1989",
    "slug": "20200608-MALO-THIERRY-001",
    "subject": "Aide à domicile pour ma mère",
    "difficulte": "2",
    "etape": 1,
    "usager": {
      "id": "5ede22c60037ce1320ec9044",
      "nom": "MALO",
      "prenom": "Thierry",
      "contrat": {
        "id": "5ede2146a2206313085c3d68",
        "societe": "Banque Postale"
      },
      "conversations": [
        {
          "nature": "CALL",
          "date": "2020-06-20T14:53:28.000+02:00"
        }
      ]
    }
  }
]

const formatDemande = (item) => {
  return {
    id: item.id,
    slug: item.slug,
    contrat: item.usager.contrat,
    contact: item.usager,
    objet: item.subject,
    difficulte: Number(item.difficulte),
    lastContact: item.usager.conversations ? item.usager.conversations[0] : undefined
  };
}

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
            <DemandeTable demandes={mesDemandes.map(formatDemande)} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;

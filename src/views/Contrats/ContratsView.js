import React from "react";
import { Grid } from "@material-ui/core";

import { ContratTable } from "../../components/Contrats";

import { Detail as DetailLayout } from "../../layouts";

const contrats = [
  {
    id: "5ede2146a2206313085c3d68",
    societe: "Banque Postale",
    type_contrat: "ASD",
    date_lancement: "2020-08-06",
    nb_usagers: {
      count: 1,
    },
    nb_sites: {
      count: 1,
    },
  },
];

const ContratsView = () => {
  return (
    <DetailLayout>
      <Grid item md={12} xs={12}>
        <ContratTable contrats={contrats} />
      </Grid>
    </DetailLayout>
  );
};

export default ContratsView;

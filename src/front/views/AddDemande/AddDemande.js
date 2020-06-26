import React from "react";
import { Grid } from "@material-ui/core";

import { DemandeForm } from "components/Demandes";
import { Detail as DetailLayout } from "../../layouts";

const AddDemande = () => {
  return (
    <DetailLayout>
      <Grid item md={12} xs={12}>
        <DemandeForm />
      </Grid>
    </DetailLayout>
  );
};

export default AddDemande;

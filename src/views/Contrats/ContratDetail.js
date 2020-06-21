import React from "react";
import { useParams } from "react-router-dom";

import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import { Grid, Divider, Tabs, Tab, Paper } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import PeopleIcon from "@material-ui/icons/People";
import { Detail as DetailLayout } from "../../layouts";
import { default as ContratInfo } from "./ContratInfo";
import { default as TabPanel } from "../../components/TabPanel";
import { default as SiteTable } from "../../components/Contrats/SiteTable";
import { default as UsagerTable } from "../../components/Usagers/UsagerTable";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },
}));

const contrat = {
  id: "5ede2146a2206313085c3d68",
  societe: "Banque Postale",

  adresse_rue: "20 rue du touche midi",
  adresse_codepostal: "75013",
  adresse_ville: "Paris",
  adresse_pays: "France",

  type_contrat: "ASD",
  date_lancement: "2020-08-06",
  nb_usagers: {
    count: 1,
  },
  nb_sites: {
    count: 1,
  },
};

const sites = [
  {
    id: "dfre",
    libelle: "Paris",
    adresse_rue: "13 boulevard des Abesses",
    adresse_codepostal: "75013",
    adresse_ville: "Paris",
    adresse_pays: "France",
    nb_usagers: {
      count: 15,
    },
  },
  {
    id: "15",
    libelle: "Lille",
    adresse_rue: "13 rue Jean Jaures",
    adresse_codepostal: "50000",
    adresse_ville: "Lille",
    adresse_pays: "France",
    nb_usagers: {
      count: 15,
    },
  },
];

const usagers = [
  {
    id: "5ede22c60037ce1320ec9044",
    nom: "MALO",
    prenom: "Thierry",
    telephone: "0628530869",
    email: "thierry.malo@gmail.com",
    demandes: [
      {
        id: "5ee11b2c683be82733001c05",
        slug: "20200610-MALO-THIERRY-009",
        difficulte: 1,
        subject: "fgfh",
      },
    ],
    conversations: [
      {
        nature: "MAIL",
        date: "2020-06-14 15:52:34",
      },
    ],
  },
];

const tabs = [
  {
    icon: <BusinessIcon />,
    label: "Sites",
    // eslint-disable-next-line no-unused-vars
    component: function innerComponent(id) {
      return <SiteTable sites={sites} />;
    },
  },
  {
    icon: <PeopleIcon />,
    label: "Ayants-droits",
    // eslint-disable-next-line no-unused-vars
    component: function innerComponent(id) {
      return <UsagerTable usagers={usagers} />;
    },
  },
];

function tabProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const ContratDetail = (props) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const {
    className,
    // eslint-disable-next-line no-unused-vars
    staticContext,
    ...rest
  } = props;

  const classes = useStyles();

  let { id } = useParams();

  return (
    <DetailLayout spacing={2} {...rest} className={clsx(classes.root, className)}>
      <Grid item md={6} xs={6}>
        <ContratInfo contrat={contrat} />
      </Grid>
      <Divider />
      <Grid item md={12} xs={12}>
        <Paper square>
          <Tabs
            textColor="primary"
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="off"
          >
            {tabs.map((item, index) => (
              <Tab key={index} icon={item.icon} label={item.label} {...tabProps(index)} />
            ))}
          </Tabs>
        </Paper>
        <Paper>
          {tabs.map((item, index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              {item.component(id)}
            </TabPanel>
          ))}
        </Paper>
      </Grid>
    </DetailLayout>
  );
};

ContratDetail.propTypes = {
  className: PropTypes.string,
  staticContext: PropTypes.any,
};

export default ContratDetail;

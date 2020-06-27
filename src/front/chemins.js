import React from "react";
import { Dashboard as DashboardIcon } from "@material-ui/icons";
import SvgIcon from "@material-ui/core/SvgIcon";

const MainLayout = React.lazy(() =>
  import(/* webpackChunkName: "inside" */ "./layouts/Main")
);
const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "inside" */ "./views/Dashboard")
);
const ContratsView = React.lazy(() => import("./views/Contrats/ContratsView"));

const ContratIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        fill="currentColor"
        d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z"
      />
    </SvgIcon>
  );
};

function makeRoute(Layout, Component, title, url, icon) {
  return {
    Title: title,
    Path: url,
    Icon: icon,

    Route: () => withLayout(Layout, Component),
  };
}

const withLayout = (Layout, Component) => (
  <Layout>
    <Component />
  </Layout>
);

const chemins = [
  makeRoute(MainLayout, Dashboard, "Tableau de bord", "/dashboard", <DashboardIcon />),
  makeRoute(MainLayout, ContratsView, "Contrats", "/contrats", <ContratIcon />),
];

export default chemins;

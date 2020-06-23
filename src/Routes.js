import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

import { RouteWithLayout } from "components";
import { useQuery } from "react-apollo";

import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import { NotFound as NotFoundView } from "./views";
import chemins from "./chemins";
import LoggedIn from "api/local/queries/LoggedIn.graphql";

const AddDemande = React.lazy(() => import("./views/AddDemande"));
const ContratDetail = React.lazy(() => import("./views/Contrats/ContratDetail"));
const SignInView = React.lazy(() => import("./views/SignIn"));

const Routes = () => {
  const { loading, error, data } = useQuery(LoggedIn);
  if (loading) return <LinearProgress />;

  return (
    <Switch>
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />

      {!data.isLoggedIn ? (
        <Redirect to="/sign-in" />
      ) : (
        <Redirect exact from="/" to="/dashboard" />
      )}

      <RouteWithLayout
        component={AddDemande}
        exact
        layout={MainLayout}
        path="/add-demande"
      />
      <RouteWithLayout
        component={ContratDetail}
        layout={MainLayout}
        path="/contrat/:id"
      />

      {chemins.map((chemin, i) => {
        return <Route key={i} path={chemin.Path} exact render={chemin.Route} />;
      })}

      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

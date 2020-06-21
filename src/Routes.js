import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import { RouteWithLayout } from "./components";

import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import { NotFound as NotFoundView } from "./views";
import chemins from "./chemins";

const AddDemande = React.lazy(() => import("./views/AddDemande"));
const ContratDetail = React.lazy(() => import("./views/Contrats/ContratDetail"));
const SignInView = React.lazy(() => import("./views/SignIn"));

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
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
      {/*        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        />
        <RouteWithLayout
          component={UserListView}
          exact
          layout={MainLayout}
          path="/users"
        />
        <RouteWithLayout
          component={ProductListView}
          exact
          layout={MainLayout}
          path="/products"
        />
        <RouteWithLayout
          component={TypographyView}
          exact
          layout={MainLayout}
          path="/typography"
        />
        <RouteWithLayout
          component={IconsView}
          exact
          layout={MainLayout}
          path="/icons"
        />
        <RouteWithLayout
          component={AccountView}
          exact
          layout={MainLayout}
          path="/account"
        />
        <RouteWithLayout
          component={SettingsView}
          exact
          layout={MainLayout}
          path="/settings"
        />
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
 */}{" "}
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
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

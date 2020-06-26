import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const RouteWithLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Suspense fallback={<div>Chargement...</div>}>
            <Component {...matchProps} />
          </Suspense>
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;

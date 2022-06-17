import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      <Component {...props} />
    </Route>
  );
};

export default ProtectedRoute;

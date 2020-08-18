import React from "react";
import { Route, RouteProps, Redirect } from "react-router";
import { useAuth } from "../../hooks/use-auth";

export const PrivateRoute: React.FC<RouteProps> = ({
  component,
  ...rest
}: RouteProps) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          component
        ) : (
          <Redirect to={{ pathname: "/signin", state: { from: location } }} />
        )
      }
    />
  );
};

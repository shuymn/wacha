import { Page } from "@zeit-ui/react";
import React from "react";
import { RouteComponentProps } from "react-router";

export const NotFound: React.FC = () => {
  return (
    <>
      <Page>
        <p>not found.</p>
      </Page>
    </>
  );
};

export const renderNotFound: React.FC<RouteComponentProps> = ({
  staticContext,
}: RouteComponentProps) => {
  if (staticContext) {
    staticContext.statusCode = 404;
  }

  return <NotFound />;
};

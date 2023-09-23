import React, { useState } from "react";
import CircularProgressComponent from "../CircularProgress/CircularProgress";
import BoxComponent from "../muiBox/muiBox";

interface LoadingProps {
  setLoading(isComponentLoading: boolean): void;
}

const withLoader = <P extends LoadingProps>(WrappedComponent: React.ComponentType<P>) => {
  return function WithLoadingComponent(props: P) {
    const [isLoading, setLoading] = useState(false);
    const setLoadingState = (isComponentLoading: boolean) => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && (
          <BoxComponent
            sx={{
              width: "100%",
              height: "100vh",
              position: "absolute",
              margin: "auto",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000
            }}
          >
            <CircularProgressComponent size="3rem" />
          </BoxComponent>
        )}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    );
  };
}

export default withLoader;
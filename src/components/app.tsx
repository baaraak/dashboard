import React from "react";
import { Spinner, Center } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "context/auth";
import Layout from "./layout";
import ErrorFallback from "./error-boundary";

const AuthenticatedApp = React.lazy(() => import("pages/routes"));
const UnAuthenticatedApp = React.lazy(
  () => import("pages/auth/AuthenticatePage"),
);

function App() {
  const { user } = useAuth();
  return (
    <React.Suspense
      fallback={
        <Center>
          <Spinner />
        </Center>
      }
    >
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {user ? (
            <Layout>
              <AuthenticatedApp />
            </Layout>
          ) : (
            <UnAuthenticatedApp />
          )}
        </ErrorBoundary>
      </Router>
    </React.Suspense>
  );
}

export default App;

import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ loggedIn, isAuthLoading, children, ...routeProps }) {
  return (
    <Route {...routeProps}>
      {() => {
        if (isAuthLoading) return null;
        if (loggedIn) return children;
        return (
          <Redirect to={{ pathname: "/", state: { requireLogin: true } }} />
        );
      }}
    </Route>
  );
}

export default ProtectedRoute;

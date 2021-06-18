import { Route, useRouteMatch } from 'react-router-dom';

const withRouteSlug = (Component) => (props) => {
  const { path } = useRouteMatch();
  return (
    <Route
      path={[`${path}/:slug`, path]}
      render={(routeProps) => <Component path={path} {...routeProps} {...props} />}
    />
  );
};

export default withRouteSlug;

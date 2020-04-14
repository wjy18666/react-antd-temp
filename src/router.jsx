import React, { Suspense } from 'react';
import routes from '@/routes';
import path from 'path';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


let token = ''

const RouteItem = (props) => {
  const { redirect, path: routePath, component, key } = props;
  if (redirect) {
    return (
      <Redirect
        exact
        key={key}
        from={routePath}
        to={redirect}
      />
    );
  }
  return (
    <Route
      key={key}
      component={component}
      path={routePath}
    />
  );
};

const hasChildrenRender = (id, children, props, RouteComponent, route) => {
  return (
    children ? (
      <RouteComponent key={id} {...props}>
        <Suspense fallback={<div />}>
          <Switch>
            {children.map((routeChild, idx) => {
              const { redirect, path: childPath, component, exact } = routeChild;

              return RouteItem({
                key: `${id}-${idx}`,
                redirect,
                path: childPath && path.join(route.path, childPath),
                component,
                exact
              });
            })}
          </Switch>
        </Suspense>
      </RouteComponent>
    ) : (
      <Suspense fallback={<div />}>
        {
          RouteItem({
            key: id,
            ...route
          })
        }
      </Suspense>
    )
  )
}

const router = () => {
  return (
      <Router>
        <Switch>
          {
            routes.map((route, id) => {
              const { component: RouteComponent, children, requiresAuth, isNotNeedHead, ...others  } = route;
              return (
                <Route
                  key={id}
                  {...others}
                  component={(props) => {
                    return (
                      requiresAuth && !token
                      ?
                      <Redirect to={{
                        pathname: '/user/login',
                        state: { from: props.location }
                      }} /> 
                      : 
                      (
                        isNotNeedHead
                        ?
                        hasChildrenRender(id, children, props, RouteComponent, route)
                        :
                        <div className="need_head">
                          {
                            hasChildrenRender(id, children, props, RouteComponent, route)
                          }
                        </div>
                      )
                    )
                  }}
                />
              )
            })
          }
        </Switch>
      </Router>
  );
};

export default router


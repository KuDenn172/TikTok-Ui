import React from 'react';
import { Route, Navigate  } from 'react-router-dom';
import { useAuth } from '~/contexts/AuthContext';

function PrivateRouter({ component: Component, ...props }) {
    const { currentUser } = useAuth();

    return <Route {...props} render={(props) => (currentUser ? <Component {...props} /> : <Navigate  to="/login" />)} />;
}

export default PrivateRouter;

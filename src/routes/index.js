import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import AuthRoute from './AuthRoute';
import AppRoute from './AppRoute';

const Routes = () => {
    const { signed } = useContext(AuthContext);

    return (

        signed ? <AppRoute /> : <AuthRoute />

    );
};

export default Routes;
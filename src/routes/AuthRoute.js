import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';

const Stack = createStackNavigator();

const AuthRoute = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={ Login }
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='Cadastro'
                component={ Cadastro }
                options={{
                    headerStyle: {
                        backgroundColor: '#1D1616',
                        elevation: 0
                    },
                    headerTitle: '',
                    headerTintColor: '#eee'
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthRoute;
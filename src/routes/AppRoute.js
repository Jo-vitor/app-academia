import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Fichas from '../pages/Fichas';
import Ficha from '../pages/Ficha';
import CriarFicha from '../pages/CriarFicha';
import AddExercicio from '../pages/AddExercicio';
import Exercicio from '../pages/Exercicio';
import EditarFicha from '../pages/EditarFicha';

const Stack = createStackNavigator();

const AppRoute = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name='Fichas'
                component={Fichas}
            />

            <Stack.Screen
                name='Ficha'
                component={Ficha}
            />

            <Stack.Screen
                name='CriarFicha'
                component={CriarFicha}
            />

            <Stack.Screen
                name='EditarFicha'
                component={EditarFicha}
            />

            <Stack.Screen
                name='AddExercicio'
                component={AddExercicio}
            />

            <Stack.Screen
                name='Exercicio'
                component={Exercicio}
            />

        </Stack.Navigator>
    );
};

export default AppRoute;
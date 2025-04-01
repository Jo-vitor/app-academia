import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './src/context/authContext';
import Routes from './src/routes';

// #1D1616
// #8E1616
// #D84040
// #EEEEEE

export default function App() {  

  return (

    <NavigationContainer>
      <AuthProvider>

        <Routes />

        <StatusBar translucent={false} backgroundColor='#eee' />
      </AuthProvider>
    </NavigationContainer>

  );
};
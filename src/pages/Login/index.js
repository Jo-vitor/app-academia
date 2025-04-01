import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { AuthContext } from '../../context/authContext';

const Login = () => {

    const navigation = useNavigation();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        await login(email,senha);
    };

    return (
        <KeyboardAvoidingView style={styles.container} enabled>

            <Image 
                source={require('../../assets/Logo.png')}
                resizeMode='cover'
                style={styles.img}
            />

            <View style={styles.areaInput}>
                <TextInput
                    placeholder='Usuário'
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                    style={styles.input}
                />

                <TextInput
                    placeholder='Senha'
                    value={senha}
                    onChangeText={(t) => setSenha(t)}
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    <Text style={styles.btnText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate('Cadastro') }}>
                    <Text style={styles.text}>Criar um conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1616'
    },
    img: {
        height: 310,
        width: 360
    },
    areaInput: {
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#eee',
        height: 40,
        width: '90%',
        marginVertical: 15,
        paddingLeft: 15,
        borderRadius: 10
    },
    btn: {
        backgroundColor: '#D84040',
        width: '80%',
        height: 30,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    btnText: {
        fontSize: 20,
        color: '#eee'
    },
    text: {
        marginTop: 10,
        color: '#eee'
    }
});

export default Login;
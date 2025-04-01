import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { AuthContext } from '../../context/authContext';

const Cadastro = () => {

    const { cadastro } = useContext(AuthContext);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = async () => {
        if(nome != '' && email != '' && senha != '')
            await cadastro(email,senha,nome);
        else
            alert('Preencha todos os campos!');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Nome'
                value={nome}
                onChangeText={(t) => setNome(t)}
                style={styles.input}
            />

            <TextInput
                placeholder='Email'
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

            <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
                <Text style={styles.btnText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1616',
        alignItems: 'center',
        justifyContent: 'center'
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
});

export default Cadastro;
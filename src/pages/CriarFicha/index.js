import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import ExercicioAdicionado from '../../components/ExercicioAdicionado';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { AuthContext } from '../../context/authContext';
import { addDoc, collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const CriarFicha = () => {

    const navigation = useNavigation();
     
    const {user, fichaExercicios, setFichaExercicios} = useContext(AuthContext);
    

    const [nome, setNome] = useState('');

    const handleSalvar = async () => {

        if(nome == '') return;

        try {
            const fichasRef = collection(db, 'usuario', user.id, 'fichas');
    
            const fichaDoc = await addDoc(fichasRef, {
                nome
            });
    
            const batch = writeBatch(db);
            const exerciciosRef = collection(db, 'usuario', user.id, 'fichas', fichaDoc.id, 'exercicios');
    
            fichaExercicios.forEach(exercicio => {
                const exercicioDoc = doc(exerciciosRef);
                batch.set(exercicioDoc, exercicio);
            });
    
            await batch.commit();
            
            setFichaExercicios([]);
            navigation.goBack();
            alert('Salvo com sucesso');
        } catch (error) {
            console.error(error);            
        }

    };

    return (
        <View style={styles.container}>
            
            <TouchableOpacity style={styles.btn} onPress={handleSalvar}>
                <Text style={styles.btnText}>Salvar Ficha</Text>
            </TouchableOpacity>

            <TextInput 
                placeholder='Digite o nome da ficha'
                value={nome}
                onChangeText={(t) => setNome(t)}
                style={styles.input}
            />

            <FlatList 
                data={fichaExercicios}
                renderItem={({ item }) => <ExercicioAdicionado data={item}/>}
            />

            <TouchableOpacity 
                onPress={() => navigation.navigate('AddExercicio')}
                style={styles.btnAdd} 
            >
                <Feather name="plus" size={50} color="#1d1616" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1616',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#D84040',
        width: '90%',
        height: 40,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }, 
    btnText: {
        color: '#eee',
        fontSize: 18
    },
    input: {
        backgroundColor: '#eee',
        width: '90%',
        paddingLeft: 10,
        borderRadius: 10,
    },  
    btnAdd: {
        backgroundColor: '#fc7b03',
        width: 80,
        height: 80,
        borderRadius: 15,
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default CriarFicha;
import React, { useContext } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { AuthContext } from '../../context/authContext';

const FichaLista = ( { data } ) => {

    const navigation = useNavigation();

    const {user} = useContext(AuthContext);

    const confirmaDelete = () => {
        Alert.alert('Deletar', 'Tem certeza que deseja deletar essa ficha?', [
            {
                text: 'cancelar',
                style: 'cancel'
            },
            {
                text: 'ok',
                onPress: () => handleDelete()
            }
        ])
    }

    const handleDelete = async () => {
        try {
            const batch = writeBatch(db);
    
            const collectionRef = collection(db, 'usuario', user.id, 'fichas', data.id, 'exercicios')
    
            await getDocs(collectionRef)
            .then((snapshot) => {
                snapshot.forEach((docu) => {                    
                    batch.delete(doc(db, 'usuario', user.id, 'fichas', data.id, 'exercicios', docu.id))
                })
            });
    
            const docRef = doc(db, 'usuario', user.id, 'fichas', data.id);
            batch.delete(docRef);
    
    
            await batch.commit();
            
        } catch (error) {
            console.error(error);
            
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onLongPress={confirmaDelete} activeOpacity={0.9}>
                <View style={styles.header}>
                    <Text style={styles.text}>{data.nome}</Text>
                   
                    <TouchableOpacity onPress={() => navigation.navigate('EditarFicha', {data})}>
                        <Feather name="edit" size={20} color='#eee' />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Ficha', {data})}>
                    <Text style={styles.btnText}>Ver ficha</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: '#8E1616',
        width: 326,
        height: 100,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    text: {
        color: '#eee',
        fontSize: 15,
        fontWeight: 500
    },
    btn: {
        backgroundColor: '#D84040',
        width: 297,
        height: 35,
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: '#eee',
        fontSize: 18
    }
});

export default FichaLista;
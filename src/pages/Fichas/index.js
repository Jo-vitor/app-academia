import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FichaLista from '../../components/FichaLista';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/authContext';
import { collection,  getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const Fichas = () => {

    const navigation = useNavigation();
    const { user, logout } = useContext(AuthContext);

    const [fichas, setFichas] = useState([]);

    useEffect(() => {
        const pegaDados = async () => {
            const fichasRef = collection(db, 'usuario', user.id, 'fichas');            
            
            try {
                onSnapshot(fichasRef, (snapshot) => {                
                    let lista = [];
                    
                    snapshot.forEach(doc => {
                        lista.push({
                            id: doc.id,
                            ...doc.data(),
                        });                    
                    });

                    setFichas(lista);
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
        };

        pegaDados();
    }, []);

    const handleLogout = async () => {
        await logout();
    };
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('CriarFicha') }>
                <Text style={styles.btnText}>Criar nova ficha</Text>
            </TouchableOpacity>

            <FlatList 
                data={fichas}
                renderItem={ ({ item }) => <FichaLista data={item}/> }
            />

            <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                <Text style={styles.btnText}>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
        marginTop: 20,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnText: {
        color: '#eee',
        fontSize: 18
    }
});

export default Fichas;
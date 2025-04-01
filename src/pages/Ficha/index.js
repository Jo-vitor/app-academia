import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from "react-native"
import ExercicioFicha from '../../components/ExercicioFicha';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { AuthContext } from '../../context/authContext';

const Ficha = ({route}) => {

    const {data} = route.params;

    const {user} = useContext(AuthContext);

    const [ficha, setFicha] = useState([]);

    useEffect(() => {
        const pegaDados = async () => {
            const exerciciosRef = collection(db, 'usuario', user.id, 'fichas', data.id, 'exercicios');

            try {
                await getDocs(exerciciosRef)
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach(doc => {
                        lista.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });

                    setFicha(lista);
                })
            } catch (error) {
                console.error(error);
            }
        };

        pegaDados();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{data.nome}</Text>
            </View>

            <FlatList 
                data={ficha}
                renderItem={({ item }) => <ExercicioFicha data={item} />}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1616'
    },
    header: {
        backgroundColor: '#eee',
        height: 50,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    headerText: {
        color: '#1D1616',
        fontSize: 22,
        fontWeight: 500
    }
});

export default Ficha;
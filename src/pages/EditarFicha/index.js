import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import ExercicioAdicionado from '../../components/ExercicioAdicionado';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { AuthContext } from '../../context/authContext';
import { addDoc, collection, doc, getDocs, onSnapshot, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const EditarFicha = ({ route }) => {

    const { data } = route.params;

    const navigation = useNavigation();

    const { user, fichaExercicios, setFichaExercicios } = useContext(AuthContext);

    const [nome, setNome] = useState(data.nome);
    const [fichaPadrao, setFichaPadrao] = useState([]);

    useEffect(() => {
        const pegaDados = async () => {
            const exerciciosRef = collection(db, 'usuario', user.id, 'fichas', data.id, 'exercicios');

            try {
                onSnapshot(exerciciosRef, (snapshot) => {
                    let lista = [];

                    snapshot.forEach(doc => {
                        lista.push({
                            ...doc.data(),
                            docid: doc.id,
                        });
                    });

                    setFichaExercicios(lista);
                    setFichaPadrao(lista);
                });
            } catch (error) {
                console.error(error);
            }
        };

        pegaDados();

        return () => setFichaExercicios([]);
    }, []);

    const handleEdit = async () => {

        if (nome == '') return;

        try {
            const fichasRef = doc(db, 'usuario', user.id, 'fichas', data.id);

            await updateDoc(fichasRef, {
                nome
            });
 
            deletar();
            adicionar();
            
            const batch = writeBatch(db);   

            fichaExercicios.forEach(exercicio => {    
                if(exercicio.docid){
                    const exercicioDoc = doc(db, 'usuario', user.id, 'fichas', data.id, 'exercicios', exercicio.docid);
                    batch.update(exercicioDoc, exercicio);
                }           
            });

            await batch.commit();

            setFichaExercicios([]);
            navigation.goBack();
            alert('Editado com sucesso');
        } catch (error) {
            console.error(error);
        }

    };

    const deletar = async () => {

        const batch = writeBatch(db);

        fichaPadrao.forEach((exercicio) => {
            const existe = fichaExercicios.find((item) => exercicio.docid == item.docid);

            if(!existe){
                const exercicioDoc = doc(db, 'usuario', user.id, 'fichas', data.id, 'exercicios', exercicio.docid);
                
                batch.delete(exercicioDoc);
            }
        });

        await batch.commit();
    };

    const adicionar = async () => {

        const batch = writeBatch(db);

        fichaExercicios.forEach((exercicio) => {
            const existe = fichaPadrao.find((item) => exercicio.docid == item.docid);

            if(!existe){
                const exerciciosRef = collection(db, 'usuario', user.id, 'fichas', data.id, 'exercicios');
                const exercicioDoc = doc(exerciciosRef);
                batch.set(exercicioDoc, exercicio);
            }
        });

        await batch.commit();
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.btn} onPress={handleEdit}>
                <Text style={styles.btnText}>Editar Ficha</Text>
            </TouchableOpacity>

            <TextInput
                placeholder='Digite o nome da ficha'
                value={nome}
                onChangeText={(t) => setNome(t)}
                style={styles.input}
            />

            <FlatList
                data={fichaExercicios}
                renderItem={({ item }) => <ExercicioAdicionado data={item} />}
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

export default EditarFicha;
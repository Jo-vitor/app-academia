import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { DataTable } from 'react-native-paper';
import RepeticaoExercicio from '../RepeticaoExercicio';
import { AuthContext } from '../../context/authContext';

const ExercicioAdicionado = ({data}) => {

    const navigation = useNavigation();

    const {mudaSets, mudaKgEReps, deleteExercicio} = useContext(AuthContext);
    
    const [sets, setSets] = useState(data.sets);

    const addRep = () => {
        let lista = sets;
        
        let novoSet = {
            set: sets.length+1,
            kg: 0,
            reps: 0
        };
        
        setSets(prev => [...prev, novoSet]);

        lista.push(novoSet);
        mudaSets(lista, data.id);        
    };

    const deleteRep = (id) => {
        let lista = sets.filter((item) => item.set != id);

        lista.forEach(item => {
            if(item.set > id){
                item.set--
            }
        });

        setSets(lista);
        mudaSets(lista, data.id);
    };

    const atualizaKgEReps = (id, kg, reps) => {
        let lista = sets;

        lista.forEach((item) => {
            if(item.id == id){
                item.kg = kg;
                item.reps = reps;
            }
        });

        setSets(lista);
        mudaKgEReps(data.id, id, kg, reps);
    };

    const handleDelete = () => {

        Alert.alert('Deletar Exercicio', 'Tem certeza que deseja deletar esse exercicio?',[
            {
                text: 'cancelar',
                style: 'cancel'
            },
            {
                text: 'ok',
                onPress: () => deleteExercicio(data.id)
            }
        ]);

    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onLongPress={handleDelete} activeOpacity={0.9}>
                <View style={styles.header}>
                    <Image 
                        source={{uri: data.gifUrl}}
                        contentFit='contain'
                        style={styles.img}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('Exercicio', {data})}>
                        <Text style={styles.text}>{data.name}</Text>
                    </TouchableOpacity>
                </View>

                
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title textStyle={styles.cor}>Set</DataTable.Title>
                            <DataTable.Title textStyle={styles.cor}>Kg</DataTable.Title>
                            <DataTable.Title textStyle={styles.cor}>Reps</DataTable.Title>
                            <DataTable.Title></DataTable.Title>
                        </DataTable.Header>

                        { sets.map((item) => 
                            <RepeticaoExercicio 
                                data={item} 
                                deleteRep={deleteRep} 
                                atualizar={atualizaKgEReps} 
                                key={item.set}
                            />
                        )}

                    </DataTable>

                <TouchableOpacity style={styles.btn} onPress={addRep}>
                    <Text style={styles.btnText}>Add rep</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#8E1616',
        width: 326,
        height: 'auto',
        marginVertical: 20,
        borderRadius: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10,
        gap: 10
    },
    img: {
        backgroundColor: '#eee',
        height: 30,
        width: 30,
        borderRadius: 15
    },
    text: {
        color: '#eee',
        fontSize: 18
    },
    btn: {
        backgroundColor: '#D84040',
        height: 32,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
    btnText: {
        color: '#eee',
        fontSize: 18
    }
});

export default ExercicioAdicionado;
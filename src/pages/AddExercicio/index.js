import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from "react-native"
import Exercicio from '../../components/Exercicio';
import { api } from '../../services/api';
import { Picker } from '@react-native-picker/picker';

const AddExercicio = () => {

    const [exercicios, setExercicios] = useState([]);
    const [nome, setNome] = useState('');
    const [selectedMusculo, setSelectedMusculo] = useState('');

    const musculos = ["back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"];

    useEffect(() => {
        const pegaExercicio = async () => {
            try {
                const response = await api.get(``);
                
                setExercicios(response.data);
            } catch (error) {
                console.error(error);
                
            }
        }

        pegaExercicio();
        
    }, []);

    const pegaExerciciosMusculo = async (value) => {
        setSelectedMusculo(value);
        try {
            const response = await api.get(`/bodyPart/${value}`);                

            setExercicios(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const pegaExercicioNome = async (value) => {
        setNome(value);

        if(value != '' && value != ' '){
            try {
                const response = await api.get(`/name/${value}`);
                
                setExercicios(response.data);
            } catch (error) {
                console.error(error);
                
            }
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Pesquisar'
                value={nome}
                onChangeText={(t) => pegaExercicioNome(t)}
                autoCapitalize='none'
                style={styles.input}
            />

            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedMusculo}
                    onValueChange={(itemValue) => pegaExerciciosMusculo(itemValue)}
                >
                    <Picker.Item label='Todos os músculo' key={-1} enabled={false}/>
                    {musculos.map((item, index) => {
                        return <Picker.Item label={item} value={item} key={index}/>
                    })}
                </Picker>
            </View>

            <FlatList
                data={exercicios}
                renderItem={({ item }) => <Exercicio data={item}/>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1616',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#eee',
        width: '90%',
        height: 50,
        borderRadius: 25,
        marginTop: 20,
        paddingLeft: 15
    },
    picker: {
        marginVertical: 10, 
        width: '60%',
        backgroundColor: '#eee',
        borderRadius: 10
    }
});

export default AddExercicio;
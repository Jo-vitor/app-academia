import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { AuthContext } from '../../context/authContext';

const Exercicio = ({ data }) => {

    const navigation = useNavigation();

    const { fichaExercicios, setFicha } = useContext(AuthContext);

    const addExercicios = () => {

        const jaTem = fichaExercicios.find(({id}) => id == data.id);

        if(jaTem) {
            alert("Você já adicionou esse exercício na sua ficha!");
            return;
        }

        const exercicio = {
            ...data,
            sets: [
                {
                    set: 1,
                    kg: 0,
                    reps: 0
                }
            ]
        };

        setFicha(exercicio);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image 
                    source={{uri: data.gifUrl}}
                    contentFit='contain'
                    style={styles.img}
                />

                <View style={{width: '70%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Exercicio', { data })}>
                        <Text style={styles.titulo}>{ data.name }</Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>{ data.target }</Text>
                </View>

                <TouchableOpacity onPress={addExercicios}>
                    <Feather name="plus-circle" size={30} color="#eee"/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#8E1616',
        width: 322,
        borderRadius: 10,
        marginVertical: 12,
        padding: 10
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    titulo: {
        color: '#eee',
        fontSize: 18,
        fontWeight: 500
    },
    text: {
        color: '#eee',
        fontSize: 14
    }
});

export default Exercicio;
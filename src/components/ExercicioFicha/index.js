import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DataTable } from 'react-native-paper';
import CheckBox from '../CheckBox';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import LinhaExercicio from '../LinhaRepeticao';

const ExercicioFicha = ({ data }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image 
                        source={{uri: data.gifUrl}}
                        style={styles.img}
                    />  

                    <TouchableOpacity onPress={() => navigation.navigate('Exercicio', {data})}>
                        <Text style={styles.text}>{data.name}</Text>
                    </TouchableOpacity>
                </View>

                <DataTable style={{marginBottom: 8}}>
                    <DataTable.Header>
                        <DataTable.Title textStyle={styles.cor}>Set</DataTable.Title>
                        <DataTable.Title textStyle={styles.cor}>Kg</DataTable.Title>
                        <DataTable.Title textStyle={styles.cor}>Reps</DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                    </DataTable.Header>

                    { data.sets.map((item) => <LinhaExercicio data={item} key={item.set}/>) }
                </DataTable>
            </View>
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
        marginVertical: 10,
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
        fontSize: 18,
    },
});

export default ExercicioFicha;
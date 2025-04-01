import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { DataTable } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const RepeticaoExercicio = ({data, deleteRep, atualizar}) => {

    const [kg, setKg] = useState(data.kg);
    const [reps, setReps] = useState(data.reps);

    useEffect(() => {        
        atualizar(data.set, kg, reps);
    }, [kg, reps]);

    return (
        <DataTable.Row>
            <DataTable.Cell textStyle={styles.cor}>
                {data.set}
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cor}>
                <TextInput
                    placeholder='0'
                    value={kg}
                    onChangeText={(t) => setKg(t)}
                    keyboardType='numeric'
                />
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cor}>
                <TextInput
                    placeholder='0'
                    value={reps}
                    onChangeText={(t) => setReps(t)}
                    keyboardType='numeric'
                />
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cor}>
                <TouchableOpacity onPress={() => deleteRep(data.set)}>
                    <FontAwesome name="remove" size={24} color="#eee" />
                </TouchableOpacity>
            </DataTable.Cell>
        </DataTable.Row>
    );
};

const styles = StyleSheet.create({
    cor: {
        color: '#eee'
    }
});

export default RepeticaoExercicio;
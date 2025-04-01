import React from 'react';
import { StyleSheet, View } from "react-native"
import { DataTable } from 'react-native-paper';
import CheckBox from '../CheckBox';

const LinhaExercicio = ({data}) => {
    return (
        <DataTable.Row>
            <DataTable.Cell textStyle={styles.cor}>{data.set}</DataTable.Cell>
            <DataTable.Cell textStyle={styles.cor}>{data.kg}</DataTable.Cell>
            <DataTable.Cell textStyle={styles.cor}>{data.reps}</DataTable.Cell>
            <DataTable.Cell>
                <CheckBox />
            </DataTable.Cell>
        </DataTable.Row>
    );
};

const styles = StyleSheet.create({
    cor: {
        color: '#eee'
    },
});

export default LinhaExercicio;
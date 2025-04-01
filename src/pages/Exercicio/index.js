import { Image } from 'expo-image';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from "react-native";

const Exercicio = ({ route }) => {

    const { data } = route.params;


    return (
        <View style={styles.container}>
            <Image
                source={{uri: data.gifUrl}}
                contentFit='contain'
                style={styles.img}
            />

            <View style={styles.areaText}>
                <Text style={styles.titulo}>{ data.name }</Text>
                <Text style={styles.text}>{ data.target }</Text>

                
            </View>

            <FlatList 
                data={data.instructions}
                renderItem={({item}) => <Text style={styles.lista}>. {item}</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1616'
    },
    img: {
        backgroundColor: '#fff',
        width: '100%',
        height: 270,
    },
    areaText: {
        padding: 10,
    },
    titulo: {
        color: '#eee',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: '#D84040',
        fontSize: 15,
        marginBottom: 15,
    },
    lista: {
        color: '#eee',
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 10
    }
});

export default Exercicio;
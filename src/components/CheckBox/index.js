import React, { useState } from 'react';
import { StyleSheet, View } from "react-native"
import { Checkbox } from 'react-native-paper';

const CheckBox = () => {

    const [checked, setChecked] = useState(false);

    return (
        <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
                setChecked(!checked);
            }}
            color='#00ff00'
            uncheckedColor='#eee'
        />
    );
};

export default CheckBox;
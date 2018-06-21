import React, { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : 24,
        backgroundColor: 'orange'
    }
});
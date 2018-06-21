import React, { Platform, StyleSheet } from 'react-native';

export default const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0
    }
});
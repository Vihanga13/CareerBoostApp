import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ResumeBuilder from '../components/ResumeBuilder/ResumeBuilder';

const ResumeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resume Builder</Text>
            <ResumeBuilder />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default ResumeScreen;
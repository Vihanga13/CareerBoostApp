import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TipsScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Interview Tips</Text>
            <Text style={styles.tip}>1. Research the company and role before the interview.</Text>
            <Text style={styles.tip}>2. Practice common interview questions and answers.</Text>
            <Text style={styles.tip}>3. Dress appropriately for the interview.</Text>
            <Text style={styles.tip}>4. Prepare questions to ask the interviewer.</Text>
            <Text style={styles.tip}>5. Follow up with a thank-you email after the interview.</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    tip: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default TipsScreen;
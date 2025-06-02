import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const InterviewTips = () => {
    const tips = [
        "Research the company and role before the interview.",
        "Practice common interview questions and answers.",
        "Dress appropriately for the interview.",
        "Be on time and plan your route in advance.",
        "Prepare questions to ask the interviewer.",
        "Follow up with a thank-you email after the interview.",
        "Stay calm and confident during the interview.",
        "Listen carefully to the interviewer's questions.",
        "Show enthusiasm for the role and the company.",
        "Be honest about your skills and experiences."
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Interview Tips</Text>
            <ScrollView>
                {tips.map((tip, index) => (
                    <Text key={index} style={styles.tip}>
                        {index + 1}. {tip}
                    </Text>
                ))}
            </ScrollView>
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
    tip: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default InterviewTips;
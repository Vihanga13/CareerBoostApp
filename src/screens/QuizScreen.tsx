import React from 'react';
import { View, Text, Button } from 'react-native';

const QuizScreen = () => {
    const handleStartQuiz = () => {
        // Logic to start the quiz
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Quiz Screen</Text>
            <Button title="Start Quiz" onPress={handleStartQuiz} />
        </View>
    );
};

export default QuizScreen;
import React from 'react';
import { View, Text, Button } from 'react-native';

const Quizzes = () => {
    const handleStartQuiz = () => {
        // Logic to start the quiz
    };

    return (
        <View>
            <Text>Welcome to the Quizzes Section!</Text>
            <Text>Prepare for your interviews with our quizzes.</Text>
            <Button title="Start Quiz" onPress={handleStartQuiz} />
        </View>
    );
};

export default Quizzes;
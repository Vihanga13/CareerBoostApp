import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const ResumeBuilder = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');

    const handleSave = () => {
        // Logic to save the resume data
        console.log('Resume saved:', { name, email, phone, education, experience, skills });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Resume Builder</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                style={styles.input}
                placeholder="Education"
                value={education}
                onChangeText={setEducation}
            />
            <TextInput
                style={styles.input}
                placeholder="Experience"
                value={experience}
                onChangeText={setExperience}
            />
            <TextInput
                style={styles.input}
                placeholder="Skills"
                value={skills}
                onChangeText={setSkills}
            />
            <Button title="Save Resume" onPress={handleSave} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
});

export default ResumeBuilder;
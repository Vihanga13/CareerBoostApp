import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { matchSkills } from '../../services/aiMatcher';

const SkillMatcher = () => {
    const [skills, setSkills] = useState('');
    const [matchedJobs, setMatchedJobs] = useState([]);

    const handleMatchSkills = () => {
        const results = matchSkills(skills);
        setMatchedJobs(results);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Skill Matcher</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your skills (comma separated)"
                value={skills}
                onChangeText={setSkills}
            />
            <Button title="Match Skills" onPress={handleMatchSkills} />
            {matchedJobs.length > 0 && (
                <View style={styles.results}>
                    <Text style={styles.resultsTitle}>Matched Job Opportunities:</Text>
                    {matchedJobs.map((job, index) => (
                        <Text key={index} style={styles.job}>
                            {job}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
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
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    results: {
        marginTop: 20,
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    job: {
        fontSize: 16,
        marginVertical: 5,
    },
});

export default SkillMatcher;
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { matchSkills } from '../services/aiMatcher';

const SkillMatchScreen = () => {
    const [skills, setSkills] = useState('');
    const [matchedJobs, setMatchedJobs] = useState([]);

    const handleMatchSkills = () => {
        const jobs = matchSkills(skills);
        setMatchedJobs(jobs);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Skill Matcher</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                placeholder="Enter your skills (comma separated)"
                value={skills}
                onChangeText={setSkills}
            />
            <Button title="Match Skills" onPress={handleMatchSkills} />
            <FlatList
                data={matchedJobs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 18 }}>{item.title}</Text>
                        <Text>{item.company}</Text>
                    </View>
                )}
                style={{ marginTop: 20 }}
            />
        </View>
    );
};

export default SkillMatchScreen;
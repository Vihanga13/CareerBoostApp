import axios from 'axios';

const API_BASE_URL = 'https://api.careerboost.com'; // Replace with your actual API base URL

export const fetchJobListings = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/job-listings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job listings:', error);
        throw error;
    }
};

export const fetchInternshipListings = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/internship-listings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching internship listings:', error);
        throw error;
    }
};

export const fetchInterviewTips = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/interview-tips`);
        return response.data;
    } catch (error) {
        console.error('Error fetching interview tips:', error);
        throw error;
    }
};
import axios from 'axios';

export const addFlashcard = async (flashcard) => {
    try {
        const response = await axios.post('http://localhost:3000/addcard', flashcard);
        return response.data; 
    } catch (error) {
        console.error('Error adding flashcard:', error);
        throw error; 
    }
}

export const getFlashcards = async () => {
    try {
        const response = await axios.get('http://localhost:3000/getallcard');
        console.log('Fetched flashcards:', response.data); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching flashcards:', error);
        return []; 
    }
}

export const updateFlashcard = async (id, flashcard) => {
    try {
        const response = await axios.put(`http://localhost:3000/updatecard/${id}`, flashcard);
        return response.data; 
    } catch (error) {
        console.error(`Error updating flashcard with id ${id}:`, error);
        throw error; 
    }
}

export const deleteFlashcard = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/deletecard/${id}`);
        return response.data; 
    } catch (error) {
        console.error(`Error deleting flashcard with id ${id}:`, error);
        throw error; 
    }
}

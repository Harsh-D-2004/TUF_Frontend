import './App.css';
import React, { useState, useEffect } from 'react';
import { addFlashcard, updateFlashcard, getFlashcards, deleteFlashcard } from './apiService';
import Flashcard from './Flashcard';


function App({ isAdmin }) {

  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  const fetchcards = async () => {
    try {
      const cards = await getFlashcards();
      console.log('Cards fetched in App component:', cards);
      setCards(cards);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  useEffect(() => {
    fetchcards();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleaddcard = async () => {

    const question = prompt("Enter the question : ")
    const answer = prompt('Enter the answer')

    if (!question || !answer) {
      alert('Please enter both question and answer')
      return
    }

    await addFlashcard({ question, answer });
    alert('Card Added Successfully')
    fetchcards();
  }

  const handleupdatecard = async (id) => {
    const flashcard = cards.find((flashcard) => flashcard.id === id)
    const question = prompt("Enter the question : ", flashcard.question)
    const answer = prompt('Enter the answer', flashcard.answer)

    if (!question || !answer) {
      alert('Please enter both question and answer')
      return
    }

    const updatedFlashcard = { ...flashcard, question: question, answer: answer }

    await updateFlashcard(id, updatedFlashcard);
    fetchcards();

  }

  const handleDeletecard = async (id) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      await deleteFlashcard(id);
      fetchcards();
    }
  }

  return (
    <div className="app-container">
      <h1>TUF Flashcards</h1>
      {isAdmin && (
        <div className="admin-buttons">
          <button onClick={handleaddcard}>Create New card</button>
        </div>
      )}
      <div className="flashcards-container">
        {currentCards.map((card) => (
          <div key={card.id} className="flashcard-wrapper">
            <Flashcard question={card.question} answer={card.answer} />
            {isAdmin && (
              <div className="admin-actions">
                <button onClick={() => handleupdatecard(card.id)}>Update</button>
                <button onClick={() => handleDeletecard(card.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

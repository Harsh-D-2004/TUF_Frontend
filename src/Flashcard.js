import React, { useState } from 'react';
import './Flashcard.css'
// import { View, Text } from 'react-native'

const Flashcard = ({question , answer}) => {

    const [isFlipped , setIsFlipped] = useState(false);

    const handleflip = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleflip}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <h3>{question}</h3>
            </div>
            <div className="flashcard-back">
              <p>{answer}</p>
            </div>
          </div>
        </div>
    );
}

export default Flashcard

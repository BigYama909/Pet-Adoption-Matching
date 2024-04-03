import React, { useState } from 'react';
import styles from './Chat.module.css'; // Ensure you have this CSS file

// Assuming predefinedQuestions is declared only once and used here
const predefinedQuestions = [
  { id: 1, question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
  { id: 2, question: "Why use React?", answer: "React is flexible, efficient, and declarative, making it a popular choice for developers." },
  { id: 3, question: "How do I start with React?", answer: "The best way to start is by reading the React documentation and creating small projects." },
];

function Chat() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const handleQuestionClick = (id) => {
    if (id === selectedQuestionId) {
      setSelectedQuestionId(null);
    } else {
      setSelectedQuestionId(id);
    }
  };

  if (!isChatVisible) {
    return (
      <button className={styles.chatbotToggler} onClick={() => setIsChatVisible(true)}>
        <span>Chat</span>
      </button>
    );
  }

  return (
    <div className={styles.chatbot}>
      <div className={styles.header}>
        <button onClick={() => setIsChatVisible(false)}>Close</button>
      </div>
      <ul className={styles.questionList}>
        {predefinedQuestions.map(({ id, question, answer }) => (
          <li key={id} onClick={() => handleQuestionClick(id)}>
            <div>{question}</div>
            {selectedQuestionId === id && <div className={styles.answer}>{answer}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;

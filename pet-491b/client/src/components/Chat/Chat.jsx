// Importing necessary React features and styles
import React, { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.css";
// Importing icons for the chat interface from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
// Logo image for the chatbot
import logo from "./Images/favicon_and_chatbot_logo.jpeg";

// Chatbot component definition
function ChatbotComponent() {
  // State hooks for managing chatbot visibility, minimization, messages, and menu display
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showBackToMenuButton, setShowBackToMenuButton] = useState(false);
  // useRef hook for managing automatic scrolling to the end of messages
  const endOfMessagesRef = useRef(null);

  // Effect hook for scrolling to the latest message
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Effect hook to initialize chatbot messages upon first appearance
  useEffect(() => {
    if (isVisible && !isMinimized && messages.length === 0) {
      // Set initial messages with a flag to show the logo only for the first set
      setMessages([
        {
          text: [
            "Hi there 👋",
            "I'm Scout, the chatbot for Pet Adoption Match",
            "How can I help you?",
          ],
          isUser: false,
          initial: true,
        },
      ]);
      setShowMenu(true);
    }
  }, [isVisible, isMinimized]);

  // Function to toggle chatbot visibility and minimization states
  const toggleVisibility = () => {
    if (isMinimized) {
      // If the chatbot is minimized, unminimize it and make it visible
      setIsMinimized(false);
      setIsVisible(true);
    } else {
      // Toggle the visible state
      setIsVisible(!isVisible);
    }
  };
  // Function to minimize the chatbot window
  const minimizeChatbot = () => {
    setIsMinimized(!isMinimized);
  };

  // Function to close the chatbot window and reset states
  const closeChatbot = () => {
    setIsVisible(false);
    setIsMinimized(false);
    setMessages([]);
    setShowMenu(false);
  };

  // Function to handle user choice and generate a chatbot response
  const handleUserChoice = (choiceText) => {
    setShowMenu(false);
    // Immediately show the user's choice
    setMessages((currentMessages) => [
      ...currentMessages,
      { text: choiceText, isUser: true },
    ]);

    let chatbotResponse = "";
    // Switch statement to generate responses based on user choice
    switch (choiceText) {
      // Cases for different user choices
      // Add chatbot responses accordingly
      case "I have a pet that needs a new home.":
        chatbotResponse =
          "We're here to help! Please provide us with more details about the pet in need so we can assist you better.";
        break;
      case "I want to adopt a pet.":
        chatbotResponse =
          "We're so glad you chose us to help you find your new family member." +
          "Please first sign up for an account or login to start the adoption process.";
      case "I want to contact website owner.":
        chatbotResponse =
          "Feel free to contact us using the provided contact information on our website. We're happy to assist you!";
        break;
      case "I am a shelter or rescue employee.":
        chatbotResponse =
          "Thank you for the important work you do! Please let us know how we can support your efforts.";
        break;
    }

    // Add the chatbot's response after a delay
    setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        { text: chatbotResponse, isUser: false },
      ]);
    }, 500);
    setShowBackToMenuButton(true);
  };
  // Function to show the main menu and hide the back button
  const showMainMenu = () => {
    setShowMenu(true);
    setShowBackToMenuButton(false);
  };

  return (
    <div>
      {/* Button to toggle chat visibility/minimization */}
      {(!isVisible || isMinimized) && (
        <button className={styles.chatbot_toggler} onClick={toggleVisibility}>
          <FontAwesomeIcon icon={faComment} />
          <span> Chat</span>
        </button>
      )}
      {/* Chatbot UI when visible and not minimized */}
      {isVisible && !isMinimized && (
        <div className={styles.chatbot}>
          <header>
            <h2>Chatbot</h2>
            <div className={styles.top_buttons}>
              <button className={styles.minimize_btn} onClick={minimizeChatbot}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button className={styles.close_btn} onClick={closeChatbot}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </header>
          {/* Main chat area where messages are displayed */}
          <div className={styles.chatbox}>
            {messages.map((msg, index) =>
              msg.initial ? (
                <div key={index} className={styles.chatbotMessage}>
                  <img
                    src={logo}
                    alt="Chatbot Logo"
                    className={styles.chatbot_logo}
                  />
                  {msg.text.map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                </div>
              ) : (
                <div
                  key={index}
                  className={
                    msg.isUser ? styles.userMessage : styles.chatbotMessage
                  }
                >
                  {!msg.isUser && (
                    <img
                      src={logo}
                      alt="Chatbot Logo"
                      className={styles.chatbot_logo}
                    />
                  )}
                  <p>{msg.text}</p>
                </div>
              )
            )}
            {/* Scroll anchor for automatic scrolling to the latest message */}
            <div ref={endOfMessagesRef} />
          </div>
          {/* Conditional rendering of the menu for user choices */}      
          {showMenu && (
            <div className={`${styles.menu} ${styles.menuSlideUp}`}>
              <ul className={styles.user_choices}>
                <li>
                  <button
                    onClick={() =>
                      handleUserChoice("I have a pet that needs a new home.")
                    }
                  >
                    I have a pet that needs a new home.
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleUserChoice("I want to adopt a pet.")}
                  >
                    I want to adopt a pet.
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleUserChoice("I want to contact website owner.")
                    }
                  >
                    I want to contact website owner.
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleUserChoice("I am a shelter or rescue employee.")
                    }
                  >
                    I am a shelter or rescue employee.
                  </button>
                </li>
              </ul>
            </div>
          )}
          {/* Button to return to the main menu, displayed based on state */}
          {showBackToMenuButton && (
            <button className={styles.backToMenuButton} onClick={showMainMenu}>
              Back to Main Menu
            </button>
          )}
        </div>
      )}
    </div>
  );
}
// Exporting the ChatbotComponent for use in other parts of the application
export default ChatbotComponent;


      // Function to show the greeting messages div with transition effect
      function showGreeting() {
        const greeting = document.querySelector(".greeting");
        greeting.style.opacity = "1";
      }

      // Function to show the menu with transition effect
      function showMenu() {
        const menu = document.querySelector(".menu");
        menu.classList.remove("hide-menu");
        menu.classList.add("show-menu"); // Add the class to trigger slide-up animation

        
      }

      // Function to hide the outgoing element
      function hideMenu() {
        const outgoing = document.querySelector(".menu");
        // Add a CSS class to trigger the animation
        outgoing.classList.remove("show-menu"); // Remove the class to trigger slide-up animation
        outgoing.classList.add("hide-menu"); // Add the class to trigger slide-down animation.

      }
      
      // Function to add paragraph to the chatbox with appropriate response based on user choice
      function addParagraph(text, isResponse) {
        
        const paragraph = document.createElement("p");
        paragraph.textContent = text;

        // Apply CSS styles based on whether it's a response or user choice
        if (isResponse) {
          paragraph.classList.add("response_paragraph");

        } else {
          paragraph.classList.add("user_choice_paragraph");
         
        }
        const chatbox = document.querySelector(".chatbox");
        chatbox.appendChild(paragraph);

        paragraph.classList.add("appear");
      }
      
// Function to scroll to the bottom of the chatbox smoothly
function scrollToBottom(element) {
  const targetScroll = element.scrollHeight - element.clientHeight;
  const initialScroll = element.scrollTop;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const scrollProgress = Math.min(timeElapsed / 400, 1); // Adjust duration here (400ms in this example)
    const scrollPosition = initialScroll + (targetScroll - initialScroll) * scrollProgress;
    element.scrollTop = scrollPosition;
    
    if (timeElapsed < 400) { // Adjust duration here (400ms in this example)
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}
    // Function to add a button to go back to the main menu
function addMainMenuButton() 
{
  const backButton = document.createElement("button");
  backButton.textContent = "Back to Main Menu";
  backButton.classList.add("back-to-menu-btn");
  
  // Add event listener to the back button
  backButton.addEventListener("click", function() {
    
    // Show the outgoing element again
    showMenu();
    // Remove the back button from the chatbox
    this.remove();
  });
  

  // Create a paragraph element for the message
  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = "If you need more assistance, please click the button below to go back to the main menu.";
  messageParagraph.classList.add("response_paragraph"); //Add the response_paragraph class
  messageParagraph.style.opacity ='1';
  
  const chatbox = document.querySelector(".chatbox");
  // Append the message paragraph before the back button
  chatbox.appendChild(messageParagraph);
  // Append the back button after the message paragraph
  chatbox.appendChild(backButton);  
  // Automatically scroll to the bottom of the chatbox
  scrollToBottom(chatbox);
}

  const chatbotToggler = document.querySelector('.chatbot-toggler');
  const chatbot = document.querySelector('.chatbot');
  const closeBtn = document.querySelector('.close-btn');
  const minimizeBtn = document.querySelector('.minimize-btn')

  minimizeBtn.addEventListener('click', function()
  {
    chatbot.style.opacity = '0';
    chatbot.style.pointerEvents = 'none';
    chatbotToggler.style.display ='block';
  });

  closeBtn.addEventListener('click', function()
      {
        resetChatbox();
      });

  chatbotToggler.addEventListener('click', function() {

      chatbot.style.opacity = '1'; // Show chatbot if hidden
      chatbot.style.pointerEvents = 'auto'; // Make chatbot clickable
      chatbotToggler.style.display = 'none'; // Hide chatbot-toggler
      showGreeting(); //Show the greeting message
      showMenu(); //Show user_choices
    });
  
  // Select all buttons
  const buttons = document.querySelectorAll(".user_choices button");

      // Add click event listeners to each button
      buttons.forEach(button => {
      button.addEventListener("click", function() {
      hideMenu(); // Call hideOutgoing function to hide the outgoing element
      const buttonText = this.textContent; // Get the text content of the clicked button
      
      addParagraph(buttonText, false); // Call addParagraph function with the button text
  
      // Check which button was clicked and add appropriate response
    if (this.id === "adoptPetBtn") {
      // Add response for adopting a pet
      addParagraph("We're so glad you chose us to help you find your new family member." + 
      "Please first sign up for an account or login to start the adoption process.", true);
    } else if (this.id === "petNeedsHomeBtn") {
      // Add response for a pet needing a new home
      addParagraph("We're here to help! Please provide us with more details about the pet in need so we can assist you better.", true);
    } else if (this.id === "contactOwnerBtn") {
      // Add response for contacting the website owner
      addParagraph("Feel free to contact us using the provided contact information on our website. We're happy to assist you!", true);
    } else if (this.id === "shelterRescueBtn") {
      // Add response for shelter or rescue employees
      addParagraph("Thank you for the important work you do! Please let us know how we can support your efforts.", true);
    }
     // Add button to go back to the main menu
    addMainMenuButton();   
    });
      });
  

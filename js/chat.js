const chatbox = document.getElementById("chat-display");
const chatInput = document.getElementById("user-input");
const sendChatBtn = document.getElementById("send-button");

// Add a loading indicator to the chatbox
const addLoadingIndicator = () => {
  const loadingDiv = document.createElement('div');
  loadingDiv.classList.add('chat', 'incoming', 'loading');

  const loadingIcon = document.createElement('span');
  loadingIcon.classList.add('icon', 'size-7', 'self-start', 'border-2', 'border-solid', 'border-border', 'leading-8');

  const loadingMessage = document.createElement('div');
  loadingMessage.classList.add('h-fit', 'text-text', 'max-w-[90%]', 'text-base', 'w-fit', 'whitespace-pre-wrap', 'break-wordst');
  loadingMessage.textContent = "thinking...";

  loadingDiv.appendChild(loadingIcon);
  loadingDiv.appendChild(loadingMessage);

  chatbox.appendChild(loadingDiv);

  chatbox.scrollTo({
    top: chatbox.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
};

const removeLoadingIndicator = () => {
  const loadingElement = document.querySelector('.chat.incoming.loading');

  if (loadingElement) {
    loadingElement.remove();
  }
};




//! API CALL
const apiUrl = "https://donexe-alfa-api.vercel.app/chatbot";

const sendChatbotRequest = (message) => {
  // Send a request to the chatbot API
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((response) => {
      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.response)
    .catch((error) => {
      // Handle errors and provide a fallback message
      console.error("Error:", error);
      return "Sorry, I couldn't process your message. Please try again later.";
    });
};

//! Chat Initialization
document.addEventListener("DOMContentLoaded", function () {

  const createChatLi = (message, type) => {
    // Create a chat message element
    const chatLi = document.createElement("div");
    chatLi.classList.add("chat", type);

    // Determine the content based on message type (incoming or outgoing)
    const chatContent =
      type === "outgoing"
        ? `<div class="whitespace-pre-wrap h-fit break-words max-w-[80%] text-base border-[1px] border-solid border-border px-[16px] py-[12px] text-text">${message}</div><span class="icon icon icon size-7 self-start bg-gr leading-8 rounded-main bg-cover"></span>`
        : `<span class="icon size-7 self-start border-2 border-solid border-border leading-8"></span><div class="h-fit text-text max-w-[90%] text-base w-fit whitespace-pre-wrap break-wordst">${message}</div>`;

    chatLi.innerHTML = chatContent;
    return chatLi;
  };

  const addMessageToChatbox = (message, type) => {
    // Add a message to the chatbox and scroll to the bottom
    const chatLi = createChatLi(message, type);
    chatbox.appendChild(chatLi);
    chatbox.scrollTo({
      top: chatbox.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleUserMessage = () => {
    setTimeout(() => {
      addLoadingIndicator()
    }, 500);
    // Handle user's message input
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";

    // Add the user's outgoing message to the chatbox
    addMessageToChatbox(userMessage, "outgoing");

    // Send the user's message to the chatbot and handle the response
    sendChatbotRequest(userMessage)
      .then((data) => {
        removeLoadingIndicator()
        handleIncomingMessage(data)
      })
      .catch(handleIncomingMessage);
  };

  const handleIncomingMessage = (message) => {
    // Handle incoming messages from the chatbot
    const chatLi = createChatLi(message, "incoming");
    chatbox.appendChild(chatLi);
    chatbox.scrollTo({
      top: chatbox.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleEnterKeyPress = (e) => {
    // Handle Enter key press to send a message
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      chatInput.style.height = "55px";
      e.preventDefault();
      handleUserMessage();
    }
  };

  const handleSendButtonClick = () => {
    // Handle send button click to send a message
    chatInput.style.height = "55px";
    handleUserMessage();
  };

  // Event listeners for user input and send button click
  chatInput.addEventListener("keydown", handleEnterKeyPress);
  sendChatBtn.addEventListener("click", handleSendButtonClick);
});

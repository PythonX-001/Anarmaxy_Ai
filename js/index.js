//! test
let convLab = document.querySelector("aside .chat-history .convs-conv .conv-label");
let convDate = document.querySelector("aside .chat-history .convs-conv .conv-date");
let convLabHeader = document.querySelector(
  "main header .table .convs-conv .conv-label",
);
let convDateHeader = document.querySelector(
  "main header .table .convs-conv .conv-date",
);

convLabHeader.innerHTML = convLab.innerHTML;

//! Auto-Resizing Textarea
const textarea = document.getElementById("user-input");
const initialInputHeight = textarea.scrollHeight;

textarea.addEventListener("input", () => {
  textarea.style.maxHeight = "200px";
  // Adjust the height of the input field dynamically based on its content
  textarea.style.height = `${initialInputHeight}px`;
  textarea.style.height = `${textarea.scrollHeight + 1}px`;
});
//!API CALL

const sendMessageToChatbot = (message) => {
  fetch('https://donexe-alfa-api.vercel.app/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Display the bot's response in the chat
    const botMessage = data.response;
    handleIncomingMessage(botMessage);
  })
  .catch(error => {
    console.error('Error:', error);
    handleIncomingMessage("Sorry, I couldn't process your message. Please try again later.");
  });
};

//! Chat
document.addEventListener("DOMContentLoaded", function () {
  //!API CALL

const sendMessageToChatbot = (message) => {
  fetch('https://donexe-alfa-api.vercel.app/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Display the bot's response in the chat
    const botMessage = data.response;
    handleIncomingMessage(botMessage);
  })
  .catch(error => {
    console.error('Error:', error);
    handleIncomingMessage("Sorry, I couldn't process your message. Please try again later.");
  });
};
  const chatbox = document.getElementById("chat-display");
  const chatInput = document.getElementById("user-input");
  const sendChatBtn = document.getElementById("send-button");

  const createChatLi = (message, type) => {
    const chatLi = document.createElement("div");
    chatLi.classList.add("chat", type);

    let chatContent =
      type === "outgoing"
        ? `<div class="whitespace-pre-wrap h-fit break-words max-w-[80%] text-base border-[1px] border-solid border-border px-[16px] py-[12px] text-text">${message}</div><span class="icon icon icon size-7 self-start bg-gr leading-8 rounded-main bg-cover"></span>`
        : `<span class="icon size-7 self-start border-2 border-solid border-border leading-8"></span><div class="h-fit text-text max-w-full text-base w-fit whitespace-pre-wrap break-wordst">${message}</div>`;

    chatLi.innerHTML = chatContent;
    return chatLi;
  };

  const addMessageToChatbox = (message, type) => {
    const chatLi = createChatLi(message, type);
    chatbox.appendChild(chatLi);
    chatbox.scrollTo({
      top: chatbox.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleUserMessage = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";

    addMessageToChatbox(userMessage, "outgoing");

    // Call the function to send the message to the chatbot
    sendMessageToChatbot(userMessage);
  };


const handleIncomingMessage = (message) => {
  const chatLi = createChatLi(message, "incoming");
  chatbox.appendChild(chatLi);
  chatbox.scrollTo({
    top: chatbox.scrollHeight,
    left: 0,
    behavior: "smooth",
  });

  // Add the 'incoming' class to the new message element
  chatLi.classList.add("incoming");

  // Remove the 'incoming' class after the animation has completed
  chatLi.addEventListener("animationend", () => {
    chatLi.classList.remove("incoming");
  });
};

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      chatInput.style.height = "55px";
      e.preventDefault();
      handleUserMessage();
    }
  };

  const handleSendButtonClick = () => {
    chatInput.style.height = "55px";
    handleUserMessage();
  };

  chatInput.addEventListener("keydown", handleEnterKeyPress);
  sendChatBtn.addEventListener("click", handleSendButtonClick);
});


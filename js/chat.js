const chatbox = document.getElementById("chat-display");
const chatInput = document.getElementById("user-input");
const sendChatBtn = document.getElementById("send-button");

// Chatbox utility functions
const addLoadingIndicator = () => {
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("chat", "incoming", "loading");

  const loadingIcon = document.createElement("span");
  loadingIcon.classList.add(
    "icon",
    "size-7",
    "self-start",
    "border-2",
    "border-solid",
    "border-border",
    "leading-8",
  );

  const loadingMessage = document.createElement("div");
  loadingMessage.classList.add(
    "h-fit",
    "text-text",
    "max-w-[90%]",
    "text-base",
    "w-fit",
    "whitespace-pre-wrap",
    "break-wordst",
  );
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
  const loadingElement = document.querySelector(".chat.incoming.loading");

  if (loadingElement) {
    loadingElement.remove();
  }
};

// API Call
const apiUrl = "https://donexe-alfa-api.vercel.app/chatbot";

const sendChatbotRequest = (message) => {
  addLoadingIndicator();

  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.response;
    })
    .catch((error) => {
      console.error("Error:", error);
      return {
        type: "error",
        content:
          "Oops! Something went wrong. Please try again later or provide more details. For assistance, contact support. Apologies for the inconvenience.",
      };
    })
    .finally(() => {
      removeLoadingIndicator();
    });
};

// Chat Initialization
document.addEventListener("DOMContentLoaded", function () {
  const createChatLi = (message, type) => {
    const chatLi = document.createElement("div");
    chatLi.classList.add("chat", type);

    const chatContent =
      type === "outgoing"
        ? `<div class="whitespace-pre-wrap h-fit break-words max-w-[80%] text-base border-[1px] border-solid border-border px-[16px] py-[12px] text-text"></div><span class="icon icon icon size-7 self-start bg-gr leading-8 rounded-main bg-cover"></span>`
        : type === "incoming"
          ? `<span class="icon size-7 self-start border-2 border-solid border-border leading-8"></span><div class="h-fit text-text max-w-[90%] text-base w-fit whitespace-pre-wrap break-words"></div>`
          : type === "error"
            ? `<span class="icon size-7 self-start border-2 border-solid border-border leading-8"></span><div class="h-fit max-w-[70%] border-[1px] border-rose-900 bg-rose-950/50 px-[16px] py-[12px] text-text text-xs"></div>`
            : "";

    chatLi.innerHTML = chatContent;
    chatLi.querySelector(".h-fit").innerText = message;

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
    const userMessage = `${chatInput.value.trim()}`;
    if (!userMessage) return;
    chatInput.value = "";

    addMessageToChatbox(userMessage, "outgoing");

    sendChatbotRequest(userMessage)
      .then((data) => {
        if (data.type === "error") {
          handleErrorMessage(data.content);
        } else {
          handleIncomingMessage(data);
        }
      })
      .catch((data) => {
        handleErrorMessage(data.content);
      });
  };

  const handleIncomingMessage = (message) => {
    const chatLi = createChatLi(message, "incoming");
    chatbox.appendChild(chatLi);
    chatbox.scrollTo({
      top: chatbox.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleErrorMessage = (message) => {
    const chatLi = createChatLi(message, "error");
    chatbox.appendChild(chatLi);
    chatbox.scrollTo({
      top: chatbox.scrollHeight,
      left: 0,
      behavior: "smooth",
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

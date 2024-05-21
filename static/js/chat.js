
document.addEventListener("DOMContentLoaded", () => {
  const chatbox = document.querySelector("#chat-display");
  const defaultScreen = document.getElementById("default-screen");
  const chatInput = document.querySelector("#user-input");
  const sendChatBtn = document.querySelector("#send-button");
  const apiUrl = "/chat";
  

  const addLoadingIndicator = () => {
    const loadingDiv = createChatElement("div", [
      "chat",
      "incoming",
      "loading",
    ]);
    const loadingIcon = createChatElement("span", [
      "icon",
      "size-7",
      "self-start",
      "border-2",
      "border-solid",
      "border-border",
      "leading-8",
    ]);
    const responseContainer = createChatElement("div", [
      "h-fit",
      "w-fit",
      "max-w-[90%]",
      "whitespace-pre-wrap",
      "break-words",
      "text-base",
      "text-text",
      "chatLoader",
    ]);
    // responseContainer.textContent = "thinking...";
    const loadingMessage = createChatElement("div", [
      "flex",
      "items-center",
      "gap-4",
    ]);
    loadingMessage.appendChild(loadingIcon);
    loadingMessage.appendChild(responseContainer);
    loadingDiv.appendChild(loadingMessage);
    chatbox.appendChild(loadingDiv);
    scrollToBottom();
  }

  const removeLoadingIndicator = () => {
    const loadingElement = document.querySelector(".chat.incoming.loading");
    if (loadingElement) {
      loadingElement.remove();
    }
  };

  const scrollToBottom = () => {
    chatbox.scrollTo({
      top: chatbox.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const sendChatbotRequest = async (message, chatHistoryId) => {
    addLoadingIndicator();
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_input=${encodeURIComponent(message)}&chat_history_id=${encodeURIComponent(chatHistoryId)}`,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return { user: message, response: data.bot_response };
    } catch (error) {
      console.error("Error:", error);
      return {
        type: "error",
        content:
          "Oops! Something went wrong. Please try again later or provide more details. For assistance, contact support. Apologies for the inconvenience.",
      };
    } finally {
      removeLoadingIndicator();
    }
  };

  const createChatElement = (tag, classes) => {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    return element;
  };

  const addMessageToChatbox = (message, type) => {
    const chatLi = createChatLi(message, type);
    chatbox.appendChild(chatLi);
    scrollToBottom();
  };

  const createChatLi = (message, type) => {
    const chatLi = createChatElement("div", ["chat", type, "group"]);

    const chatContent =
      type === "outgoing"
        ? `<div class="whitespace-pre-wrap h-fit break-words max-w-[80%] text-base border-[1px] border-solid border-border px-[16px] py-[12px] text-text"></div><span class="icon icon icon size-7 self-start bg-gr leading-8 rounded-main bg-cover"></span>`
        : type === "incoming"
          ? `<div class="flex items-start gap-4"><span class="icon size-7 self-start border-2 border-solid border-border leading-8"></span><div id="response" class="h-fit w-fit max-w-[90%] whitespace-pre-wrap break-words text-base text-text"></div></div><div class="action mt-1 flex justify-start gap-3 empty:hidden ml-[2.8rem]"><div class="group-hover:visible invisible -ml-1 mt-0 flex justify-center self-end text-gray-400 lg:justify-start lg:self-center"><button id="copyButton" class="cursor-pointer text-background-700 transition-all hover:text-background-500" data-state=""><i class="clipboard-icon fa-regular fa-clipboard"></i><span class="sr-only">copy button</span></button></div></div>`
          : type === "error"
            ? `<span class="icon size-7 self-start border-2 border-solid border-border leading-8"></span><div class="h-fit max-w-[70%] border-[1px] border-rose-900 bg-rose-950/50 px-[16px] py-[12px] text-text text-xs"></div>`
            : "";

    chatLi.innerHTML = chatContent;
    chatLi.querySelector(".h-fit").innerText = message;
    return chatLi;
  };

  const handleUserMessage = () => {
    const userMessage = chatInput.value.trim();
  
    if (userMessage.length === 0) return;
  
    chatInput.value = "";
    defaultScreen.remove();
  
    addMessageToChatbox(userMessage, "outgoing");
  
    // Get the chat_history_id from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const chatHistoryId = urlParams.get('id');
  
    // Send the chat_history_id along with the user message
    sendChatbotRequest(userMessage, chatHistoryId)
      .then((data) => {
        if (data.type === "error") {
          handleErrorMessage(data.content);
        } else {
          handleIncomingMessage(data.response);
        }
      })
      .catch((data) => {
        handleErrorMessage(data.content);
      });
  };

  const handleIncomingMessage = (message) => {
    const chatLi = createChatLi(message, "incoming");
    chatbox.appendChild(chatLi);
    scrollToBottom();
  };

  const handleErrorMessage = (message) => {
    const chatLi = createChatLi(message, "error");
    chatbox.appendChild(chatLi);
    scrollToBottom();
  };

  //! send message acction
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

  //! response action
  //? copy button
  chatbox.addEventListener("click", (event) => {
    const copyButton = event.target.closest("#copyButton");

    if (copyButton) {
      const responseContainer = copyButton.closest(".chat");
      const responseTextElement = responseContainer.querySelector("#response");
      const responseText = responseTextElement.textContent;
      const checkIcon = '<i class="success-icon fa-solid fa-check"></i>';
      const clipboardIcon =
        '<i class="clipboard-icon fa-regular fa-clipboard"></i>';

      const setCopyButtonIcon = (icon) => {
        copyButton.innerHTML = icon;
      };

      navigator.clipboard
        .writeText(responseText)
        .then(() => {
          setCopyButtonIcon(checkIcon);
          setTimeout(() => setCopyButtonIcon(clipboardIcon), 2000);
        })
        .catch((err) => {
          console.error("Error copying text:", err);
        });
    }
  });

  //! scroll to Bottom
  chatbox.scrollTo({
    top: chatbox.scrollHeight,
    left: 0,
    behavior: "auto",
  });
const createNewChatButton = document.querySelector("#n-conv");
  createNewChatButton.addEventListener("click", () => {
    // Send a request to the Flask backend to create a new chat history
    fetch("/create_chat", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        const chatHistoryId = data.chat_history_id;
        // Redirect to the new chat history
        window.location.href = `/chat?id=${chatHistoryId}`;
      })
      .catch((error) => {
        console.error("Error creating new chat:", error);
      });
  });

  // Function to update the sidebar with chat history names
  const updateSidebar = () => {
    fetch("/chat_history_names")
      .then((response) => response.json())
      .then((chatHistoryNames) => {
        const chatHistoryList = document.querySelector("#chat-history-list");
        //chatHistoryList.innerHTML = ""; // Clear the current list
  
        // Add each chat history name to the sidebar
        chatHistoryNames.forEach((chatHistoryName) => {
          // Create a new list item with the chat history name
          const listItem = document.createElement("li");
          listItem.className = "convs-conv active group";
          listItem.innerHTML = `
            <div class="conv-label">
              ${chatHistoryName}
              <a href="id?=${chatHistoryName}">
              <div class="text-shadow group-hover:w-20 group-hover:from-primary-default"></div>
              </a>
            </div>
            
          `;
  
          // Add click event listener to the list item
         listItem.addEventListener("click", () => {
           //  Redirect to the chat history when clicked
            window.location.href = `/chat?id=${chatHistoryName}`;
          });
  
          chatHistoryList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error fetching chat history names:", error);
      });
  };
  
  // Call the updateSidebar function initially and whenever a new chat history is created
  updateSidebar();
  createNewChatButton.addEventListener("click", updateSidebar);

});

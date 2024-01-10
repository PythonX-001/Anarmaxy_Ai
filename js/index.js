//* Nav
const aside = document.querySelector(".primary-aside");
const asideToggle = document.querySelector(".mobile-aside-toggle");

asideToggle.addEventListener("click", () => {
  const isVisible = aside.getAttribute("data-visible") === "true";
  aside.setAttribute("data-visible", !isVisible);
  asideToggle.setAttribute("aria-expanded", !isVisible);
});

//* Chat
document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input .send-btn");

  // Function to create chat messages
  const createChatLi = (message, className) => {
    const chatLi = document.createElement("div");
    chatLi.classList.add("chat", className);
    let chatContent =
      className === "outgoing"
        ? `<p>${message}</p><box-icon name="bo" color="#ffff"></box-icon>`
        : `<box-icon name="bo" color="#ffff"></box-icon><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
  };

  // Function to handle user input and display messages
  const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Clear input
    chatInput.value = "";

    // Append outgoing message to chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo({
      top: chatbox.scrollHeight,
      left: 0,
      behavior: "smooth",
    });

    // Simulate "Thinking..." delay
    setTimeout(() => {
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo({
        top: chatbox.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }, 600);
  };

  // Handle Enter key press to send message
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  });

  // Handle click on Send button
  sendChatBtn.addEventListener("click", handleChat);
});

//* test
let convLab = document.querySelector("aside .table .convs-conv .conv-label");
let convDate = document.querySelector("aside .table .convs-conv .conv-date");
let convLabHeader = document.querySelector(
  "main header .table .convs-conv .conv-label"
);
let convDateHeader = document.querySelector(
  "main header .table .convs-conv .conv-date"
);

convLabHeader.innerHTML = convLab.innerHTML;
convDateHeader.innerHTML = convDate.innerHTML;

//* Auto-Resizing Textarea
// const textarea = document.querySelector(".chat-input textarea");

// textarea.addEventListener("input", function () {
//   this.style.height = "auto";
//   this.style.height = this.scrollHeight + "px";
// });

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
  const messageInput = document.getElementById("message-input");
  const sendButton = document.querySelector(".send-btn");

  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      appendOutgoingMessage(messageText);
      messageInput.value = ""; // Clear the input field
    }
  }

  function appendOutgoingMessage(text) {
    const chatBox = document.getElementById("chat-box");
    const outgoingMessage = document.createElement("li");
    outgoingMessage.classList.add("chat", "outgoing");
    outgoingMessage.innerHTML = `
          <p>${text}</p>
          <box-icon name="bo" color="#ffff"></box-icon>
      `;
    chatBox.appendChild(outgoingMessage);
  }

  sendButton.addEventListener("click", sendMessage);

  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents the newline in the textarea
      sendMessage();
    }
  });
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

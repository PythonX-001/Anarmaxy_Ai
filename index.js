//* Nav
const aside = document.querySelector(".primary-aside");
const asideToggle = document.querySelector(".mobile-aside-toggle");

asideToggle.addEventListener("click", () => {
  const isVisible = aside.getAttribute("data-visible") === "true";
  aside.setAttribute("data-visible", !isVisible);
  asideToggle.setAttribute("aria-expanded", !isVisible);
});
//* Chat
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const chatBox = document.getElementById("chat-box");
  const message = messageInput.value.trim();

  if (message !== "") {
    displayMessage(message);
    // Add logic to send the message to the server or perform other actions
  }

  messageInput.value = "";
}

function displayMessage(message) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("p");
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    // If the Enter key is pressed, send the message
    sendMessage();
    event.preventDefault(); // Prevent a newline from being inserted into the input
  }
}

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

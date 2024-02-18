//! Auto-Resizing Textarea
const textarea = document.getElementById("user-input");
const initialInputHeight = textarea.scrollHeight;

textarea.addEventListener("input", () => {
  textarea.style.maxHeight = "200px";
  // Adjust the height of the input field dynamically based on its content
  textarea.style.height = `${initialInputHeight}px`;
  textarea.style.height = `${textarea.scrollHeight + 1}px`;
});

//! scroll to bottom when open
const chatbox = document.querySelector("#chat-display")

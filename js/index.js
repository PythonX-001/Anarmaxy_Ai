//! Auto-Resizing Textarea
const textarea = document.getElementById("user-input");
const initialInputHeight = textarea.scrollHeight;

textarea.addEventListener("input", () => {
  textarea.style.maxHeight = "200px";
  // Adjust the height of the input field dynamically based on its content
  textarea.style.height = `${initialInputHeight}px`;
  textarea.style.height = `${textarea.scrollHeight + 1}px`;
});
//! test
let convLab = document.querySelector(
  "aside .chat-history .convs-conv .conv-label",
);
let convDate = document.querySelector(
  "aside .chat-history .convs-conv .conv-date",
);
let convLabHeader = document.querySelector(
  "main header .table .convs-conv .conv-label",
);
let convDateHeader = document.querySelector(
  "main header .table .convs-conv .conv-date",
);

convLabHeader.innerHTML = convLab.innerHTML;
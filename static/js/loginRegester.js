//! Login
const allPassInput = document.querySelector(".wrapper .input-box #password");
const passInput = document.querySelector(
  ".register .wrapper .input-box #password",
);
const emailInput = document.querySelector(".register .wrapper .input-box #email");
const toggleVisibilityBtn = document.getElementById("toggle-visibility");
const passErrorEl = document.getElementById("passError");
const form = document.querySelector("form");
const emailErrorEl = document.getElementById("emailError");

function toggleVisibility() {
  allPassInput.type = allPassInput.type === "password" ? "text" : "password";
  toggleVisibilityBtn.classList.toggle("fa-eye-slash");
  toggleVisibilityBtn.classList.toggle("fa-eye");
}
//
//! register
//? Function
const handlePasswordChange = () => {
  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if(passInput.value.length === 0) {
    passErrorEl.textContent = "";
  } else if(passwordPattern.test(passInput.value)) {
    passErrorEl.textContent = "";
  } else {
    passErrorEl.textContent = "Password must be 6-16 characters, include a digit(1,2,3...) and a special character(#,$,&,*...)."; 
  }
}

const handleEmailChange = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  ;
  if (emailInput.value.length === 0) {
    emailErrorEl.textContent = "";
  } else {
    emailErrorEl.textContent = emailPattern.test(emailInput.value)
      ? ""
      : "Enter a valid email address."
    emailInput.classList.add('inputAnimation');
  }
}
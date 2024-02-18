const MEME_API_BASE = "https://meme-api.com/gimme";
const memeBox = document.getElementById("memeBox");
const memeIMG = document.getElementById("memeImage");
const memeTitle = document.getElementById("memeTitle");
const memeLink = document.getElementById("memeLink");

// Loading indicator functions
const createChatElement = (tag, classes) => {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  return element;
};

const addLoadingIndicator = () => {
  const loadingDiv = createChatElement("div", ["memeLoader"]);
  memeBox.appendChild(loadingDiv);
};

const removeLoadingIndicator = () => {
  const loadingElement = document.querySelector(".memeLoader");
  if (loadingElement) {
    loadingElement.remove();
  }
};

// Meme API functions
const updateDetails = (url, title, image) => {
  memeIMG.src = image;
  memeIMG.alt = title;
  memeTitle.innerHTML = title;
  memeLink.href = url;
  memeBox.classList.remove("h-52", "w-80");
  memeBox.classList.add("h-fit", "w-fit");
  removeLoadingIndicator();
};

const fetchMeme = (subreddit = "") => {
  addLoadingIndicator();
  memeBox.classList.add("h-52", "w-80");

  if (subreddit) {
    subreddit = `/${subreddit}`;
  }

  const apiUrl = `${MEME_API_BASE}${subreddit}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch meme. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      updateDetails(data.postLink, data.title, data.url);
    })
    .catch((error) => {
      console.error("Error fetching meme:", error);
    });
};

document.addEventListener("DOMContentLoaded", function () {
  var chatDisplay = document.getElementById("chat-display");
  var defaultScreen = document.getElementById("default-screen");

  // Check if there are direct children other than default-screen
  var otherChildren = Array.from(chatDisplay.children).filter(function (child) {
    return child !== defaultScreen;
  });

  if (otherChildren.length === 0) {
    fetchMeme();
  } else {
    defaultScreen.remove();
  }
});
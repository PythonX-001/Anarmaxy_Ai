//! loading
const createChatElement = (tag, classes) => {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  return element;
};

const addLoadingIndicator = () => {
  const loadingDiv = createChatElement("div", ["memeLoader"]);
  document.getElementById("memeBox").appendChild(loadingDiv);
};

const removeLoadingIndicator = () => {
  const loadingElement = document.querySelector(".memeLoader");
  if (loadingElement) {
    loadingElement.remove();
  }
};
//! meme api
const MEME_API_BASE = "https://meme-api.com/gimme";
const memeBox = document.getElementById("memeBox");
const memeIMG = document.getElementById("memeImage");
const memeTitle = document.getElementById("memeTitle");
const memeLink = document.getElementById("memeLink");

const updateDetails = (url, title, image) => {
  memeIMG.src = image;
  memeIMG.alt = title;
  memeTitle.innerHTML = title;
  memeLink.href = url;
  memeBox.classList.remove('h-52', 'w-80')
  memeBox.classList.add('h-fit', 'w-fit')
  removeLoadingIndicator();
};

const fetchMeme = (subreddit = "") => {
  addLoadingIndicator();
  memeBox.classList.add('h-52', 'w-80')
  if (subreddit.length !== 0) {
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

// Example usage
fetchMeme('meme');
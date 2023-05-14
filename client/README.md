## Explanation and Documentation of the Code

The code is a JavaScript program that creates a simple chatbot interface, where users can enter text prompts and the bot responds with pre-programmed responses.

### Importing Assets

The code starts by importing two images: `bot.svg` and `user.svg`, which are stored in a local `./assets/` directory. These images will be used as profile pictures for the bot and the user in the chat interface.

```javascript
import bot from "./assets/bot.svg";
import user from "./assets/user.svg";
```

### Variable Declarations

The code then declares two variables using `const` and one variable using `let`. `form` and `chatContainer` are assigned to the `form` element and the `chat_container` element respectively using the `querySelector()` method. `loadInterval` is initially left undefined and will be assigned later.

```javascript
const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;
```

### Functions

#### `loader()`

The `loader()` function takes an element as an argument and sets its text content to an empty string. It then sets a `loadInterval` variable using `setInterval()`. The function adds a period to the element's text content every 300 milliseconds. If the element's text content is equal to `"...."`, the function resets the text content to an empty string.

```javascript
function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += ".";

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}
```

#### `typeText()`

The `typeText()` function takes an element and a string of text as arguments. It initializes a `index` variable to 0 and sets an `interval` variable using `setInterval()`. The function adds one character at a time from the string of text to the innerHTML of the element every 20 milliseconds, until the entire string has been added.

```javascript
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}
```

#### `generateUniqueId()`

The `generateUniqueId()` function does not take any arguments. It generates a unique ID using the current timestamp, a random number, and a hexadecimal string. The function returns the unique ID as a string. The purpose of this function is to generate a unique ID for each message div of the bot. This is necessary for the typing text effect to work on that specific reply, without affecting other elements.

```javascript
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}
```

## Chat Application JavaScript Code Explanation

This JavaScript code provides functionality for a simple chat application. Here's an explanation of the different functions and events used in this code.

### `chatStripe(isAi, value, uniqueId)`

This function takes three parameters: `isAi` (a boolean value to indicate whether the message is from the bot or user), `value` (the actual message to be displayed), and `uniqueId` (a unique identifier for the message). It returns an HTML string with appropriate classes and attributes to display the chat message.

### `handleSubmit(e)`

This function is an event handler function that is called when the user submits the chat message form. It prevents the default form submission behavior, gets the value of the input field using `FormData`, and displays the message in the chat container using `chatStripe`. It also generates a unique ID for the bot's message, displays the bot's chat stripe in the chat container, and sends a request to a server to get the bot's response. It also clears the input field and focuses the chat container to the bottom.

### `form.addEventListener("submit", handleSubmit)`

This adds an event listener to the form element that listens for a `submit` event and calls the `handleSubmit` function.

### `form.addEventListener("keyup", (e) => {...})`

This adds an event listener to the form element that listens for a `keyup` event and calls an anonymous function. This anonymous function checks if the `keyCode` is `13` (which corresponds to the "Enter" key) and calls the `handleSubmit` function if it is.

Here's the code snippet:

```javascript
function chatStripe(isAi, value, uniqueId) {
  return `
    <div class="wrapper ${isAi && "ai"}">
      <div class="chat">
        <div class="profile">
          <img 
            src=${isAi ? bot : user} 
            alt="${isAi ? "bot" : "user"}" 
          />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
  `;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  // to clear the textarea input
  form.reset();

  // bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  // to focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div
  const messageDiv = document.getElementById(uniqueId);

  // messageDiv.innerHTML = "..."
  loader(messageDiv);

  const response = await fetch("http://localhost:5000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = " ";

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
```

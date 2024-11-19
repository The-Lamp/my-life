// Get DOM elements
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

// Send message to ChatBot API
function sendMessage() {
  const userMessage = userInput.value;
  if (!userMessage) return;

  // Show user message in chatbox
  appendMessage("You: " + userMessage);

  // Clear input field
  userInput.value = "";

  // Call API
  fetch("https://api.chatbot.com/v2/stories", {
    method: "GET",
    headers: {
      "Authorization": "Bearer Yco9HQByK5TTKHDah_C1CNfvblWb4NW5",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Get response and show in chatbox
      appendMessage("Bot: " + JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error:", error);
      appendMessage("Bot: Error fetching response.");
    });
}

// Append messages to chatbox
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  chatbox.appendChild(messageElement);
          }

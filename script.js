<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gemini Chatbot</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #121212;
      color: #ffffff;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .chat-container {
      width: 400px;
      border: 1px solid #333;
      border-radius: 10px;
      padding: 20px;
      background-color: #1e1e1e;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .chat-header {
      text-align: center;
      font-size: 18px;
      margin-bottom: 10px;
    }

    .messages {
      height: 300px;
      overflow-y: auto;
      border: 1px solid #444;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 10px;
      background-color: #252525;
    }

    .message {
      margin: 5px 0;
    }

    .message.user {
      text-align: right;
      color: #4caf50;
    }

    .message.bot {
      text-align: left;
      color: #ff5722;
    }

    .input-container {
      display: flex;
      gap: 10px;
    }

    .input-container input {
      flex: 1;
      padding: 10px;
      border: 1px solid #555;
      border-radius: 5px;
      background-color: #1e1e1e;
      color: #ffffff;
    }

    .input-container button {
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #ffffff;
      cursor: pointer;
    }

    .input-container button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="chat-container">
    <div class="chat-header">Gemini AI Chatbot</div>
    <div class="messages" id="messages"></div>
    <div class="input-container">
      <input type="text" id="userInput" placeholder="Type your message...">
      <button onclick="sendMessage()">Send</button>
    </div>
  </div>

  <script>
    const apiKey = "AIzaSyAf1vwlk8S8DGpFc7sjRnJmVmELwgjmFNM"; // Replace with your API Key
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

    const messagesContainer = document.getElementById("messages");

    function addMessage(content, sender) {
      const messageElement = document.createElement("div");
      messageElement.className = `message ${sender}`;
      messageElement.textContent = content;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage() {
      const userInput = document.getElementById("userInput");
      const userMessage = userInput.value.trim();
      if (!userMessage) return;

      // Add user's message to the chat
      addMessage(userMessage, "user");

      // Clear input field
      userInput.value = "";

      try {
        // Prepare payload
        const payload = {
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        };

        // Make API request
        const response = await fetch(`${apiUrl}?key=${apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        // Process API response
        if (response.ok) {
          const data = await response.json();
          const botMessage =
            data.contents?.[0]?.parts?.[0]?.text ||
            "I'm sorry, I didn't understand that.";
          addMessage(botMessage, "bot");
        } else {
          addMessage("Error: Unable to connect to API.", "bot");
        }
      } catch (error) {
        addMessage("Error: " + error.message, "bot");
      }
    }
  </script>
</body>
</html>

const sendBtn = document.getElementById("sendBtn");
const prompt = document.getElementById("prompt");
const chatArea = document.getElementById("chatArea");
const newChatBtn = document.getElementById("newChatBtn");

const BACKEND_URL = "https://cockroach-ai-backend.onrender.com";

function welcomeMessage() {
  chatArea.innerHTML = `
  <div class="ai-message">
  👋 Welcome to Cockroach AI!<br><br>
  How can I help you today?
  </div>
  `;
}

newChatBtn.addEventListener("click", () => {
  welcomeMessage();
  prompt.value = "";
});

sendBtn.addEventListener("click", async () => {

  const text = prompt.value.trim();

  if (!text) {
    alert("Please enter a prompt.");
    return;
  }

  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.innerHTML = text;
  chatArea.appendChild(userMsg);

  const aiMsg = document.createElement("div");
  aiMsg.className = "ai-message";
  aiMsg.innerHTML = "🤖 Thinking...";
  chatArea.appendChild(aiMsg);

  chatArea.scrollTop = chatArea.scrollHeight;

  prompt.value = "";

  try {

    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    if (data.success) {
      aiMsg.innerHTML = "🤖 " + data.reply;
    } else {
      aiMsg.innerHTML = "❌ " + data.reply;
    }

  } catch (error) {

    aiMsg.innerHTML = "❌ Unable to connect to Cockroach AI.";

  }

  chatArea.scrollTop = chatArea.scrollHeight;

});

prompt.addEventListener("keydown", function (e) {

  if (e.key === "Enter" && !e.shiftKey) {

    e.preventDefault();

    sendBtn.click();

  }

});

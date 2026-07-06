const sendBtn = document.getElementById("sendBtn");
const prompt = document.getElementById("prompt");
const chatArea = document.getElementById("chatArea");
const newChatBtn = document.getElementById("newChatBtn");

// IMAGE ELEMENTS
const imageBtn = document.getElementById("imageBtn");
const imageSection = document.getElementById("imageSection");
const generateImageBtn = document.getElementById("generateImageBtn");
const imagePrompt = document.getElementById("imagePrompt");
const imageResult = document.getElementById("imageResult");

const BACKEND_URL = "https://cockroach-ai-backend.onrender.com";

/* ================= CHAT ================= */

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

/* SEND CHAT */

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
      body: JSON.stringify({ message: text })
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

/* ================= IMAGE MODE OPEN ================= */

imageBtn.addEventListener("click", () => {

  chatArea.style.display = "none";
  imageSection.style.display = "block";

});

/* ================= IMAGE GENERATION (DEMO NOW) ================= */

generateImageBtn.addEventListener("click", async () => {

  const promptText = imagePrompt.value.trim();

  if (!promptText) {
    alert("Please enter image prompt");
    return;
  }

  imageResult.innerHTML = `<div class="loading">⏳ Generating image...</div>`;

  /*
    NEXT STEP:
    Yahan hum Google Imagen API connect karenge
    Abhi demo output hai
  */

  setTimeout(() => {

    imageResult.innerHTML = `
      <div class="loading">🖼️ AI Image Generated (Demo)</div>
      <img src="https://via.placeholder.com/512x512.png?text=Cockroach+AI+Image" />
      <br>
      <a href="#" download>⬇️ Download</a>
    `;

  }, 2000);

});

/* ================= ENTER KEY ================= */

prompt.addEventListener("keydown", function (e) {

  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }

});

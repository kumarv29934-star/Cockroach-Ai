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
/* ================= REAL IMAGE GENERATION ================= */

generateImageBtn.addEventListener("click", async () => {

  const promptText = imagePrompt.value.trim();

  if (!promptText) {
    alert("Please enter image prompt");
    return;
  }

  imageResult.innerHTML = `
  <div class="loading">
  ⏳ Generating 2 AI Images...
  </div>
  `;

  try {

    const response = await fetch(`${BACKEND_URL}/generate-image`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        prompt: promptText
      })

    });

    const data = await response.json();

    if (!data.success) {

      imageResult.innerHTML = `
      <div class="loading">
      ❌ ${data.message}
      </div>
      `;

      return;

    }

    imageResult.innerHTML = "";

    data.images.forEach((img, index) => {

      imageResult.innerHTML += `

      <div style="margin-top:25px">

      <img
      src="${img}"
      style="
      width:100%;
      max-width:512px;
      border-radius:15px;
      border:2px solid #00ffd5;
      ">

      <br><br>

      <a
      href="${img}"
      download="Cockroach-AI-${index+1}.png"
      style="
      background:#00ffd5;
      color:black;
      padding:10px 20px;
      border-radius:10px;
      text-decoration:none;
      font-weight:bold;
      ">

      ⬇️ Download Image ${index+1}

      </a>

      </div>

      `;

    });

    let credit = document.getElementById("creditCount");

    credit.innerText = Number(credit.innerText) - 10;

  }

  catch(err){

    console.log(err);

    imageResult.innerHTML=`
    <div class="loading">
    ❌ Image Generation Failed
    </div>
    `;

 }

});

prompt.addEventListener("keydown", function (e) {

  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }

});
document.getElementById("generateBtn").addEventListener("click", async () => {

  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) {
    alert("Please enter a prompt");
    return;
  }

  document.getElementById("status").innerHTML = "⏳ Generating Video...";

  try {

    const response = await fetch(`${BACKEND_URL}/generate-video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();

    if (data.success) {

      document.getElementById("status").innerHTML =
      "✅ Video request sent.<br>ID: " + data.id;

    } else {

      document.getElementById("status").innerHTML =
      "❌ " + JSON.stringify(data.message);

    }

  } catch (err) {

    document.getElementById("status").innerHTML =
    "❌ Failed to connect backend";

  }

});

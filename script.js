// ========================================
// COCKROACH AI v4
// PART A - CONFIG + VARIABLES + SIDEBAR
// ========================================

// Backend URL
const BACKEND_URL = "https://cockroach-ai-backend.onrender.com";

// ========= SIDEBAR BUTTONS =========

const chatBtn = document.getElementById("chatBtn");
const imageBtn = document.getElementById("imageBtn");
const videoBtn = document.getElementById("videoBtn");
const musicBtn = document.getElementById("musicBtn");
const pdfBtn = document.getElementById("pdfBtn");
const codeBtn = document.getElementById("codeBtn");
const settingsBtn = document.getElementById("settingsBtn");

// ========= SECTIONS =========

const chatSection = document.getElementById("chatSection");
const imageSection = document.getElementById("imageSection");
const videoSection = document.getElementById("videoSection");
const musicSection = document.getElementById("musicSection");
const pdfSection = document.getElementById("pdfSection");
const codeSection = document.getElementById("codeSection");
const settingsSection = document.getElementById("settingsSection");

// ========= CHAT =========

const sendBtn = document.getElementById("sendBtn");
const prompt = document.getElementById("prompt");
const chatArea = document.getElementById("chatArea");

// ========= IMAGE =========

const imagePrompt = document.getElementById("imagePrompt");
const generateImageBtn = document.getElementById("generateImageBtn");
const imageResult = document.getElementById("imageResult");

// ========= VIDEO =========

const videoPrompt = document.getElementById("videoPrompt");
const videoImage = document.getElementById("videoImage");
const generateVideoBtn = document.getElementById("generateVideoBtn");
const videoStatus = document.getElementById("videoStatus");
const videoResult = document.getElementById("videoResult");

// ========= CREDIT =========

const creditCount = document.getElementById("creditCount");

// ========================================
// FUNCTIONS
// ========================================

function hideAllSections() {

    chatSection.style.display = "none";
    imageSection.style.display = "none";
    videoSection.style.display = "none";
    musicSection.style.display = "none";
    pdfSection.style.display = "none";
    codeSection.style.display = "none";
    settingsSection.style.display = "none";

}

function removeActiveMenu() {

    document.querySelectorAll(".menu").forEach(btn => {
        btn.classList.remove("active");
    });

}

function openSection(button, section) {

    hideAllSections();

    removeActiveMenu();

    button.classList.add("active");

    section.style.display = "block";

}

// ========================================
// SIDEBAR EVENTS
// ========================================

chatBtn.onclick = () => openSection(chatBtn, chatSection);

imageBtn.onclick = () => openSection(imageBtn, imageSection);

videoBtn.onclick = () => openSection(videoBtn, videoSection);

musicBtn.onclick = () => openSection(musicBtn, musicSection);

pdfBtn.onclick = () => openSection(pdfBtn, pdfSection);

codeBtn.onclick = () => openSection(codeBtn, codeSection);

settingsBtn.onclick = () => openSection(settingsBtn, settingsSection);
// ========================================
// PART B - AI CHAT
// ========================================

function addUserMessage(text) {

    chatArea.innerHTML += `
        <div class="user-message">
            ${text}
        </div>
    `;

    chatArea.scrollTop = chatArea.scrollHeight;

}

function addAIMessage(text) {

    chatArea.innerHTML += `
        <div class="ai-message">
            ${text}
        </div>
    `;

    chatArea.scrollTop = chatArea.scrollHeight;

}

sendBtn.addEventListener("click", async () => {

    const text = prompt.value.trim();

    if (!text) {
        alert("Please enter a message.");
        return;
    }

    addUserMessage(text);

    prompt.value = "";

    addAIMessage("🤖 Thinking...");

    const aiMessages = document.querySelectorAll(".ai-message");
    const lastAI = aiMessages[aiMessages.length - 1];

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

            lastAI.innerHTML = data.reply;

        } else {

            lastAI.innerHTML = "❌ " + data.message;

        }

    } catch (err) {

        lastAI.innerHTML = "❌ Backend connection failed.";

    }

});

prompt.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        sendBtn.click();

    }

});
// ========================================
// PART C - IMAGE GENERATOR
// ========================================

generateImageBtn.addEventListener("click", async () => {

    const text = imagePrompt.value.trim();

    if (!text) {
        alert("Please enter an image prompt.");
        return;
    }

    imageResult.innerHTML = "⏳ Generating image...";

    try {

        const response = await fetch(`${BACKEND_URL}/generate-image`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt: text
            })

        });

        const data = await response.json();

        if (!data.success) {

            imageResult.innerHTML = "❌ " + data.message;
            return;

        }

        imageResult.innerHTML = "";

        data.images.forEach((img, index) => {

            imageResult.innerHTML += `

            <div style="margin-top:20px;">

                <img
                    src="${img}"
                    style="
                        width:100%;
                        border-radius:15px;
                        border:2px solid #00ffd5;
                    ">

                <br><br>

                <a
                    href="${img}"
                    target="_blank"
                    style="
                        display:inline-block;
                        background:#00ffd5;
                        color:black;
                        padding:10px 18px;
                        border-radius:10px;
                        text-decoration:none;
                        font-weight:bold;
                    ">

                    ⬇ Download Image ${index + 1}

                </a>

            </div>

            `;

        });

        creditCount.innerText = Number(creditCount.innerText) - 10;

    } catch (err) {

        imageResult.innerHTML = "❌ Image generation failed.";

    }

});
// ========================================
// PART D - VIDEO GENERATOR
// ========================================

generateVideoBtn.addEventListener("click", async () => {

    const text = videoPrompt.value.trim();

    if (!text) {
        alert("Please enter a video prompt.");
        return;
    }

    videoStatus.innerHTML = "⏳ Starting video generation...";
    videoResult.innerHTML = "";

    try {

        const body = {
            prompt: text
        };

        // Agar image select ki gayi hai to abhi sirf info dikha do.
        // Backend image upload support hone ke baad isko enable karenge.
        if (videoImage && videoImage.files.length > 0) {
            videoStatus.innerHTML =
                "🖼 Image selected. Image-to-Video support will be enabled in the next backend update...";
        }

        const response = await fetch(`${BACKEND_URL}/generate-video`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)

        });

        const data = await response.json();

        if (!data.success) {

            videoStatus.innerHTML = "❌ " + (data.message || "Video generation failed.");

            return;

        }

        videoStatus.innerHTML = "✅ Video request submitted.";

        videoResult.innerHTML = `
            <div class="result-card">

                <p><b>Generation ID</b></p>

                <p>${data.id}</p>

                <br>

                <p><b>Status</b></p>

                <p>${data.state}</p>

                <br>

                <p>Refresh after a few seconds to check progress.</p>

            </div>
        `;

        creditCount.innerText =
            Number(creditCount.innerText) - 20;

    } catch (err) {

        console.log(err);

        videoStatus.innerHTML = "❌ Backend connection failed.";

    }

});
// ========================================
// PART E - FINAL INIT
// ========================================

// Open Chat by default
hideAllSections();
chatSection.style.display = "block";
chatBtn.classList.add("active");

// Welcome message
if (chatArea) {
    chatArea.innerHTML = `
    <div class="ai-message">
        👋 Welcome to <b>Cockroach AI v4</b><br><br>
        Powered by Gemini • Qwen • Luma AI
    </div>
    `;
}

// Backend status check
fetch(`${BACKEND_URL}/`)
.then(res => res.json())
.then(data => {
    console.log("✅ Backend Connected:", data);
})
.catch(() => {
    console.log("❌ Backend Offline");
});

// Prevent null errors
console.log("🚀 Cockroach AI Loaded Successfully");

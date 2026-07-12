// ==========================================
// COCKROACH AI V5
// SCRIPT PART 1
// ==========================================

// Backend URL
const BACKEND_URL = "https://cockroach-ai-backend.onrender.com";

// ================= BUTTONS =================

const chatBtn = document.getElementById("chatBtn");
const imageBtn = document.getElementById("imageBtn");
const videoBtn = document.getElementById("videoBtn");
const musicBtn = document.getElementById("musicBtn");
const pdfBtn = document.getElementById("pdfBtn");
const codeBtn = document.getElementById("codeBtn");
const settingsBtn = document.getElementById("settingsBtn");

// ================= SECTIONS =================

const chatSection = document.getElementById("chatSection");
const imageSection = document.getElementById("imageSection");
const videoSection = document.getElementById("videoSection");
const musicSection = document.getElementById("musicSection");
const pdfSection = document.getElementById("pdfSection");
const codeSection = document.getElementById("codeSection");
const settingsSection = document.getElementById("settingsSection");

// ================= CHAT =================

const chatArea = document.getElementById("chatArea");
const prompt = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");

// ================= IMAGE =================

const imagePrompt = document.getElementById("imagePrompt");
const generateImageBtn = document.getElementById("generateImageBtn");
const imageResult = document.getElementById("imageResult");

// ================= VIDEO =================

const videoPrompt = document.getElementById("videoPrompt");
const videoImage = document.getElementById("videoImage");
const generateVideoBtn = document.getElementById("generateVideoBtn");
const videoStatus = document.getElementById("videoStatus");
const videoResult = document.getElementById("videoResult");

// ================= CREDIT =================

const creditCount = document.getElementById("creditCount");
// ==========================================
// SCRIPT PART 2
// SIDEBAR NAVIGATION
// ==========================================

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

    section.style.display = "block";
    button.classList.add("active");

}

// ================= MENU EVENTS =================

chatBtn.addEventListener("click", () => {
    openSection(chatBtn, chatSection);
});

imageBtn.addEventListener("click", () => {
    openSection(imageBtn, imageSection);
});

videoBtn.addEventListener("click", () => {
    openSection(videoBtn, videoSection);
});

musicBtn.addEventListener("click", () => {
    openSection(musicBtn, musicSection);
});

pdfBtn.addEventListener("click", () => {
    openSection(pdfBtn, pdfSection);
});

codeBtn.addEventListener("click", () => {
    openSection(codeBtn, codeSection);
});


// ================= DEFAULT PAGE =================

openSection(chatBtn, chatSection);
// ==========================================
// SCRIPT PART 3
// AI CHAT
// ==========================================

sendBtn.addEventListener("click", async () => {

    const text = prompt.value.trim();

    if (!text) {
        alert("Please enter a message.");
        return;
    }

    chatArea.innerHTML += `
        <div class="user-message">
            ${text}
        </div>
    `;

    prompt.value = "";

    const loading = document.createElement("div");
    loading.className = "ai-message";
    loading.innerHTML = "🤖 Thinking...";
    chatArea.appendChild(loading);

    chatArea.scrollTop = chatArea.scrollHeight;

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
            loading.innerHTML = data.reply;
        } else {
            loading.innerHTML = "❌ " + (data.message || "Unknown error");
        }

    } catch (err) {

        loading.innerHTML = "❌ Backend connection failed.";

    }

    chatArea.scrollTop = chatArea.scrollHeight;

});

// Send message with Enter key
prompt.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();
        sendBtn.click();

    }

});
// ==========================================
// SCRIPT PART 4
// IMAGE GENERATOR
// ==========================================

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

            imageResult.innerHTML =
                "❌ " + (data.message || "Image generation failed.");

            return;

        }

        imageResult.innerHTML = "";

        data.images.forEach((img, index) => {

            imageResult.innerHTML += `

            <div class="result-card">

                <img
                    src="${img}"
                    style="
                        width:100%;
                        border-radius:12px;
                        margin-bottom:10px;
                    ">

                <a
                    href="${img}"
                    target="_blank"
                    style="
                        display:inline-block;
                        padding:10px 18px;
                        background:#00ffd5;
                        color:#000;
                        text-decoration:none;
                        border-radius:10px;
                        font-weight:bold;
                    ">

                    ⬇ Download Image ${index + 1}

                </a>

            </div>

            <br>

            `;

        });

        updateCredits(
Number(creditCount.innerText) - 1
);

    } catch (err) {

        console.log(err);

        imageResult.innerHTML =
            "❌ Backend connection failed.";

    }

});
// ==========================================
// SCRIPT PART 5
// VIDEO GENERATOR
// ==========================================

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

        // Future Image-to-Video support
        if (videoImage.files.length > 0) {

            videoStatus.innerHTML =
                "🖼 Image selected. Image-to-Video support will be available after backend update.";

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

            videoStatus.innerHTML =
                "❌ " + (data.message || "Video generation failed.");

            return;

        }

        videoStatus.innerHTML = "✅ Video request submitted.";
        checkVideoStatus(data.id);
        
            <div class="result-card">

                <h3>🎬 Video Submitted</h3>

                <p><b>Generation ID:</b></p>

                videoStatus.innerHTML = "✅ Video request submitted.";

videoResult.innerHTML = `
<div class="result-card">

<h3>🎬 Video Submitted</h3>

<p><b>Generation ID:</b></p>

<p>${data.id}</p>

<br>

<p><b>Status:</b></p>

<p>${data.state}</p>

<br>

<p>Please wait while the AI generates your video.</p>

</div>
`;

checkVideoStatus(data.id);

        // 1 Video = 1 Credits
        updateCredits(
Number(creditCount.innerText) - 1
);

    } catch (err) {

        console.log(err);

        videoStatus.innerHTML =
            "❌ Backend connection failed.";

    }

});
// ==========================================
// SCRIPT PART 6
// APP INIT + CREDIT SAVE
// ==========================================

// Load saved credits
const savedCredits = localStorage.getItem("cockroachCredits");

if (savedCredits !== null) {
    creditCount.innerText = savedCredits;
}

// Save credits whenever they change
function updateCredits(value) {

    creditCount.innerText = value;

    localStorage.setItem("cockroachCredits", value);

}

// Backend check
async function checkBackend() {

    try {

        const response = await fetch(`${BACKEND_URL}/`);

        if (!response.ok) throw new Error();

        console.log("✅ Cockroach AI Backend Connected");

    } catch (err) {

        console.log("❌ Backend Offline");

    }

}

checkBackend();
// ==========================================
// SCRIPT PART 7
// VIDEO STATUS CHECK
// ==========================================

async function checkVideoStatus(videoId) {

    try {

        const response = await fetch(
            `${BACKEND_URL}/video-status/${videoId}`
        );

        const data = await response.json();

        if (!data.success) {

            videoStatus.innerHTML =
                "❌ Unable to fetch video status.";

            return;

        }

        videoStatus.innerHTML =
            `🎬 Status : ${data.state}`;

        // If completed
        if (data.state === "completed" && data.videoUrl) {

            videoResult.innerHTML = `

                <video
                    controls
                    style="
                        width:100%;
                        border-radius:12px;
                        margin-top:20px;
                    ">

                    <source
                        src="${data.videoUrl}"
                        type="video/mp4">

                </video>

                <br><br>

                <a
                    href="${data.videoUrl}"
                    target="_blank"
                    style="
                        background:#00ffd5;
                        color:black;
                        padding:12px 20px;
                        border-radius:10px;
                        text-decoration:none;
                        font-weight:bold;
                    ">

                    ⬇ Download Video

                </a>

            `;

            return;

        }

        // Still generating
        if (
            data.state === "queued" ||
            data.state === "processing"
        ) {

            setTimeout(() => {

                checkVideoStatus(videoId);

            }, 5000);

        }

    } catch (err) {

        console.log(err);

        videoStatus.innerHTML =
            "❌ Failed to check video status.";

    }

    }

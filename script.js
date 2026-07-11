// ================= CONFIG =================

const BACKEND_URL = "https://cockroach-ai-backend.onrender.com";

// ================= BUTTONS =================

const chatBtn = document.getElementById("chatBtn");
const imageBtn = document.getElementById("imageBtn");
const videoBtn = document.getElementById("videoBtn");
const musicBtn = document.getElementById("musicBtn");
const pdfBtn = document.getElementById("pdfBtn");
const codeBtn = document.getElementById("codeBtn");
const settingBtn = document.getElementById("settingBtn");

// ================= SECTIONS =================

const chatSection = document.getElementById("chatSection");
const imageSection = document.getElementById("imageSection");
const videoSection = document.getElementById("videoSection");
const musicSection = document.getElementById("musicSection");
const pdfSection = document.getElementById("pdfSection");
const codeSection = document.getElementById("codeSection");
const settingsSection = document.getElementById("settingsSection");

// ================= CHAT =================

const sendBtn = document.getElementById("sendBtn");
const prompt = document.getElementById("prompt");
const chatArea = document.getElementById("chatArea");

// ================= IMAGE =================

const generateImageBtn = document.getElementById("generateImageBtn");
const imagePrompt = document.getElementById("imagePrompt");
const imageResult = document.getElementById("imageResult");

// ================= VIDEO =================

const generateVideoBtn = document.getElementById("generateVideoBtn");
const videoPrompt = document.getElementById("videoPrompt");
const videoStatus = document.getElementById("videoStatus");
const videoResult = document.getElementById("videoResult");

// ================= CREDITS =================

const creditCount = document.getElementById("creditCount");

// ================= FUNCTIONS =================

function hideAll() {

chatSection.style.display = "none";
imageSection.style.display = "none";
videoSection.style.display = "none";
musicSection.style.display = "none";
pdfSection.style.display = "none";
codeSection.style.display = "none";
settingsSection.style.display = "none";

}

function removeActive(){

document.querySelectorAll(".menu").forEach(btn=>{
btn.classList.remove("active");
});

}

// ================= SIDEBAR =================

chatBtn.onclick = ()=>{

hideAll();
removeActive();

chatBtn.classList.add("active");

chatSection.style.display="block";

};

chatBtn.addEventListener("click", () => {
  hideAll();
  chatSection.style.display = "block";
});

imageBtn.addEventListener("click", () => {
  hideAll();
  imageSection.style.display = "block";
});

videoBtn.addEventListener("click", () => {
  hideAll();
  videoSection.style.display = "block";
});

musicBtn.addEventListener("click", () => {
  hideAll();
  musicSection.style.display = "block";
});

pdfBtn.addEventListener("click", () => {
  hideAll();
  pdfSection.style.display = "block";
});

codeBtn.addEventListener("click", () => {
  hideAll();
  codeSection.style.display = "block";
});

settingsBtn.addEventListener("click", () => {
  hideAll();
  settingsSection.style.display = "block";
});

// ================= CHAT =================

sendBtn.addEventListener("click", async () => {

const text = prompt.value.trim();

if(!text){
alert("Enter a message");
return;
}

chatArea.innerHTML += `
<div class="user-message">
${text}
</div>
`;

prompt.value="";

const loading=document.createElement("div");

loading.className="ai-message";

loading.innerHTML="🤖 Thinking...";

chatArea.appendChild(loading);

try{

const response=await fetch(`${BACKEND_URL}/chat`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:text
})

});

const data=await response.json();

loading.innerHTML=data.success
?data.reply
:"❌ "+data.message;

}catch(e){

loading.innerHTML="❌ Backend Error";

}

chatArea.scrollTop=chatArea.scrollHeight;

});

// ================= IMAGE =================

generateImageBtn.addEventListener("click",async()=>{

const text=imagePrompt.value.trim();

if(!text){
alert("Enter image prompt");
return;
}

imageResult.innerHTML="⏳ Generating Image...";

try{

const response=await fetch(`${BACKEND_URL}/generate-image`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
prompt:text
})

});

const data=await response.json();

if(!data.success){

imageResult.innerHTML="❌ "+JSON.stringify(data.message);

return;

}

imageResult.innerHTML="";

data.images.forEach(img=>{

imageResult.innerHTML+=`

<img
src="${img}"
style="
width:100%;
border-radius:15px;
margin-top:20px;
">

`;

});

creditCount.innerText=
Number(creditCount.innerText)-10;

}catch(e){

imageResult.innerHTML="❌ Failed";

}

});

// ================= VIDEO =================

generateVideoBtn.addEventListener("click",async()=>{

const text=videoPrompt.value.trim();

if(!text){

alert("Enter video prompt");

return;

}

videoStatus.innerHTML="⏳ Generating Video...";

videoResult.innerHTML="";

try{

const response=await fetch(`${BACKEND_URL}/generate-video`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
prompt:text
})

});

const data=await response.json();

if(!data.success){

videoStatus.innerHTML="❌ "+JSON.stringify(data.message);

return;

}

videoStatus.innerHTML="✅ Video Started";

videoResult.innerHTML=`

<p>

Generation ID:

<br>

<b>${data.id}</b>

</p>

<p>

Status:

<b>${data.state}</b>

</p>

`;

creditCount.innerText=
Number(creditCount.innerText)-20;

}catch(e){

videoStatus.innerHTML="❌ Backend Error";

}

});
// ================= PAGE SWITCH =================

const chatBtn = document.getElementById("chatBtn");
const videoBtn = document.getElementById("videoBtn");

const musicBtn = document.querySelectorAll(".menu")[3];
const pdfBtn = document.querySelectorAll(".menu")[4];
const codeBtn = document.querySelectorAll(".menu")[5];

const chatSection = document.getElementById("chatSection");
const videoSection = document.getElementById("videoSection");
const musicSection = document.getElementById("musicSection");
const pdfSection = document.getElementById("pdfSection");
const codeSection = document.getElementById("codeSection");
const settingsSection = document.getElementById("settingsSection");

function hideAll() {
  chatSection.style.display = "none";
  imageSection.style.display = "none";
  videoSection.style.display = "none";
  musicSection.style.display = "none";
  pdfSection.style.display = "none";
  codeSection.style.display = "none";
  settingsSection.style.display = "none";
}

chatBtn.onclick = () => {
  hideAll();
  chatSection.style.display = "block";
};

imageBtn.onclick = () => {
  hideAll();
  imageSection.style.display = "block";
};

videoBtn.onclick = () => {
  hideAll();
  videoSection.style.display = "block";
};

musicBtn.onclick = () => {
  hideAll();
  musicSection.style.display = "block";
};

pdfBtn.onclick = () => {
  hideAll();
  pdfSection.style.display = "block";
};

codeBtn.onclick = () => {
  hideAll();
  codeSection.style.display = "block";
};

settingsBtn.onclick = () => {
  hideAll();
  settingsSection.style.display = "block";
};

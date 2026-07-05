const sendBtn = document.getElementById("sendBtn");
const prompt = document.getElementById("prompt");
const chatArea = document.getElementById("chatArea");

sendBtn.addEventListener("click", () => {

const text = prompt.value.trim();

if(text===""){
alert("Please enter a prompt.");
return;
}

// User Message

const userMsg=document.createElement("div");

userMsg.className="user-message";

userMsg.innerHTML=text;

chatArea.appendChild(userMsg);

// AI Message

const aiMsg=document.createElement("div");

aiMsg.className="ai-message";

aiMsg.innerHTML="🤖 Thinking...";

chatArea.appendChild(aiMsg);

chatArea.scrollTop=chatArea.scrollHeight;

setTimeout(()=>{

aiMsg.innerHTML="Hello 👋<br><br>This is Cockroach AI Demo Mode.<br><br>Your AI backend will be connected soon.";

chatArea.scrollTop=chatArea.scrollHeight;

},1000);

prompt.value="";

});

const sendBtn = document.getElementById("sendBtn");
const prompt = document.getElementById("prompt");
const chatArea = document.getElementById("chatArea");

// Sidebar buttons
const buttons = document.querySelectorAll(".sidebar button");
const newChatBtn = buttons[0];

// Welcome message
function welcomeMessage() {
chatArea.innerHTML = `
<div class="ai-message">
👋 Welcome to Cockroach AI!<br><br>
How can I help you today?
</div>
`;
}

// New Chat
newChatBtn.addEventListener("click", () => {
welcomeMessage();
prompt.value = "";
});

// Send Message
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

aiMsg.innerHTML=`
🤖 Demo Reply

You asked:

<b>${text}</b>

Backend connection is coming soon.
`;

chatArea.scrollTop=chatArea.scrollHeight;

},1000);

prompt.value="";

});

// Press Enter to Send
prompt.addEventListener("keydown",function(e){

if(e.key==="Enter" && !e.shiftKey){

e.preventDefault();

sendBtn.click();

}

});

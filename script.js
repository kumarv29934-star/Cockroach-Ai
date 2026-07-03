document.getElementById("generateBtn").addEventListener("click", function () {
  const prompt = document.getElementById("prompt").value;
  const status = document.getElementById("status");

  if (prompt.trim() === "") {
    status.innerHTML = "⚠️ Please enter a prompt.";
    return;
  }

  status.innerHTML = "⏳ Demo mode: Video generation feature will be connected soon.";
});

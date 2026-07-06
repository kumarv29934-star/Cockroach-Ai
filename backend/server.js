const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "Cockroach AI Backend",
    version: "1.0.0",
    status: "Running"
  });
});

app.post("/chat", async (req, res) => {

  const { message } = req.body;

  res.json({
    success: true,
    reply: `Demo Reply: ${message}`
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Cockroach AI Backend Running on Port " + PORT);
});

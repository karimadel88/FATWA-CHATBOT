const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX!",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    axios
      .post("http://localhost:7878/ask", { prompt })
      .then((response) => {
        console.log(response.data.response);
        res.status(200).send({
          bot: response.data.response,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    res.status(500).send(err || "Something went wrong");
  }
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);

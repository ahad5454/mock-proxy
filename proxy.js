import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MCP_URL = process.env.MCP_URL || "https://mock-mcp-en3r.onrender.com";

app.get("/mcp", async (req, res) => {
  try {
    const mcpRes = await fetch(`${MCP_URL}/data`);
    const data = await mcpRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Proxy error", error: err.message });
  }
});

app.get("/", (_, res) => res.send("Proxy Server is running"));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

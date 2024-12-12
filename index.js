import express from "express";
import { configDotenv } from "dotenv";
import routes from "./src/routes/routes.js";
import { globalResponse } from "./src/utils/errorHandling.js";
configDotenv();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); 
app.get("/", (req, res) => res.send("Hello World!")); 
app.use("/whatsapp", routes);
app.use(globalResponse);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


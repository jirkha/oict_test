import express, { Express } from "express";
import bodyParser from "body-parser";
import router_01 from "./routes/01_endpoint";
import router_02 from "./routes/02_authentication";
import router_03 from "./routes/03_litacka";

const app: Express = express();
const PORT = 3000;

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api", router_01);
app.use("/api/authentication", router_02);
app.use("/api/litacka", router_03);
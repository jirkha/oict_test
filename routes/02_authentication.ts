import { Router, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router_02 = Router();

interface ApiKeyBody {
  apiKey: string;
}

router_02.get("/", (req: Request, res: Response) => {
  res.status(200);
  res.render("02_authentication");
});

router_02.post("/", async (req: Request<{}, {}, ApiKeyBody>, res: Response) => {
  const { apiKey } = req.body; 

    try {
      const response = await axios.get("http://localhost:3000/api/litacka", {
        headers: { "x-api-key": apiKey },
      });
      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }

});


export default router_02;

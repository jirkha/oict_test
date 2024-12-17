import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router_03 = express.Router();
const VALID_API_KEY: string | undefined = process.env.VALID_API_KEY;
router_03.use(express.json());

if (!VALID_API_KEY) {
  throw new Error("VALID_API_KEY is not defined");
}

const validateApiKey = (req: Request, res: Response, next: Function) => {
  const apiKey = req.headers["x-api-key"] as string;

  if (apiKey === VALID_API_KEY) {
    req.app.locals.isAuthenticated = true;
    next();
  } else {
    req.app.locals.isAuthenticated = false;
    res.send("<h1>Unauthorized: Invalid API key</h1>");
  }
};

router_03.get("/", validateApiKey, (req: Request, res: Response) => {
  if (req.app.locals.isAuthenticated) {
    res.render("03_litacka"); // Zobrazí formulář pro ověření karty
  } else {
    res.status(403).send("<h1>Forbidden: You need to authenticate first.</h1>");
  }
});

router_03.post("/", async (req: Request, res: Response) => {
  const { cardNumber }: { cardNumber: string } = req.body;

  if (req.app.locals.isAuthenticated) {
    try {
      const validityUrl = `http://private-264465-litackaapi.apiary-mock.com/cards/${cardNumber}/validity`;
      const stateUrl = `http://private-264465-litackaapi.apiary-mock.com/cards/${cardNumber}/state`;

      const [validityResponse, stateResponse] = await axios.all([
        axios.get(validityUrl),
        axios.get(stateUrl),
      ]);

      let validity = validityResponse.data.validity_end;
      const status: string = stateResponse.data.state_description;

      try {
        validity = new Date(validity); 
        
        const day: number = validity.getDate();
        const month: number = validity.getMonth() + 1;
        const year: number = validity.getFullYear();  

        validity = `${day}.${month}.${year}`;
      } catch (error) {
        console.error(error)
      }

      console.log('status', status)
      console.log('validity', validity)

      res.send(`
        <h1>Card Verification</h1>
        <p>Card Number: ${cardNumber}</p>
        <p>Validity: ${validity}</p>
        <p>Status: ${status}</p>
      `);
    } catch (error) {
      console.error("Error verifying card:", error);
      res
        .status(500)
        .send("<h1>An error occurred while verifying the card.</h1>");
    }
  } else {
    res.status(403).send("<h1>Forbidden: You need to authenticate first.</h1>");
  }
});

export default router_03;

import express, { Express, Response, Request, NextFunction } from "express";
import Stripe from "stripe";
import cors from "cors";
import { port, SECRET_KEY, CLIENT_URL } from "./config";
import { errorHandler } from "./errorHandler";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

const stripe = new Stripe(`${SECRET_KEY}`, {
  apiVersion: "2020-08-27",
});

app.post("/charge", async (req: Request, res: Response) => {
  try {
    const coupon = await stripe.coupons.create({
      percent_off: 20,
      duration: "once",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: "cus_LjDQjUl7Zlbe0K",
      line_items: [
        {
          price: req.body.item.id,
          quantity: req.body.item.quantity,
        },
      ],
      mode: "payment",
      discounts: [
        {
          coupon: coupon.id,
        },
      ],
      cancel_url: `${CLIENT_URL}/cancel.html`,
      success_url: `${CLIENT_URL}/success.html`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is runnning on port ${port}`);
});

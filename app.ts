require("dotenv").config();

import express, { Application } from "express";
import path from "path";
import cors from "cors";

const NODE_ENV = process.env.NODE_ENV || "development";

// import mailchimp from '@mailchimp/mailchimp_marketing';
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "77663e6ce74f243bcd5d1e2ed40ff5ba",
  server: "us7",
});

export default class App {
  public main: Application;
  public staticDir: string;

  constructor() {
    this.main = express();
    this.main.use(cors());

    this.staticDir =
      NODE_ENV === "development"
        ? path.join(__dirname, "public")
        : path.join(__dirname, "..", "public");
    this.setup();

    this.main.get("/addMember/:email", async (req, res) => {
      try {
        const user = {
          email: req.params.email,
        };

        await mailchimp.lists.addListMember("a7b133effa", {
          email_address: user.email,
          status: "subscribed",
        });

        return res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, msg: error.message });
      }
    });
  }

  private setup = () => {
    this.main.use(express.static(this.staticDir));

    this.main.get("/:name", (req, res) => {
      return res.sendFile(`${this.staticDir}/${req.params.name}.html`);
    });
  };
}

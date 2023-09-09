import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
import mongoose from "mongoose";
const User = require("./models/User.schema.ts");

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

mongoose
  //@ts-ignore
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: any) => {
    console.log(err);
  });

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});

app.post("/signup", (req: Request, res: Response) => {
  const { username } = req.body;
  const user = new User({ username });
  user
    .save()
    .then(() => {
      console.log("User created");
      res.json(user);
    })
    .catch((err: Error) => {
      console.error(err);
    });
});

app.get("/getpoints", (req: Request, res: Response) => {
  // retrieve the number of points for a specific user
  const { username } = req.body;
  console.log(username);
  User.findOne({ username }).then((user: any) => {
    console.log(`Inside user findone function: username: ${username}`);
    res.json(user.points);
  });
});

app.get("/leaderboard", (req: Request, res: Response) => {
  // sort by points
  User.find({})
    .sort({ points: -1 })
    .then((users: any) => {
      res.json(users);
    });
});

app.post("/addpoints", (req: Request, res: Response) => {
  const { username, points } = req.body;
  // add points to the user
  User.findOne({ username }).then((user: any) => {
    // print out the points of the user
    console.log(user.points);
    console.log(points);
    user.points += points;
    user
      .save()
      .then(() => {
        res.json(user.points);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  });
});

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});

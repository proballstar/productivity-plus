// Import required libraries and modules
import express, { Express } from "express"; // Import the Express.js framework for building web applications
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing (CORS)
import dotenv from "dotenv"; // Library for managing environment variables
import { Request, Response } from "express"; // Request and Response objects for handling HTTP requests
import mongoose from "mongoose"; // Mongoose for MongoDB database interaction
const User = require("./models/User.schema.ts"); // Import the User model from a separate module

// Import required libraries and modules...

// Create an instance of the Express application...
const app = express();

// Middleware to parse incoming JSON data...
app.use(express.json());

// Middleware to enable CORS for cross-origin requests...
app.use(cors());

// Load environment variables from a .env file...
dotenv.config();

// Connect to the MongoDB database...
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

// Test route to ensure the server is running...
app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});

// Route for user registration (sign up)...
app.post("/signup", (req: Request, res: Response) => {
  // Extract the 'username' from the request body
  const { username } = req.body;

  // Create a new User object with the provided username
  const user = new User({ username });

  // Save the user to the database
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

// Route to get user points...
app.get("/getpoints", (req: Request, res: Response) => {
  // Retrieve the number of points for a specific user
  const { username } = req.body;
  console.log(username);

  // Find a user with the provided 'username' in the database
  User.findOne({ username }).then((user: any) => {
    console.log(`Inside user findOne function: username: ${username}`);

    // Respond with the user's points
    res.json(user.points);
  });
});

// Route to get the leaderboard sorted by points...
app.get("/leaderboard", (req: Request, res: Response) => {
  // Retrieve all users and sort them by points in descending order
  User.find({})
    .sort({ points: -1 })
    .then((users: any) => {
      // Respond with the sorted list of users (leaderboard)
      res.json(users);
    });
});

// Route to add points to a user...
app.post("/addpoints", (req: Request, res: Response) => {
  // Extract 'username' and 'points' from the request body
  const { username, points } = req.body;

  // Find the user with the provided 'username' in the database
  User.findOne({ username }).then((user: any) => {
    // Print out the current points of the user and the points to be added
    console.log(user.points);
    console.log(points);

    // Update the user's points by adding the provided 'points' value
    user.points += points;

    // Save the updated user data to the database
    user
      .save()
      .then(() => {
        // Respond with the updated points of the user
        res.json(user.points);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  });
});

// Start the server and listen on port 3000...
app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});

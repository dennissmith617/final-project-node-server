import express from "express";
import cors from "cors";
import UsersController from "./users/users-controller.js";
import SessionController from "./session-controller.js";
import mongoose from "mongoose";
import commentsController from "./comments/commentsController.js";
import session from "express-session";

mongoose.connect(
    "mongodb+srv://giuseppi:supersecretpassword@cluster0.kwknyiw.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();
app.use(cors(
    {
        credentials: true,
        origin: "http://localhost:3000"
    }
));
app.use(express.json());
app.use(
    session({
    secret: "test_secret",
    resave: false,
    cookie: {secure: false}
    })
);

app.get("/", function (req, res) {
    res.send("Hello World");
});

SessionController(app);
UsersController(app);
commentsController(app)

app.get("/hello/:message", function (req, res) {
    const message = req.params.message;
    res.send(`Hello ${message}`);
});

app.listen(4000);
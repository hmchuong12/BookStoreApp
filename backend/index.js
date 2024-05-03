import express, { request, response } from "express";
import { PORT, URI } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body.
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow all Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:5173/',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack!");
});

app.use("/books", router);

mongoose.connect(URI).then(() => {
    console.log("App connected to database!");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});
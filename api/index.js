import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/project_routes.js';
import userRoutes from './routes/user_routes.js';
import bodyParser from "body-parser";


const { json, urlencoded } = bodyParser;
const { connect } = mongoose;
const PORT = 8080;
const app = express();




// configure .env file
// access environment variables as follows:
// process.env.MY_VARIABLE
dotenv.config();

// connect to db
connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(function(result) {
        console.log('Database is connected');
    })
    .catch((err) => console.log(err));

// Apply CORS policy
app.use(cors({
  origin: 'http://localhost:3000'
}));  

// Assign the PORT to our app
app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));


//Message is shown  when visiting http://localhost:8080/
app.get('/', (req, res) => res.send('Issue Tracker is up and running!'));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(json());
//app.use(urlencoded());
app.use(urlencoded({ extended: false }))

// routes
app.use('/project', projectRoutes);
app.use('/user', userRoutes);

process.env.REMOTE_HOST = void (0);

import express from "express";

const app = express();
const HOST = '0.0.0.0';
const PORT = 3000;

/**
 * burying the process.env call deep in the code leads to runtime errors
 */
app.get('/', async (req, res, next) => {
    try {
        const response = await fetch(`https://${process.env.REMOTE_HOST}/api/geo`);
        const data = await response.json();
        return res.json(data);
    } catch (error) {
        next(error);
    }
});

// have the server listen for requests
app.listen(PORT, HOST);
console.log("Server listening on " + HOST + ":" + PORT);
process.env.REMOTE_HOST = void(0);

import express from "express";
import get from '@ampsy/env';

const app = express();
/**
 * resolving environment variables up front let's us fast-fail. 
 */

const REMOTE_HOST = get('REMOTE_HOST');

app.get('/', async (req, res, next) => {
    try {
        const response = await fetch(`https://${REMOTE_HOST}/api/geo`);
        const data = await response.json();
        return res.json(data);
    } catch (error) {
        next(error);
    }
});
/**
 * use of the accessor with default values is often helpful
 */
const HOST = get('HOST','0.0.0.0');
const PORT = get('PORT',3000);
// have the server listen for requests
app.listen(PORT, HOST);
console.log("Server listening on " + HOST + ":" + PORT);
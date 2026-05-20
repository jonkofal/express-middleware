
# Package @ampsy/env
- Solves problem of undefined environment variables causing odd errors in code, by
  throwing an AssertionError with a clear message when an environment variable is undefined.
- fast-fail wrapper for environment variables.
- Best used in code at startup, so prior to 'ready' state all required variables are resolved.
 
# Usage
```
import ExpressMiddleware from '@ampsy/express-middleware';
import express from 'express'

const app = express();

// calls from browsers to apis require CORS headers
// if your web app is running at https://example.com, 
// set CORS_WHITELIST environment variable to https://example.com.
// '*' allows all origins, so great for development.x
app.use(ExpressMiddleware.cors(get('CORS_WHITELIST','*')));

//all the other middlewares and routes, etc...

//at end of file

//anything not handled is a 404
app.use(ExpressMiddleware.fourOfour);

// standard error handler
app.use(ExpressMiddleware.catchAllErrorHandler);

// have the server listen for requests
app.listen(3000, '0.0.0.0');
```

# See test/test.js for test cases
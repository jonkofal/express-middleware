import get from '@ampsy/env'
import cors from 'cors';
const NODE_ENV = get('NODE_ENV', 'production');

class ExpressMiddleware {


  // whitelist that allows client passing of whitelist
  // defaults to closed if whitelist is not defined or empty
  static cors(whitelist) {
    let retVal;
    if (whitelist && whitelist !== '') {
      retVal = cors({
        origin: (origin, callback) => {
          if (!origin || whitelist === '*' || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            console.error(`unauthorized origin ${origin}`);
            callback(new Error(`CORS unauthorized`));
          }
        }
      });
    } else {
      cors({
        origin: (origin, callback) => {
          callback(new Error(`CORS unauthorized`));
        }
      });
    }
    return retVal;
  }
  static fourOfour(req, res, next) {
    res.status(404).send("Not found");
  }
  // Final Catch-all Error Handler (Needs to be the last USE definition)
  static catchAllErrorHandler(error, req, res, next) {
    //log error
    console.error(error);
    //mask error on production
    let message = process.env.NODE_ENV && process.env.NODE_ENV !== 'production' ? `${error.stack}` : '';
    //end processing
    res.status(error?.status ? error.status : 500).send(message);
  }
}
export default ExpressMiddleware;

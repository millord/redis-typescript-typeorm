import * as express from 'express';
import Redis from "ioredis"
const redis = new Redis({
  port: 6379
}); // uses defaults unless given configuration object

//Middleware Function to Check Cache
export const checkCache = (req: express.Request, res: express.Response, next: any) => {
  const { id } = req.params;

  //get data value for key =id
  redis.get(id, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send(data);
    }
    else {
      //proceed to next middleware function
      next();
    }
  });
};
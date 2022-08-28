import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {
  // initilization
  const app = express();
  const port = process.env.PORT || 8082;
  app.use(bodyParser.json());

  // endpoint1
  app.get("/filteredimage", async (req:express.Request, res:express.Response) => {
    try {
      if(req.query.image_url) {
        let output: string = await filterImageFromURL(req.query.image_url);
        res.status(200).sendFile(output, () => deleteLocalFiles([output]));
      }
      else{
        res.status(401).send({status: 'Empty url for image.'});
      }
    }
    catch (error){
      res.status(400).send({status: error});
    }
  });

  // endpoint2
  app.get( "/", async ( req, res ) => {
    res.sendFile(__dirname+"/landing/index.html")
  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
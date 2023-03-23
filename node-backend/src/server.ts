import "reflect-metadata";
import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import { useExpressServer, useContainer } from "routing-controllers";
import * as cors from "cors";
import { Container } from "typedi";

const app: any = express();

app.set("port", 9000);
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

useContainer(Container);
useExpressServer(app, {
    controllerDirs: [__dirname + "/controllers/*.js"]
});

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
    console.log("App is running at http://localhost:%d", app.get("port"));
    // console.log("Environment Config: ", process.env);
});

module.exports = app;

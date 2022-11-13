import express from "express";
import plantRouter from "./routes/PlantRoute";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
dotenv.config({ path: ".env.local" });

AppDataSource.initialize().then(async () => {
  const app = express();

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    next();
  });

  app.use(express.json());
  const port = process.env.PORT || 8080;
  // ligne de commande pour avoir accés au fichier static
  app.use(express.static("./public"));

  // configuration de la route pour les data
  app.use("/api/plant", plantRouter);

  app.listen(8080, () => {
    console.log(`Example app listening on port 8080`);
  });
});

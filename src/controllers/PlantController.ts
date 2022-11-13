import { Request, Response } from "express";
import { PlantService } from "../services/PlantService";
import { Plant } from "../models/interface/PlantInterface";

export class PlantController {
  public plantService = new PlantService();
  async getAllPlants(req: Request, res: Response): Promise<void> {
    try {
      const allPlants = await this.plantService.getAllPlants();
      res.send({ status: "OK", data: allPlants });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  async getOnePlantById(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }
    try {
      const id = parseInt(paramId);
      const onePlant = await this.plantService.getOnePlantById(id);
      res.send({ status: "OK", data: onePlant });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async createNewPlant(req: Request, res: Response): Promise<void> {
    const newPlant: Plant = {
      ...req.body,
    };
    console.log(newPlant);
    if (
      !newPlant.name ||
      newPlant.unitprice_ati === undefined ||
      newPlant.quantity === undefined ||
      newPlant.category === undefined ||
      newPlant.rating === undefined ||
      newPlant.url_picture === undefined
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: name,unitprice_ati, quantity, category, rating, url_picture",
        },
      });
      return;
    }

    try {
      await this.plantService.createNewPlant(newPlant);
      res.status(201).send({
        status: "OK",
        message: `New plant created`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async updateOnePlant(req: Request, res: Response): Promise<void> {
    const changes: Plant = {
      ...req.body,
    };
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    } else if (!changes.name || !changes.quantity || !changes.category) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'power', 'life'",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.plantService.updateOnePlant(id, changes);
      res.status(201).send({
        status: "OK",
        message: `Plant with id ${id} updated`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async deleteOnePlant(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter 'id' can not be empty" },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.plantService.deleteOnePlant(id);
      res
        .status(200)
        .send({ status: "OK", message: `Plant with id ${id} removed` });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}

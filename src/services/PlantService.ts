import { AppDataSource } from "../data-source";
import { Plant } from "../models/interface/PlantInterface";

export class PlantService {
  getAllPlants(): Promise<Plant[]> {
    return AppDataSource.query(`SELECT * FROM plant ;`);
  }
  getOnePlantById(id: number): Promise<Plant> {
    return AppDataSource.query(`SELECT* FROM plant WHERE plant.id= ${id}`);
  }

  createNewPlant(newPlant: Plant): Promise<any> {
    return AppDataSource.query(
      `INSERT INTO plant (name,unitprice_ati, quantity, category, rating, url_picture)  VALUES( '${newPlant.name}',${newPlant.unitprice_ati},${newPlant.quantity},'${newPlant.category}',${newPlant.rating},'${newPlant.url_picture}')`
    );
  }

  updateOnePlant(id: number, changes: Plant): Promise<any> {
    return AppDataSource.query(
      `UPDATE plant SET name = '${changes.name}', quantity=${changes.quantity}, rating= ${changes.rating}, category='${changes.category}',unitprice_ati = ${changes.unitprice_ati},url_picture='${changes.url_picture}' WHERE plant.id= ${id}`
    );
  }

  deleteOnePlant(id: number): Promise<any> {
    const requete = `DELETE FROM plant WHERE plant.id = ${id}`;
    console.log(requete);
    return AppDataSource.query(`DELETE FROM plant WHERE plant.id = ${id}`);
  }
}

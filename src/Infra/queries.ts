import { Fleet } from "../Domain/models/Fleet";
import { Vehicle } from "../Domain/models/Vehicle";
import { FleetVehicle } from "../Domain/models/FleetVehicle";
import { closeDB, connectDB } from "./db";
import { VehicleLocalisation } from "../Domain/models/VehicleLocalisation";

async function createFleet(userid: number): Promise<number> {
  const db = await connectDB();
  const query = "INSERT INTO Fleet (UserId) VALUES (?)";

  const result= new Promise<number>((resolve, reject) => {
    db.query(query, [userid], (error, results) => {
      if (error) {
        reject(error);
        resolve(-1);
      } else {
        resolve(results.insertId);
      }
    });
  });
await closeDB(db)
  return result

}

async function createVehicle(PlateNumber: string): Promise<number> {
  const db = await connectDB();
  const query = "INSERT INTO vehicle (PlateNumber) VALUES ( ?)";

  const result= new Promise<number>((resolve, reject) => {
    db.query(query, [PlateNumber], (error, results) => {
      if (error) {
        reject(error);
        resolve(-1);
      } else {
        resolve(results.insertId);
      }
    });
  });

  await closeDB(db)
  return result 
}

async function RegisterVehicleToFleet(
  fleetId: number,
  vehicleId: number
): Promise<number> {
  const db = await connectDB();
  const query = "INSERT INTO FleetVehicle (fleetId , vehicleId ) VALUES (?, ?)";

  const result = new Promise<number>((resolve, reject) => {
    db.query(query, [fleetId, vehicleId], (error, results) => {
      if (error) {
        reject(error);
        resolve(-1);
      } else {
        resolve(results.insertId);
      }
    });
  })
  await closeDB(db)
  
  return result
}

async function LoadFleetVehicle(
  fleetId: number,
  vehicleId: number
): Promise<FleetVehicle> {
  const db = await connectDB();
  const query =
    "SELECT * FROM  fleetvehicle WHERE fleetId  = ? and vehicleId =?";

  const result= new Promise<FleetVehicle>((resolve, reject) => {
    db.query(query, [fleetId, vehicleId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          const fleetVehicle: FleetVehicle = {
            fleetVehicleId: results[0].fleetVehicleId,
            fleetId: results[0].fleetId,
            vehicleId: results[0].vehicleId,
            registeredAt: results[0].registeredAt,
          };

          resolve(fleetVehicle);
        }
      }
    });
  });
  await closeDB(db)
  return result
}

async function LocaliseVehicle(
  fleetVehicleId: number,
  coordinates: string
): Promise<number> {
  const db = await connectDB();
  const query =
    "INSERT INTO VehicleLocalisation (fleetVehicleId , coordinates ) VALUES (?, ?)";

  const result= new Promise<number>((resolve, reject) => {
    db.query(
      query,
      [fleetVehicleId, coordinates],
      (error, results) => {
        if (error) {
          reject(error);
          resolve(-1);
        } else {
          resolve(results.insertId);
        }
      }
    );
  });

  await closeDB(db)
  return result 
}

async function DeLocaliseVehicle(
    localisationId: number

  ): Promise<number> {
    const db = await connectDB();
    const query =
      "UPDATE VehicleLocalisation Set dateOut=CURRENT_TIMESTAMP Where localisationId=?";
  
    const result= new Promise<number>((resolve, reject) => {
      db.query(
        query,
        [localisationId],
        (error, results) => {
          if (error) {
            reject(error);
            resolve(-1);
          } else {
            resolve(results);
          }
        }
      );
    });
    await closeDB(db)
    return result 
  }


  async function loadParkedVehicleLocalisation(fleetVehicleId: number): Promise<VehicleLocalisation> {
    const db = await connectDB();
    const query = "SELECT * FROM  vehicleLocalisation WHERE fleetVehicleId   = ? and dateOut is null";
  
    const result= new Promise<VehicleLocalisation>((resolve, reject) => {
      db.query(query, [fleetVehicleId], (error, results) => {
        if (error) {
            resolve(null)
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            const vehiclelocalisation: VehicleLocalisation = {
                localisationId   : results[0].localisationId,
                fleetVehicleId   : results[0].fleetVehicleId,
                coordinates :results[0].coordinates,
                timeIn:results[0].timeIn,
                timeOut:results[0].timeOut
            };
            resolve(vehiclelocalisation);
          }
        }
      });
    });

    await closeDB(db)
    return result 
  }

  
async function IsCoordinateAvailable(coordinates: string): Promise<number> {
    const db = await connectDB();
    const query = "SELECT * FROM  VehicleLocalisation WHERE coordinates  = ? or (coordinates= ? and dateOut is null) ";
  
    const result= new Promise<number>((resolve, reject) => {
      db.query(query, [coordinates,coordinates], (error, results) => {
        if (error) {
          reject(error);
          resolve(0)
        } else {
            resolve(results.length);
        }
      });
    });

    await closeDB(db)
    return result
  }


async function loadVehicleByPlateNumber(plateNumber: string): Promise<Vehicle> {
  const db = await connectDB();
  const query = "SELECT * FROM  Vehicle WHERE plateNumber  = ?";

  const result = new Promise<Vehicle>((resolve, reject) => {
    db.query(query, [plateNumber], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          const vehicle: Vehicle = {
            vehicleId: results[0].vehicleId,
            plateNumber: results[0].plateNumber,
          };
          resolve(vehicle);
        }
      }
    });
  });

  await closeDB(db)
  return result 
}

async function LoadFleet(fleet_id: number): Promise<Fleet> {
  const db = await connectDB();
  const query = "SELECT * FROM  Fleet WHERE FleetId = ?";

  const result= new Promise<Fleet>((resolve, reject) => {
    db.query(query, [fleet_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          const fleet: Fleet = {
            fleetId: results[0].fleetId,
            userId: results[0].userId,
            createdAt: results[0].createdAt,
            // Map any additional fields here
          };
          resolve(fleet);
        }
      }
    });
  });
  await closeDB(db)
  return result
}

export {
  createVehicle,
  RegisterVehicleToFleet,
  loadVehicleByPlateNumber,
  createFleet,
  LoadFleet,
  LocaliseVehicle,
  LoadFleetVehicle,IsCoordinateAvailable,loadParkedVehicleLocalisation,DeLocaliseVehicle
};

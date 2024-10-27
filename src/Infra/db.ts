import * as dotenv from "dotenv";
import * as mysql from "mysql";

dotenv.config();

async function connectDB(): Promise<mysql.Connection> {
  const connection = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  const connect_db = mysql.createConnection(connection);
  connect_db.connect((err: any) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      throw new Error("Database connection error: " + err);
    }

    //console.log('Connected to the MySQL database');
  });

  // Create initial tables
  // todo: to improve this so that it runs once only
  await CreateTables(connect_db);

  return connect_db;
}
async function closeDB(connect_db: mysql.Connection) {
  try {
    connect_db.end();
    //console.log('Database connection closed');
  } catch (err) {
    console.error("Error closing the database connection:", err);
    throw new Error("Error closing the database connection: " + err);
  }
}

async function CreateTables(db: mysql.Connection) {
  // FLEET TABLE
  let query =
    "CREATE TABLE IF NOT EXISTS `fleet` (" +
    "`fleetId` int(11) NOT NULL AUTO_INCREMENT," +
    "`userId` int(11) NOT NULL," +
    "`createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP," +
    "PRIMARY KEY (`fleetId`))";
  await executeQuery(db, query);

  // VEHICLE TABLE
  query =
    "CREATE TABLE IF NOT EXISTS `vehicle` (" +
    "`vehicleId` int(11) NOT NULL AUTO_INCREMENT," +
    "`plateNumber` varchar(20) NOT NULL," +
    "PRIMARY KEY (`vehicleId`)," +
    "UNIQUE KEY `plateNumber` (`plateNumber`))";
  await executeQuery(db, query);

  //FLEET VEHICLE
  query =
    "CREATE TABLE IF NOT EXISTS `fleetvehicle` (" +
    "`fleetVehicleId` int(11) NOT NULL AUTO_INCREMENT," +
    "`fleetId` int(11) NOT NULL," +
    "`vehicleId` int(11) NOT NULL," +
    "`registeredAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP," +
    "PRIMARY KEY (`fleetVehicleId`)," +
    "UNIQUE KEY `fleetId` (`fleetId`,`vehicleId`)," +
    "KEY `vehicleId` (`vehicleId`))";
  await executeQuery(db, query);

  // FLEET LOCALISATION
  query =
    "CREATE TABLE IF NOT EXISTS `vehiclelocalisation` (" +
    "`localisationId` int(11) NOT NULL AUTO_INCREMENT," +
    "`fleetVehicleId` int(11) NOT NULL," +
    "`coordinates` varchar(50) NOT NULL," +
    "`dateIn` timestamp NULL DEFAULT CURRENT_TIMESTAMP," +
    "`dateOut` timestamp NULL DEFAULT NULL," +
    "PRIMARY KEY (`localisationId`)," +
    "KEY `fleetVehicleId` (`fleetVehicleId`))";
  await executeQuery(db, query);

  query =
    "INSERT INTO Fleet (userId) " +
    "SELECT * FROM ( " +
    "SELECT 100 UNION ALL " +
    "SELECT 200 UNION ALL " +
    "SELECT 300 " +
    ") AS tmp " +
    "WHERE NOT EXISTS (SELECT 1 FROM Fleet); ";
  await executeQuery(db, query);
}

async function executeQuery(db: mysql.Connection, query: string) {
  return new Promise<number>((resolve, reject) => {
    db.query(query, (error: any, results: string | any[]) => {
      if (error) {
        reject(error);
        resolve(0);
        throw new Error("Could not create table");
      } else {
        resolve(results.length);
      }
    });
  });
}
export { connectDB, closeDB };

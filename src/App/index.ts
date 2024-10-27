import { Command } from 'commander';
import * as dotenv from "dotenv";

import { VehicleLocalisation } from "../Domain/actions/VehicleLocalisation";
import { FleetVehicles } from "../Domain/actions/FleetVehicles";
import { Fleet } from "../Domain/actions/Fleet";
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') });
const program = new Command();


// program
//   .command('hello')
//   .description('Prints a hello message')
//   .option('-n, --name <name>', 'Specify a name')
//   .action((options) => {
//     console.log(`Hello, ${options.name}!`);
//     console.log('Database User:', process.env.DB_USER);
//     console.log('Database Password:', process.env.DB_PASSWORD);

//   });


// program
//   .command('goodbye')
//   .description('Prints a goodbye message')
//   .action(() => {
//     console.log('Goodbye, World!');
//   });


program
  .command('create <userId>')
  .description('Creates a fleet and returns a fleetId')
  .action(async (userId) => {
    const createNewFleet = new Fleet();
    const createFleetResult = await createNewFleet.CreateFleet(userId);
    console.log(createFleetResult);

  });

program
  .command('register-vehicle <fleetId> <vehiclePlateNumber>')
  .description('Registers a vehicle to a fleet')
  .action(async (fleetId, vehiclePlateNumber) => {
    const registerVehicle = new FleetVehicles();
    const registerVehicleResult = await registerVehicle.RegisterVehicle(
      fleetId, vehiclePlateNumber
    );
    console.log(registerVehicleResult);

  });

program
  .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]')
  .description('Localizes a vehicle in a fleet')
  .action(async (fleetId, vehiclePlateNumber, lat, lng, alt) => {
    const vehicleLocalisation = new VehicleLocalisation();
    const coordinates = alt ? `${lat} ${lng} ${alt}` : `${lat} ${lng}`;
    const localiseVehicle = await vehicleLocalisation.LocaliseVehicle(
      fleetId, vehiclePlateNumber, coordinates
    );

    console.log(localiseVehicle);

  });

// const main = async () => {
//   try {
//     // Create Fleet
//     const createNewFleet = new Fleet();
//     const createFleetResult = await createNewFleet.CreateFleet(1);
//     console.log(createFleetResult);


//     // Register Vehicle
//     const registerVehicle = new FleetVehicles();
//     const registerVehicleResult = await registerVehicle.RegisterVehicle(
//       1,
//       "25000"
//     );
//     console.log(registerVehicleResult);

//     // Register Parking Location
//     const vehicleLocalisation = new VehicleLocalisation();
//     const localiseVehicle = await vehicleLocalisation.LocaliseVehicle(
//       1,
//       "AN684",
//       "360 360 90"
//     );

//     console.log(localiseVehicle);

//     // De Localise
//     const vehicleDeLocalisation = new VehicleLocalisation();
//     const delocaliseVehicle = await vehicleDeLocalisation.DeLocaliseVehicle(
//       1,
//       "AN684"
//     );

//     console.log(delocaliseVehicle);
//   } catch (error) {
//     console.log(error);
//   }
// };



// main();

// Parse command line arguments
program.parse(process.argv);
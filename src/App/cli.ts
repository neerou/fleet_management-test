import { Command } from 'commander';
import * as dotenv from "dotenv";

import { VehicleLocalisation } from "../Domain/actions/VehicleLocalisation";
import { FleetVehicles } from "../Domain/actions/FleetVehicles";
import { Fleet } from "../Domain/actions/Fleet";
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') });
const program = new Command();

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

program
  .command('delocalize-vehicle <fleetId> <vehiclePlateNumber>')
  .description('Delocalizes a vehicle in a fleet')
  .action(async (fleetId, vehiclePlateNumber) => {
    const vehicleDeLocalisation = new VehicleLocalisation();
    const localiseVehicle = await vehicleDeLocalisation.DeLocaliseVehicle(
      fleetId, vehiclePlateNumber
    );

    console.log(localiseVehicle);

  });


// Parse command line arguments
program.parse(process.argv);
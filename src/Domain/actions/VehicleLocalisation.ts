import {
  LoadFleet,
  loadVehicleByPlateNumber,
  LoadFleetVehicle,
  LocaliseVehicle,
  IsCoordinateAvailable,
  loadParkedVehicleLocalisation,
  DeLocaliseVehicle,
} from "../../Infra/queries";
import { Codes, iResult, Messages } from "../models/iResult";

class VehicleLocalisation {
  public iResult: iResult;

  public async LocaliseVehicle(
    fleetId: number,
    plateNumber: string,
    coordinates: string
  ) {
    const vehicleInformation = await loadVehicleByPlateNumber(plateNumber);

    // If empty, create vehicle, then load the id
    if (!vehicleInformation) {
      this.iResult = { code: Codes.Failed, message: Messages.VEHICLE_NOT_FOUND };
      return this.iResult;
    }

    // if fleet does not exist, return
    const fleetInformation = await LoadFleet(fleetId);
    if (!fleetInformation) {
      this.iResult = { code: Codes.Failed, message: Messages.FLEET_NOT_FOUND };
      return this.iResult;
    }

    // If vehicle is not assigned to fleet, return
    const fleetToVehicle = await LoadFleetVehicle(
      fleetId,
      vehicleInformation.vehicleId
    );
    if (!fleetToVehicle) {
      this.iResult = { code: Codes.Failed, message: Messages.VEHICLE_NOT_FOUND_IN_FLEET };
      return this.iResult;
    }

    // If location coordinates is already taken
    const coordinatesAvailability = await IsCoordinateAvailable(coordinates);
    if (coordinatesAvailability > 0) {
      this.iResult = { code: Codes.Failed, message: Messages.LOCALISATION_TAKEN };
      return this.iResult;
    }



    // If all ok, we delocalise the current vehicle localisation then relocalise to new coordinates
    const deLocalisevehicle = await this.DeLocaliseVehicle(fleetId,
      plateNumber)
    if (deLocalisevehicle.code == Codes.Failed) {
      return deLocalisevehicle
    }


    // we localise the parking
    const localiseVehicle = await LocaliseVehicle(
      fleetToVehicle.fleetVehicleId,
      coordinates
    );
    this.iResult = { code: Codes.Success, message: Messages.PARKING_SUCCESS, insertedId: localiseVehicle };
    return this.iResult;
  }

  public async DeLocaliseVehicle(fleetId: number, plateNumber: string) {
    const vehicleInformation = await loadVehicleByPlateNumber(plateNumber);

    // If empty, create vehicle, then load the id
    if (!vehicleInformation) {
      return { code: Codes.Failed, message: Messages.VEHICLE_NOT_FOUND };

    }

    // if fleet does not exist, return
    const fleetInformation = await LoadFleet(fleetId);
    if (!fleetInformation) {
      return { code: Codes.Failed, message: Messages.FLEET_NOT_FOUND };
      //return "fleet does not exist";
    }

    // If vehicle is not assigned to fleet, return
    const fleetToVehicle = await LoadFleetVehicle(
      fleetId,
      vehicleInformation.vehicleId
    );
    if (!fleetToVehicle) {
      //return "Vehicle is not assigned to fleet. Cannot localise parking";
      return { code: Codes.Failed, message: Messages.VEHICLE_NOT_FOUND };
    }

    // If location coordinates is already taken
    const vehicleLocalisation = await loadParkedVehicleLocalisation(
      fleetToVehicle.fleetVehicleId
    );

    /*  if (!vehicleLocalisation) {
        return "This vehicle is not parked yet";
      }*/

    // we delocalise the parking

    if (vehicleLocalisation) {
      const localiseVehicle = await DeLocaliseVehicle(
        vehicleLocalisation.localisationId
      )
      this.iResult = { code: Codes.Success, message: Messages.DELOCALISED, insertedId: localiseVehicle };

    } else {
      this.iResult = { code: Codes.Warning, message: Messages.DELOCALISED };
    }


    return this.iResult;
  }
}
export { VehicleLocalisation };

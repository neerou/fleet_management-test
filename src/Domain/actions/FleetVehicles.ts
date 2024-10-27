import {
  loadVehicleByPlateNumber,
  RegisterVehicleToFleet,
  createVehicle,
  LoadFleet,
  LoadFleetVehicle,
} from "../../Infra/queries";
import { Codes, iResult, Messages } from "../models/iResult";

class FleetVehicles {
    public iResult: iResult;

  public async RegisterVehicle(fleetId: number, plateNumber: string) {
    // If Fleet Id does not exist, we return
    const fleetInfo = await LoadFleet(fleetId);
    if (!fleetInfo) {
      this.iResult = { code: Codes.Failed, message: Messages.FLEET_NOT_FOUND };
      return this.iResult;
    }

    // Load plate number
    const result = await loadVehicleByPlateNumber(plateNumber);
    let vehicleId = 0;

    // If empty, create vehicle, then load the id
    if (!result) {
      const result = await createVehicle(plateNumber);
      vehicleId = result;
    } else {
      vehicleId = result.vehicleId;
    }

    // If vehicle is already registered to fleet, we return
    const fleetVehicle = await LoadFleetVehicle(fleetId, vehicleId);

    if (fleetVehicle) {
      this.iResult = {code: Codes.Failed, message: Messages.DUPLICATE_ADD_FLEET};
      return this.iResult;
    }

    const registration = await RegisterVehicleToFleet(fleetId, vehicleId);
    this.iResult = {code: Codes.Success, message: Messages.SUCCESS_ADD_FLEET, insertedId:registration};

    return this.iResult
  }


  public async isVehicleExistInFleet( fleetId: number,
    plateNumber: string){
        const result = await loadVehicleByPlateNumber(plateNumber);
    if (!result) {
      return false;
    }
    const fleetVehicle = await LoadFleetVehicle(fleetId, result.vehicleId);

    if(!fleetVehicle){
return false
    }
    return true
  }

  public async LoadFleetVehicleByPlateNumber(
    fleetId: number,
    plateNumber: string
  ) {
    const result = await loadVehicleByPlateNumber(plateNumber);
    if (!result) {
        this.iResult = {code: Codes.Failed, message: Messages.VEHICLE_NOT_FOUND};
    }
    const fleetVehicle = await LoadFleetVehicle(fleetId, result.vehicleId);

    return fleetVehicle;
  }
}

export { FleetVehicles };

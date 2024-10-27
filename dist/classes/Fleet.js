"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = exports.Fleet = void 0;
class Fleet {
    constructor(fleetNumber) {
        this.VehiclesList = [];
        this.result = { code: 0, outcome: Messages.None };
        this.FleetNumber = fleetNumber;
        // load vehicles of this specific fleet
        this.VehiclesList = [];
    }
    addVehicle(vehicle_to_add) {
        // Check if it has been added to the same fleet
        if (this.isVehicleExist(vehicle_to_add)) {
            this.result = { code: -1, outcome: Messages.Duplicate_add_fleet };
        }
        else {
            const vehicle = {
                Vehicle: vehicle_to_add,
            };
            this.VehiclesList.push(vehicle);
            this.result = { code: 1, outcome: Messages.Success_add_fleet };
        }
    }
    getVehicles() {
        return this.VehiclesList;
    }
    getCurrentVehicle(vehicle_to_lookfor) {
        const foundVehicle = this.VehiclesList.find((eachVehicle) => eachVehicle.Vehicle.plateNumber === vehicle_to_lookfor.plateNumber) || null;
        return foundVehicle;
    }
    isVehicleExist(vehicle_to_lookfor) {
        if (this.VehiclesList.some((eachVehicle) => eachVehicle.Vehicle.plateNumber == vehicle_to_lookfor.plateNumber)) {
            return true;
        }
        return false;
    }
    ParkVehicle(vehicle_to_park, parkingInfo) {
        var _a;
        const current_vehicle = this.getCurrentVehicle(vehicle_to_park);
        if (current_vehicle == null) {
            this.result = { code: -1, outcome: Messages.Parking_Vehicle_not_found };
        }
        else if (((_a = current_vehicle.Parking) === null || _a === void 0 ? void 0 : _a.location) == parkingInfo.location) {
            this.result = { code: -1, outcome: Messages.Parking_Failed };
        }
        else {
            current_vehicle.Parking = parkingInfo;
            this.result = { code: 1, outcome: Messages.Parking_success };
        }
    }
}
exports.Fleet = Fleet;
var Messages;
(function (Messages) {
    Messages["None"] = "";
    Messages["Success_add_fleet"] = "Successfully added";
    Messages["Duplicate_add_fleet"] = "This vehicle has already been registered to fleet";
    Messages["Parking_success"] = "Successfully parked";
    Messages["Parking_Failed"] = "Vehicle already parked th this parking";
    Messages["Parking_Vehicle_not_found"] = "Vehicle not found";
})(Messages || (exports.Messages = Messages = {}));
//# sourceMappingURL=Fleet.js.map
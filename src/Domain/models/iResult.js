"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Codes = exports.Messages = void 0;
var Messages;
(function (Messages) {
    Messages["None"] = "";
    Messages["ADD_SUCCESS"] = "Successfully added";
    Messages["ADD_FAILED"] = "Fail to add";
    Messages["FLEET_NOT_FOUND"] = "Fleet not found";
    Messages["SUCCESS_ADD_FLEET"] = "Successfully added";
    Messages["VEHICLE_FOUND_IN_FLEET"] = "Vehicle is found in the fleet";
    Messages["DUPLICATE_ADD_FLEET"] = "This vehicle has already been registered to fleet";
    Messages["VEHICLE_NOT_FOUND_IN_FLEET"] = "This vehicle has not been registered to fleet";
    Messages["PARKING_SUCCESS"] = "Successfully parked";
    Messages["PARKING_FAILED"] = "Vehicle already parked this parking";
    Messages["PARKING_VEHICLE_NOT_FOUND"] = "Vehicle not found";
    Messages["VEHICLE_NOT_FOUND"] = "Vehicle not found";
    Messages["LOCALISATION_TAKEN"] = "Location is taken";
    Messages["DELOCALISED"] = "SUCCESSFULLY DELOCALISED";
})(Messages || (exports.Messages = Messages = {}));
var Codes;
(function (Codes) {
    Codes[Codes["Success"] = 1] = "Success";
    Codes[Codes["Failed"] = -1] = "Failed";
    Codes[Codes["Warning"] = 0] = "Warning";
})(Codes || (exports.Codes = Codes = {}));

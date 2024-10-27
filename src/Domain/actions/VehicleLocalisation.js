"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleLocalisation = void 0;
var queries_1 = require("../../Infra/queries");
var iResult_1 = require("../models/iResult");
var VehicleLocalisation = /** @class */ (function () {
    function VehicleLocalisation() {
    }
    VehicleLocalisation.prototype.LocaliseVehicle = function (fleetId, plateNumber, coordinates) {
        return __awaiter(this, void 0, void 0, function () {
            var vehicleInformation, fleetInformation, fleetToVehicle, coordinatesAvailability, deLocalisevehicle, localiseVehicle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, queries_1.loadVehicleByPlateNumber)(plateNumber)];
                    case 1:
                        vehicleInformation = _a.sent();
                        // If empty, create vehicle, then load the id
                        if (!vehicleInformation) {
                            this.iResult = { code: iResult_1.Codes.Failed, message: iResult_1.Messages.VEHICLE_NOT_FOUND };
                            return [2 /*return*/, this.iResult];
                        }
                        return [4 /*yield*/, (0, queries_1.LoadFleet)(fleetId)];
                    case 2:
                        fleetInformation = _a.sent();
                        if (!fleetInformation) {
                            this.iResult = { code: iResult_1.Codes.Failed, message: iResult_1.Messages.FLEET_NOT_FOUND };
                            return [2 /*return*/, this.iResult];
                        }
                        return [4 /*yield*/, (0, queries_1.LoadFleetVehicle)(fleetId, vehicleInformation.vehicleId)];
                    case 3:
                        fleetToVehicle = _a.sent();
                        if (!fleetToVehicle) {
                            this.iResult = { code: iResult_1.Codes.Failed, message: iResult_1.Messages.VEHICLE_NOT_FOUND_IN_FLEET };
                            return [2 /*return*/, this.iResult];
                        }
                        return [4 /*yield*/, (0, queries_1.IsCoordinateAvailable)(coordinates)];
                    case 4:
                        coordinatesAvailability = _a.sent();
                        if (coordinatesAvailability > 0) {
                            this.iResult = { code: iResult_1.Codes.Failed, message: iResult_1.Messages.LOCALISATION_TAKEN };
                            return [2 /*return*/, this.iResult];
                        }
                        return [4 /*yield*/, this.DeLocaliseVehicle(fleetId, plateNumber)];
                    case 5:
                        deLocalisevehicle = _a.sent();
                        if (deLocalisevehicle.code == iResult_1.Codes.Failed) {
                            return [2 /*return*/, deLocalisevehicle];
                        }
                        return [4 /*yield*/, (0, queries_1.LocaliseVehicle)(fleetToVehicle.fleetVehicleId, coordinates)];
                    case 6:
                        localiseVehicle = _a.sent();
                        this.iResult = { code: iResult_1.Codes.Success, message: iResult_1.Messages.PARKING_SUCCESS, insertedId: localiseVehicle };
                        return [2 /*return*/, this.iResult];
                }
            });
        });
    };
    VehicleLocalisation.prototype.DeLocaliseVehicle = function (fleetId, plateNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var vehicleInformation, fleetInformation, fleetToVehicle, vehicleLocalisation, localiseVehicle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, queries_1.loadVehicleByPlateNumber)(plateNumber)];
                    case 1:
                        vehicleInformation = _a.sent();
                        // If empty, create vehicle, then load the id
                        if (!vehicleInformation) {
                            return [2 /*return*/, { code: iResult_1.Codes.Failed, message: iResult_1.Messages.VEHICLE_NOT_FOUND }];
                        }
                        return [4 /*yield*/, (0, queries_1.LoadFleet)(fleetId)];
                    case 2:
                        fleetInformation = _a.sent();
                        if (!fleetInformation) {
                            return [2 /*return*/, { code: iResult_1.Codes.Failed, message: iResult_1.Messages.FLEET_NOT_FOUND }];
                            //return "fleet does not exist";
                        }
                        return [4 /*yield*/, (0, queries_1.LoadFleetVehicle)(fleetId, vehicleInformation.vehicleId)];
                    case 3:
                        fleetToVehicle = _a.sent();
                        if (!fleetToVehicle) {
                            //return "Vehicle is not assigned to fleet. Cannot localise parking";
                            return [2 /*return*/, { code: iResult_1.Codes.Failed, message: iResult_1.Messages.VEHICLE_NOT_FOUND }];
                        }
                        return [4 /*yield*/, (0, queries_1.loadParkedVehicleLocalisation)(fleetToVehicle.fleetVehicleId)];
                    case 4:
                        vehicleLocalisation = _a.sent();
                        if (!vehicleLocalisation) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, queries_1.DeLocaliseVehicle)(vehicleLocalisation.localisationId)];
                    case 5:
                        localiseVehicle = _a.sent();
                        this.iResult = { code: iResult_1.Codes.Success, message: iResult_1.Messages.DELOCALISED, insertedId: localiseVehicle };
                        return [3 /*break*/, 7];
                    case 6:
                        this.iResult = { code: iResult_1.Codes.Warning, message: iResult_1.Messages.DELOCALISED };
                        _a.label = 7;
                    case 7: return [2 /*return*/, this.iResult];
                }
            });
        });
    };
    return VehicleLocalisation;
}());
exports.VehicleLocalisation = VehicleLocalisation;

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
exports.createVehicle = createVehicle;
exports.RegisterVehicleToFleet = RegisterVehicleToFleet;
exports.loadVehicleByPlateNumber = loadVehicleByPlateNumber;
exports.createFleet = createFleet;
exports.LoadFleet = LoadFleet;
exports.LocaliseVehicle = LocaliseVehicle;
exports.LoadFleetVehicle = LoadFleetVehicle;
exports.IsCoordinateAvailable = IsCoordinateAvailable;
exports.loadParkedVehicleLocalisation = loadParkedVehicleLocalisation;
exports.DeLocaliseVehicle = DeLocaliseVehicle;
var db_1 = require("./db");
function createFleet(userid) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    query = "INSERT INTO Fleet (UserId) VALUES (?)";
                    result = new Promise(function (resolve, reject) {
                        db.query(query, [userid], function (error, results) {
                            if (error) {
                                reject(error);
                                resolve(-1);
                            }
                            else {
                                resolve(results.insertId);
                            }
                        });
                    });
                    return [4 /*yield*/, (0, db_1.closeDB)(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function createVehicle(PlateNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    query = "INSERT INTO vehicle (PlateNumber) VALUES ( ?)";
                    result = new Promise(function (resolve, reject) {
                        db.query(query, [PlateNumber], function (error, results) {
                            if (error) {
                                reject(error);
                                resolve(-1);
                            }
                            else {
                                resolve(results.insertId);
                            }
                        });
                    });
                    return [4 /*yield*/, (0, db_1.closeDB)(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function RegisterVehicleToFleet(fleetId, vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    query = "INSERT INTO FleetVehicle (fleetId , vehicleId ) VALUES (?, ?)";
                    result = new Promise(function (resolve, reject) {
                        db.query(query, [fleetId, vehicleId], function (error, results) {
                            if (error) {
                                reject(error);
                                resolve(-1);
                            }
                            else {
                                resolve(results.insertId);
                            }
                        });
                    });
                    return [4 /*yield*/, (0, db_1.closeDB)(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function LoadFleetVehicle(fleetId, vehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    query = "SELECT * FROM  fleetvehicle WHERE fleetId  = ? and vehicleId =?";
                    result = new Promise(function (resolve, reject) {
                        db.query(query, [fleetId, vehicleId], function (error, results) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                if (results.length === 0) {
                                    resolve(null);
                                }
                                else {
                                    var fleetVehicle = {
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
                    return [4 /*yield*/, (0, db_1.closeDB)(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function LocaliseVehicle(fleetVehicleId, coordinates) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    query = "INSERT INTO VehicleLocalisation (fleetVehicleId , coordinates ) VALUES (?, ?)";
                    result = new Promise(function (resolve, reject) {
                        db.query(query, [fleetVehicleId, coordinates], function (error, results) {
                            if (error) {
                                reject(error);
                                resolve(-1);
                            }
                            else {
                                resolve(results.insertId);
                            }
                        });
                    });
                    return [4 /*yield*/, (0, db_1.closeDB)(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function DeLocaliseVehicle(localisationId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    query = "UPDATE VehicleLocalisation Set dateOut=CURRENT_TIMESTAMP Where localisationId=?";
                    result = new Promise(function (resolve, reject) {
                        db.query(query, [localisationId], function (error, results) {
                            if (error) {
                                reject(error);
                                resolve(-1);
                            }
                            else {
                                resolve(results);
                            }
                        });
                    });
                    return [4 /*yield*/, (0, db_1.closeDB)(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function loadParkedVehicleLocalisation(fleetVehicleId) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    query = "SELECT * FROM  vehicleLocalisation WHERE fleetVehicleId   = ? and dateOut is null";
                    result = new Promise(function (resolve, reject) {
                        db.query(query, [fleetVehicleId], function (error, results) {
                            if (error) {
                                resolve(null);
                                reject(error);
                            }
                            else {
                                if (results.length === 0) {
                                    resolve(null);
                                }
                                else {
                                    var vehiclelocalisation = {
                                        localisationId: results[0].localisationId,
                                        fleetVehicleId: results[0].fleetVehicleId,
                                        coordinates: results[0].coordinates,
                                        timeIn: results[0].timeIn,
                                        timeOut: results[0].timeOut
                                    };
                                    resolve(vehiclelocalisation);
                                }
                            }
                        });
                    });
                    return [4 /*yield*/, (0, db_1.closeDB)(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function IsCoordinateAvailable(coordinates) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    query = "SELECT * FROM  VehicleLocalisation WHERE coordinates  = ? or (coordinates= ? and dateOut is null) ";
                    result = new Promise(function (resolve, reject) {
                        db.query(query, [coordinates, coordinates], function (error, results) {
                            if (error) {
                                reject(error);
                                resolve(0);
                            }
                            else {
                                resolve(results.length);
                            }
                        });
                    });
                    return [4 /*yield*/, (0, db_1.closeDB)(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function loadVehicleByPlateNumber(plateNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    query = "SELECT * FROM  Vehicle WHERE plateNumber  = ?";
                    result = new Promise(function (resolve, reject) {
                        db.query(query, [plateNumber], function (error, results) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                if (results.length === 0) {
                                    resolve(null);
                                }
                                else {
                                    var vehicle = {
                                        vehicleId: results[0].vehicleId,
                                        plateNumber: results[0].plateNumber,
                                    };
                                    resolve(vehicle);
                                }
                            }
                        });
                    });
                    return [4 /*yield*/, (0, db_1.closeDB)(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function LoadFleet(fleet_id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, db_1.connectDB)()];
                case 1:
                    db = _a.sent();
                    query = "SELECT * FROM  Fleet WHERE FleetId = ?";
                    result = new Promise(function (resolve, reject) {
                        db.query(query, [fleet_id], function (error, results) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                if (results.length === 0) {
                                    resolve(null);
                                }
                                else {
                                    var fleet = {
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
                    return [4 /*yield*/, (0, db_1.closeDB)(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}

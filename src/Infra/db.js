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
exports.connectDB = connectDB;
exports.closeDB = closeDB;
var dotenv = require("dotenv");
var mysql = require("mysql");
dotenv.config();
function connectDB() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, connect_db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = {
                        host: process.env.DB_HOST,
                        port: Number(process.env.DB_PORT),
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                    };
                    connect_db = mysql.createConnection(connection);
                    connect_db.connect(function (err) {
                        if (err) {
                            console.error("Error connecting to the database:", err);
                            throw new Error("Database connection error: " + err);
                        }
                        //console.log('Connected to the MySQL database');
                    });
                    // Create initial tables
                    // todo: to improve this so that it runs once only
                    return [4 /*yield*/, CreateTables(connect_db)];
                case 1:
                    // Create initial tables
                    // todo: to improve this so that it runs once only
                    _a.sent();
                    return [2 /*return*/, connect_db];
            }
        });
    });
}
function closeDB(connect_db) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                connect_db.end();
                //console.log('Database connection closed');
            }
            catch (err) {
                console.error("Error closing the database connection:", err);
                throw new Error("Error closing the database connection: " + err);
            }
            return [2 /*return*/];
        });
    });
}
function CreateTables(db) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "CREATE TABLE IF NOT EXISTS `fleet` (" +
                        "`fleetId` int(11) NOT NULL AUTO_INCREMENT," +
                        "`userId` int(11) NOT NULL," +
                        "`createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP," +
                        "PRIMARY KEY (`fleetId`))";
                    return [4 /*yield*/, executeQuery(db, query)];
                case 1:
                    _a.sent();
                    // VEHICLE TABLE
                    query =
                        "CREATE TABLE IF NOT EXISTS `vehicle` (" +
                            "`vehicleId` int(11) NOT NULL AUTO_INCREMENT," +
                            "`plateNumber` varchar(20) NOT NULL," +
                            "PRIMARY KEY (`vehicleId`)," +
                            "UNIQUE KEY `plateNumber` (`plateNumber`))";
                    return [4 /*yield*/, executeQuery(db, query)];
                case 2:
                    _a.sent();
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
                    return [4 /*yield*/, executeQuery(db, query)];
                case 3:
                    _a.sent();
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
                    return [4 /*yield*/, executeQuery(db, query)];
                case 4:
                    _a.sent();
                    query =
                        "INSERT INTO Fleet (userId) " +
                            "SELECT * FROM ( " +
                            "SELECT 100 UNION ALL " +
                            "SELECT 200 UNION ALL " +
                            "SELECT 300 " +
                            ") AS tmp " +
                            "WHERE NOT EXISTS (SELECT 1 FROM Fleet); ";
                    return [4 /*yield*/, executeQuery(db, query)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function executeQuery(db, query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    db.query(query, function (error, results) {
                        if (error) {
                            reject(error);
                            resolve(0);
                            throw new Error("Could not create table");
                        }
                        else {
                            resolve(results.length);
                        }
                    });
                })];
        });
    });
}

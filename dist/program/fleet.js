#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const models_1 = require("../models");
const program = new commander_1.Command();
// Sync database at start
(0, models_1.syncDatabase)().then(() => console.log('Database synced'));
// Create fleet command
program
    .command('create <userId>')
    .description('Create a new fleet for a user and return the fleetId')
    .action((userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleet = yield models_1.Fleet.create({ userId });
        console.log(fleet.id);
    }
    catch (error) {
        console.error('Error creating fleet:', error);
    }
}));
// Register vehicle command
program
    .command('register-vehicle <fleetId> <vehiclePlateNumber>')
    .description('Register a vehicle to a fleet')
    .action((fleetId, vehiclePlateNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleet = yield models_1.Fleet.findByPk(fleetId);
        if (!fleet) {
            console.error(`Fleet ${fleetId} does not exist`);
            return;
        }
        const vehicle = yield models_1.Vehicle.create({
            plateNumber: vehiclePlateNumber,
            FleetId: fleet.id, // Associate vehicle with the fleet
        });
        console.log(`Vehicle ${vehiclePlateNumber} registered to fleet ${fleetId}`);
    }
    catch (error) {
        console.error('Error registering vehicle:', error);
    }
}));
// Localize vehicle command
program
    .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]')
    .description('Localize a vehicle by its plate number with coordinates')
    .action((fleetId_1, vehiclePlateNumber_1, lat_1, lng_1, ...args_1) => __awaiter(void 0, [fleetId_1, vehiclePlateNumber_1, lat_1, lng_1, ...args_1], void 0, function* (fleetId, vehiclePlateNumber, lat, lng, alt = 0) {
    try {
        const fleet = yield models_1.Fleet.findByPk(fleetId, { include: ['vehicles'] });
        if (!fleet) {
            console.error(`Fleet ${fleetId} does not exist`);
            return;
        }
        const vehicle = fleet.vehicles.find((v) => v.plateNumber === vehiclePlateNumber);
        if (!vehicle) {
            console.error(`Vehicle ${vehiclePlateNumber} not found in fleet ${fleetId}`);
            return;
        }
        vehicle.lat = lat;
        vehicle.lng = lng;
        vehicle.alt = alt;
        yield vehicle.save();
        console.log(`Vehicle ${vehiclePlateNumber} localized at (${lat}, ${lng}, ${alt})`);
    }
    catch (error) {
        console.error('Error localizing vehicle:', error);
    }
}));
program.parse(process.argv);
//# sourceMappingURL=fleet.js.map
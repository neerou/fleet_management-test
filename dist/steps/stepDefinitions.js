"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = require("assert");
const Fleet_1 = require("../classes/Fleet");
const Vehicle_1 = require("../classes/Vehicle");
const Parking_1 = require("../classes/Parking");
let vehicle;
let myParking;
let myFleet;
let otherFleet;
(0, cucumber_1.Given)("my fleet {int}", function (fleetNumber) {
    myFleet = new Fleet_1.Fleet(fleetNumber);
});
(0, cucumber_1.Given)("the fleet of another user {int}", function (otherFleetId) {
    otherFleet = new Fleet_1.Fleet(otherFleetId);
});
(0, cucumber_1.Given)("a vehicle {string}", function (licensePlate) {
    vehicle = new Vehicle_1.Vehicle(licensePlate);
});
(0, cucumber_1.Given)("this vehicle has been registered into the other user's fleet", function () {
    // Register the vehicle into the other user's fleet for the scenario
    otherFleet.addVehicle(vehicle); // Assume fleet "1235" exists
    assert_1.strict.equal(otherFleet.result.outcome, Fleet_1.Messages.Success_add_fleet);
});
(0, cucumber_1.Given)("a location {string}", function (location) {
    myParking = new Parking_1.Parking(1, "", location);
});
(0, cucumber_1.Given)("my vehicle has been parked into this location", function () {
    var _a;
    myFleet.ParkVehicle(vehicle, myParking);
    const mycurrent_vehicle_infos = myFleet.getCurrentVehicle(vehicle);
    assert_1.strict.equal((_a = mycurrent_vehicle_infos === null || mycurrent_vehicle_infos === void 0 ? void 0 : mycurrent_vehicle_infos.Parking) === null || _a === void 0 ? void 0 : _a.location, myParking.location);
});
(0, cucumber_1.Given)("I have registered this vehicle into my fleet", function () {
    myFleet.addVehicle(vehicle); // Register the vehicle in the fleet
    const found = myFleet.isVehicleExist(vehicle);
    assert_1.strict.equal(found, true);
});
(0, cucumber_1.When)("I register this vehicle into my fleet", function () {
    myFleet.addVehicle(vehicle); // Register the vehicle in the fleet
    assert_1.strict.equal(myFleet.result.outcome, Fleet_1.Messages.Success_add_fleet);
});
(0, cucumber_1.When)("I try to register this vehicle into my fleet", function () {
    myFleet.addVehicle(vehicle); // Try to register the same vehicle again
    // assert.equal(myFleetManagement.result.outcome,Messages.Duplicate_add_fleet)
});
(0, cucumber_1.When)("I park my vehicle at this location", function () {
    myFleet.ParkVehicle(vehicle, myParking);
    assert_1.strict.equal(myFleet.result.outcome, Fleet_1.Messages.Parking_success);
});
(0, cucumber_1.When)("I try to park my vehicle at this location", function () {
    myFleet.ParkVehicle(vehicle, myParking);
});
(0, cucumber_1.Then)("this vehicle should be part of my vehicle fleet", function () {
    const found = myFleet.isVehicleExist(vehicle);
    assert_1.strict.equal(found, true);
});
(0, cucumber_1.Then)("I should be informed that this vehicle has already been registered into my fleet", function () {
    assert_1.strict.equal(myFleet.result.outcome, Fleet_1.Messages.Duplicate_add_fleet);
});
(0, cucumber_1.Then)("the known location of my vehicle should verify this location", function () {
    var _a;
    const mycurrent_vehicle_infos = myFleet.getCurrentVehicle(vehicle);
    assert_1.strict.equal((_a = mycurrent_vehicle_infos === null || mycurrent_vehicle_infos === void 0 ? void 0 : mycurrent_vehicle_infos.Parking) === null || _a === void 0 ? void 0 : _a.location, myParking.location);
});
(0, cucumber_1.Then)("I should be informed that my vehicle is already parked at this location", function () {
    assert_1.strict.equal(myFleet.result.outcome, Fleet_1.Messages.Parking_Failed);
});
//# sourceMappingURL=stepDefinitions.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parking = void 0;
class Parking {
    constructor(id, name, location) {
        this.id = id;
        this.name = name;
        this.location = location;
    }
    displayInfo() {
        return `Parking ID: ${this.id}, Name: ${this.name}, Location: ${this.location}`;
    }
}
exports.Parking = Parking;
//# sourceMappingURL=Parking.js.map
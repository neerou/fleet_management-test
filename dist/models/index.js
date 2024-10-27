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
exports.Vehicle = exports.Fleet = void 0;
exports.syncDatabase = syncDatabase;
const sequelize_1 = require("sequelize");
// Initialize SQLite database
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './fleetDB.sqlite', // SQLite database file
});
// Define Fleet Model
class Fleet extends sequelize_1.Model {
}
exports.Fleet = Fleet;
Fleet.init({
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Fleet',
});
// Define Vehicle Model
class Vehicle extends sequelize_1.Model {
}
exports.Vehicle = Vehicle;
Vehicle.init({
    plateNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lat: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    lng: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    alt: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Vehicle',
});
// Define relationships
Fleet.hasMany(Vehicle, { as: 'vehicles' });
Vehicle.belongsTo(Fleet);
// Sync database
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.sync();
    });
}
exports.default = sequelize;
//# sourceMappingURL=index.js.map
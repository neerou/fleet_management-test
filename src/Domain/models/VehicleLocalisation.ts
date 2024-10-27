interface VehicleLocalisation{
    localisationId   : number;
    fleetVehicleId   : number;
    coordinates :string;
    timeIn:Date;
    timeOut:Date
}

export{VehicleLocalisation}
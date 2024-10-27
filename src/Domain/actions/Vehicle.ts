
import { createVehicle,loadVehicleByPlateNumber } from '../../Infra/queries'

class Vehicle {
    public async CreateVehicle(plateNumber :string){
     const result = await createVehicle(plateNumber)
     return result
    }

    public async GetVehicleByPlateNumber(plateNumber :string){
        const result = await loadVehicleByPlateNumber(plateNumber)
        return result
    }

}
export{Vehicle}
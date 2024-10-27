import { createFleet, LoadFleet } from "../../Infra/queries";
import { Codes, iResult, Messages } from "../models/iResult";

class Fleet {

  private iResult: iResult;
  public async CreateFleet(user_id: number) {
    const result = await createFleet(user_id);

    if(result){
      this.iResult = { code: Codes.Success, message: Messages.SUCCESS_ADD_FLEET, insertedId:result};      
    }else{
      this.iResult = { code: Codes.Failed, message: Messages.ADD_FAILED};      
    }
    return this.iResult;
  }

  public async LoadFleet(fleet_id: number) {
    const rows = await LoadFleet(fleet_id);

    return rows;
  }
}
export { Fleet };

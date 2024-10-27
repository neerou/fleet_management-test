
type iResult = {
  code: Codes;
  message: Messages;
  insertedId?: number
};
enum Messages {
  None = "",
  ADD_SUCCESS = "Successfully added",
  ADD_FAILED = "Fail to add",
  FLEET_NOT_FOUND = "Fleet not found",
  SUCCESS_ADD_FLEET = "Successfully added",
  VEHICLE_FOUND_IN_FLEET = "Vehicle is found in the fleet",
  DUPLICATE_ADD_FLEET = "This vehicle has already been registered to fleet",
  VEHICLE_NOT_FOUND_IN_FLEET = "This vehicle has not been registered to fleet",
  PARKING_SUCCESS = "Successfully parked",
  PARKING_FAILED = "Vehicle already parked this parking",
  PARKING_VEHICLE_NOT_FOUND = "Vehicle not found",
  VEHICLE_NOT_FOUND = "Vehicle not found",
  LOCALISATION_TAKEN = 'Location is taken',
  DELOCALISED = 'SUCCESSFULLY DELOCALISED'
}
enum Codes {
  Success = 1,
  Failed = -1,
  Warning = 0

}
export { iResult, Messages, Codes }

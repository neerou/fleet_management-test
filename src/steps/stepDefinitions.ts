import { Given, When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { Messages } from "../Domain/models/iResult";
import { VehicleLocalisation } from "../Domain/actions/VehicleLocalisation";
import { FleetVehicles } from "../Domain/actions/FleetVehicles";




const main = async () => {

  try {


    // Create Fleet 

    /*
    const createNewFleet = new Fleet()
    const createFleetResult = await createNewFleet.CreateFleet(1)
    console.log(createFleetResult)
    */

    // Register Vehicle 
    /*const registerVehicle = new FleetVehicles()
    const registerVehicleResult = await registerVehicle.RegisterVehicle(1,'25000')
    console.log(registerVehicleResult)*/


    // Register Parking Location 
    const vehicleLocalisation = new VehicleLocalisation()
    const localiseVehicle = await vehicleLocalisation.LocaliseVehicle(10, "963", "20 20")

    console.log(localiseVehicle)




    // De Localise 
    /*const vehicleDeLocalisation = new VehicleLocalisation()
    const delocaliseVehicle = await vehicleDeLocalisation.DeLocaliseVehicle(1,"XY123")
    
    console.log(delocaliseVehicle)*/
  } catch (error) {
    console.log(error)
  }


};

main()





/** */
let myFleetNumber = 0
let otherFleetNumber = 0
let myVehicleNumber = ''
let locationCoordinate = ''
let vehicleRegistration = new FleetVehicles()
let vehicleLocalisation = new VehicleLocalisation()
/** */



Given("my fleet {int}", function (fleetId: number) {
  myFleetNumber = fleetId

  log('---------------------------------------------\n')
  log('My Fleet Id "' + myFleetNumber + '"')
});


Given("the fleet of another user {int}", function (otherFleetId: number) {
  otherFleetNumber = otherFleetId
  log('Other user Fleet Id "' + otherFleetNumber + '"')
});



Given("a vehicle {string}", function (vehicleNumber: string) {
  myVehicleNumber = vehicleNumber
  log('Vehicle Plate Number ' + myVehicleNumber + '"')
});



Given(
  "this vehicle has been registered into the other user's fleet",
  async function () {
    await vehicleRegistration.RegisterVehicle(otherFleetNumber, myVehicleNumber)

    const isRegistered = await vehicleRegistration.isVehicleExistInFleet(otherFleetNumber, myVehicleNumber)
    assert.equal(isRegistered, true);
    log('I have registered my vehicle "' + myVehicleNumber + '" into other user fleet "' + otherFleetNumber + '"' + ". Outcome? " + isRegistered)
  }
);

Given("a location {string}", function (location: string) {
  locationCoordinate = location

  log('A Location given "' + locationCoordinate + '"')

});

Given("my vehicle has been parked into this location", async function () {


  await vehicleLocalisation.LocaliseVehicle(myFleetNumber, myVehicleNumber, locationCoordinate)
  //assert.equal(vehicleLocalisation.iResult.message, Messages.Parking_success);

  log('Vehicle "' + myVehicleNumber + '" of fleet "' + myFleetNumber + '" is now parked in  location "' + locationCoordinate + '"')
});

Given("I have registered this vehicle into my fleet", async function () {
  await vehicleRegistration.RegisterVehicle(myFleetNumber, myVehicleNumber)
  log('I have registered "' + myVehicleNumber + '" into my fleet Number "' + myFleetNumber + '"')
});


When("I register this vehicle into my fleet", async function () {
  await vehicleRegistration.RegisterVehicle(myFleetNumber, myVehicleNumber)
  log('I register "' + myVehicleNumber + '" into my fleet  "' + myFleetNumber + '"')
});


When("I try to register this vehicle into my fleet", async function () {
  await vehicleRegistration.RegisterVehicle(myFleetNumber, myVehicleNumber)
  log('I try to register ' + myVehicleNumber + ' into my fleet  ==>' + myFleetNumber)

});

When("I park my vehicle at this location", async function () {
  await vehicleLocalisation.LocaliseVehicle(myFleetNumber, myVehicleNumber, locationCoordinate)
  //assert.equal(vehicleLocalisation.iResult.message, Messages.Parking_success);

  log('Vehicle "' + myVehicleNumber + '" of fleet "' + myFleetNumber + '" is now parked in  location "' + locationCoordinate + '"')
});

When("I try to park my vehicle at this location", async function () {

  await vehicleLocalisation.LocaliseVehicle(myFleetNumber, myVehicleNumber, locationCoordinate)

  log('Vehicle "' + myVehicleNumber + '" of fleet "' + myFleetNumber + '" attempted to park in  location "' + locationCoordinate + '"')
});


Then("this vehicle should be part of my vehicle fleet", async function () {
  const result = await vehicleRegistration.isVehicleExistInFleet(myFleetNumber, myVehicleNumber)
  assert.equal(result, true);

  const fleetInfo = await vehicleRegistration.LoadFleetVehicleByPlateNumber(myFleetNumber, myVehicleNumber)
  log(JSON.stringify(fleetInfo))
});

Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  function () {

    const outcome = vehicleRegistration.iResult
    log(outcome.message);
    //log(Messages.DUPLICATE_ADD_FLEET)
    assert.equal(outcome.message.trim(), Messages.DUPLICATE_ADD_FLEET);

  }


);

Then(
  "the known location of my vehicle should verify this location",
  function () {
    //assert.equal(vehicleLocalisation.iResult.message, Messages.Parking_success);
    log('Vehicle "' + myVehicleNumber + '" of fleet "' + myFleetNumber + '" parked at location "' + locationCoordinate + '"')
  }
);
Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    assert.equal(vehicleLocalisation.iResult.message, Messages.LOCALISATION_TAKEN);
    log('Vehicle "' + myVehicleNumber + '" of fleet "' + myFleetNumber + '" failed to park at location "' + locationCoordinate + '"')
  }
);


function log(message: string) {
  console.log(message)
}

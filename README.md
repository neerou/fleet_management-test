# Test Technique

a. FizzBuzz execution
    1. tsc src\App\fizzbuzz.ts
    2. node  src\App\fizzbuzz.js


b. Steps to run this Fleet Project:
    1. Use of MySql database
    2. Setup database settings inside `.env` file
    3. tsc src\App\cli.ts
    
    Create a fleet with a userId : `node src\App\cli.js create <userid>`
    Register a vehicle into a fleet : `node src\App\cli.js  <fleetId> <vehiclePlateNumber>`
    Localise a vehicle  : `node  src\App\cli.js localize-vehicle <fleetId> <vehiclePlateNumber> <xx xx xx>` - <coordx coordy alt>
    Delocalise a vehicle  : `node  src\App\cli.js delocalize-vehicle <fleetId> <vehiclePlateNumber>`





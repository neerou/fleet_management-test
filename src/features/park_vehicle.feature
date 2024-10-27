Feature: Park a vehicle

    In order to not forget where I've parked my vehicle
    As an application user
    I should be able to indicate my vehicle location

    Background:
        Given my fleet 1
        And a vehicle "VEH106"
        And I have registered this vehicle into my fleet

    @critical
    Scenario: Successfully park a vehicle
        And a location "40.712776, -74.005974"
        When I park my vehicle at this location
        Then the known location of my vehicle should verify this location

    Scenario: Successfully park a vehicle
        And a location "140.712776, -174.005974"
        When I park my vehicle at this location
        Then the known location of my vehicle should verify this location

    Scenario: Can't localize my vehicle to the same location two times in a row
        And a location "40.712776, -74.005974"
        And my vehicle has been parked into this location
        When I try to park my vehicle at this location
        Then I should be informed that my vehicle is already parked at this location

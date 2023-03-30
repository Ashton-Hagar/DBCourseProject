-- SELECT statements
-- grabs customers where firstName = "Name" and their ssn=x
SELECT * FROM customer
WHERE firstName="Name" AND ssn=x;

-- grabs employees where firstName = "Name" and their ssn=x
SELECT * FROM employee
WHERE firstName="Name" AND ssn=x;

-- grabs all unbooked roomID between selected dates,
-- endD is selected endDate, startD is selected startDate
-- note: this is built assuming user cannot input endD earlier than startD
SELECT * FROM hotelRoom
WHERE roomID = (SELECT roomID FROM bookings
                              WHERE (startD > endDate) OR (endD < startDate));

-- grabs all prices, addresses, and room numbers of hotel rooms with x capacity
SELECT price, addy, roomNumber FROM hotelRoom
WHERE capacity = x;




-- DELETE statements
-- deleting hotel room with ID of x
DELETE FROM hotelRoom WHERE roomID=x;

-- deleting hotel where hotel addy is "addy"
DELETE FROM hotelRoom WHERE addy = "addy";
DELETE FROM hotel WHERE addy = "addy";

-- deleting hotel chain given hotel chain_name
DELETE FROM hotelRoom WHERE addy = (
    SELECT addy FROM hotel
                WHERE chainName = chain_name);
DELETE FROM hotel WHERE chainName = chain_name;
DELETE FROM hotelChain WHERE chainName = chain_name;
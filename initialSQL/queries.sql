-- SELECT statements
-- grabs customers where firstName = "Name" and their ssn=x
SELECT * FROM customer
WHERE firstName="Name" AND ssn=x;

-- grabs employees where firstName = "Name" and their ssn=x
SELECT * FROM employee
WHERE firstName="Name" AND ssn=x;

-- grabs all unbooked roomID between selected dates,
-- endD is selected endDate, startD is selected startDate by user
-- note: this is built assuming user cannot input endD earlier than startD
SELECT * FROM hotelRoom
WHERE NOT roomID = ((SELECT roomID FROM bookings
                              WHERE ((startDate < startD < endDate)
                                 OR (endDate > endD > startDate)) OR
                                  (startD < startDate AND endD > endDate));

-- grabs all prices, addresses, and room numbers of hotel rooms with x capacity
SELECT price, addy, roomNumber FROM hotelRoom
WHERE capacity = x;
-- grabs customerID based on their ssn input (ssnInput)
SELECT customerID FROM customers
WHERE ssn = ssnInput;
-- grabs bookings of customer from their ID (custID)
SELECT * FROM bookings
WHERE customerID = custID;
-- grabs past rentings of customer from their ID (custID)
SELECT * FROM rentings
WHERE customerID = custID;
-- all together from above, grabs bookings/rentings based on their ssn (ssnInput)
SELECT * FROM bookings
WHERE customerID = (SELECT customerID FROM customers
                                      WHERE ssn = ssnInput);
SELECT * FROM rentings
WHERE customerID = (SELECT customerID FROM customers
                    WHERE ssn = ssnInput);
-- find all rooms where price is below or equal to input (inputPrice)
SELECT * FROM hotelRoom
WHERE inputPrice >= price;



-- trigger for the following updates to amenities
CREATE TRIGGER invalidRoomID
BEFORE UPDATE ON amenities
FOR EACH ROW
BEGIN
    IF(rmID NOT IN(SELECT roomID FROM amenities)) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid inputted roomID.';
    END IF;
END;

-- UPDATE statements
-- these update amenities if a specific amenity was added in a roomID = rmID
UPDATE amenities
SET fridge = 1 WHERE roomID = rmID;
UPDATE amenities
SET TV = 1 WHERE roomID = rmID;
UPDATE amenities
SET AC = 1 WHERE roomID = rmID;
UPDATE amenities
SET microwave = 1 WHERE roomID = rmID;
UPDATE amenities
SET coffeeMaker = 1 WHERE roomID = rmID;
-- these update amenities if a specific amenity was removed from a roomID = rmID
UPDATE amenities
SET fridge = 0 WHERE roomID = rmID;
UPDATE amenities
SET TV = 0 WHERE roomID = rmID;
UPDATE amenities
SET AC = 0 WHERE roomID = rmID;
UPDATE amenities
SET microwave = 0 WHERE roomID = rmID;
UPDATE amenities
SET coffeeMaker = 0 WHERE roomID = rmID;


-- trigger for employee update
CREATE TRIGGER invalidSsn
BEFORE UPDATE ON employee
FOR EACH ROW
BEGIN
  DECLARE ssn_count INT;
  SET ssn_count = (SELECT COUNT(*) FROM employee WHERE ssn = NEW.ssnNew);
  IF (ssn_count > 0) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Desired ssn already exists in database';
  END IF;
END;

-- employee wanting to update their ssn to a new ssn = ssnNew, inputting their old one as ssnOld
UPDATE employee
SET ssn = ssnNew WHERE ssn = ssnOld;

-- employee wanting to update their address (addyNew), inputting their ssn to verify its them (empSsn)
UPDATE employee
SET empAddress = addyNew WHERE ssn = empSsn;





-- DELETE statements
-- deleting hotel room with ID of x
DELETE FROM hotelRoom WHERE roomID=x;

-- deleting hotel and its hotel rooms where hotel addy is "addy"
DELETE FROM hotelRoom WHERE addy = "addy";
DELETE FROM hotel WHERE addy = "addy";

-- deleting hotel chain , its hotels and their rooms given hotel chain_name
DELETE FROM hotelRoom WHERE addy = (
    SELECT addy FROM hotel
                WHERE chainName = chain_name);
DELETE FROM hotel WHERE chainName = chain_name;
DELETE FROM hotelChain WHERE chainName = chain_name;

-- deleting from bookings, where bookingID is preferably known (bookID)
DELETE FROM bookings WHERE bookingID = bookID;
-- little search function to find the bookingID based on start and end date entries
-- entries in form: startD and endD
SELECT * FROM booking
         WHERE startDate = startD AND endDate = endD;



-- JOIN hotel and hotelRoom together for providing info on frontend
SELECT * hotel, hotelRoom FROM hotelRoom
FULL OUTER JOIN hotel ON hotelRoom.addy=hotel.addy;



-- INDEXES
-- index on customer for firstName, used in logging in
CREATE INDEX index_customer_first ON customer (firstName);
-- index on customer for customerID, will pull more recent customers
CREATE INDEX index_customer_ID_recent ON customer (customerID) WHERE customerID > 30;
-- creating a bitmapped index on customer using customerID
CREATE BITMAP INDEX index_bitmap_customer ON customer (customerID);


-- queries of the VIEWS
-- view 1: number of available rooms per area (areaInput = inputted area)
CREATE VIEW [Available Rooms] AS
SELECT SUM(roomID) FROM hotelRoom
    WHERE addy = (SELECT addy from hotel
                    WHERE area = areaInput);

-- gets amount of rooms in a certain area
SELECT SUM(roomCount) FROM hotel
WHERE area = areaInput;

-- getting roomID for all bookings that are not for current day (available rooms)
SELECT roomID FROM bookings
WHERE NOT startDate < 2023-04-01 < endDate;

-- getting number of rooms available for current day
SELECT COUNT(roomID) FROM hotelRoom
WHERE roomID = (SELECT roomID FROM bookings
                WHERE NOT startDate < 2023-04-01 < endDate);

-- view 2: total capacity of rooms in a given hotel (using address of hotel hotelAddress)
CREATE VIEW [Total Capacity] AS
SELECT SUM(capacity) FROM hotelRoom
WHERE addy = (SELECT addy FROM hotel
        WHERE addy = hotelAddress);
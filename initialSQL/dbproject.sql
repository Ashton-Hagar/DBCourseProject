--creates
create table hotelChain (
    hotelAmount int,
    officeAddress varchar(100),
    phone varchar(10),
    email varchar(50),
    chainName varchar(30) NOT NULL,
    PRIMARY KEY(chainName)
);

create table hotel (
    roomCount int,
    rating int,
    email varchar(50),
    phone varchar(10),
    chainName varchar(30),
    addy varchar(100) NOT NULL, -- note: had to change address to addy because it was a datatype
    PRIMARY KEY(addy)
);

create table hotelRoom(
    price float,
    capacity int,
    fridge boolean, -- all these booleans represent amenities
    TV boolean,
    AC boolean,
    microwave boolean,
    coffeeMaker boolean,
    viewType int, -- will code int to represent certain views
    extension boolean,
    problems varchar(100),
    addy varchar(100),
    booked boolean,
    customerID int,
    roomNumber int NOT NULL,
    PRIMARY KEY(roomNumber)
);

create table customer(
    addy varchar(100),
    firstName varchar(20),
    lastName varchar(30),
    dateRegistered date,
    SSN int,
    customerID int NOT NULL,
    PRIMARY KEY(customerID)
);

create table manager(
    addy varchar(100),
    firstName varchar(20),
    lastName varchar(30),
    managerAddress varchar(100),
    SSN int,
    managerID int NOT NULL,
    PRIMARY KEY(managerID)
);

create table employee(
    empRole int, -- coded to display certain role for certain int
    firstName varchar(20),
    lastName varchar(30),
    empAddress varchar(100),
    manager ID int,
    SSN int NOT NULL,
    PRIMARY KEY(SSN)
);

-- full inserts
INSERT INTO hotelChain (column1, column2, column 3)
VALUES (value1, value2, value3);

INSERT INTO hotel (column1, column2, column 3)
VALUES (value1, value2, value3);

INSERT INTO hotelRoom (column1, column2, column 3)
VALUES (value1, value2, value3);

INSERT INTO customer (column1, column2, column 3)
VALUES (value1, value2, value3);

INSERT INTO manager (column1, column2, column 3)
VALUES (value1, value2, value3);

INSERT INTO employee (column1, column2, column 3)
VALUES (value1, value2, value3);
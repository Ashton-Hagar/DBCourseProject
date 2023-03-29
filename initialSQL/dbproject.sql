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
    viewType int, -- will code int to represent certain views
    extension int,
    problems varchar(100),
    addy varchar(100),
    booked int,
    customerID int,
    roomNumber int NOT NULL,
    PRIMARY KEY(roomNumber)
);

create table amenities(
        fridge int, -- all these ints are replacements for bool, where 0 = true, 1 = false
        TV int,
        AC int,
        microwave int,
        coffeeMaker int,
        addy varchar(100) NOT NULL,
        roomNumber int NOT NULL,
        PRIMARY KEY(addy),
        FOREIGN KEY(roomNumber)
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
    managerID int,
    SSN int NOT NULL,
    PRIMARY KEY(SSN)
);

-- full inserts
/* hotelAmount int,
officeAddress varchar(100),
phone varchar(10),
email varchar(50),
chainName varchar(30) NOT NULL, */
INSERT INTO hotelChain (hotelAmount, officeAddress, phone, email, chainName)
VALUES (5, "45 Pleasant Drive", "613-942-4581", "joes@gmail.com", "Joe's Hotel"),
       (3, "120 McDonald Avenue", "613-706-7239", "chezavion@gmail.com", "Chez Avion"),
       (10, "450 Great Canadian Road", "613-183-4118", "shackupofficial@gmail.com", "Shack-up"),
       (1, "99 Gretzky Road", "613-411-1002", "wgretzky@gmail.com", "Wayne Gretzky Lodge"),
       (2, "73 Jasniewicz Lane", "613-658-0029", "poland@hotmail.com", "Polish Lodging"),
       (1, "1111 Brightside Avenue", "613-102-4999", "smileys@gmail.com", "Smiley's Place"),
       (1, "24 Parkway Drive", "613-707-1114", "esquirehotels@esquire.com", "Esquire Inn"),
       (1, "1 David Road", "613-111-1111", "ydavid@gmail.com", "David's Place"),
       (1, "2 Ashton Road", "613-222-2222", "hashton@gmail.com", "Ashton's Crib"),
       (1, "3 Raymond Road", "613-333-3333", "mray@gmail.com", "Ray's");

/* roomCount int,
    rating int,
    email varchar(50),
    phone varchar(10),
    chainName varchar(30),
    addy varchar(100) NOT NULL */
INSERT INTO hotel (roomCount, rating, email, phone, chainName, addy)
VALUES (3, 3, "joes@gmail.com", "613-942-4581", "Joe's Hotel", "200 Victory Road"),
       (3, 4, "joes@gmail.com", "613-942-4581", "Joe's Hotel", "423 Princess Lane"),
       (3, 2, "joes@gmail.com", "613-942-4581", "Joe's Hotel", "78 Northern Avenue"),
       (5, 5, "joes@gmail.com", "613-942-4581", "Joe's Hotel", "782 Pearlsboro Road"),
       (3, 3, "joes@gmail.com", "613-942-4581", "Joe's Hotel", "4412 Goated Drive"),
       (2, 5, "chezavion@gmail.com", "613-706-7239", "Chez Avion", "92 Foreign Crescent"),
       (2, 5, "chezavion@gmail.com", "613-706-7239", "Chez Avion", "309 Bravante Lane"),
       (2, 5, "chezavion@gmail.com", "613-706-7239", "Chez Avion", "53 Aristotle Street")
       (1, 2, "shackupofficial@gmail.com", "613-183-4118", "Shack-up", "10 Crummy Road"),
       (1, 1, "shackupofficial@gmail.com", "613-183-4118", "Shack-up", "42 Grandy Lane"),
       (1, 3, "shackupofficial@gmail.com", "613-183-4118", "Shack-up", "95 Priscella Road"),
       (1, 2, "shackupofficial@gmail.com", "613-183-4118", "Shack-up", "2 Marigold Crescent"),
       (1, 3, "shackupofficial@gmail.com", "613-183-4118", "Shack-up", "102 Benedict Street"),
       (1, 4, "shackupofficial@gmail.com", "613-183-4118", "Shack-up", "8125 Main Street"),
       (1, 4, "shackupofficial@gmail.com", "613-183-4118", "Shack-up", "25 Reginald Street"),
       (1, 2, "shackupofficial@gmail.com", "613-183-4118", "Shack-up", "293 Walters Road"),
       (1, 1, "shackupofficial@gmail.com", "613-183-4118", "Shack-up", "67 Angus Avenue"),
       (1, 2, "shackupofficial@gmail.com", "613-183-4118", "Shack-up", "108 Central Street"),
       (3, 5, "wgretzky@gmail.com", "613-411-1002", "Wayne Gretzky Lodge", "99 Gretzky Road"),
       (2, 4, "poland@hotmail.com", "613-658-0029", "Polish Lodging", "2000 Luksus Lane"),
       (2, 5, "poland@hotmail.com", "613-658-0029", "Polish Lodging", "3000 Luksus Lane"),
       (3, 4, "smileys@gmail.com", "613-102-4999",  "Smiley's Place", "2222 Brightside Avenue")
       (1, 5, "esquirehotels@esquire.com", "613-707-1114", "Esquire Inn", "25 Parkway Drive"),
       (1, 3, "ydavid@gmail.com", "613-111-1111", "David's Place", "1 David Road"),
       (1, 3, "hashton@gmail.com", "613-222-2222", "Ashton's Crib", "2 Ashton Road"),
       (1, 3, "mray@gmail.com", "613-333-3333", "Ray's", "3 Raymond Road");

/*  price float,
    capacity int, (1 = single, 2 = double, 3 = other)
    viewType int, -- (1 = street, 2 = lake, 3 = mountain, 4 = other)
    extension int, -- (1 = no, 2 = yes)
    problems varchar(100),
    addy varchar(100),
    booked int, -- (1 = no, 2 = yes)
    customerID int,
    roomNumber int NOT NULL,
    PRIMARY KEY(roomNumber)*/
INSERT INTO hotelRoom (price, capacity, viewType, extension, problems, addy, booked, customerID, roomNumber)
VALUES (120.00, 1, 1, 1, "None.", "200 Victory Road", 2, 1, 101), -- joes hotel
       (120.00, 1, 1, 1, "None.", "200 Victory Road", 2, 2, 102),
       (125.00, 2, 1, 1, "None.", "200 Victory Road", 1, 0, 103),
       (120.00, 1, 3, 1, "None.", "423 Princess Lane", 2, 3, 101),
       (120.00, 1, 3, 1, "None.", "423 Princess Lane", 1, 0, 102),
       (125.00, 2, 3, 1, "None.", "423 Princess Lane", 2, 4, 103),
       (120.00, 1, 1, 1, "None.", "78 Northern Avenue", 2, 5, 101),
       (120.00, 1, 1, 1, "None.", "78 Northern Avenue", 1, 0, 102),
       (125.00, 2, 1, 1, "None.", "78 Northern Avenue", 1, 0, 103),
       (120.00, 1, 2, 1, "AC is too loud.", "782 Pearlsboro Road", 2, 6, 101),
       (120.00, 1, 2, 1, "None.", "782 Pearlsboro Road", 2, 7, 102),
       (125.00, 2, 2, 1, "None.", "782 Pearlsboro Road", 2, 8, 103),
       (140.00, 2, 2, 2, "None.", "782 Pearlsboro Road", 2, 9, 201),
       (140.00, 2, 2, 2, "None.", "782 Pearlsboro Road", 2, 10, 202),
       (120.00, 1, 1, 1, "None.", "4412 Goated Drive", 2, 11, 101),
       (120.00, 1, 1, 1, "None.", "4412 Goated Drive", 1, 0, 102),
       (125.00, 2, 1, 1, "None.", "4412 Goated Drive", 1, 0, 103),
       (230.00, 1, 2, 2, "None.", "92 Foreign Crescent", 2, 12, 1000), -- chez avion
       (230.00, 2, 2, 2, "None.", "92 Foreign Crescent", 2, 13, 2000),
       (241.39, 1, 3, 2, "None.", "309 Bravante Lane", 2, 14, 1000),
       (240.99, 2, 3, 2, "None.", "309 Bravante Lane", 2, 15, 2000),
       (200.10, 2, 1, 1, "None.", "53 Aristotle Street", 2, 16, 1000),
       (200.10, 2, 1, 1, "None.", "53 Aristotle Street", 1, 0, 2000),
       (100.00, 1, 4, 1, "None.", "10 Crummy Road", 2, 17, 1), -- shackup
       (89.99, 1, 4, 1, "Broken window.", "42 Grandy Lane", 2, 18, 1),
       (100.00, 1, 3, 1, "None.", "95 Priscella Road", 1, 0, 1),
       (110.99, 1, 3, 1, "Room is on a slant.", "2 Marigold Crescent", 1, 0, 1),
       (100.00, 1, 4, 1, "None.", "102 Benedict Street", 2, 19, 1),
       (99.99, 1, 1, 1, "Traffic is noisy.", "8125 Main Street", 2, 20, 1),
       (100.50, 1, 4, 1, "Smells like weed.", "25 Reginald Street", 1, 0, 1),
       (100.20, 1, 1, 1, "None.", "293 Walters Road", 2, 21, 1),
       (100.69, 1, 1, 1, "None.", "67 Angus Avenue", 1, 0, 1),
       (120.00, 1, 1, 1, "None.", "108 Central Street", 2, 22, 1),
       (199.99, 2, 3, 2, "None.", "99 Gretzky Road", 2, 23, 101), -- wayne gretzky lodge
       (199.99, 2, 3, 2, "Party room next door is noisy.", "99 Gretzky Road", 2, 24, 102),
       (199.99, 2, 3, 2, "None.", "99 Gretzky Road", 2, 25, 103),
       (179.99, 2, 1, 1, "None.", "2000 Luksus Lane", 2, 26, 101), -- polish lodging
       (189.99, 2, 1, 1, "None.", "2000 Luksus Lane", 2, 27, 102),
       (209.99, 2, 4, 2, "None.", "3000 Luksus Lane", 2, 28, 1000),
       (209.99, 2, 4, 2, "None.", "3000 Luksus Lane", 1, 0, 2000),
       (159.99, 1, 1, 1, "None.", "2222 Brightside Avenue", 2, 29, 101), -- smiley's
       (159.99, 1, 1, 1, "Bed is noisy.", "2222 Brightside Avenue", 1, 0, 102),
       (179.99, 2, 1, 2, "None.", "2222 Brightside Avenue", 2, 30, 201),
       (120.00, 1, 1, 1, "None.", "25 Parkway Drive", 1, 0, 101), -- esquire
       (120.00, 1, 1, 1, "None.", "200 Victory Road", 1, 0, 1),-- david
       (120.00, 1, 1, 1, "None.", "200 Victory Road", 1, 0, 1), -- ashton
       (120.00, 1, 1, 1, "None.", "200 Victory Road", 1, 0, 1); -- ray

/*         fridge int, -- all these ints are replacements for bool, where 0 = true, 1 = false
        TV int,
        AC int,
        microwave int,
        coffeeMaker int,
        addy varchar(100) NOT NULL,
        roomNumber int NOT NULL, */
INSERT INTO amenities(fridge, TV, AC, microwave, coffeeMaker, addy, roomNumber)
VALUES (0, 0, 0, 0, 0, "200 Victory Road", 101), -- joes hotel
       (0, 0, 0, 0, 0, "200 Victory Road", 102),
       (0, 0, 0, 0, 0, "200 Victory Road", 103),
       (0, 0, 0, 1, 0, "423 Princess Lane", 101),
       (0, 0, 0, 1, 0, "423 Princess Lane", 102),
       (0, 0, 0, 1, 0, "423 Princess Lane", 103),
       (0, 0, 0, 0, 0, "78 Northern Avenue", 101),
       (0, 0, 0, 0, 0, "78 Northern Avenue", 102),
       (0, 0, 0, 0, 0, "78 Northern Avenue", 103),
       (0, 0, 0, 0, 0, "782 Pearlsboro Road", 101),
       (0, 0, 0, 0, 0, "782 Pearlsboro Road", 102),
       (0, 0, 0, 0, 0, "782 Pearlsboro Road", 103),
       (0, 0, 0, 0, 0, "782 Pearlsboro Road", 201),
       (0, 0, 0, 0, 0, "782 Pearlsboro Road", 202),
       (0, 0, 0, 0, 0, "4412 Goated Drive", 101),
       (0, 0, 0, 0, 0, "4412 Goated Drive", 102),
       (0, 0, 0, 0, 0, "4412 Goated Drive", 103),
       (0, 0, 0, 0, 0, "92 Foreign Crescent", 1000), -- chez avion
       (0, 0, 0, 0, 0, "92 Foreign Crescent", 2000),
       (0, 0, 0, 0, 0, "309 Bravante Lane", 1000),
       (0, 0, 0, 0, 0, "309 Bravante Lane", 2000),
       (0, 0, 0, 0, 0, "53 Aristotle Street", 1000),
       (0, 0, 0, 0, 0, "53 Aristotle Street", 2000),
       (1, 0, 1, 0, 1, "10 Crummy Road", 1), -- shackup
       (0, 1, 1, 0, 1, "42 Grandy Lane", 1),
       (1, 1, 0, 1, 1, "95 Priscella Road", 1),
       (1, 1, 1, 1, 0, "2 Marigold Crescent", 1),
       (0, 0, 0, 1, 1, "102 Benedict Street", 1),
       (0, 1, 1, 0, 0, "8125 Main Street", 1),
       (0, 0, 0, 0, 1, "25 Reginald Street", 1),
       (1, 0, 0, 0, 1, "293 Walters Road", 1),
       (1, 1, 0, 0, 0, "67 Angus Avenue", 1),
       (0, 0, 0, 1, 0, "108 Central Street", 1),
       (0, 0, 0, 0, 0, "99 Gretzky Road", 101), -- wayne gretzky lodge
       (0, 0, 0, 0, 0, "99 Gretzky Road", 102),
       (0, 0, 0, 0, 0, "99 Gretzky Road", 103),
       (0, 0, 0, 0, 0, "2000 Luksus Lane", 101), -- polish lodging
       (0, 0, 0, 0, 0, "2000 Luksus Lane", 102),
       (0, 0, 0, 0, 0, "3000 Luksus Lane", 1000),
       (0, 0, 0, 0, 0, "3000 Luksus Lane", 2000),
       (0, 0, 0, 1, 0, "2222 Brightside Avenue", 101), -- smiley's
       (0, 0, 0, 1, 0, "2222 Brightside Avenue", 102),
       (0, 0, 0, 1, 0, "2222 Brightside Avenue", 201),
       (0, 0, 0, 0, 0, "25 Parkway Drive", 101), -- esquire
       (0, 0, 0, 1, 1, "200 Victory Road", 1),-- david
       (0, 0, 0, 1, 1, "200 Victory Road", 1), -- ashton
       (0, 0, 0, 1, 1, "200 Victory Road", 1); -- ray

/*     addy varchar(100),
    firstName varchar(20),
    lastName varchar(30),
    dateRegistered date,
    SSN int,
    customerID int NOT NULL, */
INSERT INTO customer (addy, firstName, lastName, dateRegistered, SSN, customerID)
VALUES ("1 Plainview Gardens", "Harold", "Schrader", 2020-02-30, 1234, 1),
       ("2 Plainview Gardens", "Daphne", "Neal", 2019-03-05, 2345, 2),
       ("3 Plainview Gardens", "Lacie", "Skaggs", 2021-04-25, 3456, 3),
       ("4 Plainview Gardens", "Carrington", "Baer", 2022-05-14, 4567, 4),
       ("5 Plainview Gardens", "Alani", "Landon", 2020-06-12, 5678, 5),
       ("6 Plainview Gardens", "Ashlin", "Holden", 2021-07-18, 6789, 6),
       ("7 Plainview Gardens", "Shivani", "Gibson", 2022-08-21, 7890, 7),
       ("8 Plainview Gardens", "Colby", "Valdes", 2022-09-26, 8901, 8),
       ("9 Plainview Gardens", "Donte", "Lane", 2020-10-02, 9012, 9),
       ("10 Plainview Gardens", "Ronaldo", "Connelly", 2020-11-01, 1357, 10),
       ("1 Millborough Creek", "Aidan", "House", 2021-12-07, 3579, 11),
       ("2 Millborough Creek", "Delanie", "Bueno", 2019-01-11, 5791, 12),
       ("3 Millborough Creek", "Dejah", "Marvin", 2020-02-12, 7913, 13),
       ("4 Millborough Creek", "Chelsey", "Behrens", 2020-03-19, 9135, 14),
       ("5 Millborough Creek", "Makala", "Klinger", 2022-04-21, 2468, 15),
       ("6 Millborough Creek", "Jaliyah", "Foreman", 2021-05-22, 4680, 16),
       ("7 Millborough Creek", "Kelsie", "Sheppard", 2020-06-22, 6802, 17),
       ("8 Millborough Creek", "Tyra", "Spain", 2020-07-23, 8024, 18),
       ("9 Millborough Creek", "Yasmine", "Humphreys", 2021-08-24, 0246, 19),
       ("10 Millborough Creek", "Haleigh", "Rockwell", 2021-09-27, 0123, 20),
       ("1 Foxview Estates", "Darion", "Escobedo", 2022-10-29, 0987, 21),
       ("2 Foxview Estates", "Brandon", "Parent", 2019-11-30, 9876, 22),
       ("3 Foxview Estates", "Libby", "Lester", 2018-12-31, 8765, 23),
       ("4 Foxview Estates", "Talon", "Pringle", 2020-01-04, 7654, 24),
       ("5 Foxview Estates", "Javier", "McBride", 2020-02-07, 6543, 25),
       ("6 Foxview Estates", "Bill", "Dunbar", 2018-03-21, 5432, 26),
       ("7 Foxview Estates", "Berenice", "Ruff", 2020-04-26, 4321, 27),
       ("8 Foxview Estates", "Eli", "Walters", 2019-05-27, 3210, 28),
       ("9 Foxview Estates", "Jasmine", "Ashcraft", 2021-06-10, 2109, 29),
       ("10 Foxview Estates", "Megan", "Counts", 2022-07-20, 1098, 30);

/*     addy varchar(100),
    firstName varchar(20),
    lastName varchar(30),
    managerAddress varchar(100),
    SSN int,
    managerID int NOT NULL, */
INSERT INTO manager (addy, firstName, lastName, managerAddress, SSN, managerID)
VALUES ("200 Victory Road", "Eileen", "Finley", "1 Manager Road", 1000, 1),
       ("423 Princess Lane", "Giselle", "Stover", "2 Manager Road", 2000, 2),
       ("78 Northern Avenue", "Kayli", "Withworth", "3 Manager Road", 3000, 3),
       ("782 Pearlsboro Road", "Alton", "Wood", "4 Manager Road", 4000, 4),
       ("4412 Goated Drive", "Adamaris", "Carmichael", "5 Manager Road", 5000, 5),
       ("92 Foreign Crescent", "Edgardo", "Farris", "6 Manager Road", 6000, 6),
       ("309 Bravante Lane", "Stephon", "Avila", "7 Manager Road", 7000, 7),
       ("53 Aristotle Street", "Marcellus", "McDuff", "8 Manager Road", 8000, 8),
       ("10 Crummy Road", "Chiara", "Holm", "9 Manager Road", 9000, 9),
       ("42 Grandy Lane", "Bridgette", "Gagnon", "10 Manager Road", 0000, 10),
       ("95 Priscella Road", "Kacie", "Bynum", "1 Manager Street", 1111, 11),
       ("2 Marigold Crescent", "Skye", "Mathews", "2 Manager Street", 2222, 12),
       ("102 Benedict Street", "Emmalee", "Downs", "3 Manager Street", 3333, 13),
       ("8125 Main Street", "Darrien", "Shook", "4 Manager Street", 4444, 14),
       ("25 Reginald Street", "Madelin", "Vaughan", "5 Manager Street", 5555, 15),
       ("293 Walters Road", "Rigoberto", "Leon", "6 Manager Street", 6666, 16),
       ("67 Angus Avenue", "Quintin", "Jennings", "7 Manager Street", 7777, 17),
       ("108 Central Street", "Abram", "Seeley", "8 Manager Street", 8888, 18),
       ("99 Gretzky Road", "Talia", "Escobedo", "9 Manager Street", 9999, 19),
       ("2000 Luksus Lane", "Leeann", "Reddy", "10 Manager Street", 1011, 20),
       ("3000 Luksus Lane", "Regina", "Ashford", "1 Manager Avenue", 2022, 21),
       ("2222 Brightside Avenue", "Marlon", "Cota", "2 Manager Avenue", 3033, 22),
       ("25 Parkway Drive", "Lucas", "Freitas", "3 Manager Avenue", 4044, 23),
       ("1 David Road", "Mustafa", "Horton", "4 Manager Avenue", 5055, 24),
       ("2 Ashton Road", "Samson", "Krause", "5 Manager Avenue", 6066, 25),
       ("3 Raymond Road", "Celeste", "Tapia", "6 Manager Avenue", 7077, 26);

/*     empRole int, -- (1 = Clerk, 2 = Housekeeping, more added later)
    firstName varchar(20),
    lastName varchar(30),
    empAddress varchar(100),
    managerID int,
    SSN int NOT NULL, */
INSERT INTO employee (emprole, firstname, lastname, empaddress, managerID, ssn)
VALUES (1, "Kyron", "Custer", "1 Employee Road", 1, 0001),
       (2, "Marcellus", "Furman", "2 Employee Road", 1, 0002),
       (1, "Bill", "Ross", "3 Employee Road", 2, 0003),
       (2, "Kolton", "Olivo", "4 Employee Road", 2, 0004),
       (1, "Ethan", "Sparks", "5 Employee Road", 3, 0005),
       (2, "Irvin", "Moreau", "6 Employee Road", 3, 0006),
       (1, "Jim", "Couch", "7 Employee Road", 4, 0007),
       (2, "Dominick", "Matheny", "8 Employee Road", 4, 0008),
       (1, "Shanna", "Woodall", "9 Employee Road", 5, 0009),
       (2, "Monserrat", "Conte", "10 Employee Road", 5, 0010),
       (1, "Amani", "Leyva", "11 Employee Road", 6, 0011),
       (2, "Carina", "Pineda", "12 Employee Road", 6, 0012),
       (1, "Marcello", "Slack", "13 Employee Road", 7, 0013),
       (2, "Cheyanne", "Rust", "14 Employee Road", 7, 0014),
       (1, "Christin", "Briscoe", "15 Employee Road", 8, 0015),
       (2, "Gabrielle", "Hill", "16 Employee Road", 8, 0016),
       (1, "Johanna", "Simpkins", "17 Employee Road", 9, 0017),
       (2, "Octavia", "Walden", "18 Employee Road", 9, 0018),
       (1, "Jarett", "Hendrix", "19 Employee Road", 10, 0019),
       (2, "Johnnie", "Banuelos", "20 Employee Road", 10, 0020),
       (1, "Enzo", "Curtin", "21 Employee Road", 11, 0021),
       (2, "Christa", "Prado", "22 Employee Road", 11, 0022),
       (1, "Dale", "Waller", "23 Employee Road", 12, 0023),
       (2, "Dameon", "Vail", "24 Employee Road", 12, 0024),
       (1, "Cloe", "Sauer", "25 Employee Road", 13, 0025),
       (2, "Xavier", "Schuster", "26 Employee Road", 13, 0026),
       (1, "Katya", "Massie", "27 Employee Road", 14, 0027),
       (2, "Izaiah", "Guillory", "28 Employee Road", 14, 0028),
       (1, "Colleen", "Shah", "29 Employee Road", 15, 0029),
       (2, "Denzel", "Salazar", "30 Employee Road", 15, 0030),
       (1, "Breann", "Baumann", "31 Employee Road", 16, 0031),
       (2, "Gemma", "Vergara", "32 Employee Road", 16, 0032),
       (1, "Kiah", "Morrell", "33 Employee Road", 17, 0033),
       (2, "Ally", "Garland", "34 Employee Road", 17, 0034),
       (1, "Dalton", "Liang", "35 Employee Road", 18, 0035),
       (2, "Juan", "Farrell", "36 Employee Road", 18, 0036),
       (1, "Malaysia", "Reynoso", "37 Employee Road", 19, 0037),
       (2, "Daniella", "Kirk", "38 Employee Road", 19, 0038),
       (1, "Augustus", "Wiggins", "39 Employee Road", 20, 0039),
       (2, "Luiz", "Mueller", "40 Employee Road", 20, 0040),
       (1, "Sana", "Godfrey", "41 Employee Road", 21, 0041),
       (2, "Ciarra", "Culbertson", "42 Employee Road", 21, 0042),
       (1, "Kaiden", "Purvis", "43 Employee Road", 22, 0043),
       (2, "Nathen", "Slater", "44 Employee Road", 22, 0044),
       (1, "Danica", "Glasgow", "45 Employee Road", 23, 0045),
       (2, "Bowen", "Ferrell", "46 Employee Road", 23, 0046),
       (1, "Alissa", "Harrell", "47 Employee Road", 24, 0047),
       (2, "Randolph", "Curry", "48 Employee Road", 24, 0048),
       (1, "Sabastian", "Ingle", "49 Employee Road", 25, 0049),
       (2, "Freddy", "Earley", "50 Employee Road", 25, 0050),
       (1, "Destinie", "Lockett", "51 Employee Road", 26, 0051),
       (2, "Liliana", "Craddock", "52 Employee Road", 26, 0052);
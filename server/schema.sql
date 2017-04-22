CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
	id integer PRIMARY KEY,
	username varchar(20),
	createdAt timestamp
);

CREATE TABLE rooms (
	id integer PRIMARY KEY,
	name varchar(20)
);

CREATE TABLE messages (
  message_id integer NOT NULL AUTO_INCREMENT, 
  room integer,
  user integer,
  content varchar(140),
  createdAt timestamp,
  PRIMARY KEY (message_id),
  CONSTRAINT FOREIGN KEY (user)
  		REFERENCES users(id),
  CONSTRAINT FOREIGN KEY (room)
  		REFERENCES rooms(id)
);
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


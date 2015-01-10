CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  name VARCHAR(100),

  UNIQUE(name)
);

CREATE TABLE rooms (
  id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  name VARCHAR(100),

  UNIQUE(name)
);

CREATE TABLE messages (
  id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  user_id INT UNSIGNED NOT NULL,
  room_id INT UNSIGNED NOT NULL,
  text VARCHAR(144),

  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(room_id) REFERENCES rooms(id)
);

CREATE TABLE friends (
  id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  friend_id INT UNSIGNED NOT NULL,
  friendee_id INT UNSIGNED NOT NULL,

  FOREIGN KEY(friend_id) REFERENCES users(id),
  FOREIGN KEY(friendee_id) REFERENCES users(id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


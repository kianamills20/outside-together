DROP TABLE IF EXISTS event_attendees;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;


CREATE TABLE  users(
   id SERIAL PRIMARY KEY,
   first_name text NOT NULL,
   last_name text NOT NULL,
   username text UNIQUE NOT NULL,
   password text NOT NULL,
   role text NOT NULL,
   created_at timestamp DEFAULT NOW()
);


CREATE TABLE categories(
   id SERIAL PRIMARY KEY,
   name TEXT UNIQUE NOT NULL
);


CREATE TABLE events(
   id SERIAL PRIMARY KEY,
   title text NOT NULL,
   description text NOT NULL,
   creator_id INT NOT NULL,
   category_id INT NOT NULL,
   location text NOT NULL,
   date timestamp NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
   created_at timestamp DEFAULT NOW()
);


CREATE TABLE event_attendees(
   user_id INT NOT NULL,
   event_id INT NOT NULL,
   PRIMARY KEY (user_id, event_id),
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
   FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
   joined_at timestamp DEFAULT NOW()
);

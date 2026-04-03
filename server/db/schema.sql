DROP TABLE IF EXISTS event_attendees;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS categories; 
DROP TABLE IF EXISTS users; 

CREATE TABLE  users(
    id SERIAL PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    created_at timestamp 
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
)

CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    location text NOT NULL,
    date timestamp NOT NULL,
    creator_id UNIQUE NOT NULL FOREIGN KEY,
    category_id UNIQUE NOT NULL FOREIGN KEY,
    create_at timestamp 
);

CREATE TABLE event_attendees(
    id SERIAL PRIMARY KEY,
    user_id UNIQUE NOT NULL FOREIGN KEY,
    event_id UNIQUE NOT NULL FOREIGN KEY,
    joined_at timestamp
)


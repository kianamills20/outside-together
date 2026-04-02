Outside Together

Stay Active. Meet People.

Outside Together is a full-stack web application that helps users discover and organize outdoor activities with others. Users can create meetups, browse events by category, and join activities that match their interests. The goal is to make it easier for people to stay active and connect through shared outdoor interests.

Project Concept

Outside Together allows users to:

Create an account and log in
Post local sports or outdoor activity meetups
Browse events by category
Join events
View events they created
View events they joined
Save/favorite events

Example Activities
Saturday morning hike at Red Rocks
Beginner longboarding meetup
Pickup volleyball at Wash Park
Dog-friendly group trail walk

This keeps the app personal, social, and professionally relevant.

30 Second Elevator Pitch

Outside Together is a social activity-planning web app that helps users discover and join local sports and outdoor meetups like hiking trips, pickup games, and longboarding sessions. Users can create events, browse activities by category, and join events that match their interests. The MVP focuses on authentication, relational data, and user dashboards to solve a real-world problem: helping people find active communities and connect through shared interests.

Why I Built This

I chose this project because it’s something I could realistically see people using. It connects to my interests in sports, hiking, and outdoor activities, while also demonstrating important full-stack skills like:

User authentication
Database relationships
Protected routes
Interactive frontend features
RESTful API design

I wanted to build a project that felt like a real product instead of just a basic tracker app.

🎨 Wireframes

The following wireframes outline the core layout and user flow of OutsideTogether. These wireframes focus on structure and functionality rather than final styling. Visual design, spacing, and UI details will be refined during development.

🏠 Home / Discover Page

Purpose: Allow users to browse and filter outdoor activities

Planned Layout:

Navigation bar
Category filter (Hiking, Sports, Longboarding, etc.)
Search bar
Event cards grid

Each event card includes:

Title
Category
Location
Date
Join button

User Actions:

Browse events
Filter by category
Click event for details
📍 Event Details Page

Purpose: Show full event information and allow users to join

Planned Layout:

Event title
Event description
Category tag
Location
Date & time
Creator name
Join / Leave button
Attendees list

User Actions:

Join event
Leave event
View attendees
➕ Create Event Page

Purpose: Allow users to create new outdoor meetups

Planned Layout:

Title input
Description textarea
Category dropdown
Location input
Date picker
Submit button

User Actions:

Create new event
Cancel event creation
👤 User Dashboard

Purpose: Show user-specific activity

Planned Layout:

Welcome header
My Created Events section
Joined Events section
Saved Events section
Edit/Delete buttons for owned events

User Actions:

View created events
Manage owned events
View joined events
Navigate to event details
🔐 Login Page

Purpose: Authenticate users

Planned Layout:

Username input
Password input
Login button
Link to register
📝 Register Page

Purpose: Create new account

Planned Layout:

Username input
Password input
Confirm password
Register button
🛠️ Admin Dashboard (Optional MVP / Stretch)

Purpose: Allow admin moderation

Planned Layout:

Users list
Events list
Delete event button
Delete user button
Manage categories section
🔄 Navigation Flow

Home
→ Event Details
→ Join Event

Home
→ Create Event
→ Dashboard

Dashboard
→ Event Details
→ Edit Event

Login
→ Home

🧠 Wireframe Notes
Layout prioritizes quick event discovery
Dashboard focuses on user-specific data
Event creation designed for minimal friction
Navigation kept simple for MVP scope
Mobile responsiveness considered for future iteration

Core MVP Features
User registration and login
Create, edit, and delete an event
Browse all upcoming events
Filter events by category
Join or leave an event
View user dashboard
Save / favorite events

Stretch Goals
Event comments
Profile avatars
Map/location integration
Skill level tags (beginner/intermediate/advanced)
Weather display for outdoor events
Messaging between attendees
Tech Features Demonstrated

This project demonstrates:

User authentication and protected routes
One-to-many relationships
Many-to-many relationships
Full CRUD operations
Role-based authorization
Filtering and dynamic rendering
RESTful API design
Full-stack architecture (React + Express + PostgreSQL)
Database Schema (MVP)

Tables

users
id (PK)
username
password
role (user | admin)
categories
id (PK)
name

events
id (PK)
title
description
location
date
creator_id (FK → users)
category_id (FK → categories)

event_attendees
user_id (FK → users)
event_id (FK → events)

Relationships
One user creates many events
One category has many events
Many users join many events
event_attendees handles many-to-many relationship

User Roles
User Permissions

Users can:

Register and login
Create events
Edit their own events
Delete their own events
Join events
Leave events
View dashboard
Save events
Admin Permissions

Admins can:

View all users
Delete inappropriate events
Manage activity categories
Moderate platform content

User = manages their own content
Admin = manages the entire platform

Pages / UI Structure
Home / Discover
Browse events
Filter by category
Search activities
Event Details
Event info
Join button
Attendees list
Create Event
Title
Description
Category
Location
Date
Dashboard
Events created by user
Events joined
Saved events
Login / Register
Authentication pages
Example API Routes
Auth

POST /api/auth/register
POST /api/auth/login

Events

GET /api/events
GET /api/events/:id
POST /api/events
PUT /api/events/:id
DELETE /api/events/:id

Attendees

POST /api/events/:id/join
DELETE /api/events/:id/leave

Categories

GET /api/categories

Admin

DELETE /api/admin/events/:id
GET /api/admin/users

Built With

Frontend:

React
Vite

Backend:

Node.js
Express

Database:

PostgreSQL
pg

Other:

JWT Authentication
REST API

Future Improvements:
Google Maps integration
Real-time chat
Event notifications
Mobile responsive UI
Location-based recommendations
Author

Built by Kiana Mills
Full Stack Developer (Bootcamp Capstone Project)
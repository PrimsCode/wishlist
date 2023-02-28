# Wishlist
A web app to allow you to create wishlists in different categories\
Capstone II Project for Springboard Software Engineering Program\
[Check out the deployed version here: Wishlist](https://wishlist-vrmv.onrender.com)

## Table of Contents
* [General Info](#general-info)
* [Stack](#stack)
* [Database Design](#database_design)
* [API Documentation](#api-documentation)
* [Setup](#setup)

## General Info
This is a PERN stack project to showcase my knowledge of how to create interaction between frontend and backend.
The project uses an Internal API created from NodeJs and Express with a backend database handled by PostgreSQL.


## Stack
#### Frontend:
* JAVASCRIPT
* REACT
* MATERIAL UI 
#### Backend:
* NODE.JS
* EXPRESS
* POSTGRESQL

## Database Design
Backend database design:
![Wishlist Database](https://github.com/PrimsCode/wishlist/blob/master/wishlist-ERD.png)

## API Documentation
Check out Wishlist-API.md file for the backend API Documentation.

## Setup
To run this project, install node and PostgreSQL on your computer. 
Setup Backend and Frontend then run them both at the same time.
# Backend Setup
- cd server
- Run withlist-db.sql to create your database
- In config.js Line 17 and 18, change database path, postgres username and password
```
LINE 17: `${DB_URI}<postgresql_username>:<postgresql_password>@localhost:<localhost_number>/wishlist_test`
LINE 18: `${DB_URI}<postgresql_username>:<postgresql_password>@localhost:<localhost_number>/wishlist`
```
- In command prompt install requirements and run backend.
```
npm install
npm start
```
# Frontend Setup
- cd client
- In command prompt install requirements and run frontend.
```
npm install
npm start
```
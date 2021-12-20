# my-store
Express course
Learning Express to build applications with Node.js.
API was published here => https://secure-woodland-26804.herokuapp.com/api/v1/

# Express
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Installation

  npm install express --save

## Routing
Defining the differets routes/sections of the application.

## JSON
Using this format to send data to the client.

## API RESTful ( Representational State Transfer ) 
It's a convention that we use to comunicate services by HTTP protocols.

![Methods](httpMethods.png "Hello")

## Database
The data in this app is built with Postgresql, using Sequelize to define its structure and perform its variety of queries, facilitating its updating, maintenance and implementation of new data. All this running in a container in Docker.

![image](https://user-images.githubusercontent.com/75006758/146844195-bd716a67-f5c8-4f2c-9189-2879096be07e.png)
![image](https://user-images.githubusercontent.com/75006758/146844132-e03475f8-cda9-4b9c-975e-a3fc22670af7.png) ![image](https://user-images.githubusercontent.com/75006758/146844156-476c7fa6-6dd8-4fb3-a4d6-d7f0027be2a2.png)



## Authentication and Authorization
On the authentication side, Passport is used to verify users are in the system and can verify their identity. Finally for the authorization, JWT is used to verify the permissions of each user, all this at the hand of Passport and its different strategies.

![image](https://user-images.githubusercontent.com/75006758/146844607-acab916d-2517-4b21-bb74-6c69ff1a191b.png) ![image](https://user-images.githubusercontent.com/75006758/146844644-c9326ccb-8fda-4d1d-b6f2-3518125e03db.png)





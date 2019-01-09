# shop-til-you-drop
Our App's Goal
Our app allow clients to order products that will be pushed to a cloud database. For the worker base, the app allow workers to access cloud database and pull down orders. There is user validation, authentication, administrative abilities

Our App Pages:

Sign Up Page

Log In Page

User Profile

Customer Page

Customer Cart

Order Placed


Flow of Application 
The purchaser will log in to the application and be given an order option. When the user clicks this, the application grabs the user location. The app will then allow the user to create a list of groceries. The user will then submit the list, verifying location (w/ the ability to change the location). The data will be timestamped and sent to the SQL DB. The data will consist of Name, number, delivery location, grocery list, and timestamp.

The delivery person will log in to the application and be given the option to pick up an order. When the person clicks this, the application will grab the user location. The app will then look up orders within close proximity and order these based on the timestamp. The delivery person will be allowed to pick an order from the list and click to deliver. The purchaser will be sent a text message via Twilio stating who is picking up their order.



Technologies

Express - Server framework to render the application 
MySql - SQL database stores orders
Heroku - Cloud DB to allow access from anyone connected to the internet
Twilio - Sends text messages to the purchaser when delivery is being picked up
passport.js - Used to authenticate purchasers, delivery person, and administration
Sequelize - ORM mapping
Materialize.io - To create a User interface and intuitive user experience
Spoonacular API - Created our database of foods, prices, macronutrient content

Our Team

Project manager & Front End, Back End: Kaleb
Front End: Victoria
Front End: Alex
Back End: John
Back End: Ry


# credits
[hamburger favicon](https://www.favicon-generator.org/) 
[pizza loader](https://codepen.io/arcs/pen/pbPkPL) 
[Pineapple Animation](https://codepen.io/AngelaVelasquez/pen/yVEOpY)

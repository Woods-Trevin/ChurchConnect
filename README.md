## Heroku Link
https://churchconnect.herokuapp.com/

## ChurchConnect at a Glance

ChurchConnect is a fullstack (Postgres, Flask, React.js, Node.js) app that lets a user from a church community communicate with other members that log onto the website through the creation of Events and Announcements

Users can also comment and reply to comments on Events and Announcements adding a higher level of communication between users.

## Application Architecture

As stated previous, ChurchConnect is a fullstack  (Postgres, Flask, React.js, Node.js) application. The majority of the application logic occurs within front end's Redux store and its interactions with the users and their actions when creating, updating, or deleting their creations.

The backend serves the frontend by responding to frontend requests, and fetching data from the Postgres database.

## Frontend Overview
ChurchConnect has alot going on in the front end that help to make it such a useful app. It makes extensive use of the backend I designed with Flask to create a dynamic and data-rich experience. Below are the frontend technologies that make this application possible.

### Frontend Tech Used:

#### React
ChurchConnect uses React to its fullest extent. It uses very little of the core React library besides passing a few props, but makes extensive use of the technologies and libraries of the React ecosystem. Without the well-documented and carefully articulated React docs, creating ChurchConnect would have been a very hard undertaking.


#### Redux
The ReactRedux library was used to manage this applications state as the users perform the actions they are allowed, make fetch requests to the server for data, and to change the state to create a seemless updating functionality when a user makes any core actions (create, update, delete).

Redux sets and holds information about all Events and Announcements, as well as the comments and replies users may make as they explore this site. By managing this state in Redux, it provides easy access to information from the database across all components on this application. There were so many components in the application that this helped to bring my vision across smoothly with little to no headache. The examples of redux being very useful start when the user logs in and sees all events and announcements that other users made that is requested from the backend and stored in state, and extend to the many components and conditional renders implemented to give the user a more dynamic experience. Redux provided an intuitive method to manage all the complexity of this application.

## Backend Overview

ChurchConnect uses Flask for its backend interacting with Postgres as database for persisting and storing data. The backend of ChurchConnect is fairly straightforward. The server sends the data requested to the front end and the frontend serves that data to the client. Below are the backend technologies used.

### Backend Tech Used

#### Postgres
Postgres was an easy choice for ChurchConnect server-side framework. Postgres allows easy communication between database and backend. I found it very straightforward to use as well.


## Conclusion and Possible Next Steps
ChurchConnect was a pleasure to build. I grew up in the church and there were many churches that went above and beyond to ensure my family was well. I have always wanted to give back in some way but never knew how I would do it until this project came to mind.

This is the first time that I've built a fullstack web application where the idea was an original and there was some kind of personal meaning too all the work I put in. ChurchConnect has been a pleaure to design and create.

In the process of making ChurchConnect, I was able to practice with a lot of new methods of carrying out react frontend implementations. I also recieved alot of experience dealing with redux state, understanding what actually causes a rerender, and how I should design my databases to bring my visions to life. I've come out of this project stronger than ever in both my understanding of frontend and backend work. I am confident in my abilities to work as a programmer in the future. This career is definitely a career I could see myself in professionally going forward.

#### Possible Next Steps
I have 3 more features I want to implement. Profile Page, Bookings Page for users to book the priest for baptisms or the like, and a service view for users that could not make it to service that day who may want to catch up on what they missed by watching the service from the comfort of their home.




## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

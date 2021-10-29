## Heroku Link
https://churchconnect.herokuapp.com/

## ChurchConnect at a Glance

ChurchConnect is a fullstack Postgres, Flask, React.js, and Node.js app that lets a user from a church community communicate with other members that log onto the website through the creation of Events and Announcements

Users can also comment on Events and Announcements with additional functionality to reply to those comments on Events and Announcements adding a higher level of communication between users.

## Application Architecture

As stated previous, ChurchConnect is a fullstack Postgres, Flask, React.js, and Node.js application. The backend interacts with the frontend by responding to frontend requests, and fetching data from the Postgres database. The frontend displays this information to the user for their use.

## Frontend Overview
ChurchConnect has alot going on in the front end that help to make it such a useful app. It makes extensive use of the backend I designed with Flask to create a dynamic experience.

### Frontend Tech Used:

#### React
ChurchConnect pushes React to its fullest capability. I made use of React Hooks to store data from the frontend to send to the backend. As well as using React useEffects to trigger rerenders when there is a change to the DOM or a variable in each component's flow.


#### Redux
The ReactRedux library was used to manage this applications state as the users perform the actions they are allowed, make fetch requests to the server for data, and to change the state to create a seemlessly updated view when a user makes any core actions (create, update, delete).

Redux contains information about all Events and Announcements, as well as the comments and replies users may make as they explore this site. By managing this state in Redux, it provides easy access to information from the database across all components on this application. There were so many components in the application that Redux helps to bring my vision across smoothly with little to no headache. The examples of redux being very useful starts when the user logs in and sees all events and announcements that other users made that is requested from the backend and stored in state, and extend to the many components and conditional renders implemented to give the user a more dynamic experience. Redux provided an intuitive method to manage all the complexity of this application.

## Backend Overview

ChurchConnect uses Flask for its backend interacting with Postgres as database for persisting and storing data. The backend of ChurchConnect is fairly straightforward. The server sends the data requested to the front end and the frontend serves that data to the frontend where the user can read and manipulate the information.

### Backend Tech Used

#### Flask
Flask was an easy choice for the backend part of my application. The associations are straightforward and you can include those associations on the models you are querying and sending back to the backend. The class structure for models and forms were a nice change of pace since most of what I have done before was in Express using functional programming.
Querying the database was easier than with Express.

#### Postgres
Postgres was an easy choice for ChurchConnect server-side framework. Postgres allows easy communication between database and the backend server. I found it very straightforward to use.

## Conclusion and Possible Next Steps
ChurchConnect was a pleasure to build. I grew up in the church and there were many churches that went above and beyond to ensure my family was well. I have always wanted to give back in some way but never knew how I would do it until this project came to mind.

This is the first time that I've built a fullstack web application where the idea was an original and there was some kind of personal meaning too all the work I put in. ChurchConnect has been a pleaure to design and create.

In the process of making ChurchConnect, I was able to practice with a lot of new methods of carrying out react frontend implementations. I also recieved alot of experience dealing with redux state, understanding what actually causes a rerender, and how I should design my databases to bring my visions to life. I've come out of this project stronger than ever in both my understanding of frontend and backend work. I am confident in my abilities to work as a programmer in the future.

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

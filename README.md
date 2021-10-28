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
At its core, RappaMappa is a React application. It uses very little of the core React library besides passing a few props, but makes extensive use of the technologies and libraries of the React ecosystem. Without the robust and well-documented React ecosystem, creating RappaMappa would have been a substantially more challenging enterprise.




# Movie-Swipe
## An App by Jason Ashley, Rickey Guo, Nate Hunter, and Charlie Houghton.
### Made for CS4750 Fall 2020.
-----
## Prerequisites
Installing Node on the local machine should be enough to get rolling.

## Run the Application
1. Grab the `.env` file for the DB IP and password for the API user and place in root.
    - This file should never, ***never*** be committed to the repo.
2. To launch the API, run `startExpressServer.sh`.
    - Provide any argument, e.g. `./startExpressServer.sh 1`, to install necessary packages on first run.
        - This is Linux/Mac only. You can just run `cd client && npm install && node app` on Windows.
3. To launch the client frontend development server, run `startReactServer.sh`.
    - Provide any argument, e.g. `./startReactServer.sh 1`, to install necessary packages on first run.
        - This is Linux/Mac only. You can just run `cd client && npm install && npm start` on Windows.
4. Load http://localhost:5000 to check out the app.

## Example `.env`
A valid `.env` file for this app would look like the following:
```
PORT=5000
DB_HOST=[IP to MySQL Host]
DB_USER=apiuser
DB_PASSWORD=[API user's password]
SESSIONSECRET=[any random secret]
```
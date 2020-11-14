# Movie-Swipe
## An App by Jason Ashley, Rickey Guo, Nate Hunter, and Charlie Houghton.
### Made for CS4750 Fall 2020.
-----
## Prerequisites
After installing Node on the local machine as described for your OS, install Expo CLI with the following command:

```npm install -g expo-cli```

After that, the below commands should be executable.

## Run the Application
1. Grab the `.env` file for the DB IP and password for the API user and place in root of project.
    - This file should never, ***never*** be committed to the repo.
2. Launch the API by running `startExpressServer.sh`.
    - Provide any argument, e.g. `./startExpressServer.sh 1`, to install necessary packages on first run.
        - This is Linux/Mac only. You can just run `cd client && npm install && node app` on Windows.
3. Launch the client frontend development server by running `startReactServer.sh`, ideally in a separate terminal window.
    - Provide any argument, e.g. `./startReactServer.sh 1`, to install necessary packages on first run.
        - This is Linux/Mac only. You can just run `cd client && npm install && npm start` on Windows.
4. Let Expo take you to the website to begin developing.

## Example `.env`
A valid `.env` file for this app would look like the following:
```
PORT=5000
DB_HOST=[IP to MySQL Host]
DB_USER=apiuser
DB_PASSWORD=[API user's password]
SESSIONSECRET=[any random secret]
```
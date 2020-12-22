This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## down-spiral

down-spiral is a development tool used to visualize and debug data.

Logs are useful to keep track of system usage, application improvement, and to debug problems. Current best practices include saving data logs as text files. Instead, DS applies the idea of rendering data logs in the browser with structured formatting. The goal of DS is to provide the user an easy to edit interface, to visualize logs, graphs, and diagrams.

DS visualizes data from running applications. It renders logs in a web browser, which means better visualization of data for analysis and debugging.DS focuses on a better user-experience for debugging problems and logging.

DS has a typescript server with a react-native application to render logs in the browser, and an API communicates with the server. API serializes the data and sends it to the server via socket. The user can import the library and can use pre-defined formatting options or add to it.

## Usage Instructions

### Running the node js server and frontend

- Clone the [repo](https://github.com/alphasr/down-spiral/)

  Switch to the master branch for the latest and the most updated version.

- `cd dir:/down-spiral/frontend/`

  run `npm install`. This will install all dependencies.

- Running the <strong>Frontend</strong> - `cd dir:/down-spiral/frontend/`, run `npm run start`.

  On success connection `localhost:3000` can established.

- Running the <strong>Server</strong> - `cd dir:/down-spiral/frontend/src/`, run `node server.js` .

  On success `listening on port 8000` message is displayed.

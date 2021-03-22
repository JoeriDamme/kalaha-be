# Name of API

Description of API.

## Prerequisites

* Node.js 14 or higher - Download & Install Node.js and the npm package manager.

## Installing

Open a terminal and go to the root of the project.
Run `npm install` to install all dependencies.

## Environment Configuration

Rename the `.env.example` to `.env` and open the file. The following settings are available:
`EXPRESS_PORT=8081 // specify the port to listen to`

## App Configuration

The file `./config/default.json` contains all the configuration items.
Overwrite the config items by creating a file `./config/local-dev.json`.
For testing purposes, I've included a sample.

```
{
  "logger": {
    "level": "info", // Write all logs with level `info` and below
    "path": "/var/log/", // Path to log
    "fileName": "debug.log" // File name to log to
  },
  "cache": {
    "ttl": 3600, // Time in seconds to store in cache
    "checkperiod": 600, // The period in seconds used for the automatic delete check
    "namespaces": {
      "general": "general_" // namespace key in cache for REST API queries.
    }
  }
}

```

## Starting application
Open a terminal and cd to the root of the project. Start the application by running `npm start`.
A message will appear if the applicatiomn started correctly:
`Server is running in process 57999 listening on PORT 8081`

## Usage
Go to `http://localhost:8081/status` to see the status.

## Developing
Open a terminal and cd to the root of the project. Start the application by running `npm run dev`.
The application will restart automatically on file change.

## Documentation
Open your browser and go to `http://localhost:8081/docs/` to see the documentation of the end points.

## Running the tests

Run `npm test` to run the unit tests.

## Deployment

Run `npm run build` to build the application in the `./dist` folder.
Deploy the files on a PRD server and start the application with e.g. PM2.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Joeri Damme** - joerid@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for detail.

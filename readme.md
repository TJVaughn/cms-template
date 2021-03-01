# Welcome to CMS Template using the VENM stack

## Installation
In your project directory:

`git clone https://github.com/TJVaughn/cms-template`

`cd` into the project

**NodeJS**:

More info here: https://nodejs.org/en/

**MongoDB**:

You need a MongoDB server running on your machine, there are good tutorials on how to get that set up for your machine.

`cd` into the appropriate directory that it is installed in your machine. For me it's:

`cd ~/Documents/mongodb/mongodb-org-server_4.4.1_amd64/data/usr/bin && mongod --dbpath=mongodb-data`

I like to run this on a separate terminal to keep the project terminal a bit cleaner.

**Vue CLI**:

To install the Vue CLI, run `npm install -g @vue/cli`

More info here: https://cli.vuejs.org/guide/installation.html

## Getting Started

### Running the project:

### Development

run `yarn install`

in your server file, 

`mkdir config`

`touch dev.env`

This is where your environment variables will hang out. Things like JWT signature, Port, API keys...etc.

To start up development, run: `yarn dev`

Then visit http://localhost:8080 in your browser


### Production

TBU

## Technology Used

- Node.js
- Express.js
- MongoDB
- Vue.js
- Mongoose.js

**For other dependencies used, see package.json**


# iCivs - Pocket Civilization

## What is iCivs?
iCivs is an open-source, online civilization management PWA (progress web application) in which you build up your city, decide its policies, prepare your military, and enact diplomacy in real time. Even when you're not playing, your city is still working.

## Development Progress
iCivs is currently in early development and is not yet playable.

## About Development
### Why open-source and this project?
This project is intended to do three things:
- Provide an example of a full-stack project for other professional or aspiring developers
- Keep my personal skills honed and open to feedback
- Give me experience specifically developing PWAs

### What technology is used?
| Area | Technology |
|------|------------|
| Front-End | Nuxt |
| Back-End | Express |
| Database | Postgres |
| Deployment | Heroku, Netlify |

### Technology Details
#### Front-End
- Nuxt (Vuex implemented)
- Vuetify (bootstrapping library for Vue)
- Axios for API calls

#### Back-End
- Express (TypeScript)
- Knex for database queries
- JWT for token-based authentication
- OWASP for security standards

#### Database
- Postgres SQL (supplied by Heroku)

#### Package Management
- Yarn

## Build Setup

- Clone the repository
- Set up the database (queries are likely compatible with all SQL types)
- In your local `.env` file, add database variables for `knexfile.js`
- Review environment variables in `nuxt.config.js` and change if needed

``` bash
# install dependencies
$ yarn

# prepare database
$ yarn migrate

# seed game data
$ yarn seed

# serve with hot reload at localhost:3000
$ yarn dev

# start the game server
$ yarn nodemon server

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```


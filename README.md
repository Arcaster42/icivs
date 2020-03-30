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

### Can I contribute?
**Yes!** You are welcome to improve any existing code or add new code. If something needs coding changes, I will make a request for changes. If something needs balance changes, I will likely merge it as-is and make adjustments myself.

I would appreciate changes in particular regarding:
- Improved icons for buildings and resources
- UI / UX improvements (themes, colors, navigation, transitions, etc.)
- Query improvements
- Best practices, especially for back-end and queries

If you have advice to give and don't want to write any code yourself, please feel welcome to PR a README with what changes can be made and why, and I will be happy to merge the file and implement the changes.

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

**WARNING**<br>
In this stage of development, necessary security measures are not in place. Do not put provide public access to this server in its current state.

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
$ yarn frontend

# start the game server
$ yarn backend

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```


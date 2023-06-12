# Frontend setup without docker

Install npm modules
### `npm i`

Run the server
### `npm start`

## Account created by default
**Admin account**: \
admin@thetiptop.com \
adminadmin \
**Employee account**: \
employee@thetiptop.com \
employee \
**User account**: \
user@thetiptop.com \
useruser

## Google Analytics Account (+ OAuth IDS for mailer)
thetiptopg1analytics@gmail.com \
sFUyZy^r5x@Z


## TODO
- [] SSR: setup to have it when js is disabled on client side (worked on the integration in a fork project but will not be integrated to the final project)
- [x] fix refreshToken in axiosInterceptor not working (infinite loop)
- [x] change site URL in google analytics property + sitemap.xml + api transporter + OAuth2 mail ID
- [x] footer: politique de cookies, de confidentialité, d'utilisation, mentions légales, contact, à propos de nous
- [x] contact page

- [x] Google auth
- [x] google analytics
- [x] robot.txt / sitemap.xml
- [x] pagination in user and gift table
- [x] add id in user and gift table
- [x] api: gift belongs to: sort by newest
- [x] api: prevent brute force on submit code and check that game not ended
- [x] api: create game model to define the start and end date of the game
- [x] api: route to define the final winner of the big prize
- [x] adminDashboard: set game start/end + set final winner
- [x] admindashboard: add picture avatar in gift by type
- [x] Add cookies consent and initialize GA or not
- [x] Write e2e tests for auth
- [x] Reset password
- [x] api: generate all 1 500 000 tickets code at once to respect ratios
- [x] api: add new gift property: 'picked'
- [x] api: route to pick a random gift code that has not already been picked + patch the property 'picked' to true (for shop when generating ticket with code)
- [x] api: submit-code -> code can not been played if has not been picked
- [x] front: refacto gift list by filtering with 'picked', 'not picked', 'played' (+ checkedOut already done) and display these properties in the table list
- [x] add picked to gifts stats
- [x] fix refreshToken handler for Oauth2 mailer + fix validate password confirm + delete token after password reset
- [x] change icon of nav with something more understandable
- [x] fix responsive nav that makes the 'qui-sommes-nous' disapear on mobile
- [x] fix colors contrast

### AUTH
- [x] post /login -> authService.login
- [x] post /user -> authService.register
- [x] post /auth/google -> authService.googleLogin

### ADMIN
- [x] get /user/:id (where id = 'newsletter) -> adminService.getNewsletterEmails
- [x] get /emailing -> adminService.getNewsletterEmailsCSV
- [x] get /stats -> adminService.getStats (for the admin dashboard)
- [x] patch /gift/winner -> adminService.setWinner
- [x] patch /gift/reset-winner -> adminService.resetWinner
- [x] get /gift/winner -> adminService.getWinner
### USER
- [x] get /user -> userService.getAll
- [x] get /user/:id -> userService.getById
- [x] patch /user/id  userService.update
- [x] delete /user/id -> userService.deleteUser

### GIFT
- [x] post /gift -> giftService.create
- [x] post /gift/submit-code -> giftService.submitCode
- [x] get /gift -> giftService.getAll
- [x] get /gift/belongs/:userId -> giftService.getUserGifts
- [x] patch /gift/:id -> giftService.checkout
- [x] delete /gift/:id -> giftService.deleteById
- [~] get /gift/:id  not needed

### GAME
- [x] post /game -> gameService.startGame
- [x] get /game -> gameService.getGame
- [x] patch /game -> gameService.updateEndDate
- [x] delete /game -> gameService.deleteGame

## Testing with cypress
### Create index.js in `/node_modules/@cypress/react/plugins/index.js`
put this inside:
```javascript
const injectDevServer = require("@cypress/react/plugins/react-scripts")
 module.exports = (on, config) => {
  injectDevServer(on, config)
  return config
}
```

Open the Cypress Component Test Runner:
#### `npm run cypress-open`

Or to run test in CI:
#### `npm run cypress-run`


### Prevent Linter error from crashing app ?
Create **.env** file in the root folder and add
#### `ESLINT_NO_DEV_ERRORS=true`

### Linter
To use the linter, install ESlint extension \
Configure your editor to format on save: \
VSCode: use command palette to open Preferences:Open Workspace Settings(JSON) \
in the settings.json file, add:
```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript"]
}
```

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

----------------------
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

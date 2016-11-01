# Football Teams App

The app is available at http://htmlpreview.github.io/?https://github.com/TimHandy/football-manager/blob/master/dist/index.html

View in dev tools with the mobile device view; best viewed at around smartphone size.

## About

App to record friendly football game winning points.
Points are recorded cumulatively, per player, so that at the end of the season you have a winning individual.

HTML, CSS, Javascript. Open index.html to begin.

- Generates two evenly matched random teams by selecting available existing players or adding players to the database first.
- Teams are evenly matched using each players' assigned skill rating.
- Game stats are recorded, including game date, teams, players, winning score, goal scorers.
- Cumulative stats are recorded for each player: total goals scored across the season and individual winning points (3 points for a win, 2 for a draw, 1 point for playing).
- Reports by player league score and total goals to determine a season winner.
- Players can be charged a nominal fee for lateness to games, which is recorded until paid up (not yet implemented).
- Data is stored in localStorage on the device and can be exported as raw JSON.

Designed for Karl; he plays a weekly game with his mates. The brief was:

- 17 mates, 1 game each week
- Each player is skill scored 1-3
- Each Tue everyone gets an email: who's in, who's out, They respond. - could this be online webapp, email reminder and they go on the website to RSVP.
- Just before the game, generate two evenly matched by ability teams
- Each week the teams should be different - the above should sort this?
- PrintTeams(playersRSVP) could generate a txt file to print to take to the game (or might need to regenerate on site?)
- win = 3, lose =1, draw = 2 (each person receives points)
- League table is per person, not per team
- Late charge = £1/min charge
- How much per game to play?
- Number of goals is also recorded
- Need to output the current stats to a text file? so that it can be emailed out?
- Show and update players if RSVP but no-show - maybe a forfeit for this?
- End of season lowest individual score pays for the whole meal out at a curry house!

## Development Setup

1. Clone the repo to your machine
1. cd into the root dir of repo
2. Install dependencies

       $ npm install

1. Start the development server 'webpack-dev-server'. The url will be http://localhost:8080/

       $ npm start

1. If you want to export the output to the dist dir. This is not required for development however. Webpack combines the js module files and does Babel transpiling

       $ webpack 


See webpack.config.js for what's installed:
- webpack-dev-server to start a server
- all source files are in the src dir, including index.html, css, js files
- HtmlWebpackPlugin  so that the index.html can live in src file and still open automatically when you go to http://localhost:3000/
- devtool: 'eval-source-map' so that errors in Chrome are displayed with the original filename, not the bundle.js file
- css loader
- path module for future deployment OS independence




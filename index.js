const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

function getGitProfile(username, callback){
    const accesAPI = { url:'https://api.github.com/users/' + username, headers: {'User-Agent': 'Projet estudiantin'}}

    request(accesAPI, (err, response, body) => {
        if (err) {
            console.log("erreur: ")
            console.error(err);
        } else {
            // body is a string that needs to be parsed
            const user = JSON.parse(body);
            callback(user);
        }
    });
}

// Use Pug to render views
app.set('view engine', 'pug');

// Serve assets from the public folder --> public devient la racine, le /
app.use(express.static('public'));

// Decode form data
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON body
app.use(bodyParser.json());

// Render the home page
app.get('/', (req, res) => {
    // Express will look for a page named homepage.pug
    // in the "views" folder so you should have a "views/homepage.pug" file
    res.render('homepage');
});

app.get('/profile/', (req, res) => {
    const username = req.query.username;

    getGitProfile(username,(user) => {
        res.render('profile', {user})
    });

});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});
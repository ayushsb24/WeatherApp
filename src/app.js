const express = require('express');
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

//Paths
const staticPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.use(express.static(staticPath));

// Setting View Engine
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)


//Routing.

app.get('/', (req, res) => {
    res.render("index")
});
app.get('/about', (req, res) => {
    res.render("about")

});
app.get('/weather', (req, res) => {
    res.render("weather")

});
app.get('*', (req, res) => {
    res.render("404error", {
        errorMsg: 'Opps! Page Not Found'
    })
    res.status('404');

});

app.listen(port, () => {
    console.log(`Listining on localhost:${port}`);
});

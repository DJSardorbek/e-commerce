const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});
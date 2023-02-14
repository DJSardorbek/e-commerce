const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ defaultLayout: 'main', extname: 'hbs' });
const homeRoutes = require('./routes/home');
const notebooksRoutes = require('./routes/notebooks');
const addRoutes = require('./routes/add');
const basketRoutes = require('./routes/card');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/', homeRoutes);
app.use('/notebooks', notebooksRoutes);
app.use('/add', addRoutes);
app.use('/card', basketRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
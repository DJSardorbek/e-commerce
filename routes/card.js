const {Router} = require('express');
const router = Router();
const Card = require('../models/card');
const Notebook = require('../models/notebook');

router.get('/', async (req, res) => {
    const card = await Card.fetch();
    res.render('basket', {
        title: 'Basket',
        isCard: true,
        notebooks: card.notebooks,
        price: card.price
    });
});

router.post('/add', async (req, res) => {
    const notebook = await Notebook.getById(req.body.id);
    await Card.add(notebook);
    res.redirect('/card');
});

router.delete('/remove/:id', async (req, res) => {
    card = await Card.remove(req.params.id);
    res.status(200).send(card);
});

module.exports = router;
const { Router } = require('express');
const router = Router();
const Notebook = require('../models/notebook');

router.get('/', async (req, res) => {
    const notebooks = await Notebook.getAll();
    res.render('notebooks', {title: 'Notebooks page', isNotebooks: true, notebooks});
});

router.get('/:id', async (req, res) => {
    const notebook = await Notebook.getById(req.params.id);
    res.render('notebook', 
    {
        layout: 'detail',
        title : `Notebook ${notebook.title}`,
        notebook
    });
});

router.get('/:id/edit', async (req, res) => {
    const notebook = await Notebook.getById(req.params.id);
    if(!req.query.allow) {
        return res.redirect('/');
    }
    res.render('edit-notebook', {title: `${notebook.title} edit`, notebook});
});

router.post('/edit', async (req, res) => {
    await Notebook.Update(req.body);
    res.redirect('/notebooks');
});

module.exports = router;
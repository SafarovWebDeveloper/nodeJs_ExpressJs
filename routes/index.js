const { Router } = require('express');
const roter = Router();
const Schema = require('../model/sChema');

roter.get('/', (req, res) => {
    Schema.find({}, (err, data) => {
        if (err) console.log(err)
        else {
            // console.log(data);
            res.render('index', {
                title: 'Home Page',
                datas: data
            });
        };
    });
});



roter.get('/product/:id', (req, res) => {
    Schema.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render('add', {
                title: 'Product Update',
                datas: data,
                page: 'Product Update Page',
                button:'Update'
            });
        };
    });
});

roter.get('/delete/:id', (req, res) => {
    Schema.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/')
        } else {
            console.log(`ERROR BOLDI`+ err);
        };
    });
});


roter.post('/product/:id', (req, res) => {
    const updateDb = {};

    console.log(req.body)

    updateDb.title = req.body.title,
        updateDb.author = req.body.author,
        updateDb.price = req.body.price,
        updateDb.meta = { buying: req.body.buying },
        updateDb.meta = { reading: req.body.reading },  //bu 2 xil yozish usuli updateDb.meta.reading(req.body.reading) shu 
        updateDb.photo = '/img/' + req.body.photo
    const updateId = { _id: req.params.id };

    Schema.update(updateId, updateDb, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        };
    });
});

roter.post('/', (req, res) => {
    res.send('Home Page post');
});

module.exports = roter;
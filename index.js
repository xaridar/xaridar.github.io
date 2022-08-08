const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(require('morgan')('dev'));
app.use(require('cors')());

app.set('view engine', 'ejs');

app.use('/', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {
        header: undefined,
        pages: fs
            .readdirSync('./views', { withFileTypes: true })
            .filter((dir) => dir.isFile() && dir.name !== 'index.ejs')
            .map((dir) => dir.name.split('.')[0]),
    });
});
app.get('/index', (req, res) => {
    res.render('index', {
        header: undefined,
        pages: fs
            .readdirSync('./views', { withFileTypes: true })
            .filter((dir) => dir.isFile() && dir.name !== 'index.ejs')
            .map((dir) => dir.name.split('.')[0]),
    });
});
app.get('/:page', (req, res, next) => {
    if (fs.existsSync(path.join(__dirname, `/views/${req.params.page}.ejs`))) {
        res.render(req.params.page, {
            header: req.params.page.replace(/_/g, ' '),
            pages: fs
                .readdirSync('./views', { withFileTypes: true })
                .filter((dir) => dir.isFile() && dir.name !== 'index.ejs')
                .map((dir) => dir.name.split('.')[0]),
        });
    } else next();
});
app.get('*', (req, res) => {
    res.redirect('/');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Now listening on port ${port}!`);
});

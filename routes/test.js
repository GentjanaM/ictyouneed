var express = require('express');
var router = express.Router();
var pg = require('pg');


//var conString = "postgres://fori:123456789@localhost/youneed";

/* GET about page. */
router.get('/test', function(req, res) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * from public.user', function (err, result) {
            if (err) {
                return console.error('error runing query', err);
            }
            res.render('test', {users: result.rows, title: 'Test'});
            console.log(result.rows);
            done();
        });
    });
});

module.exports = router;
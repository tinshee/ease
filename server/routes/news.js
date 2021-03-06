var News = require('../model/newsModel');

module.exports = function (app) {
    // console.log(apiConfig.api_url_newslist);

    app.namespace('/api/news', function (e) {
        app.get('/', function (req, res) {

            News.fetch(req.query, function (err, data) {
                if (err) {
                    console.log(err);

                }
                res.send(data)
            });
        });

        app.get('/:id', function (req, res) {
            News.findById(req.params.id, function (err, data) {
                if (err) {
                    console.log(err);
                }
                res.send(data);
            })
        });
        app.put('/:id/addCommented', function (req, res) {

            News.addCommented(req.params.id, function (err,data) {
                if(err){
                    console.log(err);
                }
                res.json({msg: '更新成功'});
            })
        })
    })

};
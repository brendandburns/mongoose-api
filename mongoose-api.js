var mongoose = require('mongoose');
var express = require('express')
var bodyParser = require('body-parser')

var mongoHost = process.argv[2];
mongoose.connect('mongodb://' + mongoHost + '/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});

var resourceName = process.argv[3];
var schema = JSON.parse(process.argv[4]);
var objSchema = mongoose.Schema(schema);

var Obj = mongoose.model('Object', objSchema);

var app = express();
app.use(bodyParser.json());

app.get('/' + resourceName, function (req, res) {
    Obj.find(function(err, list) {
        res.json(list);
    });
});

app.get('/' + resourceName + '/:rsrcId', function(req, res) {
    Obj.find({ name: new RegExp(req.params.rsrcId, 'i') }, function(err, list) {
        if (list.length > 0) {
            res.json(list[0]);
        } else {
            res.status(404);
            res.send('Not Found');
        }
    })
});

app.post('/' + resourceName,  function(req, res) {
    var obj = new Obj(req.body);
    obj.save(function(err) {
        if (err) {
            console.log('ERROR: ' + err);
        }
        res.json(res.body);
    })
});

app.put('/' + resourceName + '/:rsrcId', function(req, res) {
    var obj = new Obj(req.body);
    obj.save(function(err) {
        if (err) {
            console.log('ERROR: ' + err);
        }
        res.json(res.body);
    })
});

app.delete('/' + resourceName, function(req, res) {
    Obj.remove().exec();
});

app.delete('/' + resourceName + '/:rsrcId', function(req, res) {
    Obj.find({ name: new RegExp(req.params.rsrcId, 'i') }, function(err, objs) {
        if (err) {
            console.log(err);
        }
        if (objs.length > 0) {
            objs[0].remove();
            res.json({'status': 'ok'});
        } else {
            res.status(404);
            res.send('Not Found');
        }     
    });
});

app.listen(3000, function () {
  console.log('API Server listening on port 3000');
});


module.exports = function(app) {

    getTimestamp = function() {
        var date = new Date();
        var ts = "" + date.getFullYear() + 
        ('0' + (date.getMonth() + 1)).slice(-2) + 
        ('0' + date.getDate()).slice(-2) + 
        ('0' + date.getHours()).slice(-2) + 
        ('0' + date.getMinutes()).slice(-2) + 
        ('0' + date.getSeconds()).slice(-2) +
        ('00' + date.getMilliseconds()).slice(-3);
        return ts;
    }

    function decodeBase64Image(dataString) {

      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }

      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64');

      return response;
    }

    // testing routes work
    app.get('/', function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('webcam');
        res.end();
    });

    app.post('/photo', function (req, res) {

        var now = getTimestamp();

        console.log('photo - ' + now);

        var image = req.body.image;

        // NEED to handle ALL potential errors

        if (image == undefined) {

            console.log('/photo - MISSING image');

            res.writeHeader(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({ "filename" : null }));

        }
        else {

            var imageBuffer = decodeBase64Image(image);
            
            // console.log(imageBuffer);

            // { type: 'image/jpeg',
            //   data: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 b4 00 00 00 2b 08 06 00 00 00 d1 fd a2 a4 00 00 00 04 67 41 4d 41 00 00 af c8 37 05 8a e9 00 00 ...> }

            var fs = require('fs');

            fs.mkdir('static/grabs/', function() {
                var filename = 'grabs/' + now + '.jpg';
                fs.writeFile('static/' + filename, imageBuffer.data, function(err) {
        
                    res.writeHeader(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({ "filename" : filename }));

                })
            })        
        }
    })

}
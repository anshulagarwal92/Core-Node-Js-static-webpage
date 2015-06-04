var http = require('http'),
    url = require('url'),
    fs = require('fs');

http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    loadFile(path, res);
}).listen(8081);

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

function loadFile(path, res) {
    fs.readFile("../public/"+path, function(err, data) {
        if (err) return send404(res);
        var contentType = path.split(".")[1];
        switch(contentType) {
            case 'html':
                contentType = 'text/html';
                break;
            case 'js':
                contentType = 'text/javascript';
                break;
            case 'css':
                contentType = 'text/css';
                break;
            case 'jpg':
                contentType = 'type/jpg';
                break;
            case 'png':
                contentType = 'type/png';
                break;
            default:
                send404(res);
        }
        res.writeHead(200, {'Content-Type': contentType})
        res.write(data, 'utf8');
        res.end();
    });
}
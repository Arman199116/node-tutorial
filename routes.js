const fs = require('fs');

function requestHandler(req, res) {
    const method = req.method;
    
    if (req.url === '/') {
        res.write('<html>');
        res.write('<head><title>message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form></body>');
        res.write('</html>');
    
        return res.end();
    }
    if (req.url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    return res.end();
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    } else {

        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>my first page</title></head>');
        res.write('<body><h1>hello from my NODE.JS Server</f1></body>');
        res.write('</html>');

        res.end();
    }
}

module.exports = {
    requestHandler,
    text: 'some text'
};
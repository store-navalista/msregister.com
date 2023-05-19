const { createServer } = require('https')
const { parse } = require('url')
const fs = require('fs');
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'msregister.com'
const port = 443
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const httpsOptions = {
	key: fs.readFileSync('../certificates/key.pem'),
	cert: fs.readFileSync('../certificates/cert.pem')
};

app.prepare().then(() => {
	createServer(httpsOptions, (req, res) => {
		const parsedUrl = parse(req.url, true)
		handle(req, res, parsedUrl)
	}).listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on https://${hostname}`)
	})
})


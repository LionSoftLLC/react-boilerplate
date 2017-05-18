import models from "./schemas/Models";
//dependencies
const express = require(`express`);
// const console = require(`lionsoft-common-bin`).console;
const ip = require(`ip`);
const cookieParser = require(`cookie-parser`);
const bodyParser = require(`body-parser`);
const argv = require(`minimist`)(process.argv.slice(2));
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require(`ngrok`) : false;
const resolve = require(`path`).resolve;

//local dependencies
const SocketServer = require(`./socket/SocketServer`).default;
const setup = require(`./../hotloading/hotloader`);
const api = require(`./routes/api/`);

//instantiated
const isDev = process.env.NODE_ENV !== `production`;

const App = class App {
	constructor() {
		this._expressServer = express();
		// get the intended host and port number, use 0.0.0.0 and port 3000 if not provided
		this._customHost = argv.host || process.env.HOST;
		this._host = this._customHost || `0.0.0.0`; // Let http.Server use its default IPv6/4 host
		this._prettyHost = this._customHost || `0.0.0.0`;

		this._port = argv.port || process.env.PORT || 3000;

		//start the server
		this._setupServer();
		this._startListener();
		this._createRoutes();
	}

	////////////////////////
	// GETTERS AND SETTERS//
	////////////////////////

	get Host() {
		return this._host;
	}

	get Port() {
		return this._port;
	}

	get ExpressServer() {
		return this._expressServer;
	}

	get SocketServer() {
		return this._socketServer;
	}

	get HttpServer() {
		return this._httpServer;
	}

	get Models() {
		return models;
	}

	////////////////////
	// PRIVATE METHODS//
	////////////////////

	_setupServer() {
		// preserve context
		const _this = this;

		// In production we need to pass these values in instead of relying on webpack
		setup(_this._expressServer, {
			outputPath: resolve(process.cwd(), `build`),
			publicPath: `/`,
		});
	}

	_startListener() {
		// preserve context
		const _this = this;

		// Start the express server.
		_this._httpServer = _this._expressServer.listen(_this._port, _this._host, (err) => {
			if (err) {
				console.log(err.message, `error`);
				return err;
			}

			console.log(`Server started!`, `success`);

			// Connect to ngrok in dev mode
			if (ngrok) {
				ngrok.connect(_this._port, (innerErr) => {
					if (innerErr) {
						console.log(innerErr, `error`);
						return innerErr;
					}

					console.log(`Tunnel initialised.`, `success`);
				});
			}
			console.log(`
				Access URLs:
				Localhost:  http://${_this._host}:${_this._port}
				LAN: http://${ip.address()}:${_this._port}
					`, `info`);

			_this._createSocketServer();
		});
	}

	_createRoutes() {
		// preserve context
		const _this = this;

		const server = _this._expressServer;

		// make sure we have a return object to add our data to
		server.use((req, res, next) => {
			if (typeof req.returnJson === `undefined`) {
				req.returnJson = {};
			}

			req.app.models = _this.Models;
			req.returnJson[`msg`] = `something happened.`;
			req.returnJson[`success`] = true;
			req.returnJson[`data`] = {};

			next();
		});

		// uncomment after placing your favicon in /public
		//app.use(favicon(path.join(__dirname, `public`, `favicon.ico`)));
		// app.use(console(`dev`));
		server.use(bodyParser.json());
		server.use(bodyParser.urlencoded({ extended: false }));
		server.use(cookieParser());

		//TOP LEVEL ROUTES
		server.use(`/api`, api);
		//set static server
		server.use(`/static`, express.static(`./../../app/assets`));

		// error handler
		server.use((err, req, res, next) => {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = isDev ? err : {};

			// render the error page
			res.status(err.status || 500);
			res.json({ error: err.status, msg: err.message, success: false });
		});
	}

	_createSocketServer() {
		// preserve context
		const _this = this;

		_this._socketServer = new SocketServer(_this._httpServer);
		console.log(`Socket server initialized on path ${_this._socketServer._path}`, `info`);
	}
};

module.exports = App;

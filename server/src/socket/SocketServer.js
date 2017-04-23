//dependencies
const IOServer = require(`socket.io`);
const Logger = require(`lionsoft-common-bin`).Logger;

//local dependencies
// const CartNamespace = require(`./CartNamespace`).default;

const SocketServer = class SocketServer {
	constructor(httpServer) {
		this._namespaces = {};

		this._startServer(httpServer);
		this._path = `/socket.io`;
	}

	////////////////////////
	// GETTERS AND SETTERS//
	////////////////////////

	get Server() {
		return this._server;
	}

	////////////////////
	// PRIVATE METHODS//
	////////////////////

	_startServer(httpServer) {
		// preserve context
		const _this = this;

		// _this._server = new IOServer(httpServer, {
		// 	path: _this._path,
		// 	serveClient: true,
		// 	origins: `*`
		// });

		_this._server = new IOServer(httpServer);
		_this._createDefaultSockets();
		_this._createNamespaces();
	}

	_createNamespaces() {
		// preserve context
		const _this = this;

		// _this._cartNsp = new CartNamespace(_this._server.of(`/cart`));
	}


	_createDefaultSockets() {
		// preserve context
		const _this = this;

		_this._server.on(`connection`, (clientSocket) => {
			clientSocket.on(`push-notification-send`, (data) => {
				const { notifHeader, notifBody, selectedEmail } = data;
				Logger.log(`emitting notification to: ${selectedEmail}`, `debug`);

				_this._server.to(selectedEmail).emit(`push-notification-received`, { notifHeader, notifBody, from: `admin` });
			});

			clientSocket.on(`join`, ({ selectedEmail }) => {
				_this._handleClientJoinRoom(clientSocket, selectedEmail);
			});

			Logger.log(`==================================`, `debug`);
			Logger.log(`Client connected to default namespace`, `debug`);
			Logger.log(`==================================`, `debug`);
		});
	}

	_handleClientJoinRoom(clientSocket, roomName) {
		// preserve context
		const _this = this;

		console.log(`roomname: ${roomName}`);

		//TODO Check for user authentication to ensure they can join the desired roomName
		clientSocket.join(roomName);
	}
};

export { SocketServer };
export default SocketServer;

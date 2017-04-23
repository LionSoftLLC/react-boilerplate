//dependencies
const Logger = require(`lionsoft-common-bin`).Logger;

//local dependencies
const CartEvents = require(`./../events/CartEvents`).default;

const PushNamespace = class PushNamespace {
	constructor(nsp) {
		this._nsp = nsp;
		this._setHandlers();
	}

	////////////////////
	// PRIVATE METHODS//
	////////////////////

	_setHandlers() {
		// preserve context
		const _this = this;

		_this._nsp.on(`connection`, (clientSocket) => {
			clientSocket.on(`disconnect`, () => _this._handleClientDisconnect(clientSocket));
			clientSocket.on(`join`, (roomName) => _this._handleClientJoinRoom(clientSocket, roomName));

			Logger.log(`==================================`, `debug`);
			Logger.log(`Client connected to cart namespace`, `debug`);
			Logger.log(`==================================`, `debug`);
		});

		CartEvents.setCartItemAddedHandler(_this._handleSendPush.bind(_this));
		CartEvents.setCartClearedHandler(_this._handleCartCleared.bind(_this));
	}

	////////////////////////
	// CART EVENT HANDLERS//
	////////////////////////

	_handleSendPush(addedItem, email) {
		// preserve context
		const _this = this;
		Logger.log(`socket item added.`, `debug`);
		_this._nsp.to(email).emit(`item-added`, { item: { ...addedItem }, email });
	}

	_handleCartCleared(email) {
		// preserve context
		const _this = this;

		_this._nsp.to(email).emit(`cart-cleared`, { email });
	}

	////////////////////
	// SOCKET HANDLERS//
	////////////////////

	_handleClientDisconnect(clientSocket) {
		Logger.log(`Client disconnected from cart namespace`);
	}

	_handleClientJoinRoom(clientSocket, roomName) {
		//TODO Check for user authentication to ensure they can join the desired roomName
		clientSocket.join(roomName);
	}
};

export default PushNamespace;

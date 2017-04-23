//dependencies
const Logger = require(`lionsoft-common-bin`).Logger;

//local dependencies
const CartEvents = require(`./../events/CartEvents`).default;

const CartNamespace = class CartNamespace {
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

		CartEvents.setCartItemAddedHandler(_this._handleCartItemAdded.bind(_this));
		CartEvents.setCartItemRemovedHandler(_this._handleCartItemRemoved.bind(_this));
		CartEvents.setCartItemUpdatedHandler(_this._handleCartItemUpdated.bind(_this));
		CartEvents.setCartClearedHandler(_this._handleCartCleared.bind(_this));
	}

	////////////////////////
	// CART EVENT HANDLERS//
	////////////////////////

	_handleCartItemAdded(addedItem, email) {
		// preserve context
		const _this = this;
		Logger.log(`socket item added.`, `debug`);
		_this._nsp.to(email).emit(`item-added`, { item: { ...addedItem }, email });
	}

	_handleCartItemRemoved(itemId, email) {
		// preserve context
		const _this = this;

		_this._nsp.to(email).emit(`item-removed`, { itemId, email });
	}

	_handleCartItemUpdated(newItem, email) {
		// preserve context
		const _this = this;
		Logger.log(`socket item updated.`, `debug`);

		_this._nsp.to(email).emit(`item-updated`, { item: { ...newItem }, email });
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

export default CartNamespace;

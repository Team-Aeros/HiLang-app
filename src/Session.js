import React from 'react';

export default class Session {
	token = null;
	userId = null;

	static getInstance() {
		if(Session.instance == null) {
			Session.instance = new Session();
		}

		return Session.instance;
	}

	saveToken(token) {
		this.token = token;
	}

	getToken() {
		return this.token;
	}

	saveUserId(userId) {
		this.userId = userId;
	}

	getUserId() {
		return this.userId;
	}
}
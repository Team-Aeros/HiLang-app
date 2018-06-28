import React from 'react';
import Session from './Session.js';

export default class Api {

	static instance = null;
	url = "http://82.72.82.219/api";

	static getInstance() {
		if(Api.instance == null) {
			Api.instance = new Api();
		}

		return Api.instance;
	}

	callApi(action, method, data, callBack = response => console.log(response)) {
		let userData = {
			token: Session.getInstance().getToken(),
            user_id: Session.getInstance().getUserId(),
            params: data
		}
		fetch(this.url + '/api' + action, {
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData)
		}).then((response) => response.json())
		.then(responseJson => callBack(responseJson))
		.catch((error) => {
			console.log(error);
		})
	}

	apiLogin(action, method, data, callBack = response => console.log(response)) {
		fetch(this.url + '/api' + action, {
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		}).then((response) => response.json())
		.then(responseJson => callBack(responseJson))
		.catch((error) => {
			console.log(error);
		})
	}
}
import Api from './Api.js';
import { Alert } from 'react-native';

export default class LazyUserLoader {

    static _instance = null;

    _pool = [];

    static getInstance() {
        if (this._instance === null)
            this._instance = new this();

        return this._instance;
    }

    executeOnUser(id, callback = user => {}) {
        if (this._pool[id] === undefined || this._pool[id] === null) {
            let api = Api.getInstance();
            api.callApi('/user/' + id + '/', 'POST', {}, user => {
                callback(user);
                this._pool[id] = user;
            });
        }
        else
            callback(this._pool[id]);
    }
}
import Api from './Api.js';

export default class UserPool {

    static _instance = null;

    _pool = {};

    constructor() {

    }

    static getInstance() {
        if (this._instance === null)
            this._instance = new this();

        return this._instance;
    }

    getUser(id) {
        //if (this._pool[id] !== null)

        return this._pool[id]
    }
}
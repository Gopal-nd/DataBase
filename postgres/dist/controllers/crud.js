"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = exports.Delete = exports.Update = exports.Insert = exports.CreateAddress = exports.CreateAtabel = exports.connect = exports.createClient = void 0;
const pg_1 = require("pg");
const connectionString = 'postgresql://postgres:postgres@localhost:5432/postgres';
function createClient() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({ connectionString });
        yield client.connect();
        return client;
    });
}
exports.createClient = createClient;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield createClient();
            console.log('connected');
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.end();
        }
    });
}
exports.connect = connect;
function CreateAtabel(query) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield createClient();
            yield client.query(query);
            console.log('table created');
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.end();
        }
    });
}
exports.CreateAtabel = CreateAtabel;
function CreateAddress(query) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield createClient();
            yield client.query(query);
            console.log('Address table created');
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.end();
        }
    });
}
exports.CreateAddress = CreateAddress;
function Insert(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield createClient();
            const values = [user.name, user.email, user.password];
            const query = `INSERT INTO users(name, email, password) VALUES ($1, $2, $3)`;
            yield client.query(query, values);
            console.log('user inserted');
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.end();
        }
    });
}
exports.Insert = Insert;
function Update(name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield createClient();
            const query = `UPDATE users SET name = $1 WHERE password = $2`;
            yield client.query(query, [name, password]);
            console.log('data updated');
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.end();
        }
    });
}
exports.Update = Update;
function Delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield createClient();
            const query = `DELETE FROM users WHERE id = $1`;
            yield client.query(query, [id]);
            console.log('data deleted');
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.end();
        }
    });
}
exports.Delete = Delete;
function Select(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield createClient();
            const query = `SELECT * FROM users WHERE id = $1`;
            const result = yield client.query(query, [id]);
            console.log(result.rows);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.end();
        }
    });
}
exports.Select = Select;

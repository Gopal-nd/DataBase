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
const crud_1 = require("./controllers/crud");
(0, crud_1.connect)();
const creationQuery = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
)`;
(0, crud_1.CreateAtabel)(creationQuery);
const AddressQuery = `CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`;
(0, crud_1.CreateAddress)(AddressQuery);
const user = {
    name: 'alwergi',
    email: 'XXXXXXXXXXXXX',
    password: 'eeeee'
};
(0, crud_1.Insert)(user);
// Update('boos','123456')
// Delete("2")
// Select('1')
// relatiuonship transaction and joints
function click() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, crud_1.createClient)();
        // await client.query(`INSERT INTO addresses (user_id, city, country, street, pincode)
        // VALUES (, 'New Yerhork', 'UreygreSA', '123 Broaddfhgrregrgeaerga zxcfgway St', '10001')`)
        // await client.query(`BEGIN`)
        // await client.query(`INSERT INTO users (name, email, password)
        // VALUES ('john_doe', 'john_doe1@example.com', 'securepassword123');`)
        // await client.query(`INSERT INTO addresses (user_id, city, country, street, pincode)
        // VALUES (currval('users_id_seq'), 'New York', 'USA', '123 Broadway St', '10001');`)
        // await client.query(`COMMIT`)
        try {
            const query = `
            SELECT u.id, u.name, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
            const result = yield client.query(query, [10]);
            if (result.rows.length > 0) {
                console.log('User and address found:', result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log('No user or address found with the given ID.');
                return null;
            }
        }
        catch (err) {
            console.error('Error during fetching user and address:', err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
click();

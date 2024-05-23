import {Client} from 'pg'
import { CreateAddress, CreateAtabel, Delete, Insert, Select, Update, connect, createClient } from './controllers/crud'

connect()

const creationQuery = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
)`
CreateAtabel(creationQuery)
const AddressQuery = `CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`
CreateAddress(AddressQuery)
export interface user{
    name:string,
    email:string,
    password:string

}
const user = {
    name:'alwergi',
    email:'XXXXXXXXXXXXX',
    password:'eeeee'
}
Insert(user)

// Update('boos','123456')

// Delete("2")
// Select('1')

// relatiuonship transaction and joints
async function click (){

    const client =await createClient()
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
        const result = await client.query(query, [10]);

        if (result.rows.length > 0) {
            console.log('User and address found:', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('No user or address found with the given ID.');
            return null;
        }
    } catch (err) {
        console.error('Error during fetching user and address:', err);
        throw err;
    } finally {
        await client.end();
    }
}
click()

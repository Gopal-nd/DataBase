import { Client } from 'pg';
import { user } from '..';

const connectionString = 'postgresql://postgres:postgres@localhost:5432/postgres';

export async function createClient() {
    const client = new Client({ connectionString });
    await client.connect();
    return client;
}

export async function connect() {
    let client;
    try {
        client = await createClient();
        console.log('connected');
    } catch (error) {
        console.log(error);
    } finally {
        client?.end();
    }
}

export async function CreateAtabel(query:string) {
    let client;
    try {
        client = await createClient();
        await client.query(query);
        console.log('table created');
    } catch (error) {
        console.log(error);
    } finally {
        client?.end();
    }
}
export async function CreateAddress(query:string) {
    let client;
    try {
        client = await createClient();
        await client.query(query);
        console.log('Address table created');
    } catch (error) {
        console.log(error);
    } finally {
        client?.end();
    }
}

export async function Insert(user:user) {
    let client;
    try {
        client = await createClient();
        const values = [user.name, user.email, user.password];
        const query = `INSERT INTO users(name, email, password) VALUES ($1, $2, $3)`;
        await client.query(query, values);
        console.log('user inserted');
    } catch (error) {
        console.log(error);
    } finally {
        client?.end();
    }
}

export async function Update(name:string, password:string) {
    let client;
    try {
        client = await createClient();
        const query = `UPDATE users SET name = $1 WHERE password = $2`;
        await client.query(query, [name, password]);
        console.log('data updated');
    } catch (error) {
        console.log(error);
    } finally {
        client?.end();
    }
}

export async function Delete(id:string) {
    let client;
    try {
        client = await createClient();
        const query = `DELETE FROM users WHERE id = $1`;
        await client.query(query, [id]);
        console.log('data deleted');
    } catch (error) {
        console.log(error);
    } finally {
        client?.end();
    }
}

export async function Select(id:string) {
    let client;
    try {
        client = await createClient();
        const query = `SELECT * FROM users WHERE id = $1`;
        const result = await client.query(query, [id]);
        console.log(result.rows);
    } catch (error) {
        console.log(error);
    } finally {
        client?.end();
    }
}

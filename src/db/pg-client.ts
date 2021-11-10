import pg from "pg";

const pgClient = new pg.Client({
    user: 'rabee',
    database: 'hw2',
    host: 'localhost',
    port: 5432,
    password: '7612331s'
});

export default pgClient;
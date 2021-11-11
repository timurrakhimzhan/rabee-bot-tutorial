import pg from "pg";

const pgClient = new pg.Client({
    user: 'rabee',
    database: 'hw2',
    host: 'localhost',
    port: 5432,
    password: '789456'
});

export default pgClient;
import express from 'express';
import bodyParser from "body-parser";
import {UserGetReqQuery, UserGetResponse} from "./types";
import {RouteParameters} from "express-serve-static-core";
import * as path from "path";
import pgClient from "./db/pg-client";

const app = express();

app.use(bodyParser.json({ type: 'application/*+json' }))

app.get("/", (req, res) => {
    console.log(process.cwd());
    res.sendFile(path.join(process.cwd(), "src/views/index.html"))
})

app.get<string, RouteParameters<string>, UserGetResponse, any, UserGetReqQuery>("/api/user", (req, res) => {
    const {query} = req;
    res.json({
        name: query.name ? query.name + " was provided" : "no name provided",
        surname: query.surname ? query.surname + " was provided" : "no surname provided",
    })
})

async function main() {
    try {
        await pgClient.connect();
        console.log("Connected to db");
    } catch(error) {
        console.log("Something went wrong during connecting to db");
    }
    await app.listen(3000);
    console.log("Server is listening on 3000 port");
}


main()


import pgClient from "./pg-client";
import {Request, Response} from "express";
import * as core from "express-serve-static-core";
import {RecordPostReqBody} from "../types";

export const getRecord = (request: Request, response: Response) => {
    pgClient.query('SELECT * FROM record', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

export const getRecordByEmail = (request, response) => {
    const email = request.params.email //TODO: CHECK parseInt

    pgClient.query('SELECT * FROM record WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

export const createRecord = (request: Request, response: Response) => {
    const { email, cname, disease_code, total_deaths, total_patients } = request.body

    pgClient.query('INSERT INTO record (email, cname, disease_code, total_deaths, total_patients) VALUES ($1, $2, $3, $4, $5)', [email, cname, disease_code, total_deaths, total_patients], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`New record was created.`)
    })
}

export const updateRecord = (request, response) => {
    // const email = request.params.email //TODO: CHECK parseInt
    // // const { name, email } = request.body
    //
    // pgClient.query(
    //     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    //     [name, email, id],
    //     (error, results) => {
    //         if (error) {
    //             throw error
    //         }
    //         response.status(200).send(`Record modified with email: ${email}`)
    //     }
    // )
}

export const deleteRecord = (request, response) => {
    const { email, cname, disease_code, total_deaths, total_patients } = request.body

    pgClient.query('DELETE FROM users WHERE email = $1, cname = $2, disease_code = $3, total_deaths = $4, total_patients = $5 ', [email, cname, disease_code, total_deaths, total_patients], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Record was deleted.`)
    })
}

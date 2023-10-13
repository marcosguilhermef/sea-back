
import express from 'express'
import { route } from './route';
const app = require('./app')


app.use(express.json())

app.use(route)


app.listen(3333, () => 'server running on port 3333')

module.exports = app
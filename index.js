const { send, json } = require('micro')
const cors = require('micro-cors')()
const { router, get, post, del, put } = require('microrouter')

const monk = require('monk')
const db = monk('mongodb://teacher:instructor1@helio-draper-shard-00-00-uocvs.mongodb.net:27017,helio-draper-shard-00-01-uocvs.mongodb.net:27017,helio-draper-shard-00-02-uocvs.mongodb.net:27017/crud?ssl=true&replicaSet=helio-draper-shard-0&authSource=admin&retryWrites=true')
const ships = db.get('space-ships')

const getSpaceShips = async (req, res) => {
    const results = await ships.find({});
    return send(res, 200, results)
}

const createSpaceShip = async (req, res) => {
    const data = await json(req)
    console.log(data) // Validation might go here
    const results = await ships.insert(data);
    return send(res, 201, results)
}

const updateSpaceShip = async (req, res) => {
    const data = await json(req)
    console.log(data) // Validation might go here
    const results = await ships.update({ _id: req.params.id }, data);
    return send(res, 200, results)
}

const deleteSpaceShip = async (req, res) => {
    const results = await ships.remove({ _id: req.params.id});
    return send(res, 200, results)
}

const notfound = (req, res) => {
    return send(res, 404, 'Not found route')
}

module.exports = cors(
    router(
        get('/ships', getSpaceShips),
        // get('/ship/:id', getSpaceShipByID),
        post('/ship', createSpaceShip),
        put('/ship/:id', updateSpaceShip),
        del('/ship/:id', deleteSpaceShip),
        get('/*', notfound)
    )
)
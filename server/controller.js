let properties = require('./db.json')
let globalID = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(properties)
    },
    deleteHouse: (req, res) => {
        let index = properties.findIndex(elem => elem.id === +req.params.id)
        properties.splice(index, 1)
        res.status(200).send(properties)
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body
        newHouse = {
            id: globalID,
            address,
            price,
            imageURL,
        }
        properties.push(newHouse)
        res.status(200).send(properties)
        globalID++
    },
    updateHouse: (req, res) => {
        const {id} = req.params
        const {type} = req.body
        let index = properties.findIndex(elem => +elem.id === +id)
        if(type === 'minus' && properties[index].price > 0){
            properties[index].price -= 10000
            res.status(200).send(properties)
        }else if(type === 'plus'){
            properties[index].price += 10000
            res.status(200).send(properties)
        }else{
            res.status(400).send('Something went wrong...')
        }
    }
}
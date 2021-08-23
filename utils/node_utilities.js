const Node = require("../models/node")

const getAllNodes = function(){
    return Node.find()
}

module.exports = {getAllNodes}
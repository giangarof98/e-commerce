const Repository = require('./repository');

class ProducsRepository extends Repository {};

module.exports = new ProducsRepository('products.json')
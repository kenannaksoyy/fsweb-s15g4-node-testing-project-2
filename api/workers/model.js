const db = require('../../data/db-config');
async function find() {
    return await db('workers');
};
async function findById(id) {
    return await db('workers').where({ wid: Number(id) }).first()
}
async function insert(worker) {
    return await db('workers')
      .insert(worker)
      .then(ids => ({ wid: ids[0] }));
}

module.exports = {find,findById,insert};
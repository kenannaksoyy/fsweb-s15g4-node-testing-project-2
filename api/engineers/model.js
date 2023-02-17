const db = require('../../data/db-config');
async function find() {
    return await db('engineers');
};
async function findById(id) {
    return await db('engineers')
    .where({eid: Number(id)})
    .first();
}
function insert(engineer) {
    return db('engineers')
      .insert(engineer)
      .then(ids => ({ eid: ids[0] }));
}

module.exports = {find,findById,insert};
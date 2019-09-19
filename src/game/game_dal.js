const getDb = require('../data-access/mongo_connection').getDb
var mongo = require('mongodb');


const save_grid = async (grid) => {
    const db = await getDb();
    const result = await db
        .collection('grids')
        .insertOne(grid)
    
    return result.ops[0]

}

const update_grid = async (id, grid) => {
    const db = await getDb()
    const editOptions = {}
    grid.x ? editOptions['x'] = grid.x : null;
    grid.y ? editOptions['y'] = grid.y : null;
    grid.data ? editOptions['data'] = grid.data : null;
    const result = await db
      .collection('grids')
      .updateOne(
        { _id: new mongo.ObjectID(id) },
        { $set:
            editOptions
        }
      )
     
    return result.modifiedCount > 0 ? { } : null
}

const get_grid_by_id = async (id) => {

    const db = await getDb();
    const query = {_id:  new mongo.ObjectID(id)}
    const result = await db.collection('grids').find(query)
    const found = await result.toArray()

    if (found.length === 0)
        return null
    else
        return found[0];
}

module.exports.save_grid = save_grid;
module.exports.update_grid = update_grid;
module.exports.get_grid_by_id = get_grid_by_id;

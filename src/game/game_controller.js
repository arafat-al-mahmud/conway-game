const game_service = require('./game_service')

const post_grid = async (req, res) => {

    try{

            const grid_body = req.body;
        
            const grid = await game_service.create_grid(grid_body)

            res.status(201).json({
                id: grid._id,
                x: grid.x,
                y: grid.y,
                data: grid.data
            })
        
        
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
}

const patch_grid = async (req, res) => {

    try{

        const grid_body = req.body;
        const id = req.params.id;
    
        const result = await game_service.edit_grid(id, grid_body)

        if(result != null)
            res.status(204).json({})
        else
            res.sendStatus(404)
    
    
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
}

const get_grid_by_id = async (req, res) => {

    
    try{

        const id = req.params.id;

        const result = await game_service.get_grid_by_id(id)

        if(result != null)
            res.status(200).json(result)
        else
            res.sendStatus(404)
    
    
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
}

const resolve_after_age = async (req, res) => {
    try{

        const id = req.params.id;
        console.log(id)
        const ages = req.query.age.split(",").map(a => parseInt(a))
        console.log(ages)

        const result = await game_service.resolve_after_age(id, ages)

        if(result)
            res.status(200).json(result)
        else
            res.sendStatus(404)
    
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
}

module.exports.post_grid = post_grid;
module.exports.patch_grid = patch_grid;
module.exports.get_grid_by_id = get_grid_by_id;
module.exports.after_age = resolve_after_age;
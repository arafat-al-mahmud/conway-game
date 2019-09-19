const game_dal = require('./game_dal')

const create_grid = async (grid_body) => {

    return await game_dal.save_grid(grid_body);
}

const edit_grid = async (id, grid_body) => {
    return await game_dal.update_grid(id, grid_body)
}

const get_grid_by_id = async (id) => {
    return await game_dal.get_grid_by_id(id)
}

const resolve_after_age = async (id, ages) => {

    const grid_body = await game_dal.get_grid_by_id(id);
    if(!grid_body)
        return null
    const x = grid_body.x;
    const y = grid_body.y
    const grid_data = grid_body.data.replace(/\s/g, '').split(",");

    const grid = [];

    for(let i = 0; i<x*y; ){
        let row = [];
        for(let j = 0; j<x; j++){
            row.push(grid_data[i++])
        }
        grid.push(row)
    }

    const age_data = [];

    for(let i = 0; i<ages.length; i++){
        let age = ages[i];
        let aged_grid = resolve_after_age_grid(age, grid.slice(0), x, y)
        age_data.push({
            "age" : age,
            "grid" : stringify_grid(aged_grid)
        })
    }

    return {
        id: id,
        x: x,
        y: y,
        data: age_data
    };
}

const stringify_grid = (grid, x, y) => {

    let merged_array = [];

    for(let i = 0; i < grid.length; i++){
        merged_array = merged_array.concat(grid[i]);
    }

    merged_array = merged_array.filter(x => x != null || x != undefined)

    return merged_array.toString();
}

const resolve_after_age_grid = (age, grid, x, y) => {

    let temporary_grid = grid.slice(0)

    for(let i = 0; i<age; i++){

        for(let j = 0; j<x; j++){
            for(let k = 0; k<y; k++){

                let live_count = 0;
                let dead_count = 0;

                //upper row
                if(grid[j-1] && grid[j-1][k-1] === '*')
                    live_count += 1;
                else if(grid[j-1] && grid[j-1][k-1] === '.')
                    dead_count += 1;
                
                if(grid[j-1] && grid[j-1][k] === '*')
                    live_count += 1;
                else if(grid[j-1] && grid[j-1][k] === '.')
                    dead_count += 1;
                
                if(grid[j-1] && grid[j-1][k+1] === '*')
                    live_count += 1;
                else if(grid[j-1] && grid[j-1][k+1] === '.')
                    dead_count += 1;

                //same row
                if(grid[j] && grid[j][k-1] === '*')
                    live_count += 1;
                else if(grid[j] && grid[j][k-1] === '.')
                    dead_count += 1;

                if(grid[j] && grid[j][k+1] === '*')
                    live_count += 1;
                else if(grid[j] && grid[j][k+1] === '.')
                    dead_count += 1;

                //bottom row
                if(grid[j+1] && grid[j+1][k-1] === '*')
                    live_count += 1;
                else if(grid[j+1] && grid[j+1][k-1] === '.')
                    dead_count += 1;

                if(grid[j+1] && grid[j+1][k] === '*')
                    live_count += 1;
                else if(grid[j+1] && grid[j+1][k] === '.')
                    dead_count += 1;
            
                if(grid[j+1] && grid[j+1][k+1] === '*')
                    live_count += 1;
                else if(grid[j+1] && grid[j+1][k+1] === '.')
                    dead_count += 1;

                //for live cell
                if(grid[j][k] == '*'){
                    if(live_count < 2 || live_count > 3)
                        temporary_grid[j][k] = "."
                }
                else if(grid[j][k] == '.'){ //for dead cell
                    if(live_count == 3)
                        temporary_grid[j][k] = "*"
                }
                
                
            }
        }

        grid = temporary_grid.slice(0)
    }

    return grid;
}

module.exports.create_grid = create_grid;
module.exports.edit_grid = edit_grid;
module.exports.get_grid_by_id = get_grid_by_id;
module.exports.resolve_after_age = resolve_after_age;
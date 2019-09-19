const express = require('express')
const bodyParser = require('body-parser')
const game_controller = require('./src/game/game_controller')
const app = express();
const PORT = process.env.API_PORT || 3000

app.use(bodyParser.json())

app.post("/grids", game_controller.post_grid)
app.patch("/grids/:id", game_controller.patch_grid)
app.get("/grids/:id", game_controller.get_grid_by_id)
app.get("/grids/:id/after", game_controller.after_age)

app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`)
})
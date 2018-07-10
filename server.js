const app = require('./app')
const config = require('./src/configs')
const port = config('PORT')

app.listen(port, ()=> {
    console.log(`App listening on port ${port}`)
})
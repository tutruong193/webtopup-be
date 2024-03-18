const UserRouter = require('./UserRouter')
const FacultyRouter = require('./FacultyRouter')
const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/faculty', FacultyRouter)
}

module.exports = routes;
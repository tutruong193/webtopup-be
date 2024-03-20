const UserRouter = require('./UserRouter')
const FacultyRouter = require('./FacultyRouter')
const EventRouter = require('./EventRouter')
const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/faculty', FacultyRouter)
    app.use('/api/event', EventRouter)
}

module.exports = routes;
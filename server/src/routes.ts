import express from 'express'

import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'
import UsersController from './controllers/UsersController'
import authMiddleware from './middlewares/auth'

const routes = express.Router()

const classesController = new ClassesController()
const connectionsController = new ConnectionsController()
const usersController = new UsersController()

routes.post('/register', usersController.create)
routes.post('/auth', usersController.createUserToken)

routes.use(authMiddleware)
routes.get('/me', usersController.fetchUserInfo)

routes.post('/classes', classesController.create)
routes.get('/classes', classesController.index)

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes

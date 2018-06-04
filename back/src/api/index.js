'use strict'

const { Router } = require('express')

const helloRouter = require('./hello')
const riderRouter = require('./rider')

module.exports = function addRouter(app) {
  const router = Router()

  router.use('/hello', helloRouter)
  router.use('/riders/', riderRouter)

  app.use('/api', router)
}

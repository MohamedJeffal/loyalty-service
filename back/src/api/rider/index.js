'use strict'

const express = require('express')
const wrap = require('co-express')

const controller = require('./rider.controller')

const router = express.Router()

/**
 * @api {get} /riders/:id Get rider loyalty data by id
 * @apiGroup Rider
 *
 * @apiDescription Get rider loyalty data by id
 *
 * @apiParam {String} id - Rider identifier
 *
 * @apiSuccess {String} template - Template of this service 'rider.loyalty'
 *             {String} id - rider identifier
 *             {Number} completedRides - Number of completed rides
 *             {String} loyaltyStatus - Loyalty status label
 *             {Number} totalPoints - Total earned points
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
        "template": "rider.loyalty",
        "id": 627505822616396,
        "completedRides": 157,
        "loyaltyStatus": "platinum",
        "totalPoints": 16973
    }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT_FOUND
 *     {
 *       "template": "rider.loyalty",
 *       "message": 'Rider with id 627505822616396 not found.'
 *     }
 *
 */
router.get('/:id', wrap(controller.getRiderLoyalty))

module.exports = router

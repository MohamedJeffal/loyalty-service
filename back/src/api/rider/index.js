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
 *     HTTP/1.1 200 OK
 *     {
 *       "template": "rider.loyalty",
 *       "id": 627505822616396,
 *       "completedRides": 157,
 *       "loyaltyStatus": "platinum",
 *       "totalPoints": 16973
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT_FOUND
 *     {
 *       "template": "rider.loyalty",
 *       "message": 'Rider with id 627505822616396 not found.'
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 BAD_REQUEST
 *     {
 *       "template": "rider.loyalty",
 *       "message": 'Invalid request: bad rider id.'
 *     }
 *
 */
router.get('/:id', wrap(controller.getRiderLoyalty))

/**
 * @api {get} /riders/:id Get rider completed rides by id
 * @apiGroup Rider
 *
 * @apiDescription Get rider completed rides by id
 *
 * @apiParam {String} id - Rider identifier
 *
 * @apiSuccess {String} template - Template of this service 'rider.loyalty.rides'
 *             {String} riderId - rider identifier
 *             {Array<Object>} rides - Completed rides
 *             {Number} rides.id - Rider identifier
 *             {String} rides.createdAt - Ride creation date
 *             {String} rides.initialPrice - Initial ride price in €
 *             {String} rides.completedAt - Ride completion date
 *             {String} rides.completedPrice - Completed ride price in €
 *             {Number} rides.earnedPoints - Earned points for completing this ride
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *      {
 *       "template": "rider.loyalty.rides",
 *       "riderId": 1152584073971054,
 *       "rides": [
 *           {
 *               "id": 1076556899285388,
 *               "createdAt": "2018-06-04T22:33:29.070Z",
 *              "initialPrice": "5.67€",
 *               "completedAt": "2018-06-04T22:33:29.082Z",
 *               "completedPrice": "7.73€",
 *               "earnedPoints": 8
 *           },
 *           {
 *               "id": 6746175037174551,
 *               "createdAt": "2018-06-04T22:33:29.092Z",
 *               "initialPrice": "28.79€",
 *               "completedAt": "2018-06-04T22:33:29.102Z",
 *               "completedPrice": "10.45€",
 *               "earnedPoints": 10
 *           }
 *       ]
 *      }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT_FOUND
 *     {
 *       "template": "rider.loyalty.rides",
 *       "message": 'Rider with id 627505822616396 not found.'
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 BAD_REQUEST
 *     {
 *       "template": "rider.loyalty",
 *       "message": 'Invalid request: bad rider id.'
 *     }
 *
 */
router.get('/:id/rides', wrap(controller.getRiderCompletedRides))

module.exports = router

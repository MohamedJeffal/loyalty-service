# Loyalty service

## Purpose

This service is responsible for managing the loyalty program, and is using an event-driven approach by listening to AMQP messages and reacting accordingly.

## Setup:
 Requirements: docker, docker-compose, yarn.
- Install node dependencies (in /back and /producer): `yarn install`

## Usage:
- Consumer + Mongodb + rabbitmq: `docker-compose up`
    => The loyalty service will be launched on port 8000.
- Producer: `docker-compose run producer yarn start`

## Available services:
- `/api/riders/:rider_id` => Get rider loyalty data by id
    - Result example: 
        ```
         {
           "template": "rider.loyalty",
           "id": 627505822616396,
           "completedRides": 157,
           "loyaltyStatus": "platinum",
           "totalPoints": 16973
         }
        ```

- `/api/riders/:rider_id/rides` => Get rider completed rides by id
    - Result example:
        ```
        {
            "template": "rider.loyalty.rides",
            "riderId": 1152584073971054,
            "rides": [
                {
                    "id": 1076556899285388,
                    "createdAt": "2018-06-04T22:33:29.070Z",
                    "initialPrice": "5.67€",
                    "completedAt": "2018-06-04T22:33:29.082Z",
                    "completedPrice": "7.73€",
                    "earnedPoints": 8
                },
                {
                    "id": 6746175037174551,
                    "createdAt": "2018-06-04T22:33:29.092Z",
                    "initialPrice": "28.79€",
                    "completedAt": "2018-06-04T22:33:29.102Z",
                    "completedPrice": "10.45€",
                    "earnedPoints": 10
                }
            ]
        }
        ```

## Todo:
- Add api `rider_id` params validation middleware with Joi: better handling of bad requests.
- Complete documentation.
- Add tests: at least unit tests for the loyalty module.
- Create js Error variants for each type of error encountered.
- Migrate console.log / console.warn instances to proper logging library.
- Improve error log messages.
- Add 'use strict' to js files header.
- Refactor:
    - Database initialization configuration.
    - Consumer sub interface functions.
- Investigate migrating to postgres: mondodb is nice for prototyping, but here the data model is relationnal.
- Check how to properly verify phone numbers sent by the producer.
- Update eslint config to be in sync with prettier formatting.

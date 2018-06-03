# Loyalty service

## Purpose

This service is responsible for managing the loyalty program, and is using an event-driven approach by listening to AMQP messages and reacting accordingly.


To run containers:
- Back + Mongodb + rabbitmq: docker-compose up
- Producer: docker-compose run producer yarn start

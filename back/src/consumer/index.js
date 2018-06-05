const { connect } = require('amqplib')
const { amqp } = require('../config')

const { riderSignup, updateRiderPhoneNumber } = require('../modules/rider')
const { createRide, completeRide } = require('../modules/ride')

const HANDLED_EVENTS = [
  'rider.signup',
  'rider.phone_update',
  'ride.create',
  'ride.completed',
]

function bindQueueRouting(channel, queue, events = HANDLED_EVENTS) {
  return Promise.all(
    events.map(event => channel.bindQueue(queue, amqp.exchange, event))
  ).then(() => queue)
}

function handleMessage(db, message) {
  if (!message || !message.content) {
    return Promise.reject(new Error(`Consumer failure: invalid message.`))
  }

  const messageContent = JSON.parse(message.content)
  // Todo: build map where handledEvent => handling fn
  switch (message.fields.routingKey) {
    case 'rider.signup':
      return riderSignup(db, messageContent).catch(err =>
        console.warn('Rider signup failure: ', err)
      )
    case 'rider.phone_update':
      return updateRiderPhoneNumber(db, messageContent).catch(err =>
        console.warn('Rider phone update failure: ', err)
      )
    case 'ride.create':
      return createRide(db, messageContent).catch(err =>
        console.warn('Ride creation failure: ', err)
      )
    case 'ride.completed':
      return completeRide(db, messageContent).catch(err =>
        console.warn('Ride completed failure: ', err)
      )
    default:
      return Promise.reject(
        new Error(
          `Producer event "${
            message.fields.routingKey
          }" not handled by the consumer.`
        )
      )
  }
}

module.exports = db => {
  return (
    connect(amqp.url)
      // Todo: connection close
      .then(conn => conn.createChannel())
      .then(channel => {
        return channel
          .assertExchange(amqp.exchange, 'topic', { durable: true })
          .then(() => channel.assertQueue('', { exclusive: true }))
          .then(qOk => bindQueueRouting(channel, qOk.queue))
          .then(queue =>
            channel.consume(queue, msg => handleMessage(db, msg), {
              noAck: true,
            })
          )
          .then(() => {
            console.log(' [*] Waiting for logs. To exit press CTRL+C.')
          })
      })
      .catch(console.warn)
  )
}

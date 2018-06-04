const { connect } = require('amqplib')
const { amqp } = require('../config')

const { riderSignup, updateRiderPhoneNumber } = require('../modules/rider')

const HANDLED_EVENTS = [
  'rider.signup',
  'rider.phone_update',
  /*'ride.create',
  'ride.completed',*/
]

/**
 * Todo:
 * - write a fn that maps on events type and consume
 */

function bindQueueRouting(channel, queue, events = HANDLED_EVENTS) {
  return Promise.all(
    events.map(event => channel.bindQueue(queue, amqp.exchange, event)),
  ).then(() => queue)
}

function handleMessage(db, message) {
  console.log('msg.fields.routingKey: ', message.fields.routingKey)
  console.log('contentcontentcontent: ', message.content.toString())

  const messageContent = JSON.parse(message.content)
  switch (message.fields.routingKey) {
    case 'rider.signup':
      return riderSignup(db, messageContent).catch(err =>
        console.warn('Rider signup: ', err),
      )
    case 'rider.phone_update':
      return updateRiderPhoneNumber(db, messageContent).catch(err =>
        console.warn('Rider phone update: ', err),
      )
  }
}

module.exports = db => {
  return connect(amqp.url)
    .then(conn => conn.createChannel())
    .then(channel => {
      return channel
        .assertExchange(amqp.exchange, 'topic', { durable: true })
        .then(() => channel.assertQueue('', { exclusive: true }))
        .then(qOk => bindQueueRouting(channel, qOk.queue))
        .then(queue =>
          channel.consume(queue, msg => handleMessage(db, msg), {
            noAck: true,
          }),
        )
        .then(() => {
          console.log(' [*] Waiting for logs. To exit press CTRL+C.')
        })
    })
    .catch(console.warn)
}

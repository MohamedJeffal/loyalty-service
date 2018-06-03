const { connect } = require('amqplib')
const { amqp } = require('../config')

const { riderSignup } = require('../modules/rider')

module.exports = db => {
  return connect(amqp.url)
    .then(conn => conn.createChannel())
    .then(channel => {
      return channel
        .assertExchange(amqp.exchange, 'topic', { durable: true })
        .then(() => channel.assertQueue('', { exclusive: true }))
        .then(qOk =>
          channel
            .bindQueue(qOk.queue, amqp.exchange, 'rider.signup')
            .then(() => qOk.queue),
        )
        .then(queue =>
          channel.consume(
            queue,
            msg => {
              console.log('msg.fields.routingKey: ', msg.fields.routingKey)
              console.log('contentcontentcontent: ', msg.content.toString())

              return riderSignup(db, JSON.parse(msg.content))
            },
            { noAck: true },
          ),
        )
        .then(() => {
          console.log(' [*] Waiting for logs. To exit press CTRL+C.')
        })
    })
    .catch(console.warn)
}

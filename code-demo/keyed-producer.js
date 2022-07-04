const { Kafka } = require('kafkajs')
const _ = require('lodash');

const kafka = new Kafka({
  clientId: 'learning-kafka',
  brokers: ['127.0.0.1:9091', '127.0.0.1:9092', '127.0.0.1:9093'],
});

const genRandomCode = function (length = 12) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}

const postId66update = _.times(20, () => ({
  id: 66,
  title: `update ${genRandomCode()}`
}));

const dummyEvent = _.times(20, () => ({
  id: 888,
  title: `update ${genRandomCode()}`
}));

const postUpdateEvent = _.shuffle([...postId66update, ...dummyEvent]);
console.log('list events:\n', postUpdateEvent);

(async () => {
  
  const producer = kafka.producer()

  await producer.connect()
  for (const event of postUpdateEvent) {
    await producer.send({
      topic: 'post-update',
      messages: [
        {
          // key: event.id.toString(),
          value: JSON.stringify(event),
        },
      ],
    });
  }
  
  await producer.disconnect()
})();
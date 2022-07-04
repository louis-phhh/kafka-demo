const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'learning-kafka',
  brokers: ['127.0.0.1:9091', '127.0.0.1:9092', '127.0.0.1:9093'],
});

(async () => {
  
  const producer = kafka.producer()

  await producer.connect()
  for (let i = 0; i < 20; i++) {
    await producer.send({
      topic: 'topic01',
      messages: [
        {
          key: `${i % 3}`,
          value: 'Hello KafkaJS! ' + i,
        },
      ],
    });
  }
  
  await producer.disconnect()
})();
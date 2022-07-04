const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'learning-kafka',
  brokers: ['127.0.0.1:9091', '127.0.0.1:9092', '127.0.0.1:9093'],
});

async function startConsumer({
  groupId,
  topic,
  eachMessage,
}) {
  const consumer = kafka.consumer({ groupId })

  await consumer.connect();
  await consumer.subscribe({ topics: [topic], fromBeginning: true });
  
  await consumer.run({
    eachMessage,
  });
}

(async () => {
    startConsumer({
      groupId: 'group02',
      topic: 'topic01',
      eachMessage: async ({ topic, partition, message, }) => {
        console.log({
          consumer: 'consumer01',
          partition,
          value: message.value.toString(),
        })
      },
    });

    startConsumer({
      groupId: 'group02',
      topic: 'topic01',
      eachMessage: async ({ topic, partition, message, }) => {
        console.log({
          consumer: 'consumer02',
          partition,
          value: message.value.toString(),
        })
      },
    });
})();
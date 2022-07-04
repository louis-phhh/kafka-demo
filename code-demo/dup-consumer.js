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
  const consumer = kafka.consumer({ groupId, })

  await consumer.connect();
  await consumer.subscribe({ topics: [topic], fromBeginning: true });
  
  await consumer.run({
    autoCommitThreshold: 4,
    eachMessage,
  });
}

(async () => {
    startConsumer({
      groupId: 'testduplicate',
      topic: 'topic01',
      eachMessage: async ({ topic, partition, message, }) => {
        await new Promise((res) => setTimeout(res, 1000));
        console.log({
          partition,
          value: message.value.toString(),
        })
      },
    })
})();
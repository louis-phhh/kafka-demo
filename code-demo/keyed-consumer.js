const { Kafka } = require('kafkajs')
const postService = require('./postService');

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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
    startConsumer({
      groupId: 'post-update-gr01',
      topic: 'post-update',
      eachMessage: async ({ topic, partition, message, }) => {
        const updateData = JSON.parse(message.value.toString());
        await new Promise((res) => setTimeout(res, getRandomInt(500, 1000)));
        await postService.update(updateData.id, updateData);
      },
    });
})();
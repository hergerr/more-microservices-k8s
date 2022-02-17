import Queue from "bull";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

// code to process job fetched from redis
expirationQueue.process(async (job) => {
  console.log("I want to publish ", job.data.orderId);
});

export { expirationQueue };

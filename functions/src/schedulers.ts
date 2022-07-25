import * as functions from "firebase-functions";

const JOB_PERIOD = 30 * 60; // seconds
const jobPeriodMinutes = Math.round(JOB_PERIOD / 60);
const isEmulator = process.env.FUNCTIONS_EMULATOR === "true";

const runTask = async () => {
  // do something
};

// once deployed to production, should run in specified interval
// WARN: this is not tested, be sure to test it if this is ever deployed to production
export const scheduledRunTask = functions.pubsub
  .schedule(`every ${jobPeriodMinutes} minutes`)
  .onRun((context) => {
    runTask();
  });

// able to run it manually via http request, for testing purposes
export const runTaskHttp = functions.https.onRequest(
  async (request, response) => {
    if (isEmulator) {
      await runTask();
      response.send("Successfully run task");
    } else {
      response.send("Only works in emulator mode");
    }
  }
);

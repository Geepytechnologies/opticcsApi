const cron = require("node-cron");

function myScheduledFunction() {
  // Your code here
  console.log("Cron job executed at " + new Date());
}

// Schedule the job to run every day at 3:00 PM
cron.schedule("* * * * * *", () => {
  myScheduledFunction();
});

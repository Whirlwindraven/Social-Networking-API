const routes = require("./routes");
const db = require("./config/connection");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Catch-all route handler for any requests to an unknown endpoint
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

// Error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
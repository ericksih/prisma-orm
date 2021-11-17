const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/user", require("./routes/user")); // require is a function that we can use to import a file

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

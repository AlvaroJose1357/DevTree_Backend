import app from "./server";

const Port = 3000;

app.listen(Port, () => {
  console.log("Server listening on port " + Port);
});

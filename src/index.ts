import app from "./server";
import { PORT } from "./config/Process";

const Port = PORT;

app.listen(Port, () => {
  console.log("Server listening on port " + Port);
});

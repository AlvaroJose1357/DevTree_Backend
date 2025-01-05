import colors from "colors";
import app from "./server";
import { PORT } from "./config/Process";

const Port = PORT;

app.listen(Port, () => {
  console.log(colors.blue.bold(`Server running on port ${Port}`));
});

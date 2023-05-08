const server = require("./api/server");
const { PORT } = require("./config/config");

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

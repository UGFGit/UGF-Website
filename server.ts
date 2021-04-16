const PORT = process.env.PORT || 5001;

import App from "./app";

const app = new App();

app.main.listen(PORT, () => {
  console.log(`successfully running port: ${PORT}`);
});

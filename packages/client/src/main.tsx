import * as ReactDOM from "react-dom";

const main = async () => {
  const mountNode = document.getElementById("root");
  if (mountNode === null) return;

  ReactDOM.render([], mountNode);
};

main();

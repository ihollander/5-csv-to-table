import SplitString from "./SplitString.js";

(() => {
  const getText = async url => {
    const response = await fetch(url);
    return await response.text();
  };

  const init = async () => {
    const table = document.querySelector("table");

    const text = await getText("data/customers.csv");

    // I know this could be done with an array, just wanted to get some practice with DIY iterators
    const csv = new SplitString(text, "\n");

    for (let row of csv.items()) {
      const tr = document.createElement("tr");

      const cells = new SplitString(row, ",");

      for (let cell of cells.items()) {
        const th = document.createElement("th");
        th.textContent = cell;
        tr.appendChild(th);
      }

      table.appendChild(tr);
    }
  };
  init();
})();

(() => {
  const getCsv = async url => {
    const result = await fetch(url);
    const csv = await result.text();
    return csv;
  };

  const arrayToTr = array => {
    const tr = document.createElement("tr");
    array.forEach(value => {
      const th = document.createElement("th");
      th.textContent = value;
      tr.appendChild(th);
    });
    return tr;
  };

  const init = async () => {
    const table = document.querySelector("table");

    const csv = await getCsv("http://localhost:3000/data/customers.csv");

    const csvArray = csv.split("\n");

    csvArray.forEach(row => {
      const tr = arrayToTr(row.split(","));
      table.appendChild(tr);
    });
  };
  init();
})();

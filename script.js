document.addEventListener("DOMContentLoaded", () => {
  fetchDataTable();
});

async function fetchDataTable() {
  const loading = document.getElementById("loading");
  loading.style.display = "flex";

  try {
    const response = await fetch("https://api.coincap.io/v2/assets/");
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const tableBody = document.getElementById("tableBody");
    const res = await response.json();

    for (let i = 0; i < 10; i++) {
      const table = document.createElement("tr");
      const num = document.createElement("td");
      const symbol = document.createElement("td");
      const price = document.createElement("td");
      const change = document.createElement("td");
      const marketCap = document.createElement("td");

      num.innerText = i + 1;
      symbol.innerText = res.data[i].symbol;
      price.innerText = parseFloat(res.data[i].priceUsd).toFixed(2);
      const changePercent = parseFloat(res.data[i].changePercent24Hr).toFixed(
        2
      );
      change.innerText = changePercent;
      marketCap.innerText = parseFloat(res.data[i].marketCapUsd).toFixed(2);

      if (changePercent > 0) {
        change.setAttribute("class", "positive");
      } else if (changePercent < 0) {
        change.setAttribute("class", "negative");
      }

      table.appendChild(num);
      table.appendChild(symbol);
      table.appendChild(price);
      table.appendChild(change);
      table.appendChild(marketCap);

      tableBody.appendChild(table);

      table.addEventListener("click", () => {
        window.open(`https://id.tradingview.com/symbols/${res.data[i].symbol}`);
      });
    }
  } catch {
    console.error(error);
  } finally {
    loading.style.display = "none";
  }
}

async function fetchDataCoin(coin) {
  const loading = document.getElementById("loading");
  loading.style.display = "flex";
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${coin}`);
    if (!response.ok) {
      throw new Error("Could not rechieve resource");
    }
    const tableBody = document.getElementById("tableBody");
    const res = await response.json();

    const table = document.createElement("tr");
    const num = document.createElement("td");
    const symbol = document.createElement("td");
    const price = document.createElement("td");
    const change = document.createElement("td");
    const marketCap = document.createElement("td");

    num.innerText = res.data.rank;
    symbol.innerText = res.data.symbol;
    price.innerText = parseFloat(res.data.priceUsd).toFixed(2);
    const changePercent = parseFloat(res.data.changePercent24Hr).toFixed(2);
    change.innerText = changePercent;
    marketCap.innerText = parseFloat(res.data.marketCapUsd).toFixed(2);

    if (changePercent > 0) {
      change.setAttribute("class", "positive");
    } else if (changePercent < 0) {
      change.setAttribute("class", "negative");
    }

    table.appendChild(num);
    table.appendChild(symbol);
    table.appendChild(price);
    table.appendChild(change);
    table.appendChild(marketCap);

    tableBody.appendChild(table);

    table.addEventListener("click", () => {
      window.open(`https://id.tradingview.com/symbols/${res.data.symbol}`);
    });
  } catch {
    console.error(error);
  } finally {
    loading.style.display = "none";
  }
}

document.getElementById("submit").addEventListener("click", () => {
  const coinName = document.getElementById("coinName").value;
  if (coinName != "") {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    fetchDataCoin(coinName);
  }
});

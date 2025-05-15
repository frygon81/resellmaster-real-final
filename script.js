document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const skuParam = urlParams.get("sku");
  if (skuParam) document.getElementById("sku").value = skuParam;
});

async function analyze() {
  const sku = document.getElementById('sku').value.trim();
  const cost = parseInt(document.getElementById('cost').value, 10);
  const resultBox = document.getElementById('result');

  if (!sku || isNaN(cost)) {
    resultBox.innerText = "SKU와 국내가를 정확히 입력해주세요.";
    return;
  }

  try {
    const response = await fetch("data.json");
    const data = await response.json();

    const item = data[sku];
    if (!item) {
      resultBox.innerText = "해당 SKU의 데이터를 찾을 수 없습니다.";
      return;
    }

    const ebay = item.ebayPrice;
    const stockx = item.stockxPrice;
    const sales = item.monthlySales;
    const name = item.name;

    const fee = Math.round(ebay * 0.12);
    const shipping = 18000;
    const profit = ebay - fee - shipping - cost;

    resultBox.innerText = 
      `제품명: ${name}
` +
      `eBay 시세: ₩${ebay.toLocaleString()}
` +
      `StockX 시세: ₩${stockx.toLocaleString()}
` +
      `월간 판매량: ${sales}건
` +
      `수수료: ₩${fee.toLocaleString()}
` +
      `배송비: ₩${shipping.toLocaleString()}
` +
      `국내가: ₩${cost.toLocaleString()}
` +
      `예상 순이익: ₩${profit.toLocaleString()}`;
  } catch (err) {
    resultBox.innerText = "데이터를 불러올 수 없습니다.";
  }
}
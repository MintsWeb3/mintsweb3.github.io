function fetchCryptoData() {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      const bitcoinPriceInUsd = data.bitcoin.usd;
      const satoshisPerDollar = (1 / bitcoinPriceInUsd) * 100000000;

      console.log('Bitcoin Price in USD:', bitcoinPriceInUsd);
      console.log('Satoshis per USD:', satoshisPerDollar);

      document.getElementById('cryptoData').innerText = `Satoshis per USD: ${satoshisPerDollar.toFixed(0)}`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Call the function immediately when the script loads
fetchCryptoData();

// Set up an interval to call the function every 5 seconds
setInterval(fetchCryptoData, 5000);



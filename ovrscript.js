const ovrPriceElement = document.getElementById('ovrPrice');

async function fetchOvrPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ovr&vs_currencies=usd');
        const data = await response.json();

        const ovrUsdPrice = data.ovr.usd;

        ovrPriceElement.textContent = `OVR Price: $${ovrUsdPrice.toFixed(2)}`;
    } catch (error) {
        ovrPriceElement.textContent = 'Failed to load OVR price.';
        console.error('Error fetching OVR price:', error);
    }
}

// Fetch OVR price when the page loads
fetchOvrPrice();

// Optionally, you can update the price every 5 seconds or another desired interval:
// setInterval(fetchOvrPrice, 5000);

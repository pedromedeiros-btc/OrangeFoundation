let btcPrice = {USD: 0, BRL: 0};

function updateBitcoinPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl')
        .then(response => response.json())
        .then(data => {
            btcPrice.USD = data.bitcoin.usd;
            btcPrice.BRL = data.bitcoin.brl;
            document.getElementById('btc-price').textContent = btcPrice.USD.toLocaleString();
            updateDashboard();
        })
        .catch(error => console.error('Error fetching Bitcoin price:', error));
}

function convertSatsToFiat() {
    const satsInput = document.getElementById('sats-input');
    const fiatInput = document.getElementById('fiat-input');
    const currencySelect = document.getElementById('currency-select');

    const sats = parseFloat(satsInput.value);
    const currency = currencySelect.value;

    if (isNaN(sats)) {
        fiatInput.value = '';
        return;
    }

    const btc = sats / 100000000; // Convert sats to BTC
    const fiatValue = btc * btcPrice[currency];

    fiatInput.value = fiatValue.toFixed(2);
}

function convertFiatToSats() {
    const satsInput = document.getElementById('sats-input');
    const fiatInput = document.getElementById('fiat-input');
    const currencySelect = document.getElementById('currency-select');

    const fiatValue = parseFloat(fiatInput.value);
    const currency = currencySelect.value;

    if (isNaN(fiatValue)) {
        satsInput.value = '';
        return;
    }

    const btcValue = fiatValue / btcPrice[currency];
    const satsValue = Math.round(btcValue * 100000000);

    satsInput.value = satsValue;
}

function updateDashboard() {
    const oneSatBtc = 0.00000001;
    const tenKSatsBtc = 0.0001;
    const millionSatsBtc = 0.01;

    const currency = document.getElementById('currency-select').value;
    const oneSatFiat = oneSatBtc * btcPrice[currency];
    const tenKSatsFiat = tenKSatsBtc * btcPrice[currency];
    const millionSatsFiat = millionSatsBtc * btcPrice[currency];

    document.getElementById('one-sat-btc').textContent = `${oneSatBtc.toFixed(8)} (${oneSatFiat.toFixed(8)} ${currency})`;
    document.getElementById('ten-k-sats-btc').textContent = `${tenKSatsBtc.toFixed(4)} (${tenKSatsFiat.toFixed(4)} ${currency})`;
    document.getElementById('million-sats-btc').textContent = `${millionSatsBtc.toFixed(2)} (${millionSatsFiat.toFixed(2)} ${currency})`;
}

// Initial update
updateBitcoinPrice();

// Set up event listeners
document.getElementById('sats-input').addEventListener('input', convertSatsToFiat);
document.getElementById('fiat-input').addEventListener('input', convertFiatToSats);
document.getElementById('currency-select').addEventListener('change', () => {
    convertSatsToFiat();
    updateDashboard();
});

// Update Bitcoin price every minute
setInterval(updateBitcoinPrice, 60000);
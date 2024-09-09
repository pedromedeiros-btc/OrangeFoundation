function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function updateBitcoinStats() {
    // Update Bitcoin price
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            document.getElementById('btc-price').textContent = formatNumber(data.bitcoin.usd);
        })
        .catch(error => console.error('Error fetching Bitcoin price:', error));

    // Update transaction stats
    fetch('https://api.blockchain.info/stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('tx-all-time').textContent = formatNumber(data.n_tx);
            document.getElementById('tx-last-month').textContent = formatNumber(data.n_tx_last_month);
            
            // For today's transactions, we'll use a different endpoint
            return fetch('https://api.blockchain.info/charts/n-transactions?timespan=1days&format=json');
        })
        .then(response => response.json())
        .then(dayData => {
            const todayTx = dayData.values[dayData.values.length - 1].y;
            document.getElementById('tx-today').textContent = formatNumber(Math.round(todayTx));
        })
        .catch(error => console.error('Error fetching Bitcoin stats:', error));
}
function updateHalvingCountdown() {
    const nextHalvingDate = new Date('2028-04-27T00:00:00Z'); // Approximate date of next halving
    const now = new Date();
    const difference = nextHalvingDate - now;

    if (difference < 0) {
        document.getElementById('halving-timer').textContent = "The halving has occurred!";
    } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('halving-timer').textContent = `${days} days, ${hours} hours, ${minutes} minutes`;
    }
}

// Update stats initially and then every minute
updateBitcoinStats();
updateHalvingCountdown();
setInterval(updateBitcoinStats, 60000);
setInterval(updateHalvingCountdown, 60000);
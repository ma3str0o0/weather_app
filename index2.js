//Fetch data from coingecko for the crypto
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin&vs_currencies=usd&include_24hr_change=true')
    //Parse the response as JSON
    .then(res => res.json())
    //Process the JSON data and update the HTML
    .then(json => {
        //Get a reference to the container with the crypto
        const container = document.querySelector('.container');
        //Get an array of crypto from the JSON object
        const coins = Object.getOwnPropertyNames(json);

        //Loop through each crypto and create HTML elements to display
        for (let coin of coins) {
            //Extract data from the JSON object
            const coinInfo = json[`${coin}`];
            const price = coinInfo.usd;
            const change = coinInfo.usd_24h_change.toFixed(5);

            //Create HTML elements for the crypto data
            container.innerHTML += `
                <div class="coin ${change < 0 ? 'falling' : 'rising'}">
                    <div class="${coin}-logo">
                        <img src="imgages2/coin.png" alt="logo">
                    </div>
                    <div class="coin-name">
                        <h3>${coin}</h3>
                        <span>/USD</span>
                    </div>
                    <div class="coin-price">
                        <span class="price">$${price}</span>
                        <span class="change">${change}</span>
                    </div>
                    <span class="buy-coin"><p><a href="https://binance.com">BUY CRYPTO NOW</a> </p></span>
                </div>
        `;
        }
    });
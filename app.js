// const axios = require('axios')
// const http = require("http");

// const hostname = 'localhost';
// const port = 8000;


// const requestListener = async () => {
//     try {
//         const res = await axios.get(`https://api.cryptonator.com/api/ticker/btc-usd/`, {
//             headers: {
//                 Accept: "application/json",
//                 "User-Agent": "axios 0.21.1"
//             }
//         })
//         console.log(res.ticker)
//     } catch (e) {
//         console.log(e.toJSON())
//     }
// }

// requestListener();

// const requestListener = async () => {
//     try {
//         const response = await axios.get("https://icanhazdadjoke.com/", {
//             headers: {
//                 Accept: "application/json",
//                 "User-Agent": "axios 0.21.1"
//             }
//         });
//         console.log("received response: ", response.data);
//     } catch (err) {
//         console.log("received error: ", err.toJSON());
//     }
// };

// requestListener();
// const APIKey = '5af2cfc55feb69a4f50384068629ff86'

// const sendGetRequest = async () => {
//     try {
//         // const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`);
//         const resp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${APIKey}`);
//         console.log(resp.data);
//     } catch (err) {
//         // Handle Error Here
//         console.error(err);
//     }
// };

// sendGetRequest();

const body = document.querySelector('.body');
const shrink = document.querySelector('.shrink-0');
const cuurency = document.getElementById('currency');
const price = document.getElementById('price');
const priceChange = document.getElementById('price_change');
const coinName = document.getElementById('name');
const key = '235fbb9de9369f8318430a5e3f1c03d13b2d21fc'

const sendGetRequest = async (req, res) => {
    try {
        const resp = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${key}&ids=BTC,ETH,XRP&interval=1h,1d,30d,ytd&convert=NGN&platform-currency=ETH&per-page=100&page=1`)
            .then((res) => {
                const data = res.data;
                console.log(data)
                function priceChanger() {
                    for (let i = 0; i < data.length; i++) {
                        const object = Object.entries(data[i]);
                        const object2 = object[23];
                        console.log(object);
                        console.log(object2);
                        // price change percentage
                        const percentage = Math.round(((Math.abs(object2[1].price_change_pct)) * 100) *100) / 100;

                        // Etereum Price
                        let price__change = parseFloat(Math.round((object2[1].price_change) * 100) / 100)
                        console.log(price__change)

                        // increase and decrease color change
                        if (price__change < 0) {
                            priceChange.innerHTML = `<p class="text-red-500">${(price__change.toLocaleString("en-US"))} (${percentage}% &#129095;)<p>`
                        } else {
                            priceChange.innerHTML = `<p class="text-green-500">+${price__change.toLocaleString("en-US") } (${percentage}% &#129093;)<p>`
                        }
                    }
                    // DOM
                    const parsedPrice = parseFloat(Math.round((res.data[0].price) * 100) / 100);
                    shrink.innerHTML = `<img class="h-12 w-12" src="${res.data[0].logo_url}" alt="ChitChat Logo">`
                    currency.textContent = `${res.data[0].currency}`
                    price.textContent = `${parsedPrice.toLocaleString("en-US") }`
                    coinName.textContent = `${res.data[0].name}`
                }
                priceChanger()
            })
    } catch (err) {
        console.error(err);
    }
    // countdown()
};

// let countdown = setInterval(sendGetRequest, 5000)

sendGetRequest();


// const server = http.createServer(sendGetRequest)


// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// })

module.exports = sendGetRequest;
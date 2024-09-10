document.addEventListener("DOMContentLoaded", () => {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amount = document.getElementById('amount');
    const result = document.getElementById('result');

    // Fetch currency data
    fetch('https://v6.exchangerate-api.com/v6/86d4ab9239a7e51aa9d81b64/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        });

    // Handle form submission
    document.getElementById('currency-form').addEventListener('submit', event => {
        event.preventDefault();

        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amountValue = amount.value;

        fetch(`https://v6.exchangerate-api.com/v6/86d4ab9239a7e51aa9d81b64/pair/${fromValue}/${toValue}/${amountValue}`)
            .then(response => response.json())
            .then(data => {
                result.textContent = `${amountValue} ${fromValue} = ${data.conversion_result} ${toValue}`;
            });
    });
});

//==============APP CONTROLLER=================
const AppCtrl = (function (ItemCtrl, UICtrl) {
    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    //***********************EVENT LISTENTERS**************************//
    const loadEventListeners = () => {

        document.querySelector(UISelectors.quickQuoteInput).addEventListener('keypress', (e)=>{
            if(e.charCode === 13){
                displayQuote();    
            }
        });
        
        $(document).keypress(function(e) {
            if(e.which == 13) {
                e.preventDefault();
            }
        });
        
        /*----------------CLICK Events-----------------*/
        //Draw Stock Chart Submit Click
        document.querySelector(UISelectors.drawStockChartBtn).addEventListener("click", drawStockChart);

        //Draw Currency Chart Submit Click
        document.querySelector(UISelectors.drawCurrChartBtn).addEventListener("click", drawCurrChart);

        document.querySelector(UISelectors.quickQuoteBtn).addEventListener('click', displayQuote);
        
        document.querySelector(UISelectors.indicatorsUpdateBtn).addEventListener('click', drawTechnicalIndicators);

        /*----------------CHANGE Events-----------------*/
        document.querySelector(UISelectors.techCompSelect).addEventListener("change", () => {
            const getStockSelects = UICtrl.getStockSelects();

            if (getStockSelects.stockSymbol == "stockWeightAvg") {
                document.querySelector(UISelectors.stockWeightAvg).style.display = "block";
                let stockChartStyle = document.querySelector(UISelectors.stockChartStyle);
                stockChartStyle.disabled = true;
                stockChartStyle.value = 'scatter';
                document.querySelector(UISelectors.movingAverage).disabled = true;
                document.querySelector(UISelectors.upperIndicators).disabled = true;

            } else {
                document.querySelector(UISelectors.stockWeightAvg).style.display = "none";
                let stockChartStyle = document.querySelector(UISelectors.stockChartStyle);
                stockChartStyle.disabled = false;
                stockChartStyle.selectedIndex = 0;
                document.querySelector(UISelectors.techTimeFrame).selectedIndex = 0;
            }
        });


        document.querySelector(UISelectors.cryptoCurrSelect).addEventListener("change", () => {
            const getCurrSelects = UICtrl.getCurrChart();

            if (getCurrSelects.cryptoCurrency == "currWeightAvg") {
                document.querySelector(UISelectors.cryptoWeightAvg).style.display = "block";
                let currChartStyle = document.querySelector(UISelectors.cryptoChartStyle);
                currChartStyle.disabled = true;
                currChartStyle.value = 'scatter';

            } else {
                document.querySelector(UISelectors.cryptoWeightAvg).style.display = "none";
                let currChartStyle = document.querySelector(UISelectors.cryptoChartStyle);
                currChartStyle.disabled = false;
                currChartStyle.selectedIndex = 0;
                document.querySelector(UISelectors.cryptoTimeFrame).selectedIndex = 0;
            }
        });

        document.querySelector(UISelectors.techTimeFrame).addEventListener("change", () => {
            const getStockSelects = UICtrl.getStockSelects();
            const getCurrSelects = UICtrl.getCurrChart();

            if (getStockSelects.stockTimeFrame && getStockSelects.stockSymbol !== 'stockWeightAvg') {
                document.querySelector(UISelectors.movingAverage).disabled = false;
                document.querySelector(UISelectors.upperIndicators).disabled = false;
                document.querySelector(UISelectors.smaNDays).disabled = false;
                document.querySelector(UISelectors.indicatorsUpdateBtn).disabled = false;
            } 
        });
        
        document.querySelector(UISelectors.cryptoTimeFrame).addEventListener("change", () => {
            const getCurrSelects = UICtrl.getCurrChart();

            if (getCurrSelects.cryptoCurrTimeFrame && getCurrSelects.cryptoCurrency !== "currWeightAvg") {
                document.querySelector(UISelectors.movingAverage).disabled = false;
                document.querySelector(UISelectors.upperIndicators).disabled = false;
                document.querySelector(UISelectors.smaNDays).disabled = false;
                document.querySelector(UISelectors.indicatorsUpdateBtn).disabled = false;
            } 
        });

        document.querySelector(UISelectors.movingAverage).addEventListener('change', (e) => { 
            const selectBox = e.target;
            const selectedIndex = selectBox.options[selectBox.selectedIndex].value;
            
        });
    };
    //***************END OF EVENT LISTENERS************************/

    const drawTechnicalIndicators = function(){
        const getStockSelects = UICtrl.getStockSelects();
        const getCurrSelects = UICtrl.getCurrChart();
        const smaSelect = document.querySelector(UISelectors.movingAverage);
        const smaSelectedIndex = smaSelect.options[smaSelect.selectedIndex].value;
        const smaUserInput = document.querySelector(UISelectors.smaNDays).value;
        const upperIndicators = document.querySelector(UISelectors.upperIndicators);
        const upperSelectedIndex = upperIndicators.options[upperIndicators.selectedIndex].value;
        
        let url,
            limit,
            dateNow = new Date(),
            dateNowISO = dateNow.toISOString(),
            currencyChartStyle = UICtrl.getChartStyle(UISelectors.cryptoChartStyle),
            stockChartStyle = UICtrl.getChartStyle(UISelectors.stockChartStyle);
   
        if(getCurrSelects.cryptoCurrency !== 'Select Cryptocurrency...'){
            
            switch (getCurrSelects.cryptoCurrTimeFrame) {
                case '1YRS':
                    limit = 365;
                    break;
                case '6MTH':
                    limit = 183;
                    break;
                case '3MTH':
                    limit = 91;
                    break;
                case '1MTH':
                    limit = 30;
                    break;
            }

            url = `https://min-api.cryptocompare.com/data/histoday?fsym=${getCurrSelects.cryptoCurrency}&tsym=USD&limit=${limit}`;

            $.ajax({
                url: url,
                method: "GET",
                crossDomain: true,
            }).then(function (currencyData) {
                currencyData = currencyData.Data;

                currencyData.forEach(datum => {
                    datum.time = new Date(datum.time * 1000).toISOString().split('T')[0];
                });

                let date = currencyData.map(datum => datum.time);
                
                ItemCtrl.techinalIndicatorData(currencyData, date, currencyChartStyle, getCurrSelects, smaSelectedIndex, smaUserInput, upperSelectedIndex, 'Crypto Currency');
                
                ItemCtrl.smaData(currencyData, date, currencyChartStyle, getCurrSelects, smaSelectedIndex, smaUserInput, upperSelectedIndex, 'Crypto Currency');

            });    
        }
        
        if(getStockSelects.stockName !== 'Select Tech Company...'){
            url = `https://api.iextrading.com/1.0/stock/${getStockSelects.stockSymbol}/batch?types=quote,news,chart&range=${getStockSelects.stockTimeFrame}`;
            
            $.ajax({
                url: url,
                method: "GET"
            }).then(function (stockData) {

                stockData = stockData.chart;
                
                let date = stockData.map(datum => datum.date);
                
                    if(upperSelectedIndex !== 'none'){
                        switch (upperSelectedIndex) {
                            case 'Split':
                                url = `https://api.iextrading.com/1.0/stock/${getStockSelects.stockSymbol}/splits/${getStockSelects.stockTimeFrame}`;
                                break;
                            case 'Earnings':
                                url = `https://api.iextrading.com/1.0/stock/${getStockSelects.stockSymbol}/earnings`;
                                break;
                            case 'Dividend':
                                url = `https://api.iextrading.com/1.0/stock/${getStockSelects.stockSymbol}/dividends/${getStockSelects.stockTimeFrame}`;
                                break;
                        }

                        $.ajax({
                            url: url,
                            method: "GET"
                        }).then(function (upperData) {
                            
                            ItemCtrl.techinalIndicatorData(stockData, date, stockChartStyle, getStockSelects, smaSelectedIndex, smaUserInput, upperSelectedIndex, 'Stock', upperData);
                            
                            ItemCtrl.smaData(stockData, date, stockChartStyle, getStockSelects, smaSelectedIndex, smaUserInput, upperSelectedIndex, 'Stock', upperData);
                        });

                    } 
                
            });
            
            
        }
        
        
    }
    
    
    const drawCurrChart = function () {
        const getCurrSelects = UICtrl.getCurrChart();

        const chartStyle = UICtrl.getChartStyle(UISelectors.cryptoChartStyle);

        let url,
            limit,
            dateNow = new Date(),
            dateNowISO = dateNow.toISOString(),
            coinsArray = ['BTC', 'ETH', 'XRP', 'BCH', 'LTC'];

        switch (getCurrSelects.cryptoCurrTimeFrame) {
            case '1YRS':
                limit = 365;
                break;
            case '6MTH':
                limit = 183;
                break;
            case '3MTH':
                limit = 91;
                break;
            case '1MTH':
                limit = 30;
                break;
        }

        if (getCurrSelects.cryptoCurrency == "currWeightAvg") {

            let coinsDataArr = [];
            coinsArray.forEach(coin => {

                let url = `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=USD&limit=${limit}`;

                $.ajax({
                    url: url,
                    method: "GET",
                    crossDomain: true,
                }).then(function (currencyData) {

                    currencyData = currencyData.Data;

                    currencyData.forEach(datum => {
                        datum.time = new Date(datum.time * 1000).toISOString().split('T')[0];
                    });

                    coinsDataArr.push(currencyData);

                    ItemCtrl.mapCurrData(coinsDataArr, chartStyle, getCurrSelects)
                    document.querySelector(UISelectors.currChartCard).style.display = 'block';
                });

            });

        } else {

            url = `https://min-api.cryptocompare.com/data/histoday?fsym=${getCurrSelects.cryptoCurrency}&tsym=USD&limit=${limit}`;

            $.ajax({
                url: url,
                method: "GET",
                crossDomain: true,
            }).then(function (currencyData) {
                currencyData = currencyData.Data;

                document.querySelector(UISelectors.currChartCard).style.display = "block";

                currencyData.forEach(datum => {
                    datum.time = new Date(datum.time * 1000).toISOString().split('T')[0];
                });

                ItemCtrl.mapCurrData(currencyData, chartStyle, getCurrSelects);

            });

        }

    };

    const drawStockChart = function () {

        const getStockSelects = UICtrl.getStockSelects();

        const chartStyle = UICtrl.getChartStyle(UISelectors.stockChartStyle);

        if (getStockSelects.stockTimeFrame == 'Select time frame...') {
            getStockSelects.stockTimeFrame = '1y';
            document.querySelector(UISelectors.techTimeFrame).value = '1y';
        }

        let url;

        if (getStockSelects.stockSymbol == "stockWeightAvg") {
            url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=nvda,amd,intc,mu,tsm&types=quote,news,chart&range=${getStockSelects.stockTimeFrame}`;
        } else {
            url = `https://api.iextrading.com/1.0/stock/${getStockSelects.stockSymbol}/batch?types=quote,news,chart&range=${getStockSelects.stockTimeFrame}`;
        }

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (stockData) {
            document.querySelector(UISelectors.stockChartCard).style.display =
                "block";
            ItemCtrl.mapStockData(stockData, chartStyle, getStockSelects);
        });


    };

    const displayQuote = function () {

        let userInput = document.querySelector(UISelectors.quickQuoteInput).value,
            url;

        if (userInput.length > 4 || userInput == '') {
            alert('please fill in a proper stock symbol');
        } else {
            url = `https://api.iextrading.com/1.0/stock/${userInput}/quote`;

            $.ajax({
                url: url,
                method: "GET",
                error: function (jqXHR, status, error) {
                      if(status == 'error'){
                          url = `https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${userInput}&tsym=USD`;
                    
                            $.ajax({
                                url: url,
                                method: "GET"
                            }).then(function (coinData) {
                                    console.log(coinData)
                                    //UICtrl.displayStockQuote(stockData);    
                            });
                      }  
                }
            }).then(function (stockData) {
                    UICtrl.displayStockQuote(stockData);    
            });
        }

    }

    const initCharts = function () {
        let chartStyle = 'candlestick',
            getStockSelects = {
                stockSymbol: 'NVDA',
                stockTimeFrame: '1y',
                stockName: 'Nvidia'
            },
            getCurrSelects = {
                cryptoCurrency: 'BTC',
                cryptoName: 'Bitcoin'
            },
            dateNow = new Date(),
            dateNowISO = dateNow.toISOString(),
            startTime = new Date(dateNow.setMonth(dateNow.getMonth() - 12)).toISOString();


        $.ajax({
            url: `https://api.iextrading.com/1.0/stock/NVDA/batch?types=quote,news,chart&range=1y`,
            method: "GET"
        }).then(function (stockData) {
            document.querySelector(UISelectors.stockChartCard).style.display =
                "block";

            ItemCtrl.mapStockData(stockData, chartStyle, getStockSelects);
        });

        $.ajax({
            url: `https://min-api.cryptocompare.com/data/histoday?fsym=${getCurrSelects.cryptoCurrency}&tsym=USD&limit=365`,
            method: "GET",
            crossDomain: true,
        }).then(function (currencyData) {
            currencyData = currencyData.Data;
            
            currencyData.forEach(datum => {
                datum.time = new Date(datum.time * 1000).toISOString().split('T')[0];
            });
            
            document.querySelector(UISelectors.currChartCard).style.display = "block";

            ItemCtrl.mapCurrData(currencyData, chartStyle, getCurrSelects);
        });
    }

    //Public Methods
    return {
        init: () => {
            loadEventListeners();

            initCharts();

        }
    };
})(ItemCtrl, UICtrl);


AppCtrl.init();

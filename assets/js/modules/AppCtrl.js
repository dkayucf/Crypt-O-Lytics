//==============APP CONTROLLER=================
const AppCtrl = (function(ItemCtrl, UICtrl) {
  //Get UI selectors
  const UISelectors = UICtrl.getSelectors();

  const loadEventListeners = () => {
    /*----------------INPUT Events-----------------*/
    /*----------------CLICK Events-----------------*/
    //Draw Stock Chart Submit Click
    document.querySelector(UISelectors.drawStockChartBtn).addEventListener("click", drawStockChart);
    
    //Draw Currency Chart Submit Click
    document.querySelector(UISelectors.drawCurrChartBtn).addEventListener("click", drawCurrChart);
      
    document.querySelector(UISelectors.quickQuoteBtn).addEventListener('click', displayQuote);

    /*----------------CHANGE Events-----------------*/
    document.querySelector(UISelectors.techCompSelect).addEventListener("change", () => {
        const getStockSelects = UICtrl.getStockSelects();
        
            if (getStockSelects.stockSymbol == "stockWeightAvg") {
               document.querySelector(UISelectors.stockWeightAvg).style.display = "block";
                let stockChartStyle = document.querySelector(UISelectors.stockChartStyle);
                stockChartStyle.disabled = true;
                stockChartStyle.value = 'scatter';

            } else {
                document.querySelector(UISelectors.stockWeightAvg).style.display = "none";
                let stockChartStyle = document.querySelector(UISelectors.stockChartStyle);
                stockChartStyle.disabled = false;
                stockChartStyle.selectedIndex=0;
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
                currChartStyle.selectedIndex=0;
                document.querySelector(UISelectors.cryptoTimeFrame).selectedIndex = 0;
            }
      });
      
      
      
      document.querySelector(UISelectors.techTimeFrame).addEventListener("change", () => {
        const getStockSelects = UICtrl.getStockSelects();
        
        if(getStockSelects.stockTimeFrame && getStockSelects.stockSymbol !== 'stockWeightAvg'){
            document.querySelector(UISelectors.movingAverage).disabled = false;
            document.querySelector(UISelectors.upperIndicators).disabled = false;
        }
      });
      
    document.querySelector(UISelectors.movingAverage).addEventListener('change', (e)=>{
        const getStockSelects = UICtrl.getStockSelects();
        const getCurrencyInput = UICtrl.getCurrChart();
        const selectBox = e.target;
        const selectedIndex = selectBox.options[selectBox.selectedIndex].value;

    });
  };

    const drawCurrChart = function() {
        const getCurrSelects = UICtrl.getCurrChart();

        const chartStyle = UICtrl.getChartStyle(UISelectors.cryptoChartStyle);

        let url,
            limit,
            dateNow = new Date(),
            dateNowISO = dateNow.toISOString(),
            coinsArray = ['BTC', 'ETH', 'XRP', 'BCH', 'LTC'];

          switch(getCurrSelects.cryptoCurrTimeFrame) {
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
                coinsArray.forEach(coin=>{
                    
                    let url = `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=USD&limit=${limit}`;
                
                    $.ajax({
                        url: url,
                        method: "GET",
                        crossDomain: true,
                    }).then(function(currencyData) {

                        currencyData = currencyData.Data;

                         currencyData.forEach(datum=>{
                             datum.time = new Date(datum.time*1000).toISOString().split('T')[0]; 
                         });

                        coinsDataArr.push(currencyData);

                        ItemCtrl.mapCurrData(coinsDataArr, chartStyle, getCurrSelects)
                        document.querySelector(UISelectors.currChartCard).style.display = 'block';
                        document.querySelector('.movingAverage').disabled = false;
                        document.querySelector('.upperIndicators').disabled = false;
                    });    
                    
                });
                

            
            
        } else {

            url = `https://min-api.cryptocompare.com/data/histoday?fsym=${getCurrSelects.cryptoCurrency}&tsym=USD&limit=${limit}`;
            
            $.ajax({
                url: url,
                method: "GET",
                crossDomain: true,
            }).then(function(currencyData) {
                currencyData = currencyData.Data;

                document.querySelector(UISelectors.currChartCard).style.display = "block";

                 currencyData.forEach(datum=>{
                     datum.time = new Date(datum.time*1000).toISOString().split('T')[0]; 
                 });

                ItemCtrl.mapCurrData(currencyData, chartStyle, getCurrSelects);

            });
            
        }

  };
    

  const drawStockChart = function() {
      
    const getStockSelects = UICtrl.getStockSelects();

    const chartStyle = UICtrl.getChartStyle(UISelectors.stockChartStyle);
           
    if(getStockSelects.stockTimeFrame == 'Select time frame...'){
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
    }).then(function(stockData) {
      document.querySelector(UISelectors.stockChartCard).style.display =
        "block";
        document.querySelector('.movingAverage').disabled = false;
        document.querySelector('.upperIndicators').disabled = false;
      ItemCtrl.mapStockData(stockData, chartStyle, getStockSelects);
    });


  };
    
    const displayQuote = function(){
        
        let stockSymbol = document.querySelector(UISelectors.quickQuoteInput).value,
            url;
        
        if(stockSymbol.length > 4 || stockSymbol == ''){
            alert('please fill in a proper stock symbol');
        }else{
            url = `https://api.iextrading.com/1.0/stock/${stockSymbol}/quote`;
            
            $.ajax({
              url: url,
              method: "GET"
            }).then(function(stockData) {
              UICtrl.displayStockQuote(stockData);
            });
        }
        
    }
    
    const initCharts = function(){
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
            startTime = new Date(dateNow.setMonth( dateNow.getMonth() - 12)).toISOString();
        
        
        $.ajax({
          url: `https://api.iextrading.com/1.0/stock/NVDA/batch?types=quote,news,chart&range=1y`,
          method: "GET"
        }).then(function(stockData) {
          document.querySelector(UISelectors.stockChartCard).style.display =
            "block";

          ItemCtrl.mapStockData(stockData, chartStyle, getStockSelects);
        }); 
        
        $.ajax({
        url: `https://min-api.cryptocompare.com/data/histoday?fsym=${getCurrSelects.cryptoCurrency}&tsym=USD&limit=365`,
        method: "GET",
        crossDomain: true,
    }).then(function(currencyData) {
            currencyData = currencyData.Data;
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



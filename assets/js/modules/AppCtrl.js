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
      
    //Navbar menu click
    document.querySelector(UISelectors.cardHeader).addEventListener('click', (e)=>{
        UICtrl.toggleMenuState(e.target);
    });
      
    document.querySelector(UISelectors.quickQuoteBtn).addEventListener('click', displayQuote);

    /*----------------CHANGE Events-----------------*/
    document.querySelector(UISelectors.techCompSelect).addEventListener("change", () => {
        const getStockSelects = UICtrl.getStockSelects();
        
        if (getStockSelects.stockSymbol == "stockWeightAvg") {
          document.querySelector(UISelectors.stockWeightAvg).style.display =
            "block";
        } else {
          document.querySelector(UISelectors.stockWeightAvg).style.display =
            "none";
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
        startTime,
        dateNow = new Date(),
        dateNowISO = dateNow.toISOString();

      switch(getCurrSelects.cryptoCurrTimeFrame) {
            case '1YRS':
                startTime = new Date(dateNow.setMonth( dateNow.getMonth() - 12)).toISOString();
                break;
            case '6MTH':
                startTime = new Date(dateNow.setMonth( dateNow.getMonth() - 6)).toISOString();
                break;
            case '3MTH':
                startTime = new Date(dateNow.setMonth( dateNow.getMonth() - 3)).toISOString();
                break;
            case '1MTH':
                startTime = new Date(dateNow.setMonth( dateNow.getMonth() - 1)).toISOString();
                break;
        }  

    if (getCurrSelects.cryptoCurrency == "currWeightAvg") {
        
    } else {

        url = `https://cors-anywhere.herokuapp.com/rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${getCurrSelects.cryptoCurrency}_USD/history?period_id=1DAY&time_start=${startTime}&time_end=${dateNowISO}&market=USD&limit=366&apikey=6B99D9DD-9C41-4AF9-8BF0-7BB6F3DB0A5D`;
    }

    $.ajax({
        url: url,
        method: "GET",
        crossDomain: true,
    }).then(function(currencyData) {

        document.querySelector(UISelectors.currChartCard).style.display = "block";

        ItemCtrl.mapCurrData(currencyData, chartStyle, getCurrSelects);
    });

    //UICtrl.resetSelects();
  };

  const drawStockChart = function() {
      
    const getStockSelects = UICtrl.getStockSelects();

    const chartStyle = UICtrl.getChartStyle(UISelectors.stockChartStyle);

    let url;

    if (getStockSelects.stockSymbol == "stockWeightAvg") {
      url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=nvda,amd,intc,mu,tsm&types=quote,news,chart&range=${
        getStockSelects.stockTimeFrame
      }`;
    } else {
      url = `https://api.iextrading.com/1.0/stock/${
        getStockSelects.stockSymbol
      }/batch?types=quote,news,chart&range=${getStockSelects.stockTimeFrame}`;
    }

    $.ajax({
      url: url,
      method: "GET"
    }).then(function(stockData) {
      document.querySelector(UISelectors.stockChartCard).style.display =
        "block";

      ItemCtrl.mapStockData(stockData, chartStyle, getStockSelects);
    });

    //UICtrl.resetSelects();
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
    
//    const displayCurrencyTicker = function(){
//        
//        let BTC = `https://cors-anywhere.herokuapp.com/rest.coinapi.io/v1/quotes/current?filter_symbol_id=BITSTAMP_SPOT_BTC_USD&apikey=6B99D9DD-9C41-4AF9-8BF0-7BB6F3DB0A5D`;
//        let ETH = `https://cors-anywhere.herokuapp.com/rest.coinapi.io/v1/quotes/current?filter_symbol_id=BITSTAMP_SPOT_ETH_USD&apikey=6B99D9DD-9C41-4AF9-8BF0-7BB6F3DB0A5D`;
//        let XRP = `https://cors-anywhere.herokuapp.com/rest.coinapi.io/v1/quotes/current?filter_symbol_id=BITSTAMP_SPOT_XRP_USD&apikey=6B99D9DD-9C41-4AF9-8BF0-7BB6F3DB0A5D`;
//        let BCH = `https://cors-anywhere.herokuapp.com/rest.coinapi.io/v1/quotes/current?filter_symbol_id=BITSTAMP_SPOT_BCH_USD&apikey=6B99D9DD-9C41-4AF9-8BF0-7BB6F3DB0A5D`;
//        let XLM = `https://cors-anywhere.herokuapp.com/rest.coinapi.io/v1/quotes/current?filter_symbol_id=BITSTAMP_SPOT_XLM_USD&apikey=6B99D9DD-9C41-4AF9-8BF0-7BB6F3DB0A5D`;
//        let LTC = `https://cors-anywhere.herokuapp.com/rest.coinapi.io/v1/quotes/current?filter_symbol_id=BITSTAMP_SPOT_LTC_USD&apikey=6B99D9DD-9C41-4AF9-8BF0-7BB6F3DB0A5D`;
//        
//        $.ajax({
//              url: BTC,
//              method: "GET"
//            }).then(function(coinQuote) {
//              console.log(coinQuote);
//            });
//        
//        $.ajax({
//              url: ETH,
//              method: "GET"
//            }).then(function(coinQuote) {
//              console.log(coinQuote);
//            })
//        
//        $.ajax({
//              url: XRP,
//              method: "GET"
//            }).then(function(coinQuote) {
//              console.log(coinQuote);
//            })
//        
//        $.ajax({
//              url: BCH,
//              method: "GET"
//            }).then(function(coinQuote) {
//              console.log(coinQuote);
//            })
//        
//        $.ajax({
//              url: XLM,
//              method: "GET"
//            }).then(function(coinQuote) {
//              console.log(coinQuote);
//            })
//        
//        $.ajax({
//              url: LTC,
//              method: "GET"
//            }).then(function(coinQuote) {
//              console.log(coinQuote);
//            })
//        
//        
//    }
   

  //Public Methods
  return {
    init: () => {
        loadEventListeners();
//        displayCurrencyTicker();
        
    }
  };
})(ItemCtrl, UICtrl);


AppCtrl.init();
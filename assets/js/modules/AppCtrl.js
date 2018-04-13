//==============APP CONTROLLER=================
const AppCtrl = (function(ItemCtrl, UICtrl) {
  //Get UI selectors
  const UISelectors = UICtrl.getSelectors();

  const loadEventListeners = () => {
    /*----------------INPUT Events-----------------*/

    /*----------------CLICK Events-----------------*/
    //Draw Chart Submit Click
    document
      .querySelector(UISelectors.drawStockChartBtn)
      .addEventListener("click", drawStockChart);

    document
      .querySelector(UISelectors.drawCurrChartBtn)
      .addEventListener("click", drawCurrChart);

    /*----------------CHANGE Events-----------------*/
    document
      .querySelector(UISelectors.techCompSelect)
      .addEventListener("change", () => {
        const getStockSelects = UICtrl.getStockSelects();
        if (getStockSelects.stockSymbol == "stockWeightAvg") {
          document.querySelector(UISelectors.stockWeightAvg).style.display =
            "block";
        } else {
          document.querySelector(UISelectors.stockWeightAvg).style.display =
            "none";
        }
      });
  };

  const drawCurrChart = function() {
    const getCurrSelects = UICtrl.getCurrChart();

    const chartStyle = UICtrl.getChartStyle(UISelectors.cryptoChartStyle);

    let url;

    if (getCurrSelects.cryptoCurrency == "currWeightAvg") {
    } else {
    //   url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_${getCurrSelects.cryptoCurrTimeFrame}&symbol=${getCurrSelects.cryptoCurrency}&market=USD&apikey=S0HO0DDZUQE2KYTG`;
        url = `https://cors-anywhere.herokuapp.com/rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${getCurrSelects.cryptoCurrency}_USD/latest?apikey=6B99D9DD-9C41-4AF9-8BF0-7BB6F3DB0A5D&period_id=${getCurrSelects.cryptoCurrTimeFrame}`;
    }

    $.ajax({
      url: url,
      method: "GET", 
      crossDomain: true,
    }).then(function(currencyData) {
        console.log(currencyData);
        document.querySelector(UISelectors.currChartCard).style.display = "block";

        ItemCtrl.mapCurrData(currencyData, chartStyle, getCurrSelects);
    });

    UICtrl.resetSelects();
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

    UICtrl.resetSelects();
  };

  //Public Methods
  return {
    init: () => {
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

AppCtrl.init();

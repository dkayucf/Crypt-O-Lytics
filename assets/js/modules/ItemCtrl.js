
//===============ITEM CONTROLLER==================
const ItemCtrl = (function () {

    //Public Methods
    return {
        calculateSMA: function(closeData, smaUserInput){
            
            return closeData.map(function(x,i,v) { 
                if(i<smaUserInput-1) return NaN;
                return v.filter((x2,i2)=> {
                    return i2<=i && i2>i-smaUserInput; 
                }).reduce((a,b)=>{ 
                    return a+b; 
                })/smaUserInput;
            });

        },
        techinalIndicatorData: function(closeData, date, chartStyle, getSelects, smaSelectedIndex, smaUserInput, upperSelectedIndex, chartType){
            smaUserInput = parseInt(smaUserInput);

           // console.log(closeData, chartStyle, getSelects, smaSelectedIndex, smaUserInput, upperSelectedIndex);
//            console.log(closeData);
            let sma = ItemCtrl.calculateSMA(closeData, smaUserInput);
            console.log(closeData, sma)
            UICtrl.drawSMA(sma, date, chartType);
            
        },
        mapCurrData: function (currData, chartStyle, getCurrSelects) {

            Plotly.purge('currChartPlot');

            if (getCurrSelects.cryptoCurrency == 'currWeightAvg') {

                if (currData.length === 5) {

                    let normalizedArr = [],
                        dateArr = [];

                    currData.forEach((datum, index, arr) => {
                        //console.log(datum)
                        const openRatio = 1 / datum[0].open;
                        const closingRatio = 1 / datum[0].close;
                        const highRatio = 1 / datum[0].high;
                        const lowRatio = 1 / datum[0].low;
                        //console.log(`Closing: ${closingRatio}, Open: ${openRatio}, High: ${highRatio}, Low: ${lowRatio}`);

                        let open = datum.map(x => (x.open * openRatio));
                        let date = datum.map(x => x.time);
                        normalizedArr.push(open);
                        dateArr.push(date);
                    });

                    let normalizedArrTotal = [];

                    for (let i = 0; i < normalizedArr[0].length; i++) {
                        normalizedArrTotal.push(normalizedArr[0][i] + normalizedArr[1][i] + normalizedArr[2][i] + normalizedArr[3][i] + normalizedArr[4][i]);
                    }

                    UICtrl.drawWeightedAvg(dateArr[0], normalizedArrTotal, chartStyle, 'Crypto Currency');

                }

            } else {

                let entityName = getCurrSelects.cryptoName;

                UICtrl.drawChart(currData, chartStyle, entityName, 'Crypto Currency');


            }
        },
        mapStockData: function (stockData, chartStyle, getStockSelects) {


            if (chartStyle == 'Select Chart Style...') {
                chartStyle = 'candlestick';
                document.querySelector('.stockChartStyle').value = 'candlestick';

            }

            //Purge any plots that may be present before displaying new plot
            Plotly.purge('stockChartPlot');

            //check if stock select is stock weight average
            if (getStockSelects.stockSymbol == 'stockWeightAvg') {


                let normalizedArr = [],
                    dateArr = [];

                //iterate over the stockData object of objects
                for (let stock in stockData) {

                    //divide the 1 by the first data value
                    const closingRatio = 1 / stockData[stock].chart[0].close;
                    const openRatio = 1 / stockData[stock].chart[0].open;
                    const highRatio = 1 / stockData[stock].chart[0].high;
                    const lowRatio = 1 / stockData[stock].chart[0].low;
                    //console.log(`Closing: ${closingRatio}, Open: ${openRatio}, High: ${highRatio}, Low: ${lowRatio}`);

                    //Map each open value and multiply by the ratio above
                    let open = stockData[stock].chart.map(x => (x.open * openRatio));
                    let date = stockData[stock].chart.map(x => x.date);

                    //push each value into the normalized array
                    normalizedArr.push(open);
                    dateArr.push(date)
                }

                let normalizedArrTotal = [];

                for (let i = 0; i < normalizedArr[0].length; i++) {
                    normalizedArrTotal.push(normalizedArr[0][i] + normalizedArr[1][i] + normalizedArr[2][i] + normalizedArr[3][i] + normalizedArr[4][i]);
                }


                UICtrl.drawWeightedAvg(dateArr[0], normalizedArrTotal, chartStyle, 'Stock');

            } else {

                UICtrl.displayNewsArticles(stockData.news, 'stocks');

                stockData = stockData.chart;
                let entityName = getStockSelects.stockName;

                UICtrl.drawChart(stockData, chartStyle, entityName, 'Stock');

            }
        }
    }

})();

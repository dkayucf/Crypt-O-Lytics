//===============ITEM CONTROLLER==================
const ItemCtrl = (function(){
 
    //Public Methods
    return {
        mapCurrData: function(currData, chartStyle, getCurrSelects){
            console.log(currData);
            Plotly.purge('currChartPlot');

            if(getCurrSelects.cryptoCurrency == 'currWeightAvg'){
                console.log("HI KEVIN!!!!!");
                ///////////// HERE KEVIN! ////////////////////
            } else {
                trace1 = {
                    x: stockData.chart.map(datum => datum.date),
                    close: stockData.chart.map(datum => datum.close), 
                    decreasing: {line: {color: '#7F7F7F'}}, 
                    high: stockData.chart.map(datum => datum.high), 
                    increasing: {line: {color: '#17BECF'}}, 
                    line: {color: 'rgba(31,119,180,1)'}, 
                    low: stockData.chart.map(datum => datum.low), 
                    open: stockData.chart.map(datum => datum.open), 
                    type: chartStyle, 
                    xaxis: 'x', 
                    yaxis: 'y'
                };


                // data = [trace1];

                // let layout = {
                //       dragmode: 'zoom', 
                //       autosize: true,
                //       margin: {
                //         r: 10, 
                //         t: 25, 
                //         b: 40, 
                //         l: 60
                //       }, 
                //       showlegend: false, 
                //       xaxis: {
                //         autorange: true, 
                //         domain: [0, 1], 
                //         range: [trace1.x[0], trace1.x[trace1.x.length-1]], 
                //         rangeslider: {range: [trace1.x[0], trace1.x[trace1.x.length-1]]}, 
                //         title: `${getStockSelects.stockName} Stock Chart`, 
                //         type: 'date'
                //       }, 
                //       yaxis: {
                //         autorange: true, 
                //         domain: [0, 1], 
                //         range: [Math.min(...trace1.low), Math.max(...trace1.high)],  
                //         type: 'linear'
                //       }
                // };
            }
        },

        mapStockData: function(stockData, chartStyle, getStockSelects){
            //Purge any plots that may be present before displaying new plot
            Plotly.purge('stockChartPlot');
            
           //check if stock select is stock weight average
        if(getStockSelects.stockSymbol == 'stockWeightAvg'){
           
            for(let stock in stockData){
                console.log(stockData[stock].chart.map(stock=> stock.date));
            }
            
   
        } else {
            
            
            let trace1 = {},
               data = [];

            if(chartStyle == 'scatter'){

                trace1 = {
                    type: chartStyle,
                    mode: "lines",
                    x: stockData.chart.map(datum => datum.date),
                    y: stockData.chart.map(datum => datum.close),
                    line: {color: '#17BECF'}
                }

                data = [trace1];

                let layout = {
                    title: `${getStockSelects.stockName} Stock Chart`
                };

                Plotly.plot('stockChartPlot', data, layout);

            } else {
                //Map over stock data and place in data structure required by plotly
                trace1 = {
                    x: stockData.chart.map(datum => datum.date),
                    close: stockData.chart.map(datum => datum.close), 
                    decreasing: {line: {color: '#7F7F7F'}}, 
                    high: stockData.chart.map(datum => datum.high), 
                    increasing: {line: {color: '#17BECF'}}, 
                    line: {color: 'rgba(31,119,180,1)'}, 
                    low: stockData.chart.map(datum => datum.low), 
                    open: stockData.chart.map(datum => datum.open), 
                    type: chartStyle, 
                    xaxis: 'x', 
                    yaxis: 'y'
                };


                data = [trace1];

                let layout = {
                      dragmode: 'zoom', 
                      autosize: true,
                      margin: {
                        r: 10, 
                        t: 25, 
                        b: 40, 
                        l: 60
                      }, 
                      showlegend: false, 
                      xaxis: {
                        autorange: true, 
                        domain: [0, 1], 
                        range: [trace1.x[0], trace1.x[trace1.x.length-1]], 
                        rangeslider: {range: [trace1.x[0], trace1.x[trace1.x.length-1]]}, 
                        title: `${getStockSelects.stockName} Stock Chart`, 
                        type: 'date'
                      }, 
                      yaxis: {
                        autorange: true, 
                        domain: [0, 1], 
                        range: [Math.min(...trace1.low), Math.max(...trace1.high)],  
                        type: 'linear'
                      }
                };

                Plotly.plot('stockChartPlot', data, layout);

            }
            
            
        }// End If else   
            

        },
        getChartLayout: function(){
            return layout;
        }
    }

})();
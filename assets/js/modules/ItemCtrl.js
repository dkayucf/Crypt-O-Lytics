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
                let trace1 = {},

                    volume = {},

                    data = [];
               
                if(chartStyle == 'scatter'){
                   
                    trace1 = {
                        type: chartStyle,
                        mode: "lines",
                        x: currData.map(datum => datum.time_period_start.split('T')[0]),
                        y: currData.map(datum => datum.price_close),
                        line: {color: '#17BECF'}
                    }
                    
                    volume = {
                        x: currData.map(datum => datum.time_period_start.split('T')[0]),
                        y: currData.map(datum => datum.volume_traded),
                        xaxis: 'x2',
                        yaxis: 'y2',
                        type: 'bar'    
                    };

                    data = [trace1, volume];

                    let layout = {
                          dragmode: 'zoom', 
                          autosize: true,
                          title: `${getCurrSelects.cryptoName} Currency Chart`,
                          margin: {
                            r: 10, 
                            t: 30, 
                            b: 30, 
                            l: 40
                          }, 
                          showlegend: false, 
                          xaxis: {
                            autorange: true, 
                            domain: [0, 1], 
                            range: [trace1.x[0], trace1.x[trace1.x.length-1]],
                            rangeslider: {
                                visible: false
                            },
                            type: 'date'
                          }, 
                          yaxis: {
                            autorange: true, 
                            domain: [.3, 1],   
                            type: 'linear'
                          },
                          xaxis2: {
                              domain: [0, 1],
                              title: `Volume`,
                          },
                          yaxis2: {
                            domain: [0, .2],
                            anchor: 'x2'
                          }
                    };

                    Plotly.plot('currChartPlot', data, layout); 
                    
                }else {
                    trace1 = {
                        x: currData.map(datum => datum.time_period_start.split('T')[0]),
                        close: currData.map(datum => datum.price_close), 
                        decreasing: {line: {color: '#7F7F7F'}}, 
                        high: currData.map(datum => datum.price_high), 
                        increasing: {line: {color: '#17BECF'}}, 
                        line: {color: 'rgba(31,119,180,1)'}, 
                        low: currData.map(datum => datum.price_low), 
                        open: currData.map(datum => datum.price_open), 
                        type: chartStyle, 
                        xaxis: 'x', 
                        yaxis: 'y'
                    };
                    
                    volume = {
                        x: currData.map(datum => datum.time_period_start.split('T')[0]),
                        y: currData.map(datum => datum.volume_traded),
                        xaxis: 'x2',
                        yaxis: 'y2',
                        type: 'bar'    
                    };
                    
                     data = [trace1, volume];

                      let layout = {
                              dragmode: 'zoom', 
                              autosize: true,
                              title: `${getCurrSelects.cryptoName} Currency Chart`,
                              margin: {
                                r: 10, 
                                t: 30, 
                                b: 30, 
                                l: 40
                              }, 
                              showlegend: false, 
                              xaxis: {
                                autorange: true, 
                                domain: [0, 1], 
                                range: [trace1.x[0], trace1.x[trace1.x.length-1]],
                                rangeslider: {
                                    visible: false
                                },
                                type: 'date'
                              }, 
                              yaxis: {
                                autorange: true, 
                                domain: [.3, 1],   
                                type: 'linear'
                              },
                              xaxis2: {
                                  domain: [0, 1],
                                  title: `Volume`,
                              },
                              yaxis2: {
                                domain: [0, .2],
                                anchor: 'x2'
                              }
                        };

                    Plotly.plot('currChartPlot', data, layout);   
                }

            }
        },

        mapStockData: function(stockData, chartStyle, getStockSelects){
            //Purge any plots that may be present before displaying new plot
            Plotly.purge('stockChartPlot');
            
           //check if stock select is stock weight average
        if(getStockSelects.stockSymbol == 'stockWeightAvg'){
           //console.log(stockData);
            for(let stock in stockData){
                
                /******************KEVIN THIS IS WHERE YOU SHOULD START**************************************/
                console.log(stockData[stock].chart[0].close);
                console.log(stockData[stock].chart.map(stock=> stock.close));
                
                const closingRatio = 1 / stockData[stock].chart[0].close;
                const openRatio = 1 / stockData[stock].chart[0].open;
                const highRatio = 1 / stockData[stock].chart[0].high;
                const lowRatio = 1 / stockData[stock].chart[0].low;
                console.log(`Closing: ${closingRatio}, Open: ${openRatio}, High: ${highRatio}, Low: ${lowRatio}`);
            }
            
   
        } else {
            
            
            let trace1 = {},
                volume = {},
               data = [];

            if(chartStyle == 'scatter'){

                trace1 = {
                    type: chartStyle,
                    mode: "lines",
                    x: stockData.chart.map(datum => datum.date),
                    y: stockData.chart.map(datum => datum.close),
                    line: {color: '#17BECF'}
                }
                
                volume = {
                        x: stockData.chart.map(datum => datum.date),
                        y: stockData.chart.map(datum => datum.volume),
                        xaxis: 'x2',
                        yaxis: 'y2',
                        type: 'bar'    
                    };

                data = [trace1, volume];

                let layout = {
                      dragmode: 'zoom', 
                      autosize: true,
                      title: `${getStockSelects.stockName} Stock Chart`,
                      margin: {
                        r: 10, 
                        t: 30, 
                        b: 30, 
                        l: 40
                      }, 
                      showlegend: false, 
                      xaxis: {
                        autorange: true, 
                        domain: [0, 1], 
                        range: [trace1.x[0], trace1.x[trace1.x.length-1]],
                        rangeslider: {
                            visible: false
                        },
                        type: 'date'
                      }, 
                      yaxis: {
                        autorange: true, 
                        domain: [.3, 1],   
                        type: 'linear'
                      },
                      xaxis2: {
                          domain: [0, 1],
                          title: `Volume`,
                      },
                      yaxis2: {
                        domain: [0, .2],
                        anchor: 'x2'
                      }
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
                
                volume = {
                        x: stockData.chart.map(datum => datum.date),
                        y: stockData.chart.map(datum => datum.volume),
                        xaxis: 'x2',
                        yaxis: 'y2',
                        type: 'bar'    
                    };


                data = [trace1, volume];

                let layout = {
                      dragmode: 'zoom', 
                      autosize: true,
                      title: `${getStockSelects.stockName} Stock Chart`,
                      margin: {
                        r: 10, 
                        t: 30, 
                        b: 30, 
                        l: 40
                      }, 
                      showlegend: false, 
                      xaxis: {
                        autorange: true, 
                        domain: [0, 1], 
                        range: [trace1.x[0], trace1.x[trace1.x.length-1]],
                        rangeslider: {
                            visible: false
                        },
                        type: 'date'
                      }, 
                      yaxis: {
                        autorange: true, 
                        domain: [.3, 1], 
                        range: [Math.min(...trace1.low), Math.max(...trace1.high)],  
                        type: 'linear'
                      },
                      xaxis2: {
                          domain: [0, 1],
                          title: `Volume`,
                      },
                      yaxis2: {
                        domain: [0, .2],
                        anchor: 'x2'
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
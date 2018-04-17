//===============ITEM CONTROLLER==================
const ItemCtrl = (function(){
 
    //Public Methods
    return {

         mapCurrData: function(currData, chartStyle, getCurrSelects){
                     
            Plotly.purge('currChartPlot');

            if(getCurrSelects.cryptoCurrency == 'currWeightAvg'){
                
                if(currData.length === 5){
                    
                     let normalizedArr = [],
                        dateArr= [],
                        trace1,
                        data;
                    
                    currData.forEach((datum, index, arr)=>{
                        //console.log(datum)
                        const openRatio = 1 / datum[0].open;
                        const closingRatio = 1 / datum[0].close;
                        const highRatio = 1 / datum[0].high;
                        const lowRatio = 1 / datum[0].low;
                        //console.log(`Closing: ${closingRatio}, Open: ${openRatio}, High: ${highRatio}, Low: ${lowRatio}`);
                        
                        let open = datum.map(x=> (x.open * openRatio));
                        let date = datum.map(x=> x.time);
                        normalizedArr.push(open);
                        dateArr.push(date);
                    });
                    
                    let normalizedArrTotal = [];
            
                    for(let i = 0; i< normalizedArr[0].length; i++){
                       normalizedArrTotal.push(normalizedArr[0][i]+normalizedArr[1][i]+normalizedArr[2][i]+ normalizedArr[3][i]+normalizedArr[4][i]);
                    }
                    
                    trace1 = {
                        type: chartStyle,
                        mode: "lines",
                        x: dateArr[0],
                        y: normalizedArrTotal,
                        line: {color: '#17BECF'}
                    }


                    data = [trace1];

                    let layout = {
                          dragmode: 'zoom', 
                          autosize: true,
                          title: ` Normalized Cryptocurrency Price Chart`,
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
                                visible: true
                            },
                            type: 'date'
                          }, 
                          yaxis: {
                            autorange: true, 
                            domain: [0, 1],   
                            type: 'linear'
                          }

                    };

                    Plotly.plot('currChartPlot', data, layout);
                }
                
            } else {
                let trace1 = {},

                    volume = {},

                    data = [];
               
                if(chartStyle == 'scatter'){
                   
                    trace1 = {
                        type: chartStyle,
                        mode: "lines",
                        x: currData.map(datum => datum.time),
                        y: currData.map(datum => datum.close),
                        line: {color: '#17BECF'}
                    }
                    
                    volume = {
                        x: currData.map(datum => datum.time),
                        y: currData.map(datum => datum.volumeto),
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
                        x: currData.map(datum => datum.time),
                        close: currData.map(datum => datum.close), 
                        decreasing: {line: {color: '#7F7F7F'}}, 
                        high: currData.map(datum => datum.high), 
                        increasing: {line: {color: '#17BECF'}}, 
                        line: {color: 'rgba(31,119,180,1)'}, 
                        low: currData.map(datum => datum.low), 
                        open: currData.map(datum => datum.open), 
                        type: chartStyle, 
                        xaxis: 'x', 
                        yaxis: 'y'
                    };
                    
                    volume = {
                        x: currData.map(datum => datum.time),
                        y: currData.map(datum => datum.volumeto),
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

            
            if(chartStyle == 'Select Chart Style...'){
                chartStyle = 'candlestick';
                document.querySelector('.stockChartStyle').value = 'candlestick';
                
            }
           
            //Purge any plots that may be present before displaying new plot
            Plotly.purge('stockChartPlot');
            
           //check if stock select is stock weight average
        if(getStockSelects.stockSymbol == 'stockWeightAvg'){

            let normalizedArr = [],
                dateArr= [],
                data,
                trace1;
            
            //iterate over the stockData object of objects
            for(let stock in stockData){
                
                //divide the 1 by the first data value
                const closingRatio = 1 / stockData[stock].chart[0].close;
                const openRatio = 1 / stockData[stock].chart[0].open;
                const highRatio = 1 / stockData[stock].chart[0].high;
                const lowRatio = 1 / stockData[stock].chart[0].low;
                //console.log(`Closing: ${closingRatio}, Open: ${openRatio}, High: ${highRatio}, Low: ${lowRatio}`);
  
                //Map each open value and multiply by the ratio above
                let open = stockData[stock].chart.map(x=> (x.open * openRatio));
                let date = stockData[stock].chart.map(x=> x.date);
                
                //push each value into the normalized array
                normalizedArr.push(open);
                dateArr.push(date)
            }
            
            let normalizedArrTotal = [];
            
            for(let i = 0; i< normalizedArr[0].length; i++){
               normalizedArrTotal.push(normalizedArr[0][i]+normalizedArr[1][i]+normalizedArr[2][i]+ normalizedArr[3][i]+normalizedArr[4][i]);
            }
            

             trace1 = {
                    type: chartStyle,
                    mode: "lines",
                    x: dateArr[0],
                    y: normalizedArrTotal,
                    line: {color: '#17BECF'}
                }
                

                data = [trace1];

                let layout = {
                      dragmode: 'zoom', 
                      autosize: true,
                      title: ` Normalized Tech Stock Price Chart`,
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
                            visible: true
                        },
                        type: 'date'
                      }, 
                      yaxis: {
                        autorange: true, 
                        domain: [0, 1],   
                        type: 'linear'
                      }
                      
                };
            
                Plotly.plot('stockChartPlot', data, layout);

   
        } else {
            
            UICtrl.displayNewsArticles(stockData.news, 'stocks');
            
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
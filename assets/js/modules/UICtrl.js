//================UI CONTROLLER==================
const UICtrl = (function () {

    const UISelectors = {
        //Buttons
        drawStockChartBtn: '.drawStockChart',
        drawCurrChartBtn: '.drawCurrChart',
        quickQuoteBtn: '#quickQuoteBtn',
        indicatorsUpdateBtn: '.indicatorsUpdateBtn',

        //Inputs
        stockWeightAvg: '#stockWeightAvg',
        cryptoWeightAvg: '#cryptoWeightAvg',
        quickQuoteInput: '#quickQuoteInput',
        hiddenCurrencyInput: '#hiddenCurrencyInput',
        hiddenStockInput: '#hiddenStockInput',
        smaNDays: '.smaNDays',


        //Selects
        techCompSelect: '.techCompSelect',
        techTimeFrame: '.techTimeFrame',
        stockChartStyle: '.stockChartStyle',
        cryptoCurrSelect: '.cryptoCurrSelect',
        cryptoTimeFrame: '.cryptoTimeFrame',
        cryptoChartStyle: '.cryptoChartStyle',
        movingAverage: '.movingAverage',
        upperIndicators: '.upperIndicators',

        //Tables
        quoteTbody1: '#quoteTbody1',
        quoteTbody2: '#quoteTbody2',

        //Divs
        stockChartCard: '#stockChartCard',
        currChartCard: '#currChartCard',
        cardHeader: '.card-header',
        BTCQuote: '#BTCQuote',
        ETHQuote: '#ETHQuote',
        XRPQuote: '#XRPQuote',
        BCHQuote: '#BCHQuote',
        XLMQuote: '#XLMQuote',
        LTCQuote: '#LTCQuote',
        stockChartNews: '.stockChartNews',
        cryotCurrencyNews: '.cryotCurrencyNews'


    }

    //Public Methods
    return {
        convertDate: function (date) {
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString();
            var dd = date.getDate().toString();

            var mmChars = mm.split('');
            var ddChars = dd.split('');

            return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
        },
        formatNumber: function (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        displayStockQuote: function (quote) {

            document.querySelector('#quoteModalTitle').innerHTML = `${quote.companyName} (${quote.symbol})`;

            let marketCap = UICtrl.formatNumber(quote.marketCap);

            let html1 = `<tr>
                <td>$${quote.open}</td>
                <td>$${quote.latestPrice}</td>
                <td>$${quote.change}</td>
                <td>${(quote.changePercent*100).toFixed(2)}%</td>
                <td>$${quote.high}</td>
                <td>$${quote.low}</td>
            </tr>`;

            let html2 = `<tr>
                <td>$${marketCap}</td>
                <td>${quote.peRatio}</td>
                <td>$${quote.week52High}</td>
                <td>$${quote.week52Low}</td>
                <td>${(quote.ytdChange * 100).toFixed(2)}%</td>
            </tr>`;

            document.querySelector(UISelectors.quoteTbody1).innerHTML = html1;
            document.querySelector(UISelectors.quoteTbody2).innerHTML = html2;

            $('#quickQuoteModal').modal('show');
        },
        displayNewsArticles: function (articles, newsType) {

            if (newsType == 'stocks') {

                document.querySelector(UISelectors.stockChartNews).innerHTML = '';


                articles.forEach((article, index) => {

                    if (index < 5) {
                        let articleCard = document.createElement('div');
                        articleCard.classList = 'card m-2 col-md-3 p-0 bg-dark';
                        let articleHeader = document.createElement('div');
                        articleHeader.classList = 'card-header panel-heading bg-secondary text-center';

                        let articleH5 = document.createElement('h5');
                        articleH5.classList = 'd-inlinepanel-title text-danger';
                        articleH5.innerHTML = `<a class="newsHeadline" href="${article.url}" target="_blank">${article.headline}</a>`;
                        articleHeader.appendChild(articleH5);
                        articleCard.appendChild(articleHeader);
                        let articleSummary = document.createElement('div');

                        articleSummary.innerHTML = `<div class="card-body newsSummary panel-body bg-dark text-light">

                                                            <p>${article.summary}</p>    
                                                        </div>`;
                        articleCard.appendChild(articleSummary);

                        document.querySelector(UISelectors.stockChartNews).appendChild(articleCard);
                    }

                });
            }
        },
        drawWeightedAvg: function (xData, yData, chartStyle, chartType) {
            let trace1,
                data;

            trace1 = {
                type: chartStyle,
                mode: "lines",
                x: xData,
                y: yData,
                line: {
                    color: '#17BECF'
                }
            }


            data = [trace1];

            let layout = {
                dragmode: 'zoom',
                autosize: true,
                title: ` Normalized ${chartType} Price Chart`,
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
                    range: [trace1.x[0], trace1.x[trace1.x.length - 1]],
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

            if (chartType == 'Crypto Currency') {

                Plotly.plot('currChartPlot', data, layout);

            } else if (chartType == 'Stock') {

                Plotly.plot('stockChartPlot', data, layout);

            }


        },
        
        drawSMA: function(closeData, date, chartType, smaUserInput){
            

            let trace1,
                data,
                volume;
            trace1 = {
                        type: 'scatter',
                        mode: "lines",
                        x: date,
                        y: closeData,
                        line: {
                            color: '#ff0000'
                        },
                        name: `${smaUserInput}-Day SMA`,
                    };
            
            
            data = [trace1];
            
            let layout = {
                    dragmode: 'zoom',
                    autosize: true,
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
                        range: [trace1.x[0], trace1.x[trace1.x.length - 1]],
                        rangeslider: {
                            visible: false
                        },
                        type: 'date'
                    },
                    yaxis: {
                        autorange: true,
                        domain: [.3, 1],
                        type: 'linear'
                    }
                };
            
            if (chartType == 'Crypto Currency') {

                    Plotly.plot('currChartPlot', data, layout);

                } else if (chartType == 'Stock') {

                    Plotly.plot('stockChartPlot', data, layout);

                }
            
        },
        drawChart: function (entityData, chartStyle, entityName, chartType, annotations) {

            let trace1,
                data,
                volume;

            if (chartStyle == 'scatter') {

                if (chartType == 'Crypto Currency') {

                    trace1 = {
                        type: chartStyle,
                        mode: "lines",
                        x: entityData.map(datum => datum.time),
                        y: entityData.map(datum => datum.close),
                        line: {
                            color: '#17BECF'
                        }
                    }

                    volume = {
                        x: entityData.map(datum => datum.time),
                        y: entityData.map(datum => datum.volumeto),
                        xaxis: 'x2',
                        yaxis: 'y2',
                        type: 'bar'
                    };


                } else if (chartType == 'Stock') {

                    trace1 = {
                        type: chartStyle,
                        mode: "lines",
                        x: entityData.map(datum => datum.date),
                        y: entityData.map(datum => datum.close),
                        line: {
                            color: '#17BECF'
                        }
                    }

                    volume = {
                        x: entityData.map(datum => datum.date),
                        y: entityData.map(datum => datum.volume),
                        xaxis: 'x2',
                        yaxis: 'y2',
                        type: 'bar'
                    };

                }

                data = [trace1, volume];

                let layout = {
                    dragmode: 'zoom',
                    autosize: true,
                    title: `${entityName} ${chartType} Chart`,
                    margin: {
                        r: 10,
                        t: 30,
                        b: 30,
                        l: 40
                    },
                    showlegend: false,
                    annotations: annotations,
                    xaxis: {
                        autorange: true,
                        domain: [0, 1],
                        range: [trace1.x[0], trace1.x[trace1.x.length - 1]],
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


                if (chartType == 'Crypto Currency') {

                    Plotly.plot('currChartPlot', data, layout);

                } else if (chartType == 'Stock') {

                    Plotly.plot('stockChartPlot', data, layout);

                }

                //End of Line Plots (Scatter plots)
            } else {

                if (chartType == 'Crypto Currency') {

                    trace1 = {
                        x: entityData.map(datum => datum.time),
                        close: entityData.map(datum => datum.close),
                        decreasing: {
                            line: {
                                color: '#7F7F7F'
                            },
                            name: `${entityName} Decreasing`,
                        },
                        high: entityData.map(datum => datum.high),
                        increasing: {
                            line: {
                                color: '#17BECF'
                            },
                            name: `${entityName} Increasing`,
                        },
                        line: {
                            color: 'rgba(31,119,180,1)'
                        },
                        low: entityData.map(datum => datum.low),
                        open: entityData.map(datum => datum.open),
                        type: chartStyle,
                        xaxis: 'x',
                        yaxis: 'y'
                    };

                    volume = {
                        x: entityData.map(datum => datum.time),
                        y: entityData.map(datum => datum.volumeto),
                        xaxis: 'x',
                        yaxis: 'y2',
                        type: 'bar',
                        name: 'Volume'
                    };

                } else if (chartType == 'Stock') {

                    trace1 = {
                        x: entityData.map(datum => datum.date),
                        close: entityData.map(datum => datum.close),
                        decreasing: {
                            line: {
                                color: '#7F7F7F'
                            },
                            name: `${entityName} Decreasing`,
                        },
                        high: entityData.map(datum => datum.high),
                        increasing: {
                            line: {
                                color: '#17BECF'
                            },
                            name: `${entityName} Increasing`,
                        },
                        line: {
                            color: 'rgba(31,119,180,1)'
                        },
                        low: entityData.map(datum => datum.low),
                        open: entityData.map(datum => datum.open),
                        type: chartStyle,
                        xaxis: 'x',
                        yaxis: 'y'
                    };

                    volume = {
                        x: entityData.map(datum => datum.date),
                        y: entityData.map(datum => datum.volume),
                        xaxis: 'x',
                        yaxis: 'y2',
                        type: 'bar',
                        name: 'Volume'
                    };

                }

                data = [trace1, volume];

                let layout = {
                    dragmode: 'zoom',
                    autosize: true,
                    title: `${entityName} ${chartType} Chart`,
                    margin: {
                        r: 10,
                        t: 30,
                        b: 30,
                        l: 40
                    },
                    showlegend: true,
                    legend: {
                        orientation: 'h',
                        traceorder:	'normal',
                        x: 0.5,
                        xanchor: 'center',
                        y: 1.1,
                        yanchor: 'top'
                    },
                    annotations: annotations,
                    xaxis: {
                        autorange: true,
                        domain: [0, 1],
                        range: [trace1.x[0], trace1.x[trace1.x.length - 1]],
                        rangeslider: {
                            visible: false
                        },
                        type: 'date',
                        title: `Volume`,
                        rangeselector: {
                            x: 0,
                            y: 1.2,
                            xanchor: 'left',
                            font: {size:8},
                            buttons: [{
                                step: 'month',
                                stepmode: 'backward',
                                count: 1,
                                label: '1 month'
                            }, {
                                step: 'month',
                                stepmode: 'backward',
                                count: 3,
                                label: '3 month'
                            }, {
                                step: 'month',
                                stepmode: 'backward',
                                count: 6,
                                label: '6 months'
                            }, {
                                step: 'all',
                                label: 'All dates'
                            }]
                          }
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


                if (chartType == 'Crypto Currency') {

                    Plotly.plot('currChartPlot', data, layout);

                } else if (chartType == 'Stock') {

                    Plotly.plot('stockChartPlot', data, layout);

                }

            }

        },
        getStockSelects: function () {
            const stockSymbolSelect = document.querySelector(UISelectors.techCompSelect);
            const stockSymbolSelectValue = stockSymbolSelect.options[stockSymbolSelect.selectedIndex].value;
            const stockName = stockSymbolSelect.options[stockSymbolSelect.selectedIndex].textContent;

            const stockTimeFrame = document.querySelector(UISelectors.techTimeFrame);
            const stockTimeFrameValue = stockTimeFrame.options[stockTimeFrame.selectedIndex].value;

            const hiddenStockInput = document.querySelector(UISelectors.hiddenStockInput);
            hiddenStockInput.value = stockSymbolSelectValue;
            hiddenStockInput.setAttribute('timeFrame', `${stockTimeFrameValue}`);

            return {
                stockSymbol: stockSymbolSelectValue,
                stockTimeFrame: stockTimeFrameValue,
                stockName: stockName
            }
        },
        getCurrChart: function () {
            const cryptoCurrSelect = document.querySelector(UISelectors.cryptoCurrSelect);
            const cryptoSelectValue = cryptoCurrSelect.options[cryptoCurrSelect.selectedIndex].value;
            const currName = cryptoCurrSelect.options[cryptoCurrSelect.selectedIndex].textContent;

            const cryptoTimeFrame = document.querySelector(UISelectors.cryptoTimeFrame);
            const cryptoTimeFrameValue = cryptoTimeFrame.options[cryptoTimeFrame.selectedIndex].value;

            const hiddenCurrInput = document.querySelector(UISelectors.hiddenCurrencyInput);
            hiddenCurrInput.value = cryptoSelectValue;
            hiddenCurrInput.setAttribute('timeFrame', `${cryptoTimeFrameValue}`);

            return {
                cryptoCurrency: cryptoSelectValue,
                cryptoCurrTimeFrame: cryptoTimeFrameValue,
                cryptoName: currName
            }
        },
        getChartStyle: (selector) => {
            const chartTypeSelect = document.querySelector(selector);
            const chartTypeSelectValue = chartTypeSelect.options[chartTypeSelect.selectedIndex].value;

            return chartTypeSelectValue;
        },
        getSelectors: () => {
            return UISelectors;
        },
        resetSelects: () => {
            let selectsArr = Array.from(document.querySelectorAll('select'));

            selectsArr.forEach(select => {
                select.selectedIndex = 0;
            });

        }
    }

})();

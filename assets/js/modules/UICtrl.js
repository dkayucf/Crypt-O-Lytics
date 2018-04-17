//================UI CONTROLLER==================
const UICtrl = (function(){
    
    const UISelectors = {
        //Buttons
        drawStockChartBtn: '.drawStockChart',
        drawCurrChartBtn: '.drawCurrChart',
        quickQuoteBtn: '#quickQuoteBtn',
        
        //Inputs
        stockWeightAvg: '#stockWeightAvg',
        cryptoWeightAvg: '#cryptoWeightAvg',
        quickQuoteInput: '#quickQuoteInput',
        hiddenCurrencyInput: '#hiddenCurrencyInput',
        hiddenStockInput: '#hiddenStockInput',
        
        
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
        convertDate: function(date) {
          var yyyy = date.getFullYear().toString();
          var mm = (date.getMonth()+1).toString();
          var dd  = date.getDate().toString();

          var mmChars = mm.split('');
          var ddChars = dd.split('');

          return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
        },
        formatNumber: function(number){
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        displayStockQuote: function(quote){
            
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
        displayNewsArticles: function(articles, newsType){

            if(newsType == 'stocks'){
                
                document.querySelector(UISelectors.stockChartNews).innerHTML = '';
                
                articles.forEach((article, index)=>{
                    
                    if(index < 6){
                        let articleCard = document.createElement('div'); 
                        articleCard.classList = 'newsDisplay card m-2 col-md-3 p-0 bg-dark';
                        let articleHeader = document.createElement('div');
                            articleHeader.classList = 'card-header panel-heading text-left';
                        let articleH5 = document.createElement('h5');
                            articleH5.classList = 'd-inlinepanel-title text-danger';
                            articleH5.innerHTML = `<a class="newsHeadline" href="${article.url}" target="_blank">${article.headline}</a>`;
                        articleHeader.appendChild(articleH5);
                        articleCard.appendChild(articleHeader);
                        let articleSummary = document.createElement('div');
                            articleSummary.innerHTML = `<div class="card-body newsSummary panel-body text-light">
                                                            <p>${article.summary}</p>    
                                                        </div>`;
                        articleCard.appendChild(articleSummary);

                        document.querySelector(UISelectors.stockChartNews).appendChild(articleCard);    
                    }

                });
            }
        },
        getStockSelects: function(){
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
        getCurrChart: function(){
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
        getChartStyle:(selector)=>{
            const chartTypeSelect = document.querySelector(selector);
            const chartTypeSelectValue = chartTypeSelect.options[chartTypeSelect.selectedIndex].value;
            
            return chartTypeSelectValue;
        },
        getSelectors: () => {
            return UISelectors;
        },
        resetSelects: () => {
            let selectsArr = Array.from(document.querySelectorAll('select'));
            
            selectsArr.forEach(select =>{
                select.selectedIndex = 0;
            });
            
        }
    }

})();
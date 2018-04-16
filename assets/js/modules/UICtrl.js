//================UI CONTROLLER==================
const UICtrl = (function(){
    
    const UISelectors = {
        //Buttons
        drawStockChartBtn: '.drawStockChart',
        drawCurrChartBtn: '.drawCurrChart',
        quickQuoteBtn: '#quickQuoteBtn',
        
        //Inputs
        stockWeightAvg: '#stockWeightAvg',
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
                
                articles.forEach(article=>{
                   let articleCard = document.createElement('div'); 
                        articleCard.classList = 'card my-2';
                    let articleHeader = document.createElement('div');
                        articleHeader.classList = 'card-header panel-heading bg-secondary active';
                    let articleH6 = document.createElement('h6');
                        articleH6.classList = 'd-inlinepanel-title';
                        articleH6.innerHTML = `<a class="collapsed addChevron newsHeadline" href="${article.url}" target="_blank" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">${article.headline}</a>`;
                    articleHeader.appendChild(articleH6);
                    articleCard.appendChild(articleHeader);
                    let articleSummary = document.createElement('div');
                        articleSummary.classList = 'panel-collapse collapse show';
                        articleSummary.id = 'collapseTwo';
                        articleSummary.innerHTML = `<div class="card-body  panel-body bg-dark text-light">
                                                        <p>${article.summary}</p>    
                                                    </div>`;
                    articleCard.appendChild(articleSummary);
                    
                    document.querySelector(UISelectors.stockChartNews).appendChild(articleCard);
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
        toggleMenuState: (menuToggle) =>{
            if(menuToggle.classList.contains('addChevron')){
                if(!menuToggle.parentElement.parentElement.classList.contains('active')){
                    menuToggle.parentElement.parentElement.classList = 'card-header panel-heading bg-secondary active';
                }else if (menuToggle.parentElement.parentElement.classList.contains('active')) {
                    menuToggle.parentElement.parentElement.classList = 'card-header panel-heading bg-dark';
                }
            }
            
        },
        resetSelects: () => {
            let selectsArr = Array.from(document.querySelectorAll('select'));
            
            selectsArr.forEach(select =>{
                select.selectedIndex = 0;
            });
            
        }
    }

})();
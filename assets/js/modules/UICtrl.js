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
        
        //Selects
        techCompSelect: '.techCompSelect',
        techTimeFrame: '.techTimeFrame',
        stockChartStyle: '.stockChartStyle',
        cryptoCurrSelect: '.cryptoCurrSelect',
        cryptoTimeFrame: '.cryptoTimeFrame',
        cryptoChartStyle: '.cryptoChartStyle',
        
        //Tables
        quoteTbody1: '#quoteTbody1',
        quoteTbody2: '#quoteTbody2',
        
        //Divs
        stockChartCard: '#stockChartCard',
        currChartCard: '#currChartCard',
        cardHeader: '.card-header'
        
    }
    
    //Public Methods
    return {
        displayStockQuote: function(quote){
            
            document.querySelector('#quoteModalTitle').innerHTML = `${quote.companyName} (${quote.symbol})`;
            
            let html1 = `<tr>
                <td>${quote.open}</td>
                <td>${quote.latestPrice}</td>
                <td>${quote.change}</td>
                <td>${quote.changePercent}</td>
                <td>${quote.high}</td>
                <td>${quote.low}</td>
            </tr>`;
            
            let html2 = `<tr>
                <td>${quote.marketCap}</td>
                <td>${quote.peRatio}</td>
                <td>${quote.week52High}</td>
                <td>${quote.week52Low}</td>
                <td>${(quote.ytdChange * 100).toFixed(2)}%</td>
            </tr>`;
            
            document.querySelector(UISelectors.quoteTbody1).innerHTML = html1;
            document.querySelector(UISelectors.quoteTbody2).innerHTML = html2;
            
            $('#quickQuoteModal').modal('show');
        },
        getStockSelects: function(){
            const stockSymbolSelect = document.querySelector(UISelectors.techCompSelect);
            const stockSymbolSelectValue = stockSymbolSelect.options[stockSymbolSelect.selectedIndex].value;
            const stockName = stockSymbolSelect.options[stockSymbolSelect.selectedIndex].textContent;
            
            const stockTimeFrame = document.querySelector(UISelectors.techTimeFrame);
            const stockTimeFrameValue = stockTimeFrame.options[stockTimeFrame.selectedIndex].value;
            
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
                console.log(!menuToggle.parentElement.parentElement.classList.contains('active'));
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
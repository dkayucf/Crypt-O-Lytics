//================UI CONTROLLER==================
const UICtrl = (function(){
    
    const UISelectors = {
        //Buttons
        drawStockChartBtn: '.drawStockChart',
        drawCurrChartBtn: '.drawCurrChart',
        
        //Inputs
        stockWeightAvg: '#stockWeightAvg',
        
        //Selects
        techCompSelect: '.techCompSelect',
        techTimeFrame: '.techTimeFrame',
        stockChartStyle: '.stockChartStyle',
        cryptoCurrSelect: '.cryptoCurrSelect',
        cryptoTimeFrame: '.cryptoTimeFrame',
        cryptoChartStyle: '.cryptoChartStyle',
        
        //Tables
        
        //Divs
        stockChartCard: '#stockChartCard',
        currChartCard: '#currChartCard'
        
    }
    
    //Public Methods
    return {
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
        resetSelects: () => {
            let selectsArr = Array.from(document.querySelectorAll('select'));
            
            selectsArr.forEach(select =>{
                select.selectedIndex = 0;
            });
            
        }
    }

})();
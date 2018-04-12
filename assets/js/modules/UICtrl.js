//================UI CONTROLLER==================
const UICtrl = (function(){
    
    const UISelectors = {
        //Buttons
        drawStockChartBtn: '.drawStockChart',
        
        
        //Inputs
        
        //Selects
        techCompSelect: '.techCompSelect',
        techTimeFrame: '.techTimeFrame'
        
        
        //Tables
        
        //Divs
        
        
    }
    
    //Public Methods
    return {
        getStockSelects: function(){
            const stockSymbolSelect = document.querySelector(UISelectors.techCompSelect);
            const stockSymbolSelectValue = stockSymbolSelect.options[stockSymbolSelect.selectedIndex].value;
            
            const stockTimeFrame = document.querySelector(UISelectors.techTimeFrame);
            const stockTimeFrameValue = stockTimeFrame.options[stockTimeFrame.selectedIndex].value;
            
            return {
                stockSymbol: stockSymbolSelectValue,
                stockTimeFrame: stockTimeFrameValue
            }
        },
        getSelectors: () => {
            return UISelectors;
        }
    }

})();
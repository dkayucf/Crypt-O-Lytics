
//==============APP CONTROLLER=================
const AppCtrl = (function(ItemCtrl, UICtrl){
    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    const loadEventListeners = ()=>{
        /*----------------INPUT Events-----------------*/
        
        /*----------------CLICK Events-----------------*/
        //Draw Chart Submit Click
        document.querySelector(UISelectors.drawStockChartBtn).addEventListener('click', drawStockChart);
        
        
        /*----------------CHANGE Events-----------------*/
        
    }
    
    const drawStockChart = function(){
        
        const getStockSelects = UICtrl.getStockSelects();
        
        
        const url = `https://api.iextrading.com/1.0/stock/${getStockSelects.stockSymbol}/chart/${getStockSelects.stockTimeFrame}`;
        
        $.ajax({
             url: url,
             method: 'GET'
           }).then(function(response) {
             ItemCtrl.filterStockData();
           });
        
    }
    
    //Public Methods
    return {
        init: () => {
            loadEventListeners();
            
        }
    }

})(ItemCtrl, UICtrl);

AppCtrl.init();
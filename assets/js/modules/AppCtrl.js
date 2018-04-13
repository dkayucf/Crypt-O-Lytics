
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
        document.querySelector(UISelectors.techCompSelect).addEventListener('change', ()=>{
            const getStockSelects = UICtrl.getStockSelects();
            if(getStockSelects.stockSymbol == 'stockWeightAvg'){
                document.querySelector(UISelectors.stockWeightAvg).style.display = 'block';
            }else{
                document.querySelector(UISelectors.stockWeightAvg).style.display = 'none';
            }
            
        });
    }
    
    const drawStockChart = function(){
        
        const getStockSelects = UICtrl.getStockSelects();
        
        const chartStyle = UICtrl.getChartStyle(UISelectors.stockChartStyle);
      
        let url;
            
        if(getStockSelects.stockSymbol == 'stockWeightAvg'){
                url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=nvda,amd,intc,mu,tsm&types=quote,news,chart&range=${getStockSelects.stockTimeFrame}`;
            }else{
                url = `https://api.iextrading.com/1.0/stock/${getStockSelects.stockSymbol}/batch?types=quote,news,chart&range=${getStockSelects.stockTimeFrame}`;
            }
        
            $.ajax({
                 url: url,
                 method: 'GET'
               }).then(function(stockData) {

                document.querySelector(UISelectors.stockChartCard).style.display = 'block';

                ItemCtrl.mapStockData(stockData, chartStyle, getStockSelects);

               });

            UICtrl.resetSelects();     
 
    }
    
    //Public Methods
    return {
        init: () => {
            loadEventListeners();
            
        }
    }

})(ItemCtrl, UICtrl);

AppCtrl.init();
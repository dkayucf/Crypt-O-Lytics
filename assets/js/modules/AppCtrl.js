
//==============APP CONTROLLER=================
const AppCtrl = (function(APICtrl, ItemCtrl, UICtrl){
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
        
        var getStockSelects = UICtrl.getStockSelects();
        console.log(getStockSelects);
    }
    
    //Public Methods
    return {
        init: () => {
            loadEventListeners();
            
        }
    }

})(APICtrl, ItemCtrl, UICtrl);

AppCtrl.init();
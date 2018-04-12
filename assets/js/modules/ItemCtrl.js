//===============ITEM CONTROLLER==================
const ItemCtrl = (function(){

    var trace1 = {
      x: [],
      close: [], 
      decreasing: {line: {color: '#7F7F7F'}}, 
      high: [], 
      increasing: {line: {color: '#17BECF'}}, 
      line: {color: 'rgba(31,119,180,1)'}, 
      low: [], 
      open: [], 
      type: 'candlestick', 
      xaxis: 'x', 
      yaxis: 'y'
    };
    
    //Public Methods
    return {
        filterStockData: function(stockData){
          console.log(stockData);
            let xAxis = stockData.map(function(datum){
                return datum.date;
            });
            
            let closeData = stockData.map(function(datum){
                return datum.close;
            });
            
            let highData = stockData.map(function(datum){
                return datum.high;
            });
            
            let lowData = stockData.map(function(datum){
                return datum.low;
            });
            
            let openData = stockData.map(function(datum){
                return datum.open;
            });
            
            trace1.x = xAxis;
            trace1.close = closeData;
            trace1.high = highData;
            trace1.low = lowData;
            trace1.open = openData;
            console.log(trace1);
        }    
    }

})();
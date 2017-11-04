var apiKey = "42LHI6W5OA6L5CTI";
var ticker;
var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+ ticker + "&interval=1min&apikey=" + apiKey


// top panel div is called #search
// bottom panel is called #results

// response.docs[x].web_url - url
// response.docs[x].headline.main - headline url
// response.docs[x].byline.original - author
// response.docs[x].pub_date - posting date
// response.docs[x].new_desk - 
        $(document).ready(function(){
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
       });
    });
stockSearch();
function stockSearch() {
$("#submit").on("click", function() {
  ticker = $("#companyName").val().trim()
})
};

stockSearch();



$.getJSON('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=FB&outputsize=full&apikey=42LHI6W5OA6L5CTI', function (data) {
    // Create the chart
    console.log(data);
    var convData = parseData(data["Time Series (Daily)"]);
    convData.sort(function(a,b){return a[0] - b[0]});
    Highcharts.stockChart('chartSpot', {




        rangeSelector: {
            selected: 1
        },

        title: {
            text: ticker +  " Stock Price" 
        },

        series: [{
            name: ticker,
            data: convData,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});

function parseData(data){
  var response = [];

  Object.keys(data).forEach(function(key){
    var entry = [];
    var dateConv = moment(key).format("x");
    entry.push(Number.parseFloat(dateConv));
    console.log(dateConv);
    entry.push(Number.parseFloat(data[key]["4. close"]));
    response.push(entry);
    console.log(entry);
  })
  return response;

}

// need to sort array before sending data to high charts - got it
// compact works but full gives error after 200 or so items - got it - SLOW NOW
// even after converting to UNIX date is not working correctly in highcharts. - GOT IT
// seperate API calls for crypto and stocks - need seperate areas.


      	

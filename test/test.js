var width=window.innerWidth;
var height=900;
var CSVData = "";

d3.queue()
    .defer(d3.csv,"/ebola/eboladata.csv")
    .defer(d3.json,"world.json")
    .awaitAll(function(error,dataArray) {
   
        var data = dataArray[0];
        CSVData = dataArray[0];

     data.forEach(function(d) {
            d.Cases = parseFloat(d.Cases);
        });

    var latestData = data.filter(function(d) {
            return d.Time == "2014/10"; }
            )


    var domain = d3.extent(latestData, function(d){
            return d.Cases;}
            );


        var colorScale = d3.scaleLinear().domain(domain).range(["rgb(200,200,150)", "rgb(100,0,0)"]);
           
          

     var countryTopoJSON = dataArray[1];
     
     var geoJSON = topojson.feature(countryTopoJSON, countryTopoJSON.objects.countries);

    
        geoJSON.features =geoJSON.features.filter(function(country) {
            return country.id == "Guinea"|| country.id == "Mali"|| country.id == "Nigeria"|| country.id == "Senegal"
            ||country.id == "Sierra Leone"|| country.id == "Liberia";
    
        });

     
       
    var proj = d3.geoMercator()
            .fitSize([width,height], geoJSON);
     var path = d3.geoPath()
            .projection(proj);

   
    var svg = d3.selectAll("#mymap")
            .attr("width", width + "px")
            .attr("height", height + "px");
            var countries = svg.selectAll("path")
            .data(geoJSON.features)

   //tooltip 
            .on("mouseHERE", function(d) { 
                var mouse = d3.mouse(this);
                d3.select("#tooltip")
                    .style("display", "block")
                    .html("<h1>" + d.Country + 
                            + d.Cases 
                            + d.Deaths,
                            + d.Confirmed
                           )
                 
                    .style("top", mouse[0] - 100 + "px");
            })
            .on("mouseout", function(d) { //hide tooltip
                d3.select("#tooltip")
                    .style("display", "none")
            })
          
       countries.enter().append("path")
            .attr("d", function(d) {
                return path(d); })

       .attr("fill",function(feature) {
                var matches = latestData.filter(function(d){
                   return d.Country == feature.id; });
                   if (matches.length >0) {
                   return colorScale(matches[0].Cases);
              }
               else {
                   return "rgb(135, 38, 38)";
                }
           })

         

        .attr("stroke",function(feature) {
            var matches = latestData.filter(function(d){
               return d.country == feature.id.toLowerCase(); });
           
               if (matches.length >0) {
               return colorScale(matches[0].export);
          }
           else {
               return "rgb(255, 255, 255)";
            }
       });


        var cities = svg.selectAll("mymap").data(points);
            
        cities.enter().append("circle")
            .attr("transform", function(d){
                return "translate(" + proj(d.coords) + ")";
            })
            .attr("r",10)
            .attr("fill","red")
        
           
    });

  
   

    //line chart

function Draw() {
    console.log(CSVData);
   
    var XData = [];
    var YData = [];
    var Guinea_Cases = [];
    var Guinea_Deaths = [];
    var Guinea_Confirmed = [];

    var Liberia_Cases = [];
    var Liberia_Deaths = [];
    var Liberia_Confirmed = [];

    var Mali_Cases = [];
    var Mali_Deaths = [];
    var Mali_Confirmed = [];

    var Nigeria_Cases = [];
    var Nigeria_Deaths = [];
    var Nigeria_Confirmed = [];

    var Senegal_Cases = [];
    var Senegal_Deaths = [];
    var Senegal_Confirmed = [];

    var SierraLeone_Cases = [];
    var SierraLeone_Deaths = [];
    var SierraLeone_Confirmed = [];
    
    for (var i = 0; i < CSVData.length; i++) {
        if (CSVData[i].Time == undefined) {
            continue;
        }




//hide and show

        function hideAndShow() {
            var x = document.getElementById("Guinea_Cases");


            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
          }

          console.log(Guinea_Cases)

          //orignal code
        XData.push(CSVData[i].Time);
        switch (CSVData[i].Country) {
            case "Guinea":
                Guinea_Cases.push(CSVData[i].Cases);
                
                break;
            case "Liberia":
                Liberia_Cases.push(CSVData[i].Cases);
            
              
                break;
            case "Mali":
                Mali_Cases.push(CSVData[i].Cases);
            
               
                break;
            case "Nigeria":
                Nigeria_Cases.push(CSVData[i].Cases);
             
                
                break;
            case "Senegal":
                Senegal_Cases.push(CSVData[i].Cases);
           
           
                break;
            case "Sierra Leone":
                SierraLeone_Cases.push(CSVData[i].Cases);
            
               
                break;
            default:
                break;
        }
    }

    XData = uniq(XData);

    YData = [
        { name: "Guinea_Cases", type: "line", data: Guinea_Cases },
        { name: "Guinea_Deaths", type: "line", data: Guinea_Deaths },
        { name: "Guinea_Confirmed", type: "line", data: Guinea_Confirmed },

        { name: "Liberia_Cases", type: "line", data: Liberia_Cases },
        { name: "Liberia_Deaths", type: "line", data: Liberia_Deaths },
        { name: "Liberia_Confirmed", type: "line", data: Liberia_Confirmed },

        { name: "Mali_Cases", type: "line", data: Mali_Cases },
        { name: "Mali_Deaths", type: "line", data: Mali_Deaths },
        { name: "Mali_Confirmed", type: "line", data: Mali_Confirmed },

        { name: "Nigeria_Cases", type: "line", data: Nigeria_Cases },
        { name: "Nigeria_Deaths", type: "line", data: Nigeria_Deaths },
        { name: "Nigeria_Confirmed", type: "line", data: Nigeria_Confirmed },

        { name: "Senegal_Cases", type: "line", data: Senegal_Cases },
        { name: "Senegal_Deaths", type: "line", data: Senegal_Deaths },
        { name: "Senegal_Confirmed", type: "line", data: Senegal_Confirmed },

        { name: "SierraLeone_Cases", type: "line", data: SierraLeone_Cases },
        { name: "SierraLeone_Deaths", type: "line", data: SierraLeone_Deaths },
        { name: "SierraLeone_Confirmed", type: "line", data: SierraLeone_Confirmed },
    ];


    var chart = echarts.init($("#echart_area")[0]);
   

    option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ["Guinea_Cases", "Guinea_Deaths", "Guinea_Confirmed", "Liberia_Cases", "Liberia_Deaths", "Liberia_Confirmed", "Mali_Cases", "Mali_Deaths", "Mali_Confirmed",
                "Nigeria_Cases", "Nigeria_Deaths", "Nigeria_Confirmed", "Senegal_Cases", "Senegal_Deaths", "Senegal_Confirmed", "SierraLeone_Cases", "SierraLeone_Deaths", "SierraLeone_Confirmed"]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: XData
        },
        yAxis: {
            type: 'value'
        },
        series: YData
    };

    chart.setOption(option);
}

 function uniq(array) {
     var temp = []; 
     for (var i = 0; i < array.length; i++) {
         if (temp.indexOf(array[i]) == -1) {
             temp.push(array[i]);
         }
     }
     return temp;
 }
 $(function () {
     setTimeout(Draw,200)
 });
d3.csv("/ebola/eboladata.csv", function(error, data) {
    console.log("/ebola/eboladata.csv:",data);
});

var width=window.innerWidth;
var height=900;

d3.queue()
    .defer(d3.csv,"/data/csvfile.csv")
    .defer(d3.csv,"/ebola/eboladata.csv")
    .defer(d3.json,"/feb28/world.json")
    .awaitAll(function(error,dataArray) {
   
        var data = dataArray[0];

     data.forEach(function(d) {
            d.export = parseFloat(d.export);
        });

    var latestData = data.filter(function(d) {
            return d.year == "2018"; }
            
            )
    var domain = d3.extent(latestData, function(d){
            return d.export;}
            );


        var colorScale = d3.scaleLinear()
            .domain(domain)
            .range(["rgb(200,200,150)","rgb(100,0,0)"]);

     var vgsales = dataArray[1];
     var countryTopoJSON = dataArray[2];
     
     var geoJSON = topojson.feature(countryTopoJSON, countryTopoJSON.objects.countries);

     console.log(geoJSON);
        geoJSON.features =geoJSON.features.filter(function(country) {
            return country.id != "AQ" && country.id != -99 ;
        });

     

       
    var proj = d3.geoMercator()
            .fitSize([width,height], geoJSON);
     var path = d3.geoPath()
            .projection(proj);


    var svg = d3.selectAll("#mymap")
            .attr("width", width + "px")
            .attr("height", height + "px");
    
    
    
            var countries = svg.selectAll("path")
            .data(geoJSON.features);
          
        countries.enter().append("path")
            .attr("d", function(d) {
                return path(d); })
            .attr("fill",function(feature) {
                var matches = latestData.filter(function(d){
                        return d.country == feature.id.toLowerCase(); });
                
                        if (matches.length >0) {
                    return colorScale(matches[0].export);
                }
                else {
                    return "rgb(200,200,200)";
                }
            });



    
        
            
        var cities = svg.selectAll("circle")
            .data(points);
            
        cities.enter().append("circle")
            .attr("transform", function(d){
                return "translate(" + proj(d.coords) + ")";
            })
            .attr("r",10)
            .attr("fill","red");
    });



var width=window.innerWidth;
var height=900;


 

d3.queue()

    .defer(d3.csv,"/ebola/eboladata.csv")
    .defer(d3.json,"/feb28/world.json")
    .awaitAll(function(error,dataArray) {
   
        var data = dataArray[0];
        console.log(data) 

     data.forEach(function(d) {
            d.Cases = parseFloat(d.Cases);
        });

    var latestData = data.filter(function(d) {
            return d.Time == "2014/10"; }
            )

           

    var domain = d3.extent(latestData, function(d){
            return d.Cases;}
            );
            console.log(latestData)


        var colorScale = d3.scaleLinear()
            .domain(domain)
            .range(["rgb(200,200,150)","rgb(100,0,0)"]);

  
     var countryTopoJSON = dataArray[1];
     
     var geoJSON = topojson.feature(countryTopoJSON, countryTopoJSON.objects.countries);

     
     console.log(geoJSON);
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
            .data(geoJSON.features);
          
       countries.enter().append("path")
            .attr("d", function(d) {
                return path(d); })

       .attr("fill",function(feature) {
                var matches = latestData.filter(function(d){
                   return d.Country == feature.id; });
               console.log(feature)
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


        var cities = svg.selectAll("circle")
            .data(points);
            
        cities.enter().append("circle")
            .attr("transform", function(d){
                return "translate(" + proj(d.coords) + ")";
            })
            .attr("r",10)
            .attr("fill","red");
    });


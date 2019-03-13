d3.json("/feb28/feb28.json",function(error,data){
    console.log("error:",error);
     console.log("json:",data);
    });

    console.log("end of line")

   
d3.json("/feb28/world.json", function(error, data) {
        console.log(data);
      });

      var width = window.innerWidth;
      var height = 700;

d3.queue()
          .defer(d3.csv, "data/csvData.csv")
          .defer(d3.csv, "data/countryNames.csv")
          .defer(d3.json, "../topojson/world.json")
          .awaitAll(function(error, dataArray) {

              var data = dataArray[0];
              data.forEach(function(d) {
                  d.export = parseFloat(d.export);
              });
              var latestData = data.filter(function(d) {
                  return d.year == "2018";
              });
              var domain = d3.extent(latestData, function(d) {
                  return d.export;
              });
              var colorScale = d3.scaleLinear()
                  .domain(domain)
                  .range(["rgb(200, 150, 150)", "rgb(100, 0, 0)"]);

              var names = dataArray[1];
              var countryTopojson = dataArray[2];

              var geoJSON = topojson.feature(countryTopojson, countryTopojson.objects.countries);
              console.log(geoJSON);
              geoJSON.features = geoJSON.features.filter(function(country) {
                  return country.id != "AQ" && country.id != "-99";
              });

              var projection = d3.geoMercator()
                  .fitSize([width, height], geoJSON);

              var path = d3.geoPath()
                  .projection(projection);

              var svg = d3.select("#my-map")
                  .attr("width", width + "px")
                  .attr("height", height + "px");

              var countries = svg.selectAll("path")
                  .data(geoJSON.features);

              countries.enter().append("path")
                  .attr("d", function(feature) {
                      return path(feature);
                  })
                  .attr("fill", function(feature) {
                      var matches = latestData.filter(function(d) {
                          return d.country == feature.id.toLowerCase();
                      });
                      if (matches.length > 0) {
                          return colorScale(matches[0].export);
                      }
                      else {
                          return "rgb(200, 200, 200)";
                      }
                  });

              var points = [
                  {"name": "Boston", "coords": [-71.0589, 42.3601]},
                  {"name": "London", "coords": [-0.1278, 51.5074]},
                  {"name": "Cape Town", "coords": [18.424055, -33.924870]}
              ];

              var cities = svg.selectAll("circle")
                  .data(points);

              cities.enter().append("circle")
                  .attr("transform", function(d) {
                      return "translate(" + projection(d.coords) + ")";
                  })
                  .attr("r", 10)
                  .attr("fill", "cornflowerblue");

          });

  
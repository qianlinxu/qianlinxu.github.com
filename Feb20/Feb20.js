console.log("Welcome to data land");


d3.csv("/data/csvfile.csv", function(error, data) {
    console.log("Feb20.csv:",data);
});
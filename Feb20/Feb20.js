console.log("Welcome");

d3.csv("/data/csvfile.csv", function(error, data) {
    console.log("Feb20/Feb20.csv:",data);
});

d3.csv("Feb20/Feb20.csv", function(error, data) {
    data.forEach(function(d) {
        d.export = parseFloat(d.export);
    });
    console.log("csv:", data);
});

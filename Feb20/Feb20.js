console.log("Welcome");

d3.csv("/Feb20/Feb20.csv", function(error, data) {
    console.log("csv:",data);
});

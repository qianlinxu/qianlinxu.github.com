console.log("Welcome to data land");

d3.text("/data/text.txt",function(error,data)
{console.log("error:",error);
console.log("text:",data);
});

d3.csv("/data/csvfile.csv", function(error, data) {
    console.log("data/csvfile.csv:",data);
});

d3.json("/data/jsdata.json",function(error,data){
console.log("error:",error);
 console.log("json:",data);
});

console.log("end of line")
console.log("hello");

var title= d3.select("#title");

title
.style("color","red")
.style("font-family","comic sans ms")

var dataset=[50,43,89,100,150,167];
console.log(dataset);
var height=200
var width=400
var svg=d3.select("#svg").append("svg").attr("height",height).attr("width",width);
var padding={top:20,left:20,right:20,bottom:20};
var rectStep=35;
var rectWidth=20;

function Data(){
var rectPosition= svg.selectAll("rect").data(dataset).enter().append("rect").attr("fill","rgb(255, 153, 255)")
.attr("x",(d,i)=>padding.left+i*rectStep)
.attr("y",(d,i)=>height-padding.bottom-d)
.attr("width",rectWidth)
.attr("height",d=>d);
} 

function Text(){
    var text=svg.selectAll("text").data(dataset)

    text.enter().append("text").attr("fill","black")
    .attr("font-size","14px")
    .attr("x",(d,i)=>padding.left+i*rectStep)
    .attr("y",(d,i)=>height-padding.bottom-d)
    .attr("width",rectWidth)
    .attr("height",d=>d);

    text

    text.exit()
}




//Update

var dataset2 = [10,43,20,3,150,167,200];
function updateData() {
var DataUpdate=svg.selectAll("rect").data(dataset2).attr("fill","rgb(204, 153, 255)")
.attr("x",(d,i)=>padding.left+i*rectStep)
.attr("y",(d,i)=>height-padding.bottom-d)
.attr("width",rectWidth)
.attr("height",d=>d);

} ;


var dataset3 = [10,43,20,3,167];
function updateData2() {
var DataUpdate=svg.selectAll("rect").data(dataset3)
.attr("fill","rgb(255, 153, 179)")
.exit().remove().enter()
.attr("x",(d,i)=>padding.left+i*rectStep)
.attr("y",(d,i)=>height-padding.bottom-d)
.attr("width",rectWidth)
.attr("height",d=>d);

} ;


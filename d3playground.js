console.log("hell0");

var title= d3.select("#title");

title
.attr("class","big")
.style("color","red")
.style("font-family","comic sans ms")

d3.selectAll(".big")

function changecolor(color)
{d3.selectAll(".dot").attr("fill",color);
}

var svg=d3.select("svg");


function dance(){ circles.attr("cx",function()
{return Math.random()*200; } ) ;
}

var starterData=[
    {name:"Dave", height:72},
    {name:"Lin",height:50},
    {name:"Mary",height:10},
    {name:"Mike",height:90}
];

function radius(){

    var newcircles = svg.selectAll(".dot").data(starterData);
  
    newcircles.enter().append("circle")
    .attr("class","dot")
    .attr("cx",function(){return Math.random()*200;
    })
    .attr("cy",50)
    .attr("r",20);

    newcircles.attr("r",function(d){return d.height;
    });

}

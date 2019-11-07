var WIDTH = window.innerWidth / 2
var HEIGHT = window.innerHeight

var translate = 'translate(' + (WIDTH / 2) + ',' + (HEIGHT / 2) + ')'

var svg = d3.select("#sticky").append("svg")
	.attr('width', WIDTH)
	.attr('height', HEIGHT)

var currentScrollTop = d3.select('#currentScrollTop')

var panel = 0
    
var grid = 10
var columns = 20
var padding = 30
var mt = window.innerWidth/6
var ml = window.innerHeight/3
var groups = ["l","a","i"]
var groupLabels = {
    l:"Liberal",
    a:"Ambivalent",
    i:"Illiberal"
}
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function setup(){
    console.log("setup")
    var data = {
        l:{total:300,b:218,w:82,l:{b:190,w:37,t:217},a:{b:28,w:37,t:65},i:{b:0,w:8,t:8}},
        a:{total:136,b:28,w:108,l:{b:22,w:37,t:59},a:{b:6,w:52,t:58},i:{b:0,w:19,t:19}},
        i:{total:51,b:1,w:50,l:{b:1,w:10,t:11},a:{b:0,w:28,t:27},i:{b:0,w:12,t:12}}
    }
    var friendships = [
        {self:"l",friend:"l",race:"b",count:190},
        {self:"l",friend:"a",race:"b",count:28},
        {self:"l",friend:"i",race:"b",count:0},
        {self:"l",friend:"l",race:"w",count:37},
        {self:"l",friend:"a",race:"w",count:37},
        {self:"l",friend:"i",race:"w",count:8},
        
        {self:"a",friend:"l",race:"b",count:22},
        {self:"a",friend:"a",race:"b",count:6},
        {self:"a",friend:"i",race:"b",count:0},
        {self:"a",friend:"l",race:"w",count:37},
        {self:"a",friend:"a",race:"w",count:52},
        {self:"a",friend:"i",race:"w",count:19},
        
        {self:"i",friend:"l",race:"b",count:1},
        {self:"i",friend:"a",race:"b",count:0},
        {self:"i",friend:"i",race:"b",count:0},
        {self:"i",friend:"l",race:"w",count:10},
        {self:"i",friend:"a",race:"w",count:28},
        {self:"i",friend:"i",race:"w",count:12}
    ]
    
    var dotData = []
    
    for(var f in friendships){
        for(var c =0; c<friendships[f]["count"]; c++){
            dotData.push(friendships[f])
        }
    }
    //console.log(dotData)
    
    var tb = 247
    var tw = 240
 
    dotData = shuffle(dotData)
    
    svg.selectAll(".dot")
        .data(dotData)
        .enter()
        .append("circle")
        .attr("cx",function(d,i){
            return i%columns*grid
        })
        .attr("cy",0)
        .attr("r",0)
        .attr("class","dot")
        .attr("transform","translate("+mt+","+ml+")")
        
        
    
    svg.selectAll("text")
        .data(groups)
        .enter()
        .append("text")
        .attr("class",function(d,i){
            return "animationText text_"+d
        })
        .text(function(d,i){return ""})
        .attr("x",function(d,i){return i*columns*grid})
        .attr("y",function(d,i){return mt})
    
}
setup()


function start(){
    console.log("start")
    d3.selectAll(".dot")
    .each(function(d,i){
        d3.select(this).transition().delay(i)
        .attr("cx",function(){
            return i%columns*grid
        })
        .attr("cy",function(){
            return Math.floor(i/columns)*grid
            
        })
        .attr("r",grid/3)
        .attr("class",function(){
            return "s_"+d.self+" f_"+d.friend+" r_"+d.race+" dot"
        })
        .attr("transform","translate("+mt+","+ml+")")
        .attr("opacity",1)
    }) 
    d3.selectAll(".animationText").text("")
    d3.select(".text_l").text("487 Residents").attr("x",window.innerWidth/6).attr("y",window.innerHeight/3-10)
}
start()

function types(){
    
    var columns = 10
    var offset = (columns+1)*grid
    d3.selectAll(".animationText").text("")
    
    for(var g in groups){
        d3.selectAll(".s_"+groups[g])
        .each(function(d,i){
            d3.select(this).transition().delay(i)
            .attr("cx",function(){
                return i%columns*grid
            })
            .attr("cy",function(){
                return Math.floor(i/columns)*grid
            })
            .attr("transform","translate("+(offset*(parseInt(g)+1))+","+mt+")")
        })
        d3.select(".text_"+groups[g])
        .text(groupLabels[groups[g]]+ " "
        + d3.selectAll(".s_"+groups[g]).size()
        +" "
        + Math.round((d3.selectAll(".s_"+groups[g]).size()/d3.selectAll(".dot").size())*100)+"%"
        )
        .transition()
        .attr("x",columns*grid+(offset*(parseInt(g))+10))
        .attr("y",mt-10)
        //.attr("transform","translate("+(offset*(parseInt(g))+10)+","+(mt-10)+")")
    }   
}

function erasure(){
    console.log("erasure")    
    d3.selectAll(".r_b")
    .each(function(d,i){
        d3.select(this)
        .transition()
        .delay(i*5)
        .ease(d3.easeBounce) 
        .duration(1000)
        .attr("cy",window.innerHeight+3)        
    })
    d3.selectAll(".animationText").text("")
    for(var g in groups){
        d3.selectAll(".text_"+groups[g])
        .text(groupLabels[groups[g]]+ " "
        + d3.selectAll(".r_w").filter(".s_"+groups[g]).size()
        +" "
        + Math.round(d3.selectAll(".r_w").filter(".s_"+groups[g]).size()/d3.selectAll(".r_w").size()*100)+"%"
        )
    }
}
function friendships(){
    console.log("friendships")
    var columns = 10
    d3.selectAll(".text_"+groups[g])
    for(var g in groups){
        d3.selectAll(".text_"+groups[g])
        .text(groupLabels[groups[g]]+ " "+ d3.selectAll(".r_w").filter(".s_"+groups[g]).size()
        +" "
        + Math.round(d3.selectAll(".r_w").filter(".s_"+groups[g]).size()/d3.selectAll(".r_w").size()*100)+"%"
        )
        .attr("y",columns*grid-50)
        
        
        for(var g2 in groups){   
            var totalSize = d3.selectAll(".r_w").filter(".s_"+groups[g]).size()
            var groupSize = d3.selectAll(".r_w").filter(".s_"+groups[g]).filter(".f_"+groups[g2]).size()
            svg//.selectAll(".animationText")
            .append("text")
            .text(groupLabels[groups[g]].slice(0,3)+"-"+groupLabels[groups[g2]].slice(0,3)
            +" "
            +d3.selectAll(".r_w").filter(".s_"+groups[g]).filter(".f_"+groups[g2]).size()
            +" "
            +Math.round(groupSize/totalSize*100)+"%"
            )
            .attr("class","animationText "+groups[g]+"_"+groups[g2])
            .attr("x",(parseInt(g)+1)*(columns+1)*grid)
            .attr("y",(parseInt(g2)+1)*(columns+1)*grid-10)
                     
            d3.selectAll(".r_w")
            .filter(".s_"+groups[g])
            .filter(".f_"+groups[g2])
            .each(function(d,i){
                d3.select(this)
                .transition()
                .delay(i*5)
                .attr("cx",function(){
                    return i%columns*grid
                })
                .attr("cy",function(){
                    return Math.floor(i/columns)*grid
                })
                .attr("transform","translate("+(parseInt(g)+1)*(columns+1)*grid+","+(parseInt(g2)+1)*(columns+1)*grid+")")
            })            
        }
    }
}
function overselection(){
    console.log("overselection")
    
    for(var g in groups){
        d3.selectAll(".text_"+groups[g]).attr("fill","red")
        for(var g2 in groups){
            if(g2==g){
                d3.selectAll("."+groups[g]+"_"+groups[g2]).attr("fill","red")
            }
        }
        
        svg.append("text")
        .attr("class","animationText")
        .text(
            
        )
    }
    
    
    
    
}
function homophily(){
    console.log("homophily")
}


var panels =[start,types,erasure,friendships,overselection,homophily]



var body = d3.select('body').node()
var container = d3.select('#container')
var content = d3.select('#content')

var SCROLL_LENGTH = content.node().getBoundingClientRect().height - HEIGHT


var scrollTop = 0
var newScrollTop = 0

	container
	.on("scroll.scroller", function() {
  	newScrollTop = container.node().scrollTop
    });

var setDimensions = function() {
    WIDTH = window.innerWidth / 2
    HEIGHT = window.innerHeight
    SCROLL_LENGTH = content.node().getBoundingClientRect().height - HEIGHT
  
}

var render = function() {
  if (scrollTop !== newScrollTop) {
    scrollTop = newScrollTop
      var panelSize = window.innerHeight
      var panelNumber = Math.round(scrollTop/panelSize)
      if(panel!=panelNumber){
          console.log(panelNumber)
          panel = panelNumber
          panels[panel]()
      }
    currentScrollTop.text(scrollTop)
  }
  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)
window.onresize = setDimensions
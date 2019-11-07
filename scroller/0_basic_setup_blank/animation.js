var currentScrollTop = d3.select('#currentScrollTop')
var panel = 0    
var mt = window.innerWidth/6
var ml = window.innerHeight/3

//here are all the steps we will trigger, right now they just log out their own names to show it is working
//you will the writing your d3 visualization and animation code here for each step
step0()//we trigger step 0 by calling function step0() on loading and will use this as our setup step

function step0(){
    console.log("do step0")
}

function step1(){
    console.log("do step1")
}

function step2(){
    console.log("do step2")    
}
function step3(){
    console.log("do step3")
}
function step4(){
    console.log("do step4")
}
function step5(){
    console.log("do step5")
}

var scrollTop = 0
var newScrollTop = 0

//here we list all the functions we have above, but just the names without the parenthesis so we don't trigger the functions now
var listOfStepFunctions =[step0,step1,step2,step3,step4,step5]


//whenever the container scrolls, we need to get how far it has scrolled and save it to the variable newScrollTop
d3.select('#container')
.on("scroll.scroller", function() {
    newScrollTop = d3.select('#container').node().scrollTop
});


//the render function ties everything together
function render(){
var panelSize = window.innerHeight//each panel is the size of the window height
    
  if (scrollTop !== newScrollTop) {//if the scroller has moved
      
      if(scrollTop<newScrollTop){//if the new value is smaller, then it is scrolling down
          scrollTop = newScrollTop//set the scroller place to its new placement
          //console.log("down")//if it is going down, we need to add 1 to the panel number because we want to trigger the next panel
          var panelNumber = Math.round(scrollTop/panelSize)+1//therefore which panel we are on is the scroller's place divided by panel height
      }else{
          //console.log("up")
          scrollTop = newScrollTop//set the scroller place to its new placement
          var panelNumber = Math.round(scrollTop/panelSize)//therefore which panel we are on is the scroller's place divided by panel height
      }
      
      if(panel!=panelNumber){//if this panel number has changed
          panel = panelNumber//set the panel number to this new number so we can keep track
          listOfStepFunctions[panel]()//do the function that is associated with that panel number, we add the () to the end of the name to trigger the function
      }
    currentScrollTop.text(scrollTop)
  }
  window.requestAnimationFrame(render)//we continue to call this function recursively because we always need to check where the scroller is
}

window.requestAnimationFrame(render)


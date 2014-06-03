// First lets create our drawing surface out of existing SVG element
// If you want to create new surface just provide dimensions
// like s = Snap(800, 600);
function init(){
	var s = Snap.select("#svg");
	var printmessage = function(string){
		console.log(string);
	};
	var bg = s.rect(0,0,400,400);
	bg.attr({fill:'#ddd'});
	/*
	bigCircle.drag();
	var mediumCircle = s.circle(100,150,75);
	mediumCircle.attr({
		fill: 'yellow',
		stroke: 'brown',
		strokeWidth: 4
	});
	var message = "HELLO WORLD!"
	var t1 = s.text(50,50,"CHEESE!!!");
	t1.attr({text: message});
	t1.attr({textpath: "M10,10L100,100"});
	var g = s.group(mediumCircle,bigCircle);
	Snap.animate(0,200, function(val){
		bigCircle.attr({radius:val});
	}, 10000);
	//mediumCircle.drag();
*/
	var colours = [ "#DFFFBE",
					"#118EE8",
					"#FF1FAD",
					"#E8D5A4",
					"#12FF52",
					"#ff5000",
					"#000000"
	]

	var numberOfSides 	= colours.length,
		size			= 30,
		Xcentre			= (s.getBBox().width)/2,
		Ycentre			= (s.getBBox().height)/2


console.log(Xcentre);
	var bigCircle = s.circle(Xcentre,Ycentre,(size*2));
	bigCircle.attr({
		fill: 'red',
		stroke: 'white',
		strokeWidth: 4
	})
	bigCircle.click(function(){
		printmessage(this.node.r.baseVal.value);
	});
		var dotgroup = [];
		var papergroup = s.g();

	for (var i=0;i<=numberOfSides-1;i+=1){
		dotgroup.push(i);
		newpointX = Xcentre + size*3 * Math.cos(i * 2 * Math.PI / numberOfSides)
		newpointY = Ycentre + size*3 * Math.sin(i * 2 * Math.PI / numberOfSides)
		dotgroup[i] = s.circle(newpointX,newpointY,size);
		dotgroup[i].id = i;
		dotgroup[i].attr({ fill:colours[i]});
		dotgroup[i].click(function(elem){
			//var this = dotgroup[i];
			//console.log(elem);
			var thisx = elem.target.cx.baseVal.value;
			var thisy = elem.target.cy.baseVal.value;
			var thisid = this.id;
			printmessage("x: " + thisx + " y: " + thisy + " ID: " + thisid);
		})
		papergroup.add(dotgroup[i]);
		//console.log(dotgroup[i]);
	}
	papergroup.animate({transform:'r360,Xcentre,Ycentre'},2000,mina.easeinout);
	papergroup.drag();




}
window.onload = init;
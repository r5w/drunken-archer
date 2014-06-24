/*jslint browser: true */
/*global  $, jQuery,Snap, console, mina, alert */
// First lets create our drawing surface out of existing SVG element
// If you want to create new surface just provide dimensions
// like s = Snap(800, 600);
function init(w, h) {
	"use strict";
	var s = Snap.select("#svg"),
		printmessage = function (string) {
			console.log(string);
		},
		howWide = w,
		howHigh = h,
		bg = s.rect(0, 0, howWide, howHigh),
		cursor,
		cursorg,
		i,
/*		colours = [
			"#111111", //blue
			"#556270", //rose
			"#4ECDC4", //bronze
			"#C7F464", //pale grey
			"#FF6B6B", //dark grey
			"#C44D58", //black
			"#EB6841"  //cream
		],
*/
		colours = [
			//"#758b98", // sky blue
			"#6a8798", //blue
			"#9c2b27", //rose
			"#4c3d2a", //bronze
			"#a1a29d", //pewter
			"#393937", //charcoal
			"#1c1c1a", //black
			"#dcceab"  //cream
		],
		numberOfSides = colours.length,
		size = howWide / 13.333,
		Xcentre = float2int( (bg.getBBox().width) / 2 ),
		Ycentre = float2int( (bg.getBBox().height) / 2 ),
		bigCircle,
		dotgroup,
		newpointX,
		newpointY,
		newPointArr,
		papergroup;
	//bg = s.rect(0, 0, 400, 400);
	bg.attr({fill: '#fff'});
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
	console.log(Xcentre);
	bigCircle = s.circle(Xcentre, Ycentre, (size * 4.5));
	cursor = s.circle(Xcentre + size * 3, Ycentre, (size / 2));
	bigCircle.attr({
		fill: '#fff',
		stroke: '#eee',
		strokeWidth: 2
	});
	
	cursor.attr({
		fill: '#0f0',
		stroke: '#333',
		strokeWidth: 20
	});	
	//cursor.attr({cx:180,cy:180});
	bigCircle.click(function () {
		printmessage(this.node.r.baseVal.value);
	});



    cursorg = s.g( bigCircle, cursor);	
	dotgroup = [];
	newPointArr = [];
	papergroup = s.g();

	function float2int (value) {
		return value | 0;
	}
	function setCursorPoint(x,y) {
		//currentx = cursorg.cx;
		//currenty = cursorg.cy;
		//cursor.attr({cx:x,cy:y});
		//cursorg.attr({cx:x,cy:y});
		cursorg.animate({transform: 'r360, x, y'}, 500, mina.easeinout);
	}
	function dotclickhandle(e, thing) {
		return function (thing) {
			//var data = e.data;
			//alert(e.data);

			console.log(thing.target.cx.baseVal.value);
			console.log(e + "x:" + dotgroup[e].thisx + "y:" + dotgroup[e].thisy);
			//console.log("cursor"+c);
			setCursorPoint(dotgroup[e].thisx,dotgroup[e].thisy);
			//	var thisx = elem.target.cx.baseVal.value;
			//	var thisy = elem.target.cy.baseVal.value;
			//	var thisid = this.id;
			//	printmessage("x: " + thisx + " y: " + thisy + " ID: " + thisid);
		};
	}
	function distanceAround(numberOfSidesval,Xcentreval,Ycentreval,diameter,degree) {

		var result,magicvalue;
		result = [];
		magicvalue = 3;
		//x = Xcentreval  ;
		//console.log("x:"+x);
		//x = Xcentreval + (diameter/2) ;
		//x = Xcentreval + diameter * magicvalue;
		//y = Ycentreval ;
		//console.log("y:"+y);
		//y = Ycentreval + (diameter/2) ;
		//y = Ycentreval + diameter * magicvalue;

		//result.x =  Math.cos(degree * 2 * Math.PI / numberOfSidesval) * Xcentreval * 3 ;
		//result.y =  Math.sin(degree * 2 * Math.PI / numberOfSidesval) * Ycentreval * 3 ;
		result.x = Xcentreval + diameter * magicvalue * Math.cos(degree * 2 * Math.PI / numberOfSidesval);
		result.y = Ycentreval + diameter * magicvalue * Math.sin(degree * 2 * Math.PI / numberOfSidesval);		
		console.log(result);
		return result;
	}
	for (i = 0; i <= numberOfSides - 1; i += 1) {
		dotgroup.push(i);
		//newpointX = Xcentre + size * 3 * Math.cos(i * 2 * Math.PI / numberOfSides);
		//newpointY = Ycentre + size * 3 * Math.sin(i * 2 * Math.PI / numberOfSides);
		//console.log(Xcentre);
		//console.log(Ycentre);

		newPointArr = distanceAround(numberOfSides,Xcentre,Ycentre,size,i);
		newpointX = newPointArr.x;
		//console.log(newPointArr);
		newpointY = newPointArr.y;
		dotgroup[i] = s.circle(newpointX, newpointY, size);
		dotgroup[i].id = i;
		dotgroup[i].attr({ fill: colours[i]});
		dotgroup[i].thisx =newpointX
		dotgroup[i].thisy =newpointY
		/*
		dotgroup[i].click(function(elem){
			//var this = dotgroup[i];
			//console.log(elem);
			//var thisx = elem.target.cx.baseVal.value;
			//var thisy = elem.target.cy.baseVal.value;
			//var thisid = this.id;
			//printmessage("x: " + thisx + " y: " + thisy + " ID: " + thisid);
		})
*/
		dotgroup[i].click(dotclickhandle(dotgroup[i].id,cursor));
		papergroup.add(dotgroup[i]);
		//console.log(dotgroup[i]);
	}
	papergroup.animate({transform: 'r360, Xcentre, Ycentre'}, 2000, mina.easeinout);
	papergroup.drag();
}
//window.onload = init;
jQuery(document).ready(function ($) {
    "use strict";
    var svgsize = $('#svg').width();
    //console.log(svgsize);
    init(svgsize, svgsize);
});
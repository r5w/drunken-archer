// First lets create our drawing surface out of existing SVG element
// If you want to create new surface just provide dimensions
// like s = Snap(800, 600);
function init(){
	var s = Snap("#svg");
	var bigCircle = s.circle(150,150,100);
	bigCircle.attr({
		fill: 'red',
		stroke: 'white',
		strokeWidth: 4
	})
	bigCircle.drag();
	var mediumCircle = s.circle(400,150,75);
	mediumCircle.attr({
		fill: 'yellow',
		stroke: 'brown',
		strokeWidth: 4
	})
	mediumCircle.drag();
}
window.onload = init;
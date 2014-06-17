#drunken-archer

###Playing with svg js libraries

- Now added a clickable demo. This was made using snapsvg (http://snapsvg.io). 
- The height of the svg element determines the size of demo screen size.


- Addressed issue of svg height and width. simply created a rect svg element inside the svg, and used jquery to get width and height attributes of the actual svg element, then told the Snap object to make that new rect with same height and width of the svg element.
 
####Issue/things to address
- assign a click event handler to each object so that a message can be console logged when clicked.


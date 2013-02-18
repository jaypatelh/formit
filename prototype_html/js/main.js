var draw = d3.select('#main').append("svg:svg");

var drag = d3.behavior.drag()
						.on('drag', circledragmove)
						.on('dragstart', circledragstart)
						.on('dragend', circledragend);

draw.on('dblclick', function(){
	var svg = d3.select(this);
	var p = d3.svg.mouse(this);
	svg.append('svg:circle')
		.attr('r', 1)
		.attr('cx', p[0])
		.attr('cy', p[1])
		.attr('class', 'dancer')
		.call(drag)
		.transition()
			.attr('r', 25)
			.duration(300);
});

function circledragstart(d){
	d3.select(this)
		.attr('r', 30);
}

function circledragend(d){
	d3.select(this)
		.attr('r', 25);
}

function circledragmove(d) {
	var p = d3.svg.mouse(this);
  d3.select(this)
      .attr("cx", p[0])
      .attr("cy", p[1]);
}
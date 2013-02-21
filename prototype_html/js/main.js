colors = d3.scale.category10();

var svg = d3.select('#main').append("svg:svg")
	.attr('height', 550);

var drag = d3.behavior.drag()
						.on('drag', circledragmove)
						.on('dragstart', circledragstart)
						.on('dragend', circledragend);

svg.on('click', function(){
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
		.attr('r', 40);
}

function circledragend(d){
	d3.select(this)
		.attr('r', 25);
}

function circledragmove(d) {
	console.log(d3.event)
  d3.select(this)
      .attr("cx", d3.event.x)
      .attr("cy", d3.event.y);
}
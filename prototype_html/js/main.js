window.formation = {
	circles: new Array(),
	dragging: false,

	init: function(){
		var svg = d3.select('#main').append("svg:svg")
			.attr('height', 550);
		var drag = d3.behavior.drag()
								.on('drag', circledragmove)
								.on('dragstart', circledragstart)
								.on('dragend', circledragend);
		var obj = this;
		svg.on('click', function(){
			console.log(obj.dragging);
			if(!obj.dragging){
				var svg = d3.select(this);
				var p = d3.svg.mouse(this);
				var dancer = new Dancer(p[0], p[1]);
				obj.circles.push(dancer);
				svg.selectAll('circle').data(obj.circles)
					.enter().append('svg:circle')
					.attr('r', 1)
					.attr('cx', function(d){ return d.x })
					.attr('cy', function(d){ return d.y})
					.attr('class', function(d){ return d.class})
					.call(drag)
					.on('click', function(){
						d3.event.stopPropagation();
					})
					.transition()
						.attr('r', function(d){ return d.r})
						.duration(300);
			}
		});

		function circledragstart(d){
			this.dragging = true;
			d.toggleSelected()
			d3.select(this)
				.transition()
				.duration(300)
				.attr('class', function(d){ return d.class})
				.attr('r', 40);
		}

		function circledragend(d){
			var obj = this;
			d.toggleSelected()
			d3.select(this)
				.transition()
				.duration(300)
				.attr('class', function(d){ return d.class})
				.attr('r', 25)
				.each('end', function(){ obj.dragging = false;});
		}

		function circledragmove(d) {
			d.x = d3.event.x
			d.y = d3.event.y
		  d3.select(this)
		      .attr("cx", d3.event.x)
		      .attr("cy", d3.event.y);
		}
	},
	nameSelected: function(name){
		//TODO
	},

	colorSelected: function(i){
		//TODO
	},
}

function Dancer(x,y){
	this.x = x;
	this.y = y;
	this.class = 'dancer';
	this.r = 25;
	return this;
}

Dancer.prototype.toggleSelected = function(){
	if(this.class === 'dancer') this.class = 'selected_dancer';
	else this.class = 'dancer';
}

formation.init();
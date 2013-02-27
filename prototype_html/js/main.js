NORMAL_RADIUS = 30;
DRAGGING_RADIUS = 50;

colors = d3.scale.category10();
window.formation = {
	circles: new Array(),
	dragging: false,
	d_id: 0,

	

	svg: d3.select('#main').append("svg:svg").attr('height', 550),

	init: function(){
		var obj = this;
		this.svg.on('click', function(){
			obj.deselectAll();
		})
	},

	renderCircles: function(){
		this.svg.selectAll('g').data(this.circles, function(d){ return d.d_id})
				.select('circle')
				.attr('class', function(d){ return d.class })
				.style('fill', function(d){ return d.fillColor})
	},

	deselectAll: function(){
		for(var i = 0; i < this.circles.length; i++){
			this.circles[i].class ='dancer';
		}
		this.renderCircles();
	},

	nameSelected: function(name){
		var drag = d3.behavior.drag()
								.on('drag', circledragmove)
								.on('dragstart', circledragstart)
								.on('dragend', circledragend);
		var obj = this;

		function handleDancerClick(d){
			console.log("clicked")
			obj.deselectAll();
			d.toggleSelected();
			d3.select(this).select('circle').attr('class', function(d){ return d.class });
			d3.event.stopPropagation();		
		}

		function circledragstart(d){
			this.dragging = true;
			d3.select(this).select('circle')
				.transition()
				.duration(400)
				.attr('class', function(d){ return d.class})
				.attr('r', DRAGGING_RADIUS);
		}

		function circledragend(d){
			d3.select(this).select('circle')
				.transition()
				.duration(200)
				.attr('class', function(d){ return d.class})
				.attr('r', NORMAL_RADIUS)
				.each('end', function(){ this.dragging = false;});
		}

		function circledragmove(d) {
			d.x = d3.event.x
			d.y = d3.event.y
		  d3.select(this)
		  	.attr('transform', function(d){ return 'translate(' + [d.x,d.y]+ ')'});
		}
		
		var dancer = new Dancer(this.d_id, 50, 50, name);
		this.d_id++;
		this.circles.push(dancer);
		this.svg.selectAll('g').data(this.circles, function(d){ return d.d_id})
			.enter().append('svg:g')
				.attr('transform', function(d){ return 'translate(' + [d.x,d.y]+ ')'})
				.call(drag)
					.append('svg:circle')
					.attr('r', 1)
					.attr('class', function(d){ return d.class })
					.style('fill', function(d){ return d.fillColor})
					.on('click', handleDancerClick)
					.transition()
						.attr('r', function(d){ return d.r})
						.duration(300);
		this.svg.selectAll('g').append('svg:text')
			.text(function(d){ return d.dancer_name})
			.attr('text-anchor', 'middle');
	},

	colorSelected: function(color){
		console.log(parseInt(color));
		for(var i = 0; i<this.circles.length; i++){
			if(this.circles[i].class === 'selected_dancer') this.circles[i].fillColor = colors(parseInt(color));
			this.svg.selectAll('circle').data(this.circles)
				.style('fill', function(d){ console.log(d.fillColor);return d.fillColor});
		}
	},
	removeSelected: function(){
		this.circles = this.circles.filter(function(e){ return e.class != 'selected_dancer'});
		this.svg.selectAll('g').data(this.circles, function(d){ return d.d_id})
			.exit().transition()
			.duration(300)
			.style('opacity', 0)
			.remove();
	}
}

function Dancer(d_id,x,y,name){
	this.d_id = d_id;
	this.x = x;
	this.y = y;
	this.class = 'dancer';
	this.r = NORMAL_RADIUS;
	this.fillColor = 'white';
	this.dancer_name = name;
	return this;
}

Dancer.prototype.setSelected = function(){
	this.class = 'selected_dancer';
}

Dancer.prototype.toggleSelected = function(){
	if(this.class === 'dancer') this.class = 'selected_dancer';
	else this.class = 'dancer';
}

$(function(){
	$('#delete').on('click', function(){
		formation.removeSelected();
	});
});

formation.init();
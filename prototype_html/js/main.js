NORMAL_RADIUS = 30;
DRAGGING_RADIUS = 50;

colors = d3.scale.category10();
window.dance = {
	formations: new Array(),
	circles: new Array(),
	dragging: false,
	d_id: 0,
	f_id: 0,

	svg: d3.select('#main').insert("svg:svg").attr('height', 550),

	init: function(){
		var obj = this;
		this.svg.on('click', function(){
			obj.deselectAll();
		});
		this.formations.push(this.circles);
	},

	previousFormation: function(){
		if(this.f_id === 0) console.log("reached end");
		else this.f_id -= 1;
		this.circles = this.formations[this.f_id];
	},

	nextFormation: function(){
		if(this.f_id === this.formations.length - 1) this.addNewFormation();
		this.f_id += 1;
		this.circles = this.formations[this.f_id];
	},

	addNewFormation: function(){
		var newFormation = _.map(this.circles, function(d){ var o = new Object(); return _.extend(o, d);})
		this.formations.push(newFormation);
	},

	renderCircles: function(){
		this.svg.selectAll('g').data(this.circles, function(d){ return d.d_id})
				.select('circle')
				.attr('class', function(d){ return d.class })
				.style('fill', function(d){ return d.fillColor})
	},

	deselectAll: function(){
		_.each(this.circles, function(d){ d.class = 'dancer';});
		this.renderCircles();
	},

	nameSelected: function(name){
		var drag = d3.behavior.drag()
								.on('drag', circledragmove)
								.on('dragstart', circledragstart)
								.on('dragend', circledragend);
		var obj = this;

		function handleDancerClick(d){
			obj.deselectAll();
			obj.toggleSelected(d);
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
		
		var dancer = this.createDancer(this.d_id, 50, 50, name);
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
		_.each(this.circles, function(e){ if(e.class === 'selected_dancer') e.fillColor=colors(parseInt(color))});
		this.svg.selectAll('circle').data(this.circles)
			.style('fill', function(d){ console.log(d.fillColor);return d.fillColor});
	},
	removeSelected: function(){
		this.circles = this.circles.filter(function(e){ return e.class != 'selected_dancer'});
		this.svg.selectAll('g').data(this.circles, function(d){ return d.d_id})
			.exit().transition()
			.duration(300)
			.style('opacity', 0)
			.remove();
	},

	toggleSelected: function(dancer){
		if(dancer.class === 'dancer') dancer.class = 'selected_dancer';
		else dancer.class = 'dancer';
	},
	createDancer: function(d_id,x,y,name){
		obj = {}
		obj.d_id = d_id;
		obj.x = x;
		obj.y = y;
		obj.class = 'dancer';
		obj.r = NORMAL_RADIUS;
		obj.fillColor = 'white';
		obj.dancer_name = name;
		return obj;
	}
}


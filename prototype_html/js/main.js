window.formation = {
	circles: new Array(),
	dragging: false,
	d_id: 0,
	svg: d3.select('#main').append("svg:svg").attr('height', 550),

	init: function(){
		var drag = d3.behavior.drag()
								.on('drag', circledragmove)
								.on('dragstart', circledragstart)
								.on('dragend', circledragend);
		var obj = this;
		this.svg.on('click', function(){
			if(!obj.dragging){
				var svg = d3.select(this);
				var p = d3.svg.mouse(this);
				var dancer = new Dancer(obj.d_id,p[0], p[1]);
				obj.d_id++;
				obj.circles.push(dancer);
				svg.selectAll('circle').data(obj.circles, function(d){ return d.d_id})
					.enter().append('svg:circle')
					.attr('r', 1)
					.attr('cx', function(d){ return d.x })
					.attr('cy', function(d){ return d.y })
					.attr('class', function(d){ return d.class })
					.call(drag)
					.on('click', handleDancerClick)
					.transition()
						.attr('r', function(d){ return d.r})
						.duration(300);
			}
		});

		function handleDancerClick(d){
			d.toggleSelected();
			d3.select(this).attr('class', function(d){ return d.class });
			d3.event.stopPropagation();		
		}

		function circledragstart(d){
			obj.dragging = true;
			d.setSelected()
			d3.select(this)
				.transition()
				.duration(400)
				.attr('class', function(d){ return d.class})
				.attr('r', 40);
		}

		function circledragend(d){
			d3.select(this)
				.transition()
				.duration(200)
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
	removeSelected: function(){
		for(var i = 0; i < this.circles.length; i++){
			if(this.circles[i].class === 'selected_dancer'){
				this.circles[i].splice(i, 1);
			}
		}
	}
}

function Dancer(d_id,x,y){
	this.d_id = d_id;
	this.x = x;
	this.y = y;
	this.class = 'dancer';
	this.r = 25;
	return this;
}

Dancer.prototype.setSelected = function(){
	this.class = 'selected_dancer';
}

Dancer.prototype.toggleSelected = function(){
	if(this.class === 'dancer') this.class = 'selected_dancer';
	else this.class = 'dancer';
}

formation.init();
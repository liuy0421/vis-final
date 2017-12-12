// var data = { "options": ["Facebook", "Twitter", "Github", "DeepMind"],
// 			 "labels": ["gender", "race"];
// 			 "categories": {"gender": ["men", "women"], "race": ["white", "black", "asian", "latinx", "other"},
// 			 "Facebook": {"men": 80, "women": 50, "white": 100, "black": 20, "asian": 70, "latinx": 30, "other": 12},
// 			 "Twitter": {"men": 200, "women": 30, "white": 300, "black": 120, "asian": 20, "latinx": 10, "other": 16,
// 			 "Github": {"men": 80, "women": 15, "white": 10, "black": 10, "asian": 10, "latinx": 10, "other": 10},
// 			 "DeepMind": {"men": 6000, "women": 500, "white": 600, "black": 200, "asian": 140, "latinx": 130, "other": 50},
// };


class Dots {
	constructor(x, y, w, h, data, id, svg) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.offset = w * 0.05;
		this.ID = id;
		this.options = data["options"];
		this.labels = data["labels"];
		this.categories = data["categories"];
		this.data = {};
		this.intervalLeft = this.h / (this.options.length * 2);
		this.intervalRight = (this.h - this.offset * 4)/ (this.labels.length * 2);

		this.radiusLeft = this.intervalLeft * .8;
		this.radiusRight = this.radiusLeft;

		for (const option of this.options) {
			this.data[option] = data[option];
		}

		this.chart = document.createElementNS(svgns, "g");
		this.chart.setAttribute("id", this.ID);
		this.chart.setAttribute("selectedOpt", this.options[0]);
		this.chart.setAttribute("selectedLabel", this.labels[0]);
		this.colors = ['#8AD5E0','#F78E21', '#8DA153', '#C8B87F', '#FCC800', '#ED8B7C', '#9FCADD', 
						'#FDCBBB', '#C7DD34', '#62A1AE', '#7E30A1'];

		this.graph = document.createElementNS(svgns, "g");
		this.chart.appendChild(this.graph);

		this.sidebar = document.createElementNS(svgns, "g");
		this.chart.appendChild(this.sidebar);
		this.svg = svg;
		this.svg.appendChild(this.chart);

		


	}


	drawButtons(){
		// left sidebar

		// console.log(this.chart.getAttribute("selectedOpt"));

		let yPos = this.y;
		let xPosLeft = this.x + this.offset / 2 + this.radiusLeft;
		let xPosRight = this.x + this.w - this.offset / 2 - this.radiusRight;

  		this.chart.removeChild(this.sidebar);
  		this.sidebar = document.createElementNS(svgns, "g");
		let defs = document.createElementNS(svgns, "defs");
		for (const option of this.options) {
			let p = document.createElementNS(svgns, "pattern");
			p.setAttribute("width", "100%");
			p.setAttribute("height", "100%");
			p.setAttribute("x", "0%");
			p.setAttribute("y", "0%");
			p.setAttribute("viewBox", "0 0 " + this.radiusLeft * 2 + " " + this.radiusLeft * 2);
			p.setAttribute("id", "i"+option);
			let im = document.createElementNS(svgns, "image");
			im.setAttribute("x", "0%");
			im.setAttribute("y", "0%");
			im.setAttribute("width", this.radiusLeft*2);
			im.setAttribute("height", this.radiusLeft*2);
			im.setAttribute("href", "img/" + option + ".png");//option + ".png");
			p.appendChild(im);
			defs.appendChild(p);
		}
		this.svg.appendChild(defs);

		for (const option of this.options) {
			yPos += this.intervalLeft;
			let circle = document.createElementNS(svgns, "circle");
			circle.setAttribute("cx", xPosLeft);
			circle.setAttribute("cy", yPos);
			circle.setAttribute("r", this.radiusLeft);

			// circle.setAttribute("fill", 'white');
			circle.setAttribute("fill", "url(#i"+option+")");

			if (this.chart.getAttribute("selectedOpt") == option) {
				// circle.setAttribute("stroke-width", "5px");
				// circle.setAttribute("stroke", "red");
				circle.setAttribute("fill-opacity", 1);
			} else {
				// circle.setAttribute("stroke-width", "0px");
				circle.setAttribute("fill-opacity", 0.3);
			}
			

			let c = this.chart;
			let opt = option;
			let s = this;
			let g = this.graph;
			let selected = c.getAttribute("selectedOpt");

			circle.addEventListener("click", function(event){
				c.setAttribute("selectedOpt", opt);
				s.draw();
		    });

			circle.addEventListener("mouseover", function(event){
			    if (opt != selected) {
			    	circle.setAttribute("fill-opacity", 1);
			    }

		    });

		    circle.addEventListener("mouseleave", function(event){
			    if (opt != selected) {
			    	circle.setAttribute("fill-opacity", 0.3);
			    }
		    });

			this.sidebar.appendChild(circle);

			yPos += this.intervalLeft;
		}

		yPos = this.y + this.offset * 2;
		for (const label of this.labels) {
			yPos += this.intervalRight;
			let circle = document.createElementNS(svgns, "circle");
			circle.setAttribute("cx", xPosRight);
			circle.setAttribute("cy", yPos);
			circle.setAttribute("r", this.radiusRight);

			circle.setAttribute("fill", '#7E30A1');

			if (this.chart.getAttribute("selectedLabel") == label) {
				// circle.setAttribute("stroke", "red");
				// circle.setAttribute("stroke-width", "5px");
				circle.setAttribute("fill-opacity", 1);
			} else {
				// circle.setAttribute("stroke-width", "0px");
				circle.setAttribute("fill-opacity", 0.3);
			}

			let textLabel = document.createElementNS(svgns, "text");
			textLabel.setAttribute('x', xPosRight);
			textLabel.setAttribute('y', yPos + 5);	
			textLabel.setAttribute('stroke-width', "5px");
			textLabel.setAttribute('fill', "white");

			let t = document.createTextNode(label);
			textLabel.appendChild(t);
			

			let c = this.chart;
			let l = label;
			let s = this;
			let g = this.graph;
			let selectedL = c.getAttribute("selectedLabel");

			circle.addEventListener("click", function(event){
				c.setAttribute("selectedLabel", l);
				s.draw();
			    // c.setAttribute("selectedOpt", opt);
			    // if 
		    });

			circle.addEventListener("mouseover", function(event){
			    if (l != selectedL) {
			    	circle.setAttribute("fill-opacity", 1);
			    }
		    });

		    circle.addEventListener("mouseleave", function(event){
			    if (l != selectedL) {
			    	circle.setAttribute("fill-opacity", 0.3);
			    }
		    });

			this.sidebar.appendChild(circle);
			this.sidebar.appendChild(textLabel);

			yPos += this.intervalRight;
		}
		this.chart.appendChild(this.sidebar);
	}

	drawGraph() {
		this.chart.removeChild(this.graph);
		this.graph = document.createElementNS(svgns, "g");
		let c_width = this.w - this.offset - this.radiusLeft * 4,
			c_height = (this.h - this.offset * 2) ,
			c_interval = c_height / 20,
			c_x = this.x + this.offset /2 + this.radiusLeft * 2 + (c_width - c_height)/2,
			c_y = this.y + this.offset,
			c_radius = c_interval * .8;

		let o = this.chart.getAttribute("selectedOpt");
		let l = this.chart.getAttribute("selectedLabel");

		let d = this.data[o];
		let total = 0;
		let percentages = [];

		for (const c of this.categories[l]){
			total += d[c];
		}

		for (const c of this.categories[l]){
			percentages.push({ label: c, value: Math.round(100 * d[c] / total)});
		}

		percentages.sort(function(a, b) {
			return b.value - a.value;
		});

		let j = 0;
		total = percentages[0].value;
		let text_interval = Math.floor(c_height / percentages.length);
		console.log(percentages.length);


		let tx = c_x + text_interval / 2,
			ty = c_y + c_height + this.offset,
			numy = ty -15;

		for (let i = 0 ; i < 100; i++) {
			let row = Math.floor(i /10), col = i % 10,
				x_pos = c_x + c_interval * (2 * row + 1),
				y_pos = c_y + c_interval * (2 * col + 1);

			let circle = document.createElementNS(svgns, "circle");
			circle.setAttribute("cx", x_pos);
			circle.setAttribute("cy", y_pos);
			circle.setAttribute("r", c_radius);

			circle.addEventListener("mouseover", function(event){
			    circle.setAttribute("fill-opacity", 0.5);
		    });

		    circle.addEventListener("mouseleave", function(event){
			    circle.setAttribute("fill-opacity", 1);
		    });

			if (i == total) {
				j++;
				if (j == percentages.length){
					j--;
				}
				total += percentages[j].value;
			}

			circle.setAttribute("fill", this.colors[j]);

			this.graph.appendChild(circle);
		}

		for (let i = 0; i < percentages.length; i++) {

			let catLabel = document.createElementNS(svgns, "text");
			catLabel.setAttribute('x', tx);
			catLabel.setAttribute('y', ty);	
			catLabel.setAttribute('fill', this.colors[i]);

			let t = document.createTextNode(percentages[i].label);
			catLabel.appendChild(t);
			this.graph.appendChild(catLabel);

			let catNum = document.createElementNS(svgns, "text");
			catNum.setAttribute('x', tx);
			catNum.setAttribute('y', numy);	
			catNum.setAttribute('fill', this.colors[i]);

			let num = document.createTextNode(percentages[i].value + "%");
			catNum.appendChild(num);
			this.graph.appendChild(catNum);

			tx = tx + text_interval;
		}

		this.chart.appendChild(this.graph);
	}

	draw () {
		
		this.drawButtons();
		this.drawGraph();
	}
}
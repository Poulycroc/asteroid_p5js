function Asteroid(position, r) {
	if (position) {
		this.pos = position.copy()
	} else {
		this.pos = createVector(random(width), random(height));
	}
	if (r) {
		this.r = r * 0.5;
	} else {
		this.r = random(5, 50);
	}
	this.vel = p5.Vector.random2D();
	this.total = floor(random(5,15));
	this.offset = [];
	for (var i = 0; i < this.total; i++) {
		this.offset[i] = random(-this.r*0.5, this.r*0.5)
	}

	this.update = () => {
		this.pos.add(this.vel)
	}

	this.render = () => {
		push()
		stroke(255)
		noFill()
		beginShape()
		translate(this.pos.x, this.pos.y)
		for (let i = 0; i < this.total; i++) {
			let angle = map(i, 0,this.total, 0, TWO_PI)
			  , r = (this.r + this.offset[i])
			  , x = r * cos(angle)
			  , y = r * sin(angle);
			vertex(x, y)
		}
		endShape(CLOSE)
		pop()
	}

	this.breakup = () => {
		var newA = [];
		newA[0] = new Asteroid(this.pos, this.r);
		newA[1] = new Asteroid(this.pos, this.r);
		return newA
	}

	this.edges = () => {
		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r
		} else if (this.pos.x < -this.r) {
			this.pos.x = width + this.r
		}
		if (this.pos.y > height + this.r) {
			this.pos.y = -this.r
		} else if (this.pos.y < -this.r) {
			this.pos.y = height + this.r
		}
	}
	
}
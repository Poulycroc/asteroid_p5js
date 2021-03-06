function Laser(shipPosition, angle) {
	this.pos = createVector(shipPosition.x, shipPosition.y);
	this.vel = p5.Vector.fromAngle(angle);
	this.vel.mult(10)

	this.update = () => {
		this.pos.add(this.vel)
	}

	this.render = () => {
		push()
		stroke(255)
		strokeWeight(4)
		point(this.pos.x, this.pos.y)
		pop()
	}

	// fonction qui checkera si l'astéroid est touché par un laser
	this.hits = (asteroid) => {
		var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
		if (d < asteroid.r) {
			return true
		} else {
			return false
		}
	}

	this.offscreen = () => {
		if (this.pos.x > width || this.pos.x < 0) {
			return true
		} else if (this.pos.y > height || this.pos.y < 0) {
			return true
		} else {
			return false
		}
	}
}
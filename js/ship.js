// création de l'objet Ship
function Ship() {
	// création du vecteur
	this.pos = createVector(width/2, height/2)
	// taille du triangle
	this.r = 20;
	// point de rotaion du triangle
	this.heading = 0;
	this.rotation = 0;
	// mise a zero des mouvement
	this.vel = createVector(0,0);
	// est ce que l'objet bouge ? 
	this.isBoosting = false;

	this.boosting = (b) => {
		this.isBoosting = b;
	}

	// creéation de du mouvement (accélèration et dplacement de l'objet)
	this.update = () => {
		if (this.isBoosting) {
			this.boost()
		}
		this.pos.add(this.vel)
		this.vel.mult(0.95)
	}

	this.boost = () => {
		var force = p5.Vector.fromAngle(this.heading);
		this.vel.add(force)
	}

	this.hits = (asteroid) => {
		var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
		if (d < this.r + asteroid.r) {
			return true 
		} else {
			return false
		}
	}

	// génération de l'objet
	this.render = () => {
		// fonction pour sortir Ship du reste des éléments de la page
		push()
		// centre l'objet
		translate(this.pos.x, this.pos.y)
		rotate(this.heading + PI/2)
		// fond noir pour couvrir les tirs
		fill(0)
		// bordure blanche
		stroke(155)
		// on génère le triangle avec la taille enregistré
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r)
		// va de paire avec push
		pop()
	}

	// quand on dépace un bord on repasse de l'autre coté de l'écran
	this.edges = () => {
		// quand l'objet est a une position x, y qui est égale a la taille de l'écran
		// moins la sienne alors l'objet passe de l'autre coté
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

	// rotation de Ship
	this.setRotation = (a) => {
		this.rotation = a;
	}

	// fonction qui fera tourner Ship
	this.turn = () => {
		this.heading += this.rotation
	}
}
var ship
  , asteroids = []
  , lasers = [];

function setup() {
	createCanvas(windowWidth, windowHeight)
	ship = new Ship();
	for (var i = 0; i < 10; i++) {
		asteroids.push(new Asteroid())	
	}
}

function draw() {
	background(0)

	for (var i = 0; i < asteroids.length; i++) {
		if (ship.hits(asteroids[i])) {
			console.log('dead')
		}
		asteroids[i].render()
		asteroids[i].update()
		asteroids[i].edges()
	}

	for (var i = lasers.length-1; i >= 0; i--) {
		lasers[i].render()
		lasers[i].update()
		if (lasers[i].offscreen()) {
			lasers.splice(i, 1)
		} else {
			// pour chaque laser on test si chacun des 
			// astéroid a été touché
			for (var j = asteroids.length-1; j >= 0; j--) {
				// si c'est le cas 
				if (lasers[i].hits(asteroids[j])) {
					if (asteroids[j].r > 10) {
						var newAsteroids = asteroids[i].breakup()
						asteroids = asteroids.concat(newAsteroids)
					} else {
						// ajouter du score
					}
					// on lance une fonction qui va casser l'asteroide
					asteroids.splice(j, 1)
					lasers.splice(i, 1)
					break
				}
			}
		}
	}

	ship.render()
	ship.turn()
	ship.update()
	ship.edges()
}

// quand on relache le mouvement s'arrete
function keyReleased() {
	ship.setRotation(0)
	ship.boosting(false)
}

// quand on tien la touche l'objet bouge
function keyPressed() {
	if (key == ' ') {
		lasers.push(new Laser(ship.pos, ship.heading))
	} else if (keyCode == RIGHT_ARROW) {
		ship.setRotation(0.1)
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-0.1)
	} else if (keyCode == UP_ARROW) {
		ship.boosting(true)
	}
}
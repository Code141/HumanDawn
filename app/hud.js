Hud = function(){
	hud = document.createElement( 'div' );
	document.body.appendChild( hud );
	hud.style.position = 'absolute';
	hud.style.width = "300px";
	hud.style.height = "100px";
	hud.style.background = "rgba(255, 255, 255, 0.5)";
	hud.style.bottom = '0px';

	speed = document.createElement( 'div' );
	hud.appendChild( speed );

	this.update = function(){
		vitesse = userSpaceShip.movementSpeed;

		if(userSpaceShip.speed<=1000){
			echelleDeMesure = 'M/s';
		}else if(userSpaceShip.speed>1000 && userSpaceShip.speed<299792458){
			echelleDeMesure = 'Km/s';
			vitesse = vitesse/1000;
		}else if(userSpaceShip.speed>299792458){
			echelleDeMesure = 'Vitesse lumiere !';
			vitesse = vitesse/299792458;
		}



		speed.innerHTML = 'speed = '+vitesse+echelleDeMesure+'<br>Acceleration = '+userSpaceShip.acceleration+'<br>maxSpeed = '+userSpaceShip.maxSpeed;
		
	}

}	
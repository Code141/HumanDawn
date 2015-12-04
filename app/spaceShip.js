SpaceShip = function(spaceShipBank, type, modelName){
	this.spaceshipInfo = spaceShipBank[type][modelName];

	this.speed = 0;
	this.maxSpeed = this.spaceshipInfo.caracteristiques.maxSpeed;
	this.minSpeed = this.spaceshipInfo.caracteristiques.minSpeed;
	this.power = this.spaceshipInfo.caracteristiques.power;

	this.moveState = {
		up: 0,
		down: 0,
		left: 0,
		right: 0,
		forward: 0,
		back: 0,
		pitchUp: 0,
		pitchDown: 0,
		yawLeft: 0,
		yawRight: 0,
		rollLeft: 0,
		rollRight: 0,
		speedBoost: 0
	};

	this.inertialMove = new THREE.Vector3( 0, 0, 0 );
	this.inertialRotation = new THREE.Vector3( 0, 0, 0 );

	this.moveVector = new THREE.Vector3( 0, 0, 0 );
	this.rotationVector = new THREE.Vector3( 0, 0, 0 );

	this.movementSpeed = 100000000.0;
	this.rollSpeed = 1;

	this.modelBuilder = function(){
		this.model = new THREE.Object3D();
		var geometry = new THREE.BoxGeometry( 5, 3, 10 );
		var material = new THREE.MeshLambertMaterial();		
		var chassis = new THREE.Mesh( geometry, material );

		var geometry = new THREE.BoxGeometry( 10, 1, 1 );
		var essieux = new THREE.Mesh( geometry, material );

		var aile = new THREE.BoxGeometry( 2, 2, 6 );
		var aile1 = new THREE.Mesh( aile, material );
		var aile2 = new THREE.Mesh( aile, material );
		aile1.position.x = -5;
		aile2.position.x = 5;

		var geometry = new THREE.BoxGeometry( 3, 2, 3 );
		var parchoque = new THREE.Mesh( geometry, material );
		parchoque.rotation.y = 0.785;
		parchoque.position.z = -5;

		this.model.add(chassis, parchoque, essieux, aile1, aile2, camera);

		camera.position.z = 75;
		camera.position.y = 25;
		camera.lookAt(this.model.position);
		scene.add(this.model);
	}

	this.setControlType = function(type, object){

		switch ( object ) {
			case "self":
				//Just put to the object her new vector 
				break;

				case "world":

				break;
			}

			switch ( type ) {
				case "manual":
				this.physics = new SpacePhysics(this, this);
				this.control = new FlyControlKeys(this);
				break;

				case "auto":
			//this.control = new AutoControl();
			//this.control.goTo(XYZ);
			break;
		}

	}

	this.motorsAspect = function(deltaClock){
		if(this.moveVector.x == 1){

		}else if(this.moveVector.x == -1){

		}

		if(this.moveVector.y == 1){

		}else if(this.moveVector.y == -1){

		}

		if(this.moveVector.z == 1){

		}else if(this.moveVector.z == -1){

		}

		if(this.rotationVector.x == 1){

		}else if(this.rotationVector.x == -1){
			
		}

		if(this.rotationVector.y == 1){

		}else if(this.rotationVector.y == -1){
			
		}

		if(this.rotationVector.z == 1){

		}else if(this.rotationVector.z == -1){
			
		}


	}

	this.anime = function(deltaClock){


if(this.moveState.forward == 1){
	this.movementSpeed += this.movementSpeed/100;
}else if(this.moveState.back == 1){
	this.movementSpeed = 10000000;
}

if(this.moveState.speedBoost == 1){
	this.movementSpeed = 10000;
}

		this.motorsAspect(deltaClock);
		this.physics.updateWorld( deltaClock );
	}


}








spaceShip = ({
	hunter : {
		basicHunter : {
			morphologie : {
				size : 2440000,
				model : 'model.obj',
				textures : {
					self : 'noneYet.jpg'
				}
			},
			caracteristiques : {
				maxSpeed : 100000000000,
				minSpeed : -1000000,
				power : 10,
				maniability : 1 
			},
		}
	},
	motherShip : {
		iss : {
			morphologie : {
				size : 2440000,
				textures : {
					self : 'mercurymap.jpg'
				}
			},
			orbit : {
				orbit : 57910000000,
				orbitPeriode : 0.2408,
				syderalRotation : 0
			}
		}
	}
});



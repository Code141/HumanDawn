
FlyControlKeys = function(spaceShip){

	this.keydown = function( event ) {

		switch ( event.keyCode ) {

			case 16: /* shift */ spaceShip.moveState.speedBoost = 1; break;

			case 90: /*Z*/ spaceShip.moveState.forward = 1; break;
			case 83: /*S*/ spaceShip.moveState.back = 1; break;

			case 81: /*Q*/ spaceShip.moveState.left = 1; break;
			case 68: /*D*/ spaceShip.moveState.right = 1; break;

			case 82: /*R*/ spaceShip.moveState.up = 1; break;
			case 70: /*F*/ spaceShip.moveState.down = 1; break;

			case 38: /*up*/ spaceShip.moveState.pitchDown = 1; break;
			case 40: /*down*/ spaceShip.moveState.pitchUp = 1; break;

			case 37: /*left*/ spaceShip.moveState.yawLeft = 1; break;
			case 39: /*right*/ spaceShip.moveState.yawRight = 1; break;

			case 65: /*A*/ spaceShip.moveState.rollLeft = 1; break;
			case 69: /*E*/ spaceShip.moveState.rollRight = 1; break;

		}


	};

	this.keyup = function( event ) {

		switch( event.keyCode ) {

			case 16: /* shift */ spaceShip.moveState.speedBoost = 0; break;

			case 90: /*Z*/ spaceShip.moveState.forward = 0; break;
			case 83: /*S*/ spaceShip.moveState.back = 0; break;

			case 81: /*Q*/ spaceShip.moveState.left = 0; break;
			case 68: /*D*/ spaceShip.moveState.right = 0; break;

			case 82: /*R*/ spaceShip.moveState.up = 0; break;
			case 70: /*F*/ spaceShip.moveState.down = 0; break;

			case 38: /*up*/ spaceShip.moveState.pitchDown = 0; break;
			case 40: /*down*/ spaceShip.moveState.pitchUp = 0; break;

			case 37: /*left*/ spaceShip.moveState.yawLeft = 0; break;
			case 39: /*right*/ spaceShip.moveState.yawRight = 0; break;

			case 65: /*A*/ spaceShip.moveState.rollLeft = 0; break;
			case 69: /*E*/ spaceShip.moveState.rollRight = 0; break;

		}


	};

	function bind( scope, fn ) {
		return function () {
			fn.apply( scope, arguments );
			spaceShip.physics.updateMotorsVector();
		};
	};

	window.addEventListener( 'keydown', bind( this, this.keydown ), false );
	window.addEventListener( 'keyup',   bind( this, this.keyup ), false );
}



SpacePhysics = function(spaceShip, movingObject){
	this.spaceShip = spaceShip;
	this.movingObject = movingObject.model;

	this.updateMotorsVector = function() {

		var forward = ( this.spaceShip.moveState.forward || ( this.spaceShip.autoForward && !this.spaceShip.moveState.back ) ) ? 1 : 0;

		this.spaceShip.moveVector.x = ( -this.spaceShip.moveState.left    + this.spaceShip.moveState.right );
		this.spaceShip.moveVector.y = ( -this.spaceShip.moveState.down    + this.spaceShip.moveState.up );
		this.spaceShip.moveVector.z = ( -forward + this.spaceShip.moveState.back );

		this.spaceShip.rotationVector.x = ( -this.spaceShip.moveState.pitchDown + this.spaceShip.moveState.pitchUp );
		this.spaceShip.rotationVector.y = ( -this.spaceShip.moveState.yawRight  + this.spaceShip.moveState.yawLeft );
		this.spaceShip.rotationVector.z = ( -this.spaceShip.moveState.rollRight + this.spaceShip.moveState.rollLeft );


	}

	this.updateWorld = function( delta ) {
		var xAxis = new THREE.Vector3(1,0,0);
		var yAxis = new THREE.Vector3(0,1,0);
		var zAxis = new THREE.Vector3(0,0,1);


		var moveMult = delta * this.spaceShip.movementSpeed;
		var rotMult = delta * this.spaceShip.rollSpeed;

		world.position.x -= this.spaceShip.moveVector.x * moveMult;
		world.position.y -= this.spaceShip.moveVector.y * moveMult;
		world.position.z -= this.spaceShip.moveVector.z * moveMult;


		var quaternionX = new THREE.Quaternion();
		quaternionX.setFromAxisAngle( xAxis, -(this.spaceShip.rotationVector.x * rotMult) );
		world.position.applyQuaternion(quaternionX);

		var quaternionY = new THREE.Quaternion();
		quaternionY.setFromAxisAngle( yAxis, -(this.spaceShip.rotationVector.y * rotMult) );
		world.position.applyQuaternion(quaternionY);

		var quaternionZ = new THREE.Quaternion();
		quaternionZ.setFromAxisAngle( zAxis, -(this.spaceShip.rotationVector.z * rotMult) );
		world.position.applyQuaternion(quaternionZ);

		rotateAroundWorldAxis(world, xAxis, -(this.spaceShip.rotationVector.x * rotMult));
		rotateAroundWorldAxis(world, yAxis, -(this.spaceShip.rotationVector.y * rotMult));
		rotateAroundWorldAxis(world, zAxis, -(this.spaceShip.rotationVector.z * rotMult));
	}


	function rotateAroundWorldAxis(object, axis, radians) {
		var rotWorldMatrix;
		rotWorldMatrix = new THREE.Matrix4();
		rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
		rotWorldMatrix.multiply(object.matrix);
		object.matrix = rotWorldMatrix;
		object.rotation.setFromRotationMatrix(object.matrix);
	}





}


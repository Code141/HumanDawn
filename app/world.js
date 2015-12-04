PlanetarySystemBuilder = function(scene, system){
	this.scene = scene;
	this.systemInfo = system;
	this.systemModel = new THREE.Object3D();

	this.stars = new Array();
	this.planets = new Array();
	this.satellits = new Array();
	this.orbits = new Array();

	this.modelBuilder = function(){
		//

		scaler = 200;
		orbitScaler = scaler/2000;
		//

		for(var starName in this.systemInfo.stars) {
			starInfo = this.systemInfo.stars[starName];
			star = new StarBuilder(this.systemModel, starName, starInfo);
			this.stars[starName] = star;

			for(var planetName in starInfo.planets){
				planetInfo = starInfo.planets[planetName];
				planet = new PlanetBuilder(this.systemModel, planetName, planetInfo);			
				this.planets[planetName] = planet;
				
				this.orbits[planetName] = planet.orbit;

				for(var satellitName in planetInfo.satellits) {
					satellitInfo = planetInfo.satellits[satellitName];
					satellit = new SatellitBuilder(planet.planet, satellitName, satellitInfo);			
					this.satellits[satellitName] = satellit;
					
					this.orbits[satellitName] = satellit.orbit;
				}


			}


		}
		this.scene.add(this.systemModel);
	}

	this.move = function(deltaClock){
		for(var key in this.planets) {
			this.planets[key].move(deltaClock);
		}
	}
	this.modelBuilder();
}




StarBuilder = function(scene, name, info){
	this.name = name;
	this.info = info;
	morphologie = info.morphologie;
	equatorialRadius = (morphologie.equatorialDiametre/2)*1000;
	textures = morphologie.textures;

	this.modelBuilder = function(){
		var geometry = new THREE.SphereGeometry( equatorialRadius, 64, 64 );
		texturesPath = 'textures/stars/'+this.name+'/'+textures.self;
		var texture = new THREE.ImageUtils.loadTexture(texturesPath);
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

		this.star = new THREE.Mesh( geometry, material );

		var light = new THREE.PointLight( 0xffffff, 1, 1e13 );
		light.position.set( 0, 0, 0 );
		this.star.add( light );

		// ADD A LENS FLARE HERE

		scene.add( this.star );
	}
	this.modelBuilder();
}

PlanetBuilder = function(scene, name, info){
	this.info = info;
	orbit = this.info.orbit;
	morphologie = this.info.morphologie;
	equatorialRadius = (morphologie.equatorialDiametre/2)*1000;

	this.modelBuilder = function(){
		var geometry = new THREE.SphereGeometry( equatorialRadius, 64, 64 );
		texturesPathSelf = 'textures/planets/'+name+'/'+morphologie.textures.self;
		textureSelf = new THREE.ImageUtils.loadTexture(texturesPathSelf);
		var material = new THREE.MeshPhongMaterial( { map: textureSelf, overdraw: 0.5 } );

		// WARNING CRAZY BUMPSCALE VALUE !
		if(morphologie.textures.bump){
			texturesPathBump = 'textures/planets/'+name+'/'+morphologie.textures.bump;
			material.bumpMap = THREE.ImageUtils.loadTexture(texturesPathBump);
			material.bumpScale = 50000;
		}
		if(morphologie.textures.specular){
			texturesPathSpecular = 'textures/planets/'+name+'/'+morphologie.textures.specular;
			material.specularMap = THREE.ImageUtils.loadTexture(texturesPathSpecular);
			material.specular  = new THREE.Color('grey');
		}

		this.planet = new THREE.Mesh( geometry, material );

		if(morphologie.textures.clouds){
			texturesPathClouds = 'textures/planets/'+name+'/'+morphologie.textures.clouds;
			textureClouds = new THREE.ImageUtils.loadTexture(texturesPathClouds);
			var geometry = new THREE.SphereGeometry( equatorialRadius+10000, 64, 64 );
			var material = new THREE.MeshLambertMaterial( { map: textureClouds, overdraw: 0.5 } );
			material.transparent = true;
			material.blending = THREE[ "AdditiveBlending" ];
			var cloudsMesh = new THREE.Mesh( geometry, material );
			this.planet.add(cloudsMesh);
		}
		
		this.orbit = new OrbitBuilder(scene, info);
		this.planet.position.z = -this.orbit.orbitRadius;

		scene.add( this.planet );

	}

	this.move = function(deltaClock){
		this.planet.rotation.y += (360*Math.PI/180)/(24*60*60/this.info.orbit.orbitalPeriod/deltaClock);

		var quaternionY = new THREE.Quaternion();
		quaternionY.setFromAxisAngle( new THREE.Vector3(0,1,0), (360*Math.PI/180)/(365*24*60*60/this.info.orbit.rotationPeriod/deltaClock) );
		this.planet.position.applyQuaternion(quaternionY);
	}

	this.modelBuilder();
}

OrbitBuilder = function(scene, info){
	this.orbitRadius = (info.orbit.aphelion*1000 + info.orbit.perihelion*1000)/2;

	this.modelBuilder = function(){
		material = new THREE.LineBasicMaterial( { color: 0xFF0000 } );
		geometry = new THREE.CircleGeometry( this.orbitRadius, 64 );
		geometry.vertices.shift();
		orbit = new THREE.Line( geometry, material );
		orbit.rotation.x = 90* Math.PI/180;
		scene.add( orbit );
	}

	this.gravityShift = function(){
		// LA GRAVITEE PERDS 3% TOUT LES 100KM
		//					9%			300Km
		//					90%			3000KM
		//					99.99%			3333Km

		var geometry = new THREE.SphereGeometry( (morphologie.equatorialDiametre /2)*1000+(3333*1000), 64, 64 );
		var material = new THREE.MeshNormalMaterial({wireframe : true, transparent: true, opacity: 0.2});
		var gravityZone = new THREE.Mesh( geometry, material );
		gravityZone.position.z = -this.orbitRadius;
		scene.add(gravityZone);

	}
	this.modelBuilder();
	//this.gravityShift();
}

SatellitBuilder = function(scene, name, info){
	this.info = info;
	orbit = this.info.orbit;
	morphologie = this.info.morphologie;
	equatorialRadius = (morphologie.equatorialDiametre/2)*1000;

	this.modelBuilder = function(){
		var geometry = new THREE.SphereGeometry( equatorialRadius, 64, 64 );
		texturesPathSelf = 'textures/satellits/'+name+'/'+morphologie.textures.self;
		textureSelf = new THREE.ImageUtils.loadTexture(texturesPathSelf);
		var material = new THREE.MeshPhongMaterial( { map: textureSelf, overdraw: 0.5 } );

		// WARNING CRAZY BUMPSCALE VALUE !
		if(morphologie.textures.bump){
			texturesPathBump = 'textures/satellits/'+name+'/'+morphologie.textures.bump;
			material.bumpMap = THREE.ImageUtils.loadTexture(texturesPathBump);
			material.bumpScale = 50000;
		}

		if(morphologie.textures.specular){
			texturesPathSpecular = 'textures/satellits/'+name+'/'+morphologie.textures.specular;
			material.specularMap = THREE.ImageUtils.loadTexture(texturesPathSpecular);
			material.specular  = new THREE.Color('grey');
		}

		this.satellit = new THREE.Mesh( geometry, material );

		this.orbit = new OrbitBuilder(scene, info);
		this.satellit.position.z = -this.orbit.orbitRadius;

		scene.add( this.satellit );

	}


	this.move = function(){
	//	this.planet.position.x = this.planetInfo.orbit.orbit;
	//	this.planet.rotation.y += (360* Math.PI/180)/(this.planetInfo.orbit.syderalRotation*deltaClock);	
}

this.modelBuilder();
}

SmallBodyBuilder = function(){
 //asteroides
 //cometes
 //poussieres(formant les nebuleuse)
 //glace
 //etc...
}








Skybox = function(name, size, textures){
	skybox = new THREE.Object3D();
	skybox.name = name;
	var loader = new THREE.TextureLoader();
	loader.load( textures, function ( texture ) {
		var geometry = new THREE.SphereGeometry( size, 32, 32 );
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.material.side = THREE.BackSide;
		mesh.rotation.z = 45*( Math.PI/180 );
		skybox.add(mesh);
	} );

	return skybox;
}

VoidDust = function(scene){
	size = 15000000000000;
	number = 200000;
	geometry = new THREE.Geometry();

	for ( i = 0; i < number; i ++ ) {

		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * size - (size/2);
		vertex.y = Math.random() * size - (size/2);
		vertex.z = Math.random() * size - (size/2);

		geometry.vertices.push( vertex );

	}

	color = 0.2, 0.2, 0.2;
	size  = 0.1

	materials = new THREE.PointCloudMaterial( { size: size, sizeAttenuation: true} );
	particles = new THREE.PointCloud( geometry, materials );

	scene.add( particles );

}


UniverseSizeHelper = function(){


	var labeldata = [
	{ size: .01,           scale: .001, label: "microscopic (1µm)", scale: .0001 }, // FIXME - triangulating text fails at this size, so we scale instead
	{ size: .01,           scale: 0.1,  label: "minuscule (1mm)", scale: .1},
	{ size: .01,           scale: 1.0,  label: "tiny (1cm)", scale: 1 },
	{ size: 1,             scale: 1.0,  label: "child-sized (1m) = 1 THREE.JS UNIT", scale: 1 },
	{ size: 10,            scale: 1.0,  label: "tree-sized (10m)", scale: 1 },
	{ size: 100,           scale: 1.0,  label: "building-sized (100m)", scale: 1 },
	{ size: 1000,          scale: 1.0,  label: "medium (1km)", scale: 1 },
	{ size: 10000,         scale: 1.0,  label: "city-sized (10km)", scale: 1 },
	{ size: 3400000,       scale: 1.0,  label: "moon-sized (3,400 Km)", scale: 1 },
	{ size: 12000000,      scale: 1.0,  label: "planet-sized (12,000 km)", scale: 1 },
	{ size: 1400000000,    scale: 1.0,  label: "sun-sized (1,400,000 km)", scale: 1 },
	{ size: 7.47e12,       scale: 1.0,  label: "solar system-sized (50Au)", scale: 1 },
	{ size: 9.4605284e15,  scale: 1.0,  label: "gargantuan (1 light year)", scale: 1 },
	{ size: 3.08567758e16, scale: 1.0,  label: "ludicrous (1 parsec)", scale: 1 },
	{ size: 1e19,          scale: 1.0,  label: "mind boggling (1000 light years)", scale: 1 },
	{ size: 1.135e21,      scale: 1.0,  label: "galaxy-sized (120,000 light years)", scale: 1 },
	{ size: 9.46e23,       scale: 1.0,  label: "... (100,000,000 light years)", scale: 1 }
	];

	var materialargs = {
		color: 0xffffff,
		specular: 0xffaa00,
		shininess: 50,
		shading: THREE.SmoothShading,
		emissive: 0x000000
	};

	var geomtransform = new THREE.Matrix4();
	var tmpvec = new THREE.Vector3();
	var meshes = [];
	var coloroffset = 0;
	var colorskip = ['black', 'antiquewhite', 'bisque', 'beige', 'blanchedalmond', 'darkblue', 'darkcyan'];
	var colorkeys = Object.keys( THREE.ColorKeywords );

	for (var i = 0; i < labeldata.length; i++) {
		var scale = labeldata[i].scale || 1;
		var labelgeo = new THREE.TextGeometry( labeldata[i].label, {
			size: labeldata[i].size,
			height: labeldata[i].size / 2,
			font: 'helvetiker',
		});
		labelgeo.computeBoundingSphere();

		// center text
		geomtransform.setPosition( tmpvec.set( -labelgeo.boundingSphere.radius, 0, 0 ) );
		labelgeo.applyMatrix( geomtransform );

		// Pick a color at "random".  Exclude black, because it looks bad.
		while ( colorskip.indexOf( colorkeys[ i + coloroffset ] ) != -1 ) {
			coloroffset++;
		}
		materialargs.color = THREE.ColorKeywords[ colorkeys[ i + coloroffset ] ];

		var material = new THREE.MeshPhongMaterial( materialargs );

		var textmesh = new THREE.Mesh( labelgeo, material );
		textmesh.scale.set(scale, scale, scale);
		textmesh.position.z = -labeldata[i].size * scale;
		textmesh.position.y = labeldata[i].size / 4 * scale;
		textmesh.updateMatrix();

		var dotmesh = new THREE.Mesh(new THREE.SphereGeometry(labeldata[i].size * scale / 2, 24, 12), material);
		dotmesh.position.y = -labeldata[i].size / 4 * scale;
		dotmesh.updateMatrix();

		var merged = new THREE.Geometry();
		merged.merge( textmesh.geometry, textmesh.matrix );
		merged.merge( dotmesh.geometry, dotmesh.matrix );

		var mesh = new THREE.Mesh(merged, material);
		mesh.position.z = -labeldata[i].size * 1 * scale;

		world.add(mesh);
	}
}
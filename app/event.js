window.addEventListener( 'resize', windowSetSize, false );
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mousedown', onDocumentMouseClick, false );

function onDocumentMouseMove( event ) {
	event.preventDefault();

	canvasTop = event.clientX - container.getBoundingClientRect().left;
	canvasLeft = event.clientY - container.getBoundingClientRect().top;

	mouse.x = ( canvasTop / container.clientWidth ) * 2 - 1;
	mouse.y = - ( canvasLeft / container.clientHeight ) * 2 + 1;

}

function onDocumentMouseClick( event ) {
	console.log("There's a eventlistner click !")
}

function windowSetSize() {
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;

	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
}

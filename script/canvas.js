function Animation () {
	this.camera = {};
	this.controls = {};
	this.scene	= {};
	this.floor = {};
	this.box	= {};
	this.hemiLight	= {};
}

Animation.prototype.initialize = function () {
	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.Fog(0xFFFFFF, 0, 100);

	// Camera & Controls
	this.camera = new THREE.PerspectiveCamera(75, main.ASPECT_RATIO, 1, 1000);
	this.camera.position.set(0, 0, 50);
	this.controls = new THREE.OrbitControls(this.camera, main.renderer.domElement);
	this.controls.target.set(0, 0, 0);
	this.controls.update();

	// Lights
	this.hemiLight = new THREE.AmbientLight(0xFFFFFF, 0x555555, 0.2);
	this.scene.add(this.hemiLight);

	// Geometry
	// this.box = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.StandardMeshMaterial({ color:0xFFFFFF }));

};

Animation.prototype.update = function () {

};

Animation.prototype.draw = function () {
	main.renderer.toneMappingExposure = Math.pow(0.68, 5.0);
	main.renderer.shadowMap.enabled = true;
	main.renderer.render(this.scene, this.camera);
};

var main = {
	init: function () {
		this.CANVAS_WIDTH		= window.innerWidth-20;
		this.CANVAS_HEIGHT		= window.innerHeight-20;
		this.ASPECT_RATIO		= this.CANVAS_WIDTH / this.CANVAS_HEIGHT;
		this.canvas 			= {};
		this.context 			= {};
		this.container			= document.getElementById('viewport');
		this.renderer			= new THREE.WebGLRenderer();
		this.animation			= new Animation();

		// Update Renderer Settings
		this.renderer.physicallyCorrectLights = true;
		this.renderer.gammaInput = true;
		this.renderer.gammaOutput = true;
		this.renderer.shadowMap.enabled = true;
		this.renderer.toneMapping = THREE.ReinhardToneMapping;
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
		this.container.appendChild(this.renderer.domElement);

		// Event Handlers
		window.addEventListener('resize', main.onWindowResize, false);

		this.animation.initialize();
		main.onWindowResize();
		main.run();

	},
	run: function () {
		main.animation.update();
		main.animation.draw();
		requestAnimationFrame(main.run);
	},
	onWindowResize: function () {
		var width, height;
		width = window.innerWidth;
		height = window.innerHeight;
		main.animation.camera.aspect = width / height;
		main.animation.camera.updateProjectionMatrix();
		main.renderer.setSize(width, height);
	}
};


window.onload = function () {
	main.init();
};
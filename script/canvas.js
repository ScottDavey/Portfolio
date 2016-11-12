function Animation () {
	this.camera = {};
	this.scene	= {};
	this.box	= {};
	this.hemiLight	= {};
}

Animation.prototype.initialize = function () {
	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.Fog(0xFFFFFF, 0, 100);

	// Camera
	this.camera = new THREE.PerspectiveCamera(75, main.ASPECT_RATIO, 1, 1000);
	this.scene.add(this.camera);

	// Lights
	this.hemiLight = new THREE.AmbientLight(0xFF9329, 0.1);
	this.scene.add(this.hemiLight);

	// Geometry
	this.box = new THREE.Mesh(new THREE.BoxBufferGeometry(20, 20, 20), new THREE.MeshStandardMaterial({color:0xFFFFFF}));
	this.scene.add(this.box);
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
		this.CANVAS_WIDTH		= window.innerWidth-5;
		this.CANVAS_HEIGHT		= window.innerHeight-5;
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

		this.animation.initialize();
		main.run();

	},
	run: function () {
		main.animation.update();
		main.animation.draw();
		requestAnimationFrame(main.run);
	}

};


window.onload = function () {
	main.init();
};
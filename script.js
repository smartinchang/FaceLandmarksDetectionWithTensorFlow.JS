let video = document.getElementById("video");
let model;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const setupCamera = () => {
	navigator.mediaDevices
	.getUserMedia({
		video: {width: 640, height: 480},
		audio: false,
	})
	.then((stream) => {
		video.srcObject = stream;
	});
};

const detectFaces = async () => {
	const predictions = await model.estimateFaces({input: video});
	ctx.drawImage(video, 0, 0, 640, 480);
	if (predictions.length > 0) {
		for (let i = 0;i < predictions.length; i++) {
			const keypoints = predictions[i].scaledMesh;
			for (let j = 0; j < keypoints.length; j++) {
        const [x, y, z] = keypoints[j];
				ctx.fillStyle = "orange";
				ctx.fillRect(x, y, 2, 2);
      }
		}
	}
}

setupCamera();
video.addEventListener("loadeddata", async () => {
	model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);;
	setInterval(detectFaces, 40);	
})
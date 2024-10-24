const firebaseConfig = {
    apiKey: "AIzaSyDZOkXdDSaw1xwonO7L8GcdSfQUtbSMM4c",
    authDomain: "cars-digital-3c158.firebaseapp.com",
    databaseURL: "https://cars-digital-3c158-default-rtdb.firebaseio.com",
    projectId: "cars-digital-3c158",
    storageBucket: "cars-digital-3c158.appspot.com",
    messagingSenderId: "606775878283",
    appId: "1:606775878283:web:07d3d79d7b186be576aa8e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const resizeimage = () => {
	let newwidth = 300;
	let pic = document.getElementById('inputphto').files[0];
	let preview = document.querySelector('.photo');
	let reader = new FileReader();

	reader.readAsDataURL(pic);
	reader.name = pic.name;
	reader.size = pic.size;
	reader.onload = function(event) {
		let img = new Image();
		img.src = event.target.result;
		img.name = event.target.name;
		img.size = event.target.size;

		img.onload = function(el) {
			let x = document.createElement('canvas');
			let scaleFactor = newwidth / el.target.width;
			x.width = newwidth;
			x.height = el.target.height * scaleFactor;
			let ctx = x.getContext('2d');
			ctx.drawImage(el.target, 0, 0, x.width, x.height);
			let srcEncoded = ctx.canvas.toDataURL('image/png', 1);
            preview.style. backgroundImage = `url( ${srcEncoded})`;

			//preview.src = srcEncoded;
			//uploadimage(srcEncoded);	
		};
	};
};

function previewimage() {
    var url = localStorage.getItem('tempImage');
    if (url) {
        document.getElementById('photoicon').style. backgroundImage = "url('your-image-url')";
    }
}




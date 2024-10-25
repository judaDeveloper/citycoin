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

var newcid;

const resized = () => {
	let width = window.innerWidth;
	//let usrfom = document.getElementById('userform').clientWidth;
	//document.getElementById("pagewdth").innerHTML = 'New Member '+width +'/'+ usrfom;
}
const resetform = (id) => {
	document.querySelector(id).reset();
	document.querySelector('.photo').value ='';
};

resetform ('.newform');

function radioclicked(radio, inptid) {
	let value = null;
	let x = document.getElementsByName(radio);
	let z = document.getElementById(inptid);
	for (var i = 0; i < x.length; i++) {		
		if (x[i].type == 'radio' && x[i].checked == true) {
			value = x[i].value;
		}
	}
	z.value = value;
	z.dispatchEvent(new Event('change'));
	newUserdata();
}
function radioValueChanged(radio, inputid) {
	let x = document.getElementsByName(radio);
	let n = document.getElementById(inputid);
	
	let y = document.querySelector('.' + radio);
	let z;
	for (var i = 0; i < x.length; i++) {
		if (n.value > 0 && x[i].value == n.value) {
			x[i].checked = true;
			z = x[i].parentElement.innerText;
		} else {
			x[i].checked = false;
			z = '';
		}
		newUserdata();

	} y.value = z;
}
function getRandomNumber(min, max) {
	var minn = Math.ceil(min);
	var maxx = Math.floor(max);
	return (Math.floor(Math.random() * (maxx - minn)) + minn);
}
function newUserdata() { 
	const newdata = {
		cid: 			newcid,
		firstname: 		document.getElementById("fisrtname").value,
		secondname: 	document.getElementById("secondname").value,
		lastname: 		document.getElementById("lastname").value,
		birthdate: 		document.getElementById("birthdate").value,
		email: 			document.getElementById("emailaddress").value,
		gender: 		document.getElementById("inputgenda").value,
		marital: 		document.getElementById("inputmarital").value,
		idnumber: 		document.getElementById("idnumber").value,
		currenttown:	document.getElementById("currenttown").value,
		sublocation:	document.getElementById("sublocation").value,
		homeaddress:	document.getElementById("currentaddress").value,
		phonenumber:	document.getElementById("phonenumber").value,
		othernumber:	[],
		imagelink: 		document.getElementById("inputuploadurl").value,
		date: 			new Date().toLocaleDateString()
	};
	localStorage.setItem('newuserdata', JSON.stringify(newdata));
}
const resizeimage = () => {
	let newwidth = 300;
	let x = document.getElementById('inputphto').files[0];
	let preview = document.querySelector('.photo');
	let reader = new FileReader();
	reader.readAsDataURL(x);
	reader.name = x.name;
	reader.size = x.size;
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
			document.querySelector('.usericon').classList.add('shown');
            preview.style. backgroundImage = `url( ${srcEncoded})`;	
			uploadimage(srcEncoded);
		};
	};
}; 
const uploadimage = (srcEncoded) => {
	let inputurl = document.getElementById("inputuploadurl");
	let ref = firebase.storage().ref("/UserImages");
	let name = +new Date()+ "00000";
	ref.child(name).putString(srcEncoded, 'data_url').then((snapshot) => snapshot.ref.getDownloadURL()).then(myurl => {
		if (myurl !== '') {
			inputurl.value = myurl;
			inputurl.dispatchEvent(new Event('change'));    //birthdate

			document.querySelector('.usericon').classList.add('uploaded');
			document.querySelector('.photo').style. backgroundImage = `url( ${inputurl.value})`;	
		}
	});
};


const saveuser = () => {
	let data = JSON.parse(localStorage.getItem("newuserdata"));
	 db.collection("citycoinCloudusers").add(data)
	.then((docRef) => {
		alert("You have successfully submited your data for registration process!");
		Window.close();
		localStorage.removeItem('newuserdata');
	})
	.catch((error) => {
		alert("Error adding document: ", error);
	});
};

const getnewuserId = () => {
	let array = [];
	let rnum = getRandomNumber(1000001, 9999999);
	let ref = db.collection('citycoinCloudusers');

	ref.get().then(snap => {
		snap.forEach(doc => {
			array.push(doc.data().cid);
		});
		if (array.length > 0) {
			if (rnum.toString().length == 7 && array.includes(rnum) == false) {
				newcid = Number(rnum);
				newUserdata();
				saveuser();

			} else {
				getnewuserId();
			}
		} else {
			newcid = 1000001;
			newUserdata();
			saveuser();
		}
	});
};

const deleteUnusedId = () => {
	const docref = db.collection('Citycoin_clients').doc(documentId.toString());
	docref.get().then((doc) => {
		if (doc.exists) {
			if (doc.data().state == 'new') {
				docref.delete().then(() => {
					alert("Document successfully deleted!");

				}).catch((error) => {
					alert("Error removing document: ", error);
				});
			}
		} else {
			alert("No such document!");
		}
	}).catch((error) => {
		alert("Error getting document:", error);
	});
};

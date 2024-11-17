// FIREBASE 
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

var newuid;

function getRandomNumber(min, max) {
	var minn = Math.ceil(min);
	var maxx = Math.floor(max);
	return (Math.floor(Math.random() * (maxx - minn)) + minn);
}

function selectCheckbox(id, nput) {
    let chbx = document.getElementById(id);
    let inpt = document.getElementById(nput);
    let r = document.getElementsByName(chbx.name);

    for (var i = 0; i < r.length; i++) {
        r[i].checked = false;
	}
    chbx.checked =true;
    if ( chbx.checked == true) {
        inpt.value = chbx.value;
    }
    getnewdata();
}


function getnewdata() { 
	const newdata = {
		cid: 		newuid,
		fname: 		document.getElementById("fname").value,
		sname: 		document.getElementById("sname").value,
		lname: 		document.getElementById("lname").value,
		gender: 	document.getElementById("gender").value,

		dob: 		document.getElementById("dobirth").value,
        marital: 	document.getElementById("marital").value,
		idno: 		document.getElementById("idnumber").value,
        pin: 		document.getElementById("krapin").value,
        hdistrct: 	document.getElementById("district").value,
        hsubloc: 	document.getElementById("subloc").value,

        phone:		document.getElementById("phonenum").value,
        contacts:	[],
		email: 		document.getElementById("emailaddress").value,
        street:		document.getElementById("resstreet").value,
        subloc:		document.getElementById("sublocname").value,
		towncity:	document.getElementById("towncity").value,

		imglink: 	document.getElementById("uploadURL").value,
		rdate: 		new Date().toLocaleDateString()
	};
	localStorage.setItem('newxdata', JSON.stringify(newdata));
}

const resizeimage = () => {
	let newwidth = 300;
	let x = document.getElementById('inputimg').files[0];
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
	let inputurl = document.getElementById("uploadURL");
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
const createNewid = () => {
	let x = []; 
	let rm = getRandomNumber(100000, 999999);
	let ref = db.collection('citycoinUsers');
	ref.get().then(snap => {
		snap.forEach(doc => {
			x.push(doc.data().cid);
		});
		if (x.length > 0) {
			if (rm.toString().length == 6 && x.includes(rm) == false) {
				newuid = Number(rm);
				getnewdata();
				savedata();
			} else {
				createNewid();
			}
		} else {
			newuid = 1000001;
			getnewdata();
			savedata();
		}
	});
};

function savedata () {
	let data = JSON.parse(localStorage.getItem("newxdata"));
	 db.collection("citycoinUsers").add(data)
	.then((docRef) => {
		alert("Your details have been submitted successfully!");
		localStorage.removeItem('userxdata');
		//fetchLoans();
		document.getElementById('userform').style.display='none';
	})
	.catch((error) => {
		alert("Error adding document: ", error);
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

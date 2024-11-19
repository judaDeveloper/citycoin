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

function openResetForm() {
	document.getElementById('myimage').src = '';
	document.querySelector('.photo').classList ='photo';
	document.querySelector('.modal').style.display='block'
	document.getElementById('userform').reset();

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
	let photo = document.querySelector('.photo');
	photo.classList= 'photo';

	let txt = document.getElementById('loadtxt');
	let x = document.getElementById('inputimg').files[0];
	let reader = new FileReader();
	photo.classList.add('resize');

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
			let W = el.target.width;
			let H = el.target.height;
			if (H > W) {
				x.height = 180;
				x.width = Math.round(W * 180/H);
			}else if (W > H) {
				x.width = 180;
				x.height =  Math.round(H * 180/W);
			}else {
				x.width = 180;
				x.height = 180;
			}
			let ctx = x.getContext('2d');
			ctx.drawImage(el.target, 0, 0, x.width, x.height);
			let srcEncoded = ctx.canvas.toDataURL('image/png', 1);
			photo.classList.add('load');
			txt.innerText = 'Uploading ...';						
			uploadimage(srcEncoded);
		};
	};
};

const uploadimage = (srcEncoded) => {
	let nputUrl = document.getElementById("uploadURL");
	let ref = firebase.storage().ref("/UserImages");
	let name = +new Date()+ "00000";
	ref.child(name).putString(srcEncoded, 'data_url').then((snapshot) => snapshot.ref.getDownloadURL()).then(myurl => {
		if (myurl !== '') {
			nputUrl.value = myurl;
			nputUrl.dispatchEvent(new Event('change'));
			document.getElementById('myimage').src = srcEncoded;
			document.querySelector('.photo').classList.add('uploaded');
			//document.getElementById('myimage').src = `url( ${inputurl.value})`;
		}
	});
};
const validator = () => {
	let d = document.querySelector('.entries');
	let x = d.getElementsByTagName("input");
	for (var i = 0; i < x.length; i++) {
        if (x[i].type == 'text'){
			if (x[i].value =='') {
				x[i].classList.add('invalid')
				return 'invalid';
			}	
		}
	}
}

const createNewid = () => {
	let checker = validator();
	if (checker !== 'invalid') {
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
	}else {
		alert('Empty input');
	}

};

function savedata () {
	let data = JSON.parse(localStorage.getItem("newxdata"));
	 db.collection("citycoinUsers").add(data)
	.then((docRef) => {
		alert("Your details have been submitted successfully!");
		localStorage.removeItem('userxdata');
		//fetchLoans();
		document.querySelector('.modal').style.display='none';
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

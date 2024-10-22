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


var newCid, documentIndex;

window.addEventListener('load', function() {
	/*togglepage("mainpage");  //toggleCurrentPage("mainpage"); */ });

const myobserver = new MutationObserver(entries => {
	applyListData();
});
const myElement = document.getElementById('guaranta');
myobserver.observe(myElement, {
	attributes: true,
});
getGarantalist();

function getRandomNumber(min, max) {
	var minn = Math.ceil(min);
	var maxx = Math.floor(max);
	return (Math.floor(Math.random() * (maxx - minn)) + minn);
}

function toggleParentPages(name) {
	var i, x, p;
	n = document.getElementsByClassName(name);
	for (i = 0; i < n.length; i++) {
		x = n[i];
		p = x.parentElement;
		if (x.classList.contains(n)) {
			x.classList.add('shown');
			p.classList.add('shown');
		} else {
			x.classList.remove('shown');
			p.classList.add('shown');
		}
	}
}

function showhideElements(name) {
	let x = document.querySelectorAll('.optionlist');
	for (i = 0; i < x.length; i++) {
		if (x[i].classList.contains(name) && !x[i].classList.contains('shown')) {
			x[i].classList.add('shown');
		} else {
			x[i].classList.remove('shown');
		}
	}
}

function radioclicked(radio, inptid) {
	let value = null;
	let x = document.getElementsByName(radio);
	let input = document.getElementById(inptid);
	for (var i = 0; i < x.length; i++) {
		if (x[i].type == 'radio' && x[i].checked == true) {
			value = x[i].value;
		}
	}
	input.value = value;
	radioValueChanged(radio, inptid);
}

function radioValueChanged(radio, inputid) {
	let radios = document.getElementsByName(radio);
	let nput = document.getElementById(inputid);
	let inputtext = document.querySelector('.' + radio);
	let parntText = '';

	let plans = document.querySelector('.instalplans');
	for (var i = 0; i < radios.length; i++) {
		if (nput.value > 0 && radios[i].value == nput.value) {
			radios[i].checked = true;
			parntText = radios[i].parentElement.innerText;
		} else {
			radios[i].checked = false;
		}

		if (nput.value == 2 && radio == 'payplan') {
			plans.classList.add('shown');
		} else if (nput.value == 1 && radio == 'payplan') {
			plans.classList.remove('shown');
			document.getElementById('inputinstplans').value = '';
		} else {
			plans.classList.remove('shown');
		}
	}
	inputtext.value = parntText;
}

function isNumberKey(evt, element) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8))
		return false;
	else {
		var len = $(element).val().length;
		var index = $(element).val().indexOf('.');
		if (index > 0 && charCode == 46) {
			return false;
		}
		if (index > 0) {
			var CharAfterdot = (len + 1) - index;
			if (CharAfterdot > 3) {
				return false;
			}
		}
	}
	return true;
}

function inputCurrency() {
	var myinput = document.getElementById("inputamount");
	var number = parseFloat((myinput.value).replace(/[^0-9\.-]+/g, ""));
	document.getElementById("inputamnt").value = number;
}

//ondrop="return false;" onpaste="return false;" oncontextmenu="return false;" 

function setLocalDataToCloud() {
	var datas = Object.values(Loans);
	var key = '';
	var obj;
	for (var i = 0; i < datas.length; i++) {
		key = datas[i].lid.toString();
		obj = datas[i];

		db.collection("loans").doc(key).set(obj);
	}
}
const createnewuserid = () => {
	let indexes = [];
	let rdm = getRandomNumber(1000001, 9999999);
	db.collection('citycoinCloudloans').get().then(snap => {
		snap.forEach(doc => {
			indexes.push(doc.data().lid);
		});
		if (indexes.length > 0) {
			if (rdm.toString().length == 7 && indexes.includes(rdm) == false) {
				createUpdateLoan(rdm);
			} else {
				createnewuserid();
			}
		} else {
			createUpdateLoan(1000001);
		}
	});
};

function createUpdateLoan(newuserid) {
	let max;
	let data = currentClient;

	function addzero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	const d = new Date();
	let h = addzero(d.getHours());
	let m = addzero(d.getMinutes());
	let s = addzero(d.getSeconds());
	let time = h + ":" + m + ":" + s;

	let amont = document.getElementById("inputamnt").value;
	let weeks = document.getElementById("inputweeks").value;
	let reason = document.getElementById("inputobjectives").value;
	let payplan = document.getElementById("inputpayplan").value;
	let instplan = document.getElementById("inputinstplans").value;
	let garantaid = document.getElementById("inputgrantaid").value;
	//let userid = document.getElementById("inputcurrentuser").value;

	var newloan = {
		no: 2,
		lid: newuserid,
		cid: data.id,
		period: weeks,
		duedate: '',
		amount: parseFloat(amont),
		//intrst:   0,
		//total:    0,
		//bal:      0,
		reason: reason,
		pyplan: payplan,
		intplan: instplan,
		gid: garantaid,
		date: d.toLocaleDateString(),
		time: time,
		sec: s,
		min: m,
		hour: h,
		day: d.getDate(),
		month: d.getMonth() + 1,
		year: d.getFullYear(),
		sid: ''
	};
	db.collection("citycoinCloudloans").doc(newuserid.toString())
		.set(newloan).then(() => {
			alert('new loan saved successfully');
			openCloseforms('loanform', 'exit');
			fetched_loans();
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
}

document.getElementById('inputamount').onblur = function(event) {
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'Ksh',
	});
	var newinput = document.getElementById("inputamnt").value;
	var myinput = document.getElementById("inputamount");
	var currency = parseFloat(newinput.replace(/[^0-9\.-]+/g, ""));
	myinput.value = `${USDollar.format(currency)}`;
};

document.querySelector(".loanform").addEventListener("click", function(e) {
	e = window.event || e;
	if (e.target.id == 'inputobjectives2') {
		showhideElements('objectives');
	} else if (e.target.id == 'inputgrantaname') {
		showhideElements('garantas');
	} else if (e.target.id == 'inputperiod') {
		showhideElements('periods');
	} else {
		showhideElements('');
	}
});

const formreset = (formid) => {
	document.getElementById(formid).reset();
	document.querySelector('#photoicon').value ='';
};

function getGarantalist() {
	let list = document.getElementById('guaranta');
	list.dataset.clientList = JSON.stringify(arrayusers);
}

function applyListData() {
	let list = document.getElementById('guaranta');
	let data = JSON.parse(list.dataset.clientList);

	let x = data.length;
	for (let i = 0; i < x; ++i) {
		let li = document.createElement('label');
		li.className = 'radio';
		let rdo = document.createElement('input');
		rdo.name = 'garanta';
		rdo.type = 'radio'; //rdo.value = i.toString();   
		let spn = document.createElement('span');
		spn.className = 'checkmark';
		rdo.value = String(data[i].id);

		li.innerText = data[i].firstname + ' ' + data[i].lastname;
		li.appendChild(rdo);
		li.appendChild(spn);
		list.appendChild(li);
	}
}


//  -------  NEW CLIENT

function newUserdata() { 
	const newdata = {
		cid: 			newCid,
		firstname: 		document.getElementById("fisrtname").value,
		secondname: 	document.getElementById("secondname").value,
		lastname: 		document.getElementById("lastname").value,
		email: 			document.getElementById("emailaddress").value,
		birthdate: 		document.getElementById("birthdate").value,
		gender: 		document.getElementById("inputgenda").value,
		marital: 		document.getElementById("inputmarital").value,
		idnumber: 		document.getElementById("idnumber").value,
		currenttown:	document.getElementById("Currenttown").value,
		sublocation:	document.getElementById("sublocation").value,
		homeaddress:	document.getElementById("currentaddress").value,
		phonenumber:	document.getElementById("phonenumber").value,
		othernumber:	[],
		imagelink: 		document.getElementById("input_downloadURL").value,
		date: 			new Date().toLocaleDateString()
	};
	localStorage.setItem('newuserdata', JSON.stringify(newdata));
}

const resizeImage = () => {
	let resize_width = 300;
	let item = document.querySelector('#inputfilephoto').files[0];
	let preview = document.querySelector('#photoicon');
	let reader = new FileReader();
	reader.readAsDataURL(item);
	reader.name = item.name;
	reader.size = item.size;
	reader.onload = function(event) {
		let img = new Image();
		img.src = event.target.result;
		img.name = event.target.name;
		img.size = event.target.size;
		img.onload = function(el) {
			let elem = document.createElement('canvas');
			let scaleFactor = resize_width / el.target.width;
			elem.width = resize_width;
			elem.height = el.target.height * scaleFactor;
			let ctx = elem.getContext('2d');
			ctx.drawImage(el.target, 0, 0, elem.width, elem.height);
			let srcEncoded = ctx.canvas.toDataURL('image/png', 1);
			preview.src = srcEncoded;
			uploadimage(srcEncoded);	
		};
	};
};

const uploadimage = (srcEncoded) => {
	let urlinput = document.querySelector("#input_downloadURL");
	let ref = firebase.storage().ref("/UserImages");
	let name = +new Date()+ "00000";
	ref.child(name).putString(srcEncoded, 'data_url').then((snapshot) => snapshot.ref.getDownloadURL()).then(myurl => {
		if (myurl !== '') {
			urlinput.value = myurl;
			urlinput.classList.add('uploaded');
			newUserdata();
		}
	});
};

const saveNewuser = () => {
	let data = JSON.parse(localStorage.getItem("newuserdata"));
	 db.collection("citycoinCloudusers").add(data)
	.then((docRef) => {
		downloadUsers();
		alert("Document "+ docRef.id +" successfully written!");
		openCloseforms('clientform', 'exit');
		localStorage.removeItem('newuserdata');
	})
	.catch((error) => {
		alert("Error adding document: ", error);
	});
};

const getnewUserid = () => {
	let array = [];
	let rnum = getRandomNumber(1000001, 9999999);
	let ref = db.collection('citycoinCloudusers');

	ref.get().then(snap => {
		snap.forEach(doc => {
			array.push(doc.data().cid);
		});
		if (array.length > 0) {
			if (rnum.toString().length == 7 && array.includes(rnum) == false) {
				newCid = Number(rnum);
				newUserdata();
				saveNewuser();

			} else {
				getnewUserid();
			}
		} else {
			newCid = 1000001;
			newUserdata();
			saveNewuser();
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















/*

//  load home page
//window.addEventListener('load', function() {
//  document.getElementById("homepage").style.display="flex";
//})

function showhomepage() {
  document.getElementById("homepage").style.display="flex";
}

function resetfields() {
  document.getElementById("signin_form").reset();
  document.getElementById("signup_form").reset();
}

function hidedropList(elemnt) {
    var elem = document.querySelector(elemnt);
    if (elem.classList.contains("shown")){
      elem.classList.remove("shown");
    }else{
      elem.classList.add("shown");
    }
  }
  
  function selected(val) {
    var inputvalue = document.getElementById('inpt');
      inputvalue.defaultValue = val;
      inputvalue.dispatchEvent(new Event("input", { bubbles: true }));
      document.querySelector(".dropdown").classList.remove("shown");
  }

  document.getElementById("clientbtnNext");


  function resized() {
    var wd = window.innerWidth;
    document.getElementById("pagewidth").innerHTML = wd;
}



function resetclass(clss) {
  var i, x = document.getElementsByClassName(clss);
  for (i = 0; i < x.length; i++) {x[i].classList.remove('shown');}
}



// ***********  LISTINGS  ****************************
function viewlistings(cname) {
  resetclass("dash");

  var i, x, p; n = document.getElementsByClassName("list"); 
  for (i = 0; i < n.length; i++) {
    x = n[i];  p = x.parentElement;
    if (x.classList.contains(cname)) { 
      x.classList.add('shown'); p.classList.add('shown');
    }else { x.classList.remove('shown'); p.classList.add('shown');}
  }
  var t = document.getElementById('listName');
  if (cname=='clientslist') {t.innerHTML="Clients"}
  else if (cname=='stafflist') {t.innerHTML="Staff"}
  else if (cname=='supplierslist') {t.innerHTML="Suppliers"}
  else if (cname=='requestslist') {t.innerHTML="Requests"}
  else if (cname=='loanslist') {t.innerHTML="Loans"}
  else if (cname=='paymentslist') {t.innerHTML="Payments"}
  else if (cname=='callslist') {t.innerHTML="Calls"}
  else if (cname=='reportslist') {t.innerHTML="Reports"}
  else if (cname=='settingslist') {t.innerHTML="Settings"}
  else {t.innerHTML=""}
  sessionStorage.navigation = cname;
}
function exitListings() {
  resetclass("dash");
  var i, x = document.getElementsByClassName("list");
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove('shown');
  }
  document.querySelector(".dashbord").classList.add('shown');
}

// ***********  TOGGLE FORMS ************

function clientforms(clss) {
  var x = document.querySelector("."+clss);
  resetclass("home");
  x.classList.add('new')
  x.parentElement.classList.add('shown');
   
}

function exitClientform() {
  var x, i, y = document.getElementsByClassName('home');
  x = document.querySelector(".clientform");

  for (i = 0; i < y.length; i++) {y[i].classList.add('shown');}
  x.classList.remove('new');
  x.parentElement.classList.remove('shown');
}

function toggleformsxxxx(clss) {
  resetclass("home");
  var i, x, p; n = document.getElementsByClassName("form"); 

  for (i = 0; i < n.length; i++) { x = n[i]; p = x.parentElement;
    if (x.classList.contains(clss)) { 
      x.classList.add('new'); p.classList.add('shown');
    }else { x.classList.remove('new'); p.classList.add('shown');}
  }
}


function exitform(clss) {
  resetparents("home");
  var x = document.getElementsByClassName("clss");
    x.classList.remove('new');
    x.parentElement.classList.remove('shown')
}
function closeFormxx(clss) {
  var i, x, y= document.getElementsByClassName('home');
  for (i = 0; i < y.length; i++) {y[i].classList.reset}

  var x = document.querySelector('.'+clss);
  x.classList.remove('new')
  //x.parentElement.classList.remove('shown')
}


// *********** CLIENT INPUT ENTRY ****************************


function  saveVal() {
  var newClient = {
    //cid : document.getElementById("cid").value,
    firstname : document.getElementById("fisrtName").value,
    secondname: document.getElementById("secondName").value,
    lastname : document.getElementById("lastName").value,
    birthdate: document.getElementById("birthDate").value,
    gender: document.getElementById("inputgender").value,
    marital: document.getElementById("inputmarital").value,
    idnumber: document.getElementById("IdNumber").value,
    krapin: document.getElementById("currentTown").value,
    email: document.getElementById("sublocation").value,
    phoneno: document.getElementById("phoneNum").value
  }; 
  localStorage.setItem('clients',JSON.stringify(newClient)); 
}
 function getlist() {
  var n = JSON.parse(localStorage.getItem('clients'));
  alert(n.firstname.length)
 }
 //getlist();

function saveNewclient() {
  var newData = {
    id:	14,
    name: 'jonhson',
    age:	'24',
    town:	'Msa'
  };
  
  var mylist=[];
  
  var arr= localStorage.getItem('clients');
  if(arr && Object.keys(arr).length > 0){
     mylist=JSON.parse(arr);
     mylist.push(newData);
     localStorage.setItem('clients',JSON.stringify(mylist));

  }else{
     mylist.push(newData);
     localStorage.setItem('clients',JSON.stringify(mylist));
  }
  var i, x = document.getElementsByClassName("parent");
  for (i = 0; i < x.length; i++) {
      x[i].classList.remove('shown');
  }
  console.log(JSON.parse(localStorage.getItem('clients')));
  document.querySelector('.lisitem').innerHTML=JSON.parse(localStorage.getItem('clients')).jonhson;

}


function loadData() {
  for (i = 0; i < dataArray.length; i++) {
    var xdiv = document.createElement('div');
    xdiv.id = "xdiv";
    xdiv.className = "xdiv";
    xdiv.innerHTML = dataArray[i];
    xdiv.innerText= dataArray[i].make +" "+dataArray[i].model;
    
    
    var imgx = document.createElement('img');
    imgx.src = dataArray[i].imageslink;
   	imgx.id='imgx';
    imgx.className='imgx';
    imgx.setAttribute('width', '50px');
    imgx.setAttribute('height', '50px');
    xdiv.appendChild(imgx);
    
    document.getElementById("listgrid").appendChild(xdiv);

  }
}
var frm = document.querySelector('.active');
var currentTab =0;
showTabs(currentTab);

window.onload = function(){ 
  resetforms();
  setDatepicker()
}

// =======================================================
function resetforms() {
  document.getElementById("newClient").reset();
  document.getElementById("newLoan").reset();
 }

function validateInputs() {
  var  x, d, i, valid = true;
  x = frm.getElementsByClassName("tab");
  d = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < d.length; i++) {
    if (d[i].value == "") { d[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    frm.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function showTabs(n) {
  var x = frm.getElementsByClassName("tab");
  x[n].style.display = "block";

  var p =document.getElementById("prevBtn");
  var t =document.getElementById("nextBtn");
  
  if (n > 0) {
    p.style.display = "inline";
  }else {
    p.style.display = "none";
  }

  if (n == (x.length - 1)) {
    t.innerHTML = "Submit";
  } else {
    t.innerHTML = "Next";
  }
  stepIndicator(n)
}

function stepIndicator(n) {
  var i, x;
  x = frm.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

function nextprevious(n) {
  var x = frm.getElementsByClassName("tab");
  if (n == 1 && !validateInputs()) return false;
  x[currentTab].style.display = "none";

  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    frm.getElementById("newLoan").submit();
    return false;
  }
  showTabs(currentTab)
}

function workStatus() { 
  var a,b,c,d,e,x,t;
  x = document.getElementById('currentWork');

  a = document.getElementById('empName').nextSibling;
  b = document.getElementById('empPosition').nextSibling;
  c = document.getElementById('empTown').nextSibling;
  d = document.getElementById('empLocation').nextSibling;
  e = document.getElementById('empContact').nextSibling;
  t = document.getElementById('wrkStatus').nextSibling;
  //f = document.getElementById('empPictures');

  if (x.classList.contains('business')|| x.classList.contains('retired')) {
    t.innerHTML = 'Business info.'
    a.placeholder = "Business type";
    b.placeholder = "Business name";
    c.placeholder = "ownership";
    d.placeholder = "Business ownership";
    e.placeholder = "Business location"; //f.placeholder = "Business pictures";
  }else {
    t.innerHTML = 'Employer info.'
    a.placeholder = "Co.name";
    b.placeholder = "Current position";
    c.placeholder = "City/Town";
    d.placeholder = "Physical location";
    e.placeholder = "Employer contact"; //f.display = "none";
  }
}

function fileInputclick(input_id) {
  document.getElementById(input_id).click();
}

function resize() {
  var resize_width = 300;
  var item = document.querySelector('#inputUploader').files[0];

  var reader = new FileReader();
  reader.readAsDataURL(item);
  reader.name = item.name;
  reader.size = item.size;

  reader.onload = function(event) {
      var img = new Image();
      img.src = event.target.result;
      img.name = event.target.name;
      img.size = event.target.size;

      img.onload = function(el) {
          var elem = document.createElement('canvas');
          var scaleFactor = resize_width / el.target.width;
          elem.width = resize_width;
          elem.height = el.target.height * scaleFactor;
          var ctx = elem.getContext('2d');
          ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

          var srcEncoded = ctx.canvas.toDataURL('image/png', 1);
          document.querySelector('#imgPreview').src = srcEncoded;
      };
  };
}

function setDatepicker() {
  var new0, new1, inputdate, min, max;
  inputdate = document.getElementById('birthDate');
  new0 = new Date();
  new0.setFullYear(new0.getFullYear()-18);
  min = new0;

  new1 = new Date();
  new1.setFullYear(new1.getFullYear()-60);
  max = new1;
  inputdate.min = max.toISOString().split("T")[0];
  inputdate.max = min.toISOString().split("T")[0];
}

function getYears(inputdate) { 
  var inpt_dob, now, diff, ageDate, age;
  inpt_dob = new Date(document.getElementById(inputdate).value);
  now = new Date(Date.now());
  diff = now-inpt_dob;
  ageDate = new Date(diff);

  age = Math.abs(ageDate.getUTCFullYear() - 1970);
  if (age > 0) {
    //document.getElementById("inputdate").value = age + ' Yrs';
  }
  document.getElementById(inputdate).dispatchEvent(new Event("input", { bubbles: true }));

  saveVal();
}

$('IdNumber').keyup(function() {
  $(this).attr('val', '');
});

document.getElementById('IdNumber').keydown(function(e) {
  e.preventDefault();
  return false;
});

function numbersOnly(evt) {
  var theEvent = evt || window.event;
  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
function limitText(limitField, limitNum) {
  if (limitField.value.length > limitNum) {
      limitField.value = limitField.value.substring(0, limitNum);
  }
}

function onInput() {
  var val = document.getElementById("input").value;
  var opts = document.getElementById('dlist').childNodes;
  for (var i = 0; i < opts.length; i++) {
    if (opts[i].value === val) {
      // An item was selected from the list!
      // yourCallbackHere()
      alert(opts[i].value);
      break;
    }
  }
}

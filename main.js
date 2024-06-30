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

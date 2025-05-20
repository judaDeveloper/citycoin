 /*==================
 FIREBASE API CONFIG
=====================*/
const firebaseConfig = {
    apiKey: "AIzaSyAHYguXNxgoBQq0rdoFOj9MMppCU9kmE-Y",
    authDomain: "citycoin2025.firebaseapp.com",
    databaseURL: "https://citycoin2025-default-rtdb.firebaseio.com",
    projectId: "citycoin2025",
    storageBucket: "citycoin2025.firebasestorage.app",
    messagingSenderId: "1024446979523",
    appId: "1:1024446979523:web:f2b3b89e039c92aaef7176"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

 /*==================
 START fs_setup_cache
=====================*/
firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
firebase.initializeApp({
    apiKey: 'AIzaSyDZOkXdDSaw1xwonO7L8GcdSfQUtbSMM4c',
    authDomain: 'cars-digital-3c158.firebaseapp.com',
    projectId: 'cars-digital-3c158',
} ,"persisted_app");

 /*===================
 initialize_persistence
======================*/
firebase.firestore().enablePersistence()
.catch((err) => {
    if (err.code == 'failed-precondition') { 

    } else if (err.code == 'unimplemented') { 

    }
});


/*==============
	Current Form 
----------------*/
let current_tab = 0;
let current_form = document.createElement("newclient");

/*===================
  Client Form Inputs
---------------------*/
let fname = document.getElementById("fname");
let sname = document.getElementById("sname");
let lname = document.getElementById("lname");
let dateob = document.getElementById("dateob");
let gender = document.getElementById("genda");
let marital = document.getElementById("marital");
let imageurl = document.getElementById("imageurl");

let idnum = document.getElementById("idnumber");
let krapin = document.getElementById("krapin");
let email = document.getElementById("emailinput");
let mobno1 = document.getElementById("mobnumber1");
let mobno2 = document.getElementById("mobnumber2");
let mobno3 = document.getElementById("mobnumber3");

let county = document.getElementById("county");
let currtown = document.getElementById("town");
let subcounty = document.getElementById("subcounty");
let sublocation = document.getElementById("sublocation");
let physical_address = document.getElementById("physical_address");

let w_status = document.getElementById("w_status");
let w_name = document.getElementById("w_name");
let w_type = document.getElementById("w_type");
let w_town = document.getElementById("w_town");
let w_contact = document.getElementById("w_contact");

let nok_name = document.getElementById("nok_name");
let nok_relation = document.getElementById("nok_relation");
let nok_town = document.getElementById("nok_town");
let nok_area = document.getElementById("w_town");
let nok_tel = document.getElementById("nok_contact");

/*=========================
	Current Form DropLists
--------------------------*/
let currentdropList = document.createElement("ul");
let dropdowns = current_form.querySelectorAll(".dropdwn");

/*=========================
	Current Inputs/Dropdowns
--------------------------*/
let currentInput = document.createElement("input");
let currentInputs = current_form.querySelectorAll(".lbl .nput");

/*====================
	Get Years List
----------------------*/
let yearOfFset = 55;
const getYears = (Year) => {
  let yrs = [];
  for (var i = 0; i < yearOfFset; i++) {
    yrs.push(Year - 18 - i);
  }
  return yrs;
};
/*====================
	Get Days List
----------------------*/
const getmonthDays = (mon, yr) => {
  let list = [];
  let d = new Date(yr, mon, 0).getDate();
  for (var i = 0; i < d; i++) {
    list.push(i + 1);
  }
  return list;
};
/*====================
	Age Calculator
----------------------*/
const CalculatorAge = (dt) => {
  let userdate = dt;
  let dob = new Date(userdate);
  if (userdate == null || userdate == "") {
    return false;
  } else {
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    return age;
  }
};
/*====================
	Validate Number Input
----------------------*/
function validatenumber(evt) {
  var theEvent = evt || window.event;
  if (theEvent.type === "paste") {
    key = event.clipboardData.getData("text/plain");
  } else {
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

/*====================
	CheckBox Function
  validateEmpties()
----------------------*/
function onecheckBox(cbox) {
  let id = cbox.id;
  let x = document.getElementsByName(cbox.name);
  let nput = document.getElementById(cbox.name);
  for (let i = 0; i < x.length; ++i) {
    if (x[i].id === id) {
      if (x[i].checked === true) {
        nput.value = x[i].value;
        nput.dispatchEvent(new Event("input"));
      }else {
        nput.value = "";
        nput.dispatchEvent(new Event("input"));
      }
    } else {
      x[i].checked = false;
    }
  }
  nput.dispatchEvent(new Event("change"));
}


/*====================
	GET Random Numbers
----------------------*/
function RandomNumber(min, max) {
  var minn = Math.ceil(min);
  var maxx = Math.floor(max);
  return Math.floor(Math.random() * (maxx - minn)) + minn;
}

/*====================
	 Months List
----------------------*/
let monthlist = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
/*====================
	 Fetch Data Lists
----------------------*/
const Arraylists = (list) => {
  let x = [];
  if (list == "days") {
    if (dateob.value !== "") {
      let dt = new Date(dateob.value);
      x = getmonthDays(dt.getUTCMonth() + 1, dt.getUTCFullYear());
    } else {
      x = getmonthDays(
        new Date().getUTCMonth() + 1,
        new Date().getUTCFullYear()
      );
    }
  } else if (list == "months") {
    x = monthlist;
  } else if (list == "years") {
    x = getYears(new Date().getUTCFullYear());
  } else if (list == "counties") {
    x = ["Mombasa", "Kilifi", "Kwale", "Taita Taveta", "Tana River", "Nairobi"];
  } else if (list == "towns" || list == "w_towns" || list == "nok_towns") {
    x = ["Mombasa", "Kilifi", "Kwale", "Taita Taveta", "Tana River", "Nairobi"];
  } else if (list == "subcounties") {
    x = ["Changamwe", "Kisauni", "Bamburi", "Likoni", "Mvita", "Jomvu"];
  } else if (list == "sublocations") {
    x = ["Kisauni", "Magogoni", "Ngombeni", "Mtopanga", "Junda", "Shanzu"];
  } else if (list == "w_types") {
    x = [
      "Teacher",
      "Accountant",
      "Doctor",
      "Sales",
      "Manager",
      "Director",
      "Assistant",
    ];
  } else if (list == "reasons") {
    x = [
      "Medical bill",
      "School fees",
      "Moving expenses",
      "House rent",
      "Business capital",
      "Business expenses",
      "Vehicle financing",
      "Debt clearance",
      "Education expenses",
    ];
  } else if (list == "periods") {
    x = [1, 2, 3, 4, 5, 6];
  } else if (list == "clients") {
    x = appdata.users.filter((item) => item.clss == "client");
  }
  return x;
};

/*====================
 Dropdown Static Data
----------------------*/
let static_inputs = document.querySelectorAll(
  "#county, #town, #subcounty, #sublocation, #w_type, #w_town, #nok_town"
);
static_inputs.forEach((input) => {
  if (input.name !== "") {
    let x = Arraylists(input.name);
    let list = document.getElementById(input.name);
    let r = document.createDocumentFragment();
    for (let i = 0; i < x.length; i++) {
      let li = document.createElement("li");
      li.dataset.data = JSON.stringify(x[i]);
      li.innerHTML = "<p>" + x[i] + "</p>";
      r.appendChild(li);
    }
    list.replaceChildren(r);
  }
});

/*====================
 Dropdown Dynamic Data
----------------------*/
const dynamic_data = (input, list) => {
  if (input) {
    let x = Arraylists(input.id);
    let grid = document.createElement("ul");
    grid.id;
    let r = document.createDocumentFragment();
    for (let i = 0; i < x.length; i++) {
      let li = document.createElement("li");
      li.dataset.data = JSON.stringify(x[i]);
      li.innerHTML = "<p>" + x[i] + "</p>";
      r.appendChild(li);
    }
    list.replaceChildren(r);
  }
};

/*====================
 Form Inputs Clicked
----------------------*/
function set_newPosition(input) {
  let ol = input.offsetLeft;
  let ow = input.offsetWidth;
  let ot = input.offsetTop;
  let oh = input.offsetHeight;

  currentdropList.style.display = "grid";
  currentdropList.style.left = `${ol}px`;
  currentdropList.style.top = `${ot + 2 + oh}px`;
  currentdropList.style.minWidth = `${ow}px`;

  if (input.id == "days" || input.id == "months" || input.id == "years") {
    currentdropList.style.left = `${ol - 10}px`;
    currentdropList.style.top = `${ot + 9 + oh}px`;
    currentdropList.style.maxWidth = "42%";
  }
}

function showHide(disp) {
  if (disp == "" || disp == "none") {
    set_newPosition(currentInput);
  } else {
    currentdropList.style.display = "none";
  }
}

/*====================
 Form Inputs Clicked
----------------------*/
currentInputs.forEach((input) => {
  input.addEventListener("click", function () {
    currentInput = this;
    let elem_name = this.name;
    if (elem_name) {
      currentdropList = this.parentElement.querySelector("#" + elem_name);
      let disp = currentdropList.style.display;
      showHide(disp);
    }
  });
});



/*===============================
 Close dropLists on window click
--------------------------------*/
window.addEventListener("mouseup", function (e) {
  dropdowns.forEach((item) => {
    if (!e.target.closest(".dropdwn") && !(e.target == currentInput)) {
      item.style.display = "none";
    }
  });
});

/*====================
 Dates Inputs
----------------------*/
let days = document.getElementById("days");
let months = document.getElementById("months");
let years = document.getElementById("years");

function fetchdates(d0, m0, y0) {
  let dt = new Date();
  let d = dt.getDate();
  let m = dt.getMonth();
  let y = dt.getFullYear();
  
  if (d0.value !== "DD" && m0.value !== "MM" && y0.value !== "YY") {
    d = parseInt(d0.value);
    m = monthlist.indexOf(m0.value);
    y = parseInt(y0.value);
    dt.setDate(d);
    dt.setMonth(m);
    dt.setFullYear(y);
    dateob.value = dt;
    dateob.dataset.age = CalculatorAge(dt);
    dateob.dispatchEvent(new Event("input"));
  }
  if (dateob.value) {;  
    dt = new Date(dateob.value.toString());
    d = dt.getDate();
    m = dt.getMonth();
    y = dt.getFullYear();
    days.value = d;
    months.value = monthlist[m];
    years.value = y;
  }
}; fetchdates(days, months, years);

/*====================
 Dates Inputs Clicked
----------------------*/
let dates_inputs = document.querySelectorAll("#days, #months, #years");
dates_inputs.forEach((input) => {
  input.addEventListener("click", function () {
    currentInput = this;
    let elem_id = this.id;
    let elem_name = this.name;
    if (elem_name) {
      currentdropList = current_form.querySelector("#" + elem_name);
      let disp = currentdropList.style.display;
      if (elem_id == "days" || elem_id == "months" || elem_id == "years") {
        dynamic_data(currentInput, currentdropList);
      }
      showHide(disp);
    }
  });
  input.addEventListener("input", function () {
    fetchdates(days, months, years);
  });

});

/*==============================
 Vissible Dropdown List Clicked
-------------------------------*/
dropdowns.forEach((item) => {
  item.addEventListener("click", (e) => {
    let li = e.target.closest("li");
    let txt = li.innerText.replace(/\s/g, "");
    let data = JSON.parse(li.dataset.data);
    currentInput.dataset.id = data;
    currentInput.value = txt;

    let id = currentInput.id;
    if (id == "days" || id == "months" || id == "years") {
      //fetchDates(days, months, years);
      fetchdates(days, months, years);
      document.getElementById("dates").style.display = "none";
    }
    currentInput.dispatchEvent(new Event("input"));
  });
  item.style.display = "none";
});

/*=====================
  Set Full Names
-----------------------*/
const setfullname = () => {
  let x;
  if (lname.value !== "") {
    x = lname.value + " " + fname.value;
  } else {
    x = sname.value + " " + fname.value;
  }
  return x;
};

/*=====================
  Image File Input
-----------------------*/
const resizeimage = () => {
  let mg = document.getElementById("inputimage").files[0];
  let reader = new FileReader();
  reader.readAsDataURL(mg);
  reader.name = mg.name;
  reader.size = mg.size;

  reader.onload = function (event) {
    let img = new Image();
    img.src = event.target.result;
    img.name = event.target.name;
    img.size = event.target.size;

    img.onload = function (el) {
      let x = document.createElement("canvas");
      let W = el.target.width;
      let H = el.target.height;
      if (H > W) {
        x.height = 160;
        x.width = Math.round((W * 160) / H);
      } else if (W > H) {
        x.width = 150;
        x.height = Math.round((H * 150) / W);
      } else {
        x.width = 150;
        x.height = 160;
      }
      let cx = x.getContext("2d");
      cx.drawImage(el.target, 0, 0, x.width, x.height);
      let srcEncoded = cx.canvas.toDataURL("image/png", 1);
      imageurl.value = srcEncoded;
      imageurl.dispatchEvent(new Event("input"));
      imageurl.dispatchEvent(new Event("change"));
    };
  };
};
const imageurlChanged = (input) => {
  if (input.value) {
    document.getElementById("imgpreview").src = input.value;
  }
};
imageurlChanged(imageurl);

  /*=====================
  Fetch Form Data
-----------------------*/
  function newuserdata(cid) {
    let fxname = setfullname().toLowerCase();
    //fxnames.innerText = fxname.replace(/\b\w/g, (s) => s.toUpperCase());

    const newdata = {
      cid: cid.toString(),
      clss: "client",
      names: [fname.value, sname.value, lname.value, fxname],
      birthdate: dateob.value,
      gender: gender.value,
      marital: marital.value,
      idnumber: idnum.value,
      krapin: krapin.value,
      email: email.value,
      contacts: [
        mobno1.value.toString(),
        mobno2.value.toString(),
        mobno3.value.toString(),
      ],
      address: [
        county.value,
        currtown.value,
        subcounty.value,
        sublocation.value,
        physical_address.value,
      ],
      workstatus: [w_status, w_name, w_type, w_town, w_contact],
      nokin: [nok_name, nok_relation, nok_town, nok_area, nok_tel],

      images: [imageurl.value],
      regdate: new Date().toLocaleDateString(),
    };
    sessionStorage.setItem("cc_newuser", JSON.stringify(newdata));
  };

/*=====================
 Validate Email  Input
-----------------------*/
email.addEventListener("blur", () => {
  if (email.value !== "") {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value.match(emailRegex)) {
      email.className = "nput";
      return;
    }
    email.className = "nput invalid";
  }
});

/*============================
   Work Status Changed
------------------------------*/
let w1 = document.querySelector(".pod.wname");
let w2 = document.querySelector(".pod.wtype");
let w3 = document.querySelector(".pod.wtown");
let w4 = document.querySelector(".pod.wcontact");
let w5 = document.querySelector(".lbl.docs");

function w_statusChanged() {
  if (w_status.value == "business") {
    w1.innerText = "Business name";
    w2.innerText = "Business type";
    w3.innerText = "Business location";
    w4.innerText = "Business contact";
    w5.style.display = 'grid';
  } else {
    w1.innerText = "Company name";
    w2.innerText = "Current position";
    w3.innerText = "Company location";
    w4.innerText = "Company contact";
    w5.style.display = "none";
  }
}
///w_statusChanged();

/*============================
   Current Form Input Changes
------------------------------*/
currentInputs.forEach((nput) => {
  nput.addEventListener("input", (e) => {
    newuserdata("");
  });

  nput.addEventListener("change", (e) => {
    w_statusChanged();
  });

  nput.addEventListener("blur", function () {
    let txt = nput.value;
    if (nput.type == "email") {
      nput.value = txt.toLowerCase();
    } else {
      nput.value = txt.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
    }
  });
});


/*========================
   Create New Client ID
-------------------------*/
const createnew_id = () => {
  let arry = [];
  let ref = db.collection("cc_userdata");
  let random = RandomNumber(100000, 999999);

  ref.get().then((snap) => {
    snap.forEach((doc) => {
      arry.push(doc.data().cid);
    });
    let newid = 1000001;
    if (arry.length > 0) {
      if (random.toString().length == 6 && arry.includes(random) == false) {
        newid = Number(random);
        newuserdata(newid);
        submitnewClient();

      } else { 
        createnew_id();
      }
    } else {
      newuserdata(newid);
      submitnewClient();
    }
  });
};

/*======================
  Form Tabs Navigation
------------------------*/
const netxt_tab = (step) => {
  if (step > 0 && current_tab < 5) {
    current_tab = current_tab + step;
  } else if (step < 0 && current_tab > 0) {
    current_tab = current_tab + step;
  }
  let tabs = current_form.querySelectorAll("table td");
  for (let i = 0; i < tabs.length; i++) {
    //tabs[i].style.display = "none";
    tabs[i].classList.remove("shown");
    if (i == current_tab) {
      //tabs[i].style.display = "grid";
      tabs[i].classList.add('shown');
    }
  }
  let x = document.querySelectorAll(".submit .btn");
  if (current_tab > 0) {
    x[0].classList.add("shown");
  } else {
    x[0].classList.remove("shown");
  }
  if (current_tab == 5) {
    x[1].innerText = "SUBMIT";
  }
};
netxt_tab(0);


/*=====================
  Validate Empty Inputs
-----------------------*/
function validateEmpties() {
  let valid = true;
  let td = current_form.querySelectorAll("form td");
  let x = td[current_tab].querySelectorAll(".nput");
  dates_inputs.forEach((input) => {
    if (input.classList.contains("invalid")) {
      dateob.classList.add("invalid");
    } else {
      dateob.classList.remove("invalid");
    }
  });

  for (let i = 0; i < x.length; i++) {
    if (x[i].id !== "mobnumber3") {
      if (x[i].value == "" || x[i].classList.contains("invalid")) {
        x[i].classList.add("invalid");
        valid = false;
      }
    }
  }
  if (valid) {
    if (current_tab == 5) {
      //createnew_id();
    } else {
      netxt_tab(1);
    }
  }
}

/*=====================
  Submit and Save Client
-----------------------*/
function submitnewClient() {
  let data = JSON.parse(sessionStorage.getItem("cc_newuser"));
  db.collection("cc_userdata").add(data).then((docRef) => {
    alert("Saved successfully!");
    document.querySelector("#modal").style.display = "none";
    sessionStorage.removeItem("cc_newuser");
    document.getElementById("newclient").reset();
  }).catch((err) => {
    if (err.code !== "") {
      alert("Error adding document: ", err);
    }
  });
}

let forms = document.querySelectorAll(".forms form");

function open_forms(fm) {

  //current_form = document.getElementById(fm);
  for (let i = 0; i < forms.length; i++) {
    forms[i].classList.remove("shown");
    if (forms[i].id == fm) {
      current_form = forms[i];
      let disp = current_form.style.display;
      if (disp == "" || disp == "none") {
        current_form.classList.add("shown");
        netxt_tab(0);
      } else {
        current_form.classList.remove("shown");
      }
    }else {
      forms[i].classList.remove("shown");
    }
  }
}
        netxt_tab(1);

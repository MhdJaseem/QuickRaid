// index.js
var des = document.getElementsByClassName("des");
var dep = document.getElementsByClassName("dep");
var date = document.getElementsByClassName("date");
var time = document.getElementsByClassName("time");
var apiData;
var busCard = document.getElementsByClassName("bus-card");
var busContent = document.getElementsByClassName("bus-content");
var from = document.getElementById("from");
var to = document.getElementById("to");
var search = document.getElementById("search");
var indBusoverall = document.getElementById("ind-bus-overall");
var indDep = document.getElementsByClassName("ind-dep");
var indDes = document.getElementsByClassName("ind-des");
var indDate = document.getElementsByClassName("ind-date");
var indTime = document.getElementsByClassName("ind-time");
var indTitle = document.getElementById("ind-title");
var indImg = document.getElementById("ind-img");
var viewBtn = document.getElementsByClassName("view-btn");
var book = document.getElementById("book");

var val = false;
var a;
var pop = document.getElementById("pop");
// apicall
let apiCall = fetch(
  "https://668400cf56e7503d1adefefc.mockapi.io/quickride/loc"
);
const data = apiCall.then((item) => item.json());

data.then((value) => {
  console.log(value);
  apiData = value;
  console.log(apiData);
  for (let i = 0; i < apiData.length; i++) {
    dep[i].innerText = apiData[i]["departure"].toUpperCase();
    des[i].innerText = apiData[i]["destination"].toUpperCase();
    date[i].innerText = apiData[i]["date"].toUpperCase();
    time[i].innerText = apiData[i]["time"].toUpperCase();

    // console.log(indDep[i] + "hi");
    console.log(dep[3].innerText);
    console.log(apiData[3].departure);
  }

  // buses.html (handles ticket booking and view seats)

  for (let i = 0; i < apiData.length; i++) {
    viewBtn[i].onclick = function () {
      seat();
    };
    function seat() {
      document.getElementById("seat-overall").style.display = "flex";
      console.log(i);
      section = i;

      pop.style.display = "none";
    }
    book.onclick = function () {
      ticket();
    };
    const ticket = () => {
      pop.style.display = "flex";
      console.log(section + "ticket");
      document.getElementById("place").innerText = `Seat No : ${check}`;
      document.getElementById("count").innerText = `count  : ${check.length}`;
      document.getElementById(
        "ticket-dep"
      ).innerText = `Departure : ${apiData[section].departure}`;
      document.getElementById(
        "ticket-des"
      ).innerText = `Destination : ${apiData[section].destination}`;
      document.getElementById(
        "ticket-date"
      ).innerText = `Date : ${apiData[section].date}`;
      document.getElementById(
        "ticket-time"
      ).innerText = `Time : ${apiData[section].time}`;
      document.getElementById(
        "ticket-fare"
      ).innerText = `Fare(per person): ₹${fare}`;
      document.getElementById("amount-fare").innerText = ` ${fare}`;
      document.getElementById("amount-count").innerText = `x ${check.length}`;
      document.getElementById("amount-total").innerText = `Total  => ₹${
        fare * check.length
      }`;
    };
  }
});

// index.html (handles and filter the search results)
setTimeout(function () {
  search.onclick = function () {
    searching();
  };

  function searching() {
    console.log("abc");
    console.log(from.value);
    console.log(to.value);
    var start = from["value"].toUpperCase();
    var end = to["value"].toUpperCase();
    console.log(start);
    console.log(end);
    for (i = 0; i < apiData.length; i++) {
      var count = false;
      if (
        start == apiData[i]["departure"].toUpperCase() &&
        end == apiData[i]["destination"].toUpperCase()
      ) {
        console.log("good");
        console.log(busCard[i]);

        busCard[i].style.display = "flex";
        indBusoverall.style.cssText = "display:flex";
        count = true;

        console.log(count + "hhhh");
        // busCard[i].setProperty("display", "block", "important");
      } else if (count == false) {
        busCard[i].style.display = "none";
        indImg.style.display = "block";
        indBusoverall.style.cssText = "display:flex";

        console.log("bad");
        val++;
      }
      console.log(count + "kkk");
    }
  }
}, 2000);

// handle screen resizing
document.getElementsByTagName("body")[0].onresize = function () {
  resize();
};

// buses.html (handles bus seat selecting )
var check = [];
var fare = 200;
var downld = document.getElementById("downld");
var tic = document.getElementById("ticket");

var closing = document.getElementById("closing");

document.getElementById("place").innerText = "Seat No :";
document.getElementById("count").innerText = "Count :";
var seat = document.getElementsByClassName("seat");
console.log(seat);
var cond = false;

var green = "background-color:green;color:white;";
var white = "background-color:white;color:green;:hover:background-color:green";
console.log(green);
for (arr of seat) {
  console.log("arr");
  arr.style = white;
  // arr.attributes.title.nodeValue = "kumar";
}
// this function handles each seats
function abc(value) {
  cond = !cond;
  console.log(cond);
  if (seat[value].style.backgroundColor == "white") {
    seat[value].style = green;
    check.push(value + 1);
  } else if (seat[value].style.backgroundColor == "green") {
    seat[value].style = white;
    var remove = check.indexOf(value + 1);
    check.splice(remove, 1);
  }
}

document.getElementsByTagName("body")[0].onresize = function () {
  resize();
};

//index.html (handles the text in a label)
function fromPosition() {
  document.querySelector("#from ~ label h3").style.cssText = " top:10px";
}
//index.html (handles the text in a label)
function toPosition() {
  document.querySelector("#to ~ label h3").style.cssText = " top:10px";
}
// page switches
// buses
function buses() {
  window.location.href = "./buses.html";
  console.log("buses");
}

//home
function home() {
  window.location.href = "./index.html";
}

// help
function help() {
  window.location.href = "./help.html";
}
//buses.html(onclick event to download the ticket)

downld.addEventListener("click", async function () {
  const filename = "table_data.pdf";

  try {
    const opt = {
      margin: 0,
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: [3.3, 4.35],
        orientation: "portrait",
      },
    };
    await html2pdf().set(opt).from(tic).save();
  } catch (error) {
    console.error("Error:", error.message);
  }
});

function exit() {
  pop.style.display = "none";
  console.log("close");
}
function bookExit() {
  document.getElementById("seat-overall").style.display = "none";
  window.location.reload();
}

console.log(document.getElementsByTagName("body"));

// mediaqueries nav
document.getElementsByTagName("body")[0].onresize = function () {
  resize();
};

function resize() {
  var x = window.outerWidth;
  if (x <= 800) {
    document.querySelector("#openMenu").style.cssText = "display:block;";
    document.querySelector("nav .menu").style.cssText =
      "display:none;transition:all 2s;";
    document.querySelector("#closeMenu").style.cssText = "display:none;";
  } else {
    document.querySelector("#openMenu").style.cssText = "display:none;";
    document.querySelector("nav .menu").style.cssText =
      "display:flex;transition:all 2s;";
  }
}
function menu() {
  document.querySelector("nav .menu").style.cssText =
    "display:flex;transition:all 2s;";
  document.querySelector("#closeMenu").style.cssText = "display:block;";
  document.querySelector("#openMenu").style.cssText = "display:none;";
}

function menuExit() {
  document.querySelector("nav .menu").style.cssText =
    "display:none;transition:all 2s;";
  document.querySelector("#closeMenu").style.cssText = "display:none;";
  document.querySelector("#openMenu").style.cssText = "display:block;";
}

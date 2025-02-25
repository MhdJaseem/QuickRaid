var apiData;
var dep = document.getElementsByClassName("dep");
var des = document.getElementsByClassName("des");
let date = document.getElementsByClassName("date");
let time = document.getElementsByClassName("time");
var sno = document.getElementsByClassName("sno");
var update = document.getElementsByClassName("btn-success");
var departure = document.getElementById("dep");
var destination = document.getElementById("des");
let dates = document.getElementById("dates");
let times = document.getElementById("times");
var save = document.getElementById("save");
let temp = {
  id: null,
  departure: null,
  destination: null,
  time: null,
  date: null,
};
let apiCall = fetch(
  "https://668400cf56e7503d1adefefc.mockapi.io/quickride/loc"
);

let data = apiCall.then((item) => item.json());
data.then((value) => {
  console.log(value);
  apiData = value;
});

function abc() {
  console.log(apiData);
}
// let myPromise = new Promise(function (success, fail) {
setTimeout(function () {
  console.log(apiData[1]);
  //   for (let a of apiData) {
  //     console.log(table);
  //   }
  //   apiData.forEach(function (el) {
  //     var table = document.createElement("table");
  //     table.className = " ";
  //     table.innerHTML = el;
  //     document.body.appendChild(table);
  //   });

  for (let i = 0; i < apiData.length; i++) {
    console.log(dep[i]);
    console.log(apiData[i].departure);
    dep[i].innerText = apiData[i].departure;
    des[i].innerText = apiData[i].destination;
    date[i].innerText = apiData[i].date;
    time[i].innerText = apiData[i].time;
    sno[i].innerText = i + 1;
    // dep[i].innerText = apiData[i];

    update[i].onclick = function () {
      myFunction();
    };

    console.log(temp);
    function myFunction() {
      //   update[i].innerHTML = "YOU CLICKED ME!";
      departure.value = apiData[i].departure;
      destination.value = apiData[i].destination;
      times.value = apiData[i].time;
      dates.value = apiData[i].date;

      temp.id = apiData[i].id;
      temp.departure = apiData[i].departure;
      temp.destination = apiData[i].destination;
      temp.time = apiData[i].time;
      temp.date = apiData[i].date;
      console.log(temp);
    }
  }

  save.onclick = function () {
    saveChanges();
  };

  function saveChanges() {
    fetch(
      `https://668400cf56e7503d1adefefc.mockapi.io/quickride/loc/${temp.id}`,
      {
        method: "PUT", // or PATCH
        headers: { "content-type": "application/json" },
        body: JSON.stringify(temp),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((task) => {
        // Do something with updated task
        alert("updated successfull");
        console.log(task);
      })
      .catch((error) => {
        // handle error
      });
    console.log("success");
  }
  departure.onchange = function () {
    updated();
  };
  destination.onchange = function () {
    updated();
  };
  dates.onchange = function () {
    updated();
  };
  times.onchange = function () {
    updated();
  };
  // let changed = () => {
  //   temp.dates = dates.value;
  // };
  let updated = () => {
    console.log("abc");
    temp.departure = departure.value;
    temp.destination = destination.value;
    temp.date = dates.value;
    temp.time = times.value;
    setTimeout(function () {
      location.reload();
    }, 2000);
  };
}, 2000);
// });

// myPromise.then(
//   function (value) {
//     console.log("success" + value);
//   },
//   function (error) {
//     console.log("error");
//   }
// );
// let table = document.getElementById("table").innerHTML;

// console.log(table);

// for (let i = 0; i <= 10; i++) {
//   console.log(table);
// }
// let num = ["apple", "mango", "orange"];

console.log(departure);

// modal

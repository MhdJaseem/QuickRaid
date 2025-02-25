// help
var verify = false;
var qCard = document.getElementsByClassName("q-card");
var para = document.getElementsByClassName("para");
var add = document.getElementsByClassName("add");
var remove = document.getElementsByClassName("remove");
var arr = [];
console.log(qCard);
console.log(para);
console.log(document.getElementsByTagName("body"));

document.getElementsByTagName("body")[0].onresize = function () {
  resize();
};
// document.querySelectorAll(".q-card").style.display = "none";

for (let i = 0; i < 8; i++) {
  arr[i] = false;
  console.log(arr[i]);
  qCard[i].onclick = function () {
    arr[i] = !arr[i];
    release();
    console.log(i);
  };
  function release() {
    console.log(arr[i] + "lll");
    console.log(i);

    if (arr[i] == true) {
      para[i].style.display = "flex";
      remove[i].style.display = "block";
      add[i].style.display = "none";
    } else {
      para[i].style.display = "none";
      remove[i].style.display = "none";
      add[i].style.display = "block";
    }
  }
}

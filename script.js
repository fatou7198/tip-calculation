const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipPerPerson = document.getElementById("tips-amount");
const totalPerPerson = document.getElementById("total-amount");
const tips = document.querySelectorAll(".tips");
const tipCustom = document.querySelector(".tip-custom");
const resetion = document.querySelector(".reset");
const error = document.querySelector(".error");

billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
tips.forEach(function (val) {
  val.addEventListener("click", handleclick);
});
tipCustom.addEventListener("input", tipInputFun);
resetion.addEventListener("click", reset);

billInput.value = "0";
peopleInput.value = "1";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0;
let peopleValue = 1;
let tipValue = 0.15;
let totalTipValue = 0;

function billInputFun() {
  billValue = Number(billInput.value);
  //   console.log(billValue);
  calculateTip();
}

function peopleInputFun() {
  peopleValue = parseFloat(peopleInput.value);

  totalTipValue = peopleValue * tipValue * billValue;
  //   console.log(peopleValue);
  //   calculateTip();

  if (peopleValue < 1) {
    error.style.display = "flex";
    peopleInput.style.border = "solid red";
  } else {
    error.style.display = "none";
    peopleInput.style.border = "none";
    calculateTip();
  }
}

function tipInputFun() {
  tipValue = parseFloat(tipCustom.value / 100);

  tips.forEach(function (val) {
    val.classList.remove("active-tip");
  });
  calculateTip();
}

function handleclick(event) {
  tips.forEach(function (val) {
    val.classList.remove("active-tip");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active-tip");
      tipValue = parseFloat(val.innerHTML) / 100;
      console.log(tipValue);
    }
  });
  //   console.log(tipValue);
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue + tipValue) / peopleValue;
    let total = (billValue + tipAmount) / peopleValue;
    tipPerPerson.innerHTML = "$" + totalTipValue.toFixed(2);
    totalPerPerson.innerHTML = "$" + (billValue + totalTipValue).toFixed(2);
  }
}

function reset() {
  billInput.value = "0.0";
  billInputFun();
  peopleInput.value = "1";
  peopleInputFun();
  tipCustom.value = "";
}

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@2024-05-05/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const frmCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = currCode;
    newOption.value = currCode;

    if (select.name === "From" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countrycode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amValue = amount.value;
  console.log(amValue);

  if (amValue === "" || amValue < 1) {
    amValue = 1;
    amount.value = "1";
  }
  console.log(frmCurr.value, toCurr.value);
  let URL = `${BASE_URL}/${frmCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rat = data[toCurr.value.toLowerCase()];
  let finalAmount = amValue * rat;
  msg.innerText = `${amValue}${frmCurr.value} = ${finalAmount}${toCurr.value}`;
});

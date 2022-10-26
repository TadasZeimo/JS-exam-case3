/* ------------------------------ TASK 3 -----------------------------------
Parašykite JS kodą, kuris leis vartotojui paspaudus ant mygtuko "Show users"
pamatyti vartotojus iš Github API (endpoint'as pateiktas žemiau).

Paspaudus mygtuką "Show users":
1. Pateikiamas informacijos atvaizdavimas <div id="output"></div> bloke
1.1. Informacija, kuri pateikiama: "login" ir "avatar_url" reikšmės (kortelėje)
2. Žinutė "Press "Show Users" button to see users" turi išnykti;
"
Pastaba: Informacija apie user'į (jo kortelė) bei turi turėti bent minimalų stilių;
-------------------------------------------------------------------------- */

const ENDPOINT = "https://api.github.com/users";

async function getDataFromUrl(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function drawCard(url) {
  try {
    const data = await getDataFromUrl(url);
    getLoginAvatarUrl(data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getLoginAvatarUrl(data) {
  const output = document.getElementById("output");
  output.innerHTML = "";
  data.forEach((dataItem) => {
    const cardItem = document.createElement("div");
    cardItem.classList.add("property-card");

    const urlItem = document.createElement("img");
    urlItem.src = dataItem.avatar_url;
    urlItem.classList.add("property-img");

    const loginItem = document.createElement("h3");
    loginItem.textContent = dataItem.login.toUpperCase();
    loginItem.style.color = "#47a2ad";

    cardItem.append(urlItem, loginItem);
    output.append(cardItem);
  });
}

document.getElementById("btn").addEventListener("click", () => {
  drawCard(ENDPOINT);
});

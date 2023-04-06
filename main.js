import "./style.css";

const app = document.querySelector("#app");
const spiner = document.getElementById("spiner");

//PODEMOS CREAR PROMESAS INDEPENDEINTES
//lo podemos hacer como una función si queremos
//la promesa nos devuelve una funcion de callback
//con  2 valores como parametros el resolve si se resuelve y el reject si se rechaza
const promesaFake = (msg) =>
  new Promise((resolve, reject) => {
    resolve(msg);
  });

spiner.innerHTML = `
<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
`;

//Simulamos una base de datos
//Fetch nos devuelve una promesa. Entre los parentesis, pondriamos la url del enpdpoint
//el then, le pasamos una función de callback con la respuesta positiva
//esta repuesta, nos devuelbe un objeto con todos las propiedades, el ok, el status 200,
//un metodo llamado json(), que es el que nos convierte el json que es un string a formato objeto.
//pero si llamamos a res.json(), nos sigue devolviendo una promesa, por eso
//le tendremos que volver a pasar un then

// USANDO THEN

// fetch("data.json")
//   .then((res) => {
//     if (!res.ok) {
//       throw { ok: false, msg: "Error 404" };
//     }
//     return res.json();
//   })
//   .then((data) =>
//     data.forEach((item) => {
//       app.innerHTML += Card(item);
//     })
//   )
//   .catch((err) => console.log(err.msg))
//   .finally(() => (spiner.innerHTML = ""));

// USANDO ASYNC AWAIT - creamos una función que tiene qye ser asincrona

const getGames = async () => {
  try {
    const holaPromise = await promesaFake("hola promesa");
    console.log(holaPromise);

    const res = await fetch("data.json"); //guardamos en una constante
    if (!res.ok) {
      throw { ok: false, msg: "Error 404" };
    }
    const data = await res.json();
    data.forEach((item) => {
      app.innerHTML += Card(item);
    });
  } catch (err) {
    console.log(err);
  } finally {
    spiner.innerHTML = "";
  }
};
getGames();
const btnClass = (stock) => (stock > 0 ? "btn-primary" : "btn-danger disabled");

function Card({ name, year, genre, stock }) {
  return ` <div class="card my-3" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${name.toUpperCase()}</h5>
    <p class="card-text">${year}</p>
    <p class="card-text">${genre}</p>
    <a href="#" class="btn ${btnClass(stock)}">Comprar</a>
  </div>
</div>`;
}

// app.innerHTML = Card();
// app.innerHTML += Card();

/* ----- Tradition Way of Fetching Data from API ----- */
// fetch("https://dog.ceo/api/breeds/list/all")
//   .then(function (res) {
//     return res.json();
//   })
//   .then(function (data) {
//     console.log("Dog breeds :>> ", data);
//   });

let timer;
let deleteFirstPhotoDelay;

async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    //   console.log("data :>> ", data);
    createBreedList(data.message);
  } catch (e) {
    console.log(" Error Message :>> ", "Something Went Wrong");
  }
}

start();

function createBreedList(breedList) {
  //   console.log("breedList :>> ", breedList);
  document.querySelector(
    "#breed"
  ).innerHTML = `<select onChange="loadByBreed(this.value)">
    <option>Choose a dog breed</option>
      ${Object.keys(breedList)
        .map(function (breed) {
          return `<option>${breed}</option>`;
        })
        .join("")}
      </select>`;
}

async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    // console.log("breed :>> ", breed);
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideShow(data.message);

    // console.log("data :>> ", data);
  }
}

function createSlideShow(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);
  if (images.length > 1) {
    document.querySelector("#slideShow").innerHTML = `
    <div class="slide" style="background-image: url(${images[0]});"></div>
    <div class="slide" style="background-image: url(${images[1]});"></div>
    `;
    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;

    timer = setInterval(nextSlide, 3000);
  } else {
    document.querySelector("#slideShow").innerHTML = `
    <div class="slide" style="background-image: url(${images[0]});"></div>
    <div class="slide"></div>
    `;
  }

  function nextSlide() {
    document
      .querySelector("#slideShow")
      .insertAdjacentHTML(
        "beforeend",
        ` <div class="slide" style="background-image: url(${images[currentPosition]});"></div>`
      );
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 > +images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}

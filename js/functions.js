//next slide in home
function nextSlide() {
  goToSlide(current + 1);
}

//previous slide in home
function prevSlide() {
  goToSlide(current - 1);
}

//update indicators and slides in home
function goToSlide(index) {
  if (index < 0) {
    index = items.length - 1;
  } else if (index > items.length - 1) {
    index = 0;
  } else if (index === current) {
    return;
  }

  items[current].classList.remove("active");
  indicators[current].classList.remove("active");

  current = index;

  items[current].classList.add("active"); //update slide
  indicators[current].classList.add("active"); //update indicators
}

//prepare dishes menu
function restDishes(dish) {
  return ` 
        <div class="col-lg-3 mb-5">
          <div class="categoryPhoto overflow-hidden rounded-4">
            <img src="./images/${dish.images[0]}" class="img-fluid" />
            <div class="zoomOverlay">
                <span>${dish.name}</span>
            </div>
            
            <div class="layout">
              <i class=" plus fa-regular fa-square-plus" onclick="openPopup(${dish.id})"></i>  
          </div>
          </div>
        </div>
        <div class="col-lg-9 mb-5">
          <div class="item">
            <div class="info d-flex mb-2">
              <div class="name ms-0 d-flex justify-content-center align-items-center">
                <h3 class="mb-0">${dish.name}</h3>
                <div class="lines d-flex flex-column">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="price">
                <h3 class="mb-0">$${dish.price}</h3>
              </div>
            </div>
            <div class="text">
              <p>${dish.miniDescription}</p>
            </div>
          </div>
        </div>`;
}

let currentPopupDishId = null;

//get the category array based on dish type
function getCategoryArray(type) {
  if (type === "BreakFast") return BreakFast;
  if (type === "Lunch") return Lunch;
  if (type === "Dinner") return Dinner;
  if (type === "Drinks") return Drinks;
  return allMenu;
}

//render the dish data inside the popup
function renderPopupDish(dish) {
  let popupImg = document.querySelector("#menuPopup .dishPhoto img");
  let popupTitle = document.querySelector("#menuPopup h3");
  let popupText = document.querySelector("#menuPopup .text");

  popupImg.src = "./images/" + dish.images[0];
  popupTitle.textContent = dish.name;
  popupText.textContent = dish.description;

  currentPopupDishId = dish.id;
}

//open popup with the clicked dish
function openPopup(id) {
  let dish = allMenu.find(function (d) {
    return d.id === id;
  });
  if (!dish) return;

  renderPopupDish(dish);

  let popupOfMenu = document.querySelector("#menuPopup");
  popupOfMenu.classList.add("active");
  setTimeout(function () {
    popupOfMenu.classList.add("show");
  }, 1);
}

//go to next/prev dish inside the same category
function goToPopupDish(direction) {
  let currentDish = allMenu.find(function (d) {
    return d.id === currentPopupDishId;
  });
  if (!currentDish) return;

  let categoryArray = getCategoryArray(currentDish.type);
  let index = categoryArray.findIndex(function (d) {
    return d.id === currentDish.id;
  });

  index += direction;
  if (index < 0) index = categoryArray.length - 1;
  if (index > categoryArray.length - 1) index = 0;

  renderPopupDish(categoryArray[index]);
}

//the arrow inside menuPopup
document.querySelector("#menuPopup .carousel-control-prev").addEventListener("click", function () {
  goToPopupDish(-1);
});

document.querySelector("#menuPopup .carousel-control-next").addEventListener("click", function () {
  goToPopupDish(1);
});

//close popup
function closePopup() {
  let popupOfMenu = document.querySelector("#menuPopup");
  popupOfMenu.classList.remove("show");
  setTimeout(function () {
    popupOfMenu.classList.remove("active");
  }, 1000);
}

//close popup by clicking on popup
document.querySelector("#menuPopup").addEventListener("click", function () {
  closePopup();
});

//stop propagation of boxes
document.querySelector("#menuPopup .box").addEventListener("click", function (e) {
  e.stopPropagation();
});

//close popup by exit key
function closePopupByExitKey() {
  let exitKey = document.querySelector("#menuPopup .close");
  exitKey.addEventListener("click", function () {
    closePopup();
  });
}

//menu search
menuSearchInput.addEventListener("input", function () {
  let searchValue = this.value.toLowerCase();
  let activeCategoryName = document.querySelector("#menu ul.categories li.active a").textContent;
  let currentArray = [];

  if (activeCategoryName === "BreakFast") currentArray = BreakFast;
  else if (activeCategoryName === "Lunch") currentArray = Lunch;
  else if (activeCategoryName === "Dinner") currentArray = Dinner;
  else if (activeCategoryName === "Drinks") currentArray = Drinks;

  let filtered = currentArray.filter(function (dish) {
    return dish.name.toLowerCase().includes(searchValue);
  });

  rowOfMenuPart1.innerHTML = "";
  rowOfMenuPart2.innerHTML = "";

  if (filtered.length === 0) {
    rowOfMenuPart1.innerHTML = `
      <div class="noResults text-center py-5">
        <p class="mb-0 text-center m-auto">No dishes found "${this.value}"</p>
      </div>`;
    return;
  }

  filtered.slice(0, 3).forEach(function (dish) {
    rowOfMenuPart1.innerHTML += restDishes(dish);
  });
  filtered.slice(3, 6).forEach(function (dish) {
    rowOfMenuPart2.innerHTML += restDishes(dish);
  });

  rowOfMenuPart1.classList.add("animate-menu");
  rowOfMenuPart2.classList.add("animate-menu");
});

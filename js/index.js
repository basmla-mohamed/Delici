//select elements
let popupOfBooking = document.querySelector("#popupReservation"),
  popupOfBookingBox = document.querySelector("#popupReservation .box"),
  closeIcon = document.querySelector("#popupReservation .close"),
  bookIcons = document.querySelectorAll(".booking"),
  carousel = document.getElementById("carouselExampleFade"),
  items = carousel.querySelectorAll(".carousel-item"),
  indicators = carousel.querySelectorAll(".indicatorr"),
  prevBtn = carousel.querySelector(".carousel-control-prev"),
  nextBtn = carousel.querySelector(".carousel-control-next"),
  current = 0,
  navBar = document.querySelector("nav"),
  liElementsInNav = document.querySelectorAll("nav .list a"),
  liElementsInNavOffcanvas = document.querySelectorAll(" nav .offcanvas-body .nav-link"),
  lastScrollY = window.scrollY,
  loadingPage = document.querySelector("#loadingPage"),
  rowOfMenu = document.querySelector("#menu .part1 .row"),
  rowOfMenuPart1 = document.querySelector("#menu .part1 .row"),
  rowOfMenuPart2 = document.querySelector("#menu .part2 .row"),
  LiOfMenu = document.querySelectorAll("#menu ul.categories li"),
  upToHomeAnchor = document.querySelector(".upToHome"),
  scrollProgress = document.querySelector(".scroll-progress"),
  menuSearchInput = document.querySelector("#menuSearchInput");

//loading page
window.addEventListener("DOMContentLoaded", function () {
  loadingPage.classList.add("hide");

  if (rowOfMenuPart1 && rowOfMenuPart2) {
    rowOfMenuPart1.classList.add("animate-menu");
    rowOfMenuPart2.classList.add("animate-menu");
  }

  setTimeout(function () {
    loadingPage.classList.add("d-none");
  }, 3000);
});

//move active in navBar and offcanvas
window.addEventListener("scroll", function () {
  let startOfSectionPoint = window.scrollY + navBar.clientHeight - 70; //70 the height of navBar
  let currentId = null;

  liElementsInNav.forEach(function (link) {
    let href = link.getAttribute("href"),
      section = document.querySelector(href);
    if (!section) return;

    if (section.offsetTop <= startOfSectionPoint) {
      currentId = href;
    }
  });

  liElementsInNav.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentId) {
      link.classList.add("active");
    }
  });

  liElementsInNavOffcanvas.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentId) {
      link.classList.add("active");
    }
  });
});

//navBar change transform translate and backgroundColor when we scroll
window.addEventListener("scroll", function () {
  let currentScrollY = window.scrollY;

  //navBar change color
  if (currentScrollY > 10) {
    navBar.classList.add("changeColor");
  } else {
    navBar.classList.remove("changeColor");
  }

  //navbar to up
  if (currentScrollY <= 10) {
    navBar.classList.remove("scrolled");
  } else if (currentScrollY > lastScrollY) {
    navBar.classList.add("scrolled");
  } else if (currentScrollY < lastScrollY) {
    navBar.classList.remove("scrolled");
  }

  lastScrollY = currentScrollY;
});

//open popup of booking(in home)
bookIcons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    popupOfBooking.classList.add("active");
    setTimeout(function () {
      popupOfBooking.classList.add("show");
    }, 100);
  });
});

//close popup of booking by exit key
closeIcon.addEventListener("click", function () {
  popupOfBooking.classList.remove("show");
  setTimeout(function () {
    popupOfBooking.classList.remove("active");
  }, 1000);
});

//close popup of booking by click on popup
popupOfBooking.addEventListener("click", function () {
  popupOfBooking.classList.remove("show");
  setTimeout(function () {
    popupOfBooking.classList.remove("active");
  }, 1000);
});

//popup of booking stop propagation
popupOfBookingBox.addEventListener("click", function (e) {
  e.stopPropagation();
});

//indicators in home
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
indicators.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    goToSlide(index);
  });
});

//part1 have 3 dishes
BreakFast.slice(0, 3).forEach(function (dish) {
  rowOfMenuPart1.innerHTML += restDishes(dish);
});

//part2 have 3 dishes
BreakFast.slice(3, 6).forEach(function (dish) {
  rowOfMenuPart2.innerHTML += restDishes(dish);
});

//li on menu
LiOfMenu.forEach(function (liEle) {
  liEle.addEventListener("click", function () {
    let currentLiActive = document.querySelector("#menu ul.categories li.active");

    currentLiActive.classList.remove("active");
    this.classList.add("active");

    rowOfMenuPart1.classList.remove("animate-menu");
    rowOfMenuPart2.classList.remove("animate-menu");
    //we delete the animation to make it happen in the li i clicked on it

    rowOfMenuPart1.innerHTML = "";
    rowOfMenuPart2.innerHTML = "";

    let category = this.querySelector("a").textContent,
      currentArray = [];

    if (category === "BreakFast") {
      currentArray = BreakFast;
    } else if (category === "Lunch") {
      currentArray = Lunch;
    } else if (category === "Dinner") {
      currentArray = Dinner;
    } else if (category === "Drinks") {
      currentArray = Drinks;
    }

    if (typeof currentArray !== "undefined" && currentArray.length > 0) {
      currentArray.slice(0, 3).forEach(function (dish) {
        rowOfMenuPart1.innerHTML += restDishes(dish);
      });

      currentArray.slice(3, 6).forEach(function (dish) {
        rowOfMenuPart2.innerHTML += restDishes(dish);
      });

      setTimeout(function () {
        rowOfMenuPart1.classList.add("animate-menu");
        rowOfMenuPart2.classList.add("animate-menu");
      }, 50);
    }
  });
});

//close popup
closePopupByExitKey();

//up to home anchor
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    upToHomeAnchor.classList.add("show");
  } else {
    upToHomeAnchor.classList.remove("show");
  }
});

//progress in website
window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;
  let Height = document.documentElement.scrollHeight - window.innerHeight;
  let percent = (scrollTop / Height) * 100;

  scrollProgress.style.width = percent + "%";
});

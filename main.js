// Blue Horizon Tours - main.js

document.addEventListener("DOMContentLoaded", function() {
  darkModeSetup();
  backToTopSetup();
  counterAnimation();
  faqToggle();
  loadReviews();
  startOfferTimer();
  scrollReveal();
});

//DARK MODE
function darkModeSetup() {
  const btn = document.getElementById("darkModeBtn");
  if (!btn) return;

  if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark");
    btn.textContent = "☀️";
  }

  btn.addEventListener("click", function() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      btn.textContent = "☀️";
      localStorage.setItem("darkMode", "on");
    } else {
      btn.textContent = "🌙";
      localStorage.setItem("darkMode", "off");
    }
  });
}

//BACK TO TOP
function backToTopSetup() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  btn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

//COUNTER ANIMATION
function counterAnimation() {
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;

  counters.forEach(function(el) {
    const target = parseInt(el.getAttribute("data-target"));
    const suffix = el.getAttribute("data-suffix") || "";
    let count = 0;
    const speed = Math.max(1, Math.floor(target / 60));

    const timer = setInterval(function() {
      count += speed;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      el.textContent = count + suffix;
    }, 25);
  });
}

//FAQ TOGGLE 
function faqToggle() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(function(item) {
    const question = item.querySelector("h4");
    const answer = item.querySelector("p");
    if (!question || !answer) return;


    answer.style.display = "none";
    question.style.cursor = "pointer";

    question.innerHTML = question.innerHTML + ' <span style="font-size:11px; color:#00b4d8;">▼</span>';

    question.addEventListener("click", function() {
      const arrow = question.querySelector("span");
      if (answer.style.display === "none") {
        answer.style.display = "block";
        answer.style.marginTop = "8px";
        answer.style.color = "#444";
        if (arrow) arrow.textContent = "▲";
      } else {
        answer.style.display = "none";
        if (arrow) arrow.textContent = "▼";
      }
    });
  });
}

//REVIEWS 
function loadReviews() {
  const form = document.getElementById("reviewForm");
  const list = document.getElementById("reviewList");
  if (!form || !list) return;

  const saved = JSON.parse(localStorage.getItem("userReviews") || "[]");
  saved.forEach(function(r) {
    addReviewToPage(list, r);
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name  = document.getElementById("rName").value.trim();
    const stars = document.getElementById("rStars").value;
    const text  = document.getElementById("rText").value.trim();

    if (name === "" || text === "") {
      alert("Please fill in all fields!");
      return;
    }

    const review = { name: name, stars: parseInt(stars), text: text };
    addReviewToPage(list, review);

    const all = JSON.parse(localStorage.getItem("userReviews") || "[]");
    all.push(review);
    localStorage.setItem("userReviews", JSON.stringify(all));

    alert("Thanks for your review, " + name + "! ⭐");
    form.reset();
  });
}

function addReviewToPage(list, r) {
  let stars = "";
  for (let i = 0; i < r.stars; i++) stars += "★";
  for (let i = r.stars; i < 5; i++) stars += "☆";

  const div = document.createElement("div");
  div.className = "review";
  div.innerHTML = "<h4>" + r.name + "</h4><span>" + stars + "</span><p>" + r.text + "</p>";
  list.appendChild(div);
}

//LIMITED TIME OFFER TIMER
function startOfferTimer() {
  const timerEl = document.getElementById("offerTimer");
  if (!timerEl) return;

  let totalSeconds = 24 * 60 * 60; // 24 hours

  const timer = setInterval(function() {
    totalSeconds--;

    const hrs  = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    timerEl.textContent =
      (hrs  < 10 ? "0" + hrs  : hrs)  + ":" +
      (mins < 10 ? "0" + mins : mins) + ":" +
      (secs < 10 ? "0" + secs : secs);

    if (totalSeconds <= 0) {
      clearInterval(timer);
      timerEl.textContent = "EXPIRED";
    }
  }, 1000);
}

//SCROLL REVEAL
function scrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (elements.length === 0) return;

  window.addEventListener("scroll", function() {
    elements.forEach(function(el) {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 80) {
        el.classList.add("visible");
      }
    });
  });
}

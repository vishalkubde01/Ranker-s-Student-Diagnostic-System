



/* ===== SUBJECT SCORES ===== */

// const subjectScores = [75, 82, 68, 80, 70];

// let total = 0;
// let strong = 0;
// let focus = 0;

// subjectScores.forEach(score => {
//   total += score;
//   if(score >= 80) strong++;
//   else focus++;
// });

// const overall = Math.round(total / subjectScores.length);

// /* Update Circle */
// const degree = overall * 3.6;
// const circle = document.getElementById("circle");
// circle.innerText = overall + "%";
// circle.style.background =
//   `conic-gradient(#5BB2E2 ${degree}deg, #e5e7eb ${degree}deg)`;

// /* Update Stats */
// document.getElementById("strong").innerText = strong;
// document.getElementById("focus").innerText = focus;
// document.getElementById("avg").innerText = overall + "%";






/* ===============================
   DATA SOURCE (Dynamic Ready)
================================ */
const subjectScores = [75, 82, 68, 80, 70];

/* ===============================
   CALCULATIONS
================================ */
let total = 0;
let strong = 0;
let focus = 0;

subjectScores.forEach(score => {
  total += score;
  if (score >= 80) strong++;
  else focus++;
});

const avg = Math.round(total / subjectScores.length);

/* ===============================
   COUNT-UP ANIMATION
================================ */
function animateValue(id, start, end, duration, suffix = "") {
  const obj = document.getElementById(id);
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    obj.innerText = value + suffix;

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}

/* Animate stats */
animateValue("strong", 0, strong, 800);
animateValue("focus", 0, focus, 800);
animateValue("avg", 0, avg, 900, "%");

/* ===============================
   PROGRESS CIRCLE ANIMATION
================================ */
const circle = document.getElementById("circle");
let current = 0;
const target = avg;
const speed = 15;

const interval = setInterval(() => {
  if (current >= target) {
    clearInterval(interval);
  } else {
    current++;
    const degree = current * 3.6;
    circle.innerText = current + "%";
    circle.style.background =
      `conic-gradient(#5BB2E2 ${degree}deg, #e5e7eb ${degree}deg)`;
  }
}, speed);


// subject wise progress
const subjectData = {
  Mathematics: { total: 42, completed: 36 },
  Physics: { total: 38, completed: 27 },
  Chemistry: { total: 35, completed: 24 },
  Biology: { total: 40, completed: 22 }
};

document.querySelectorAll("[data-subject]").forEach(card => {
  const name = card.dataset.subject;
  const data = subjectData[name];
  if (!data) return;

  const percent = Math.round((data.completed / data.total) * 100);
  const pending = data.total - data.completed;

  // Update %
  card.querySelector("strong").innerText = percent + "%";

  // Progress bar
  card.querySelector(".progress-bar").style.width = percent + "%";

  // Completed / Pending
  const info = card.querySelectorAll(".small-text div");
  info[0].innerHTML = `<span class="dot green-dot"></span> ${data.completed} Completed`;
  info[1].innerHTML = `<span class="dot gray-dot"></span> ${pending} Pending`;
});


document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver((entries, obs) => {

    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card = entry.target;

      const total = Number(card.dataset.total);
      const completed = Number(card.dataset.completed);
      const pending = total - completed;
      const percent = Math.round((completed / total) * 100);

      const percentEl = card.querySelector(".subject-percent");
      const bar = card.querySelector(".subject-progress-bar");
      const completedEl = card.querySelector(".completed-text");
      const pendingEl = card.querySelector(".pending-text");

      // Completed / Pending text
      completedEl.innerHTML = `<span class="dot green-dot"></span> ${completed} Completed`;
      pendingEl.innerHTML = `<span class="dot gray-dot"></span> ${pending} Pending`;

      // Color by progress
      let colorClass = "progress-poor";
      if (percent >= 80) colorClass = "progress-excellent";
      else if (percent >= 65) colorClass = "progress-good";
      else if (percent >= 50) colorClass = "progress-average";

      bar.classList.add(colorClass);

      // Count animation
      let current = 0;
      const timer = setInterval(() => {
        if (current >= percent) {
          clearInterval(timer);
          return;
        }
        current++;
        percentEl.innerText = current + "%";
        bar.style.width = current + "%";
      }, 15);

      obs.unobserve(card); // animate once
    });

  }, { threshold: 0.4 });

  document.querySelectorAll("[data-total]").forEach(card => {
    observer.observe(card);
  });

});

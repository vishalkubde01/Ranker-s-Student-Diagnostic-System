// PCM Data for Class 10
const subjectsData = {
  Physics: {
    chapters: {
      "Light: Reflection & Refraction": {
        topics: {
          "Mirror Concepts": {
            points: [
              "Laws of Reflection",
              "Concave Mirror Diagrams",
              "Convex Mirror Uses",
              "Mirror Formula",
              "Image Formation Rules",
            ],
            weight: 1,
          },
          "Lens Concepts": {
            points: [
              "Refractive Index",
              "Lens Maker Formula",
              "Power of Lens",
              "Lens Formula",
              "Magnification",
            ],
            weight: 1,
          },
        },
      },
      Electricity: {
        topics: {
          Circuits: {
            points: [
              "Ohm's Law",
              "Resistors in Series",
              "Resistors in Parallel",
              "Heating Effect",
              "Electric Power",
            ],
            weight: 1,
          },
          Magnetism: {
            points: [
              "Magnetic Field",
              "Electromagnets",
              "Fleming's Rules",
              "AC vs DC",
            ],
            weight: 1,
          },
        },
      },
      Motion: {
        topics: {
          Kinematics: {
            points: [
              "Distance vs Displacement",
              "Speed and Velocity",
              "Acceleration",
              "Equations of Motion",
            ],
            weight: 1,
          },
          Dynamics: {
            points: [
              "Newton's Laws",
              "Force and Momentum",
              "Conservation of Momentum",
            ],
            weight: 1,
          },
        },
      },
    },
  },
  Chemistry: {
    chapters: {
      "Chemical Reactions": {
        topics: {
          Equations: {
            points: [
              "Types of Reactions",
              "Balancing Equations",
              "Redox Basics",
              "Oxidation States",
            ],
            weight: 1,
          },
        },
      },
      "Carbon & Its Compounds": {
        topics: {
          Bonding: {
            points: [
              "Versatile Nature of Carbon",
              "Homologous Series",
              "Functional Groups",
              "Nomenclature",
            ],
            weight: 1,
          },
          Hydrocarbons: {
            points: ["Alkanes", "Alkenes", "Alkynes", "Aromatic Compounds"],
            weight: 1,
          },
        },
      },
      "Acids, Bases and Salts": {
        topics: {
          Properties: {
            points: [
              "pH Scale",
              "Indicators",
              "Neutralization",
              "Salts Formation",
            ],
            weight: 1,
          },
        },
      },
    },
  },
  Mathematics: {
    chapters: {
      Trigonometry: {
        topics: {
          Ratios: {
            points: [
              "Trigonometric Identities",
              "Height and Distance Problems",
              "Trigonometric Ratios",
            ],
            weight: 1,
          },
        },
      },
      "Quadratic Equations": {
        topics: {
          Roots: {
            points: [
              "Factoring Method",
              "Quadratic Formula",
              "Nature of Roots",
              "Sum and Product of Roots",
            ],
            weight: 1,
          },
        },
      },
      "Coordinate Geometry": {
        topics: {
          Lines: {
            points: ["Distance Formula", "Section Formula", "Slope of Line"],
            weight: 1,
          },
          Circles: {
            points: [
              "Equation of Circle",
              "Tangent to Circle",
              "Chord Properties",
            ],
            weight: 1,
          },
        },
      },
    },
  },
};

let checkedPoints = {};
let currentSubject = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderSubjects();
});

function renderSubjects() {
  const container = document.getElementById("subject-buttons");
  Object.keys(subjectsData).forEach((subject) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary subject-btn rounded-pill";
    btn.innerHTML = `<i class="bi bi-book me-2"></i>${subject}`;
    btn.onclick = () => selectSubject(subject);
    container.appendChild(btn);
  });
}

function selectSubject(subject) {
  currentSubject = subject;
  document.querySelectorAll(".subject-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.textContent.trim() === subject);
    btn.classList.toggle("btn-primary", btn.textContent.trim() === subject);
  });
  renderChapters(subject);
}

function renderChapters(subject) {
  const container = document.getElementById("chapters-container");
  container.innerHTML = `<h3 class="mb-4 text-center fw-bold">Syllabus Survey: ${subject}</h3>`;

  const chapters = subjectsData[subject].chapters;
  Object.keys(chapters).forEach((chapterName) => {
    const chapterDiv = document.createElement("div");
    chapterDiv.className = "card chapter-card shadow-sm mb-4";
    chapterDiv.innerHTML = `
            <div class="card-header chapter-header border-0 d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold text-dark">${chapterName}</h5>
                <i class="bi bi-chevron-down text-muted"></i>
            </div>
            <div class="card-body bg-white pt-0">
                <div id="topics-${chapterName.replace(/\s/g, "")}"></div>
            </div>
        `;
    container.appendChild(chapterDiv);
    renderTopics(subject, chapterName);
  });
}

function renderTopics(subject, chapterName) {
  const topicContainer = document.getElementById(
    `topics-${chapterName.replace(/\s/g, "")}`
  );
  const topics = subjectsData[subject].chapters[chapterName].topics;

  Object.keys(topics).forEach((topicName) => {
    const topicDiv = document.createElement("div");
    topicDiv.className = "topic-item p-3 mb-3";
    topicDiv.innerHTML = `
            <p class="fw-bold text-primary mb-2">${topicName}</p>
            <div class="ms-2">
                ${topics[topicName].points
                  .map(
                    (point) => `
                    <div class="form-check point-item p-2 rounded d-flex justify-content-between align-items-center">
                        <label class="form-check-label point-text flex-grow-1 me-2" for="${point}" title="${point}">${point}</label>
                        <input class="form-check-input" type="checkbox" id="${point}"
                            onchange="updateChecked('${subject}', '${chapterName}', '${topicName}', '${point}', this.checked)">
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
    topicContainer.appendChild(topicDiv);
  });
}

function updateChecked(s, c, t, p, val) {
  if (!checkedPoints[s]) checkedPoints[s] = {};
  if (!checkedPoints[s][c]) checkedPoints[s][c] = {};
  if (!checkedPoints[s][c][t]) checkedPoints[s][c][t] = {};
  checkedPoints[s][c][t][p] = val;
}

function submitTest() {
  if (!currentSubject) {
    alert("Please select a subject first!");
    return;
  }
  // Show the Success Modal Popup
  const myModal = new bootstrap.Modal(document.getElementById("successModal"));
  myModal.show();
}

function resetTest() {
  checkedPoints = {};
  if (currentSubject) selectSubject(currentSubject);
}

/* =========================
   ICON INIT
========================= */
lucide.createIcons();

/* =========================
   VIEW SWITCHING
========================= */
function switchView(view) {
  document.querySelectorAll(".view").forEach((v) => v.classList.add("d-none"));
  document.getElementById(view).classList.remove("d-none");

  document
    .querySelectorAll(".nav-btn")
    .forEach((b) => b.classList.remove("active"));
  event.target.closest(".nav-btn").classList.add("active");
}

/* =========================
   CHARTS (ANALYTICS)
========================= */
new Chart(barChart, {
  type: "bar",
  data: {
    labels: ["10A", "10B", "10C", "9A", "9B"],
    datasets: [
      {
        label: "Avg Progress",
        data: [78, 72, 75, 68, 70],
        backgroundColor: "#2563eb",
      },
      {
        label: "Avg Score",
        data: [82, 76, 79, 71, 74],
        backgroundColor: "#10b981",
      },
    ],
  },
});

new Chart(lineChart, {
  type: "line",
  data: {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    datasets: [
      {
        label: "Coverage",
        data: [45, 52, 61, 68, 75, 80],
        borderColor: "#2563eb",
      },
      {
        label: "Performance",
        data: [58, 65, 72, 78, 82, 85],
        borderColor: "#10b981",
      },
    ],
  },
});

/* =========================
   CLASS STATE
========================= */
let currentClass = "10";
const classes = ["8", "9", "10", "11", "12"];

/* =========================
   SYLLABUS DATA (CLASS-WISE)
========================= */
const syllabusData = {
  8: [],
  9: [],
  10: [
    {
      id: 1,
      name: "Mathematics",
      chapters: [
        {
          id: 1,
          name: "Ch 1: Real Numbers",
          topics: ["Integers", "Rational Numbers", "Irrational Numbers"],
          active: true,
        },
        {
          id: 2,
          name: "Ch 2: Polynomials",
          topics: ["Degree", "Zeros", "Factorization"],
          active: true,
        },
      ],
    },
  ],
  11: [],
  12: [],
};

/* =========================
   CLASS TABS
========================= */
function renderClassTabs() {
  return `
    <div class="d-flex gap-2 mb-4 flex-wrap">
      ${classes
        .map(
          (c) => `
        <button class="btn btn-sm rounded-pill ${
          currentClass === c ? "btn-primary" : "btn-outline-primary"
        }" onclick="switchClass('${c}')">
          Class ${c}
        </button>
      `
        )
        .join("")}
    </div>
  `;
}

function switchClass(cls) {
  currentClass = cls;
  renderSyllabus();
}

/* =========================
   RENDER SYLLABUS
========================= */
function renderSyllabus() {
  const container = document.getElementById("syllabusContainer");
  container.innerHTML = renderClassTabs();

  syllabusData[currentClass].forEach((subject) => {
    const subjectEl = document.createElement("div");
    subjectEl.className = "mb-4";

    subjectEl.innerHTML = `
      <div class="subject-card d-flex justify-content-between align-items-center"
           onclick="this.nextElementSibling.classList.toggle('d-none')">
        <div class="d-flex align-items-center gap-3">
          <i data-lucide="book" class="text-primary"></i>
          <strong>${subject.name}</strong>
          <span class="pill">${subject.chapters.length} chapters</span>
        </div>
        <div class="d-flex gap-3">
          <i data-lucide="edit" onclick="editSubject(${subject.id}, event)"></i>
          <i data-lucide="trash-2" class="text-danger"
             onclick="deleteSubject(${subject.id}, event)"></i>
          <i data-lucide="chevron-right"></i>
        </div>
      </div>

      <div class="mt-3 d-none">
        ${subject.chapters
          .map(
            (ch) => `
          <div class="chapter-row d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex gap-3 align-items-center flex-wrap">
              <strong>${ch.name}</strong>
              <span class="pill">${ch.topics.length} topics</span>
              ${ch.active ? `<span class="pill pill-active">active</span>` : ""}
            </div>
            <div class="d-flex gap-3">
              <i data-lucide="edit"
                 onclick="editChapter(${subject.id}, ${ch.id})"></i>
              <i data-lucide="trash-2" class="text-danger"
                 onclick="deleteChapter(${subject.id}, ${ch.id})"></i>
            </div>
          </div>

          ${ch.topics
            .map(
              (t) => `
            <div class="topic-row d-flex justify-content-between align-items-center mb-2">
              <strong>${t}</strong>
              <i data-lucide="trash-2" class="text-danger"
                 onclick="deleteTopic(${subject.id}, ${ch.id}, '${t}')"></i>
            </div>
          `
            )
            .join("")}

          <div class="add-box mb-4"
               onclick="addTopic(${subject.id}, ${ch.id})">
            <i data-lucide="plus"></i> Add Topic
          </div>
        `
          )
          .join("")}

        <div class="add-box" onclick="addChapter(${subject.id})">
          <i data-lucide="plus"></i> Add Chapter
        </div>
      </div>
    `;

    container.appendChild(subjectEl);
  });

  lucide.createIcons();
}

/* =========================
   ADD ACTIONS
========================= */
function addSubject() {
  const name = prompt(`Enter subject name for Class ${currentClass}`);
  if (!name) return;
  syllabusData[currentClass].push({
    id: Date.now(),
    name,
    chapters: [],
  });
  renderSyllabus();
}

function addChapter(subjectId) {
  const name = prompt("Enter chapter name");
  if (!name) return;
  const subject = syllabusData[currentClass].find((s) => s.id === subjectId);
  subject.chapters.push({
    id: Date.now(),
    name,
    topics: [],
    active: true,
  });
  renderSyllabus();
}

function addTopic(subjectId, chapterId) {
  const name = prompt("Enter topic name");
  if (!name) return;
  const subject = syllabusData[currentClass].find((s) => s.id === subjectId);
  const chapter = subject.chapters.find((c) => c.id === chapterId);
  chapter.topics.push(name);
  renderSyllabus();
}

/* =========================
   EDIT / DELETE SUBJECT
========================= */
function editSubject(subjectId, event) {
  event.stopPropagation();
  const subject = syllabusData[currentClass].find((s) => s.id === subjectId);
  const name = prompt("Edit subject name", subject.name);
  if (!name) return;
  subject.name = name;
  renderSyllabus();
}

function deleteSubject(subjectId, event) {
  event.stopPropagation();
  if (!confirm("Delete this subject and all its chapters?")) return;
  syllabusData[currentClass] = syllabusData[currentClass].filter(
    (s) => s.id !== subjectId
  );
  renderSyllabus();
}

/* =========================
   EDIT / DELETE CHAPTER
========================= */
function editChapter(subjectId, chapterId) {
  const subject = syllabusData[currentClass].find((s) => s.id === subjectId);
  const chapter = subject.chapters.find((c) => c.id === chapterId);
  const name = prompt("Edit chapter name", chapter.name);
  if (!name) return;
  chapter.name = name;
  renderSyllabus();
}

function deleteChapter(subjectId, chapterId) {
  if (!confirm("Delete this chapter and its topics?")) return;
  const subject = syllabusData[currentClass].find((s) => s.id === subjectId);
  subject.chapters = subject.chapters.filter((c) => c.id !== chapterId);
  renderSyllabus();
}

/* =========================
   DELETE TOPIC
========================= */
function deleteTopic(subjectId, chapterId, topicName) {
  const subject = syllabusData[currentClass].find((s) => s.id === subjectId);
  const chapter = subject.chapters.find((c) => c.id === chapterId);
  chapter.topics = chapter.topics.filter((t) => t !== topicName);
  renderSyllabus();
}

/* =========================
   INITIAL LOAD
========================= */
renderSyllabus();

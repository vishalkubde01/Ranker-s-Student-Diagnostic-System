
function animateBars(){
  document.querySelectorAll('.progress-bar').forEach(bar=>{
    bar.style.width = '0%';
    setTimeout(()=>bar.style.width = bar.dataset.progress+'%',100);
  });
}

function toggleChapter(header) {
  const card = header.closest('.chapter-card');
  const topicsSection = card.querySelector('.topics-section');
  const divider = card.querySelector('.chapter-divider');
  const arrowIcon = header.querySelector('.bi');

  const isExpanded = topicsSection.style.maxHeight !== '0px' && topicsSection.style.maxHeight !== '';

  if (isExpanded) {
    // Collapse
    topicsSection.style.maxHeight = '0px';
    divider.style.opacity = '0';
    arrowIcon.style.transform = 'rotate(0deg)';
  } else {
    // Expand
    topicsSection.style.maxHeight = topicsSection.scrollHeight + 'px';
    divider.style.opacity = '1';
    arrowIcon.style.transform = 'rotate(180deg)';
  }
}

function loadSubject(subject,btn){
  if(btn){
    document.querySelectorAll('.subject-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  }

  document.getElementById('content').classList.remove('fade-in');
  void document.getElementById('content').offsetWidth;
  document.getElementById('content').classList.add('fade-in');

  animateBars();
}

window.onload = function() {
  animateBars();
  // Initialize topics sections as collapsed
  document.querySelectorAll('.topics-section').forEach(section => {
    section.style.maxHeight = '0px';
  });
};

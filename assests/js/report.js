document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. Bar Chart Configuration ---
    const ctxBar = document.getElementById('mainBarChart').getContext('2d');
    
    const barData = {
        labels: ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'History'],
        datasets: [
            {
                label: 'Current Progress',
                data: [85, 72, 68, 55, 90, 78],
                backgroundColor: '#3b82f6', // Blue
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.8
            },
            {
                label: 'Latest Score',
                data: [88, 85, 80, 75, 90, 85],
                backgroundColor: '#14b8a6', // Teal
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.8
            },
            {
                label: 'Target',
                data: [88, 75, 70, 62, 92, 80],
                backgroundColor: '#10b981', // Green
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.8
            }
        ]
    };

    new Chart(ctxBar, {
        type: 'bar',
        data: barData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }, // Hiding default legend to use custom one
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    padding: 10,
                    cornerRadius: 8,
                    usePointStyle: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { borderDash: [4, 4], color: '#f3f4f6' },
                    ticks: { font: { size: 11, family: 'Inter' } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11, family: 'Inter' } }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
        }
    });

    // --- 2. Radar Chart Configuration ---
    const ctxRadar = document.getElementById('radarChart').getContext('2d');

    const radarData = {
        labels: ['Problem Solving', 'Conceptual', 'Application', 'Memory & Recall', 'Analysis', 'Critical Thinking'],
        datasets: [{
            label: 'Student Profile',
            data: [80, 70, 75, 85, 65, 78],
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.25)', // Semi-transparent blue
            borderColor: '#3b82f6', // Solid blue
            borderWidth: 2,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#3b82f6',
            pointRadius: 3
        }]
    };

    new Chart(ctxRadar, {
        type: 'radar',
        data: radarData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    titleFont: { size: 13 },
                    bodyFont: { size: 13 },
                    padding: 10,
                    cornerRadius: 8
                }
            },
            scales: {
                r: {
                    angleLines: { color: '#e5e7eb' },
                    grid: { color: '#e5e7eb' },
                    pointLabels: {
                        font: { size: 11, weight: '500', family: 'Inter' },
                        color: '#6b7280'
                    },
                    ticks: { display: false, backdropColor: 'transparent' }
                }
            }
        }
    });
});


const data = {
  academy: "Rankers Academy",
  student: {
    name: "Aman Patil",
    class: "10",
    exam: "Foundation Test",
    rollNumber: "23",
    age: "15",
    gender: "Male",
    testDate: "13-Jan-2026"
  },
  subjects: [
    { name: "Mathematics", topics:[
        { topic:"Algebra", subTopics:[
            {name:"Linear Equations", total:5, correct:5},
            {name:"Quadratic Equations", total:5, correct:2}
        ]},
        { topic:"Geometry", subTopics:[
            {name:"Triangles", total:0, correct:0},
            {name:"Circles", total:0, correct:0}
        ]}
    ]},
    { name: "Science", topics:[
        { topic:"Physics", subTopics:[
            {name:"Motion", total:5, correct:2},
            {name:"Forces", total:5, correct:5}
        ]},
        { topic:"Chemistry", subTopics:[
            {name:"Reactions", total:5, correct:2},
            {name:"Acids & Bases", total:5, correct:4}
        ]}
    ]}
  ]
};
 
function generatePDF(){
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p","mm","a4");
  let y = 15;
 
  // HEADER
  pdf.setFillColor(11,94,215);
  pdf.rect(0,0,210,28,"F");
  pdf.setTextColor(255,255,255);
  pdf.setFontSize(18);
  pdf.text(data.academy, 15, 18);
  pdf.setFontSize(11);
  pdf.text("Student Diagnostic Report", 15, 24);
 
  y = 40;
 
  // STUDENT INFO - dynamic, 2-column layout
  const studentKeys = Object.keys(data.student);
  const col1 = studentKeys.filter((_, i) => i % 2 === 0);
  const col2 = studentKeys.filter((_, i) => i % 2 !== 0);
 
  const rowHeight = 7;
  const boxHeight = Math.max(col1.length, col2.length) * rowHeight + 5;
 
  pdf.setDrawColor(200);
  pdf.roundedRect(10, y-8, 190, boxHeight, 4, 4);
 
  pdf.setFontSize(12);
  pdf.setTextColor(0,0,0);
 
  for(let i=0; i<Math.max(col1.length, col2.length); i++){
    if(i < col1.length){
      const key = col1[i];
      pdf.text(`${capitalize(key)}: ${data.student[key]}`, 15, y);
    }
    if(i < col2.length){
      const key = col2[i];
      pdf.text(`${capitalize(key)}: ${data.student[key]}`, 110, y);
    }
    y += rowHeight;
  }
  y += 5;
 
  // OVERALL PERFORMANCE
  let totalQ=0, correctQ=0;
  data.subjects.forEach(s=>{
    s.topics.forEach(t=>{
      t.subTopics.forEach(sub=>{
        totalQ+=sub.total;
        correctQ+=sub.correct;
      });
    });
  });
  let score = totalQ===0?0:((correctQ/totalQ)*100).toFixed(2);
  let performance = score>=75?"Excellent":score>=50?"Average":"Needs Improvement";
 
  pdf.setFontSize(14);
  pdf.setTextColor(11,94,215);
  pdf.text("Overall Performance Summary", 10, y);
  y+=6;
  pdf.setDrawColor(11,94,215);
  pdf.line(10,y,200,y);
  y+=8;
 
  pdf.setFontSize(12);
  pdf.setTextColor(0,0,0);
  pdf.text(`Total Score: ${score}%`, 10, y);
  y+=6;
  pdf.text(`Performance Level: ${performance}`, 10, y);
  y+=12;
 
  // SUBJECT-WISE TABLES
  data.subjects.forEach(subject=>{
    if(y>250){pdf.addPage(); y=15;}
 
    pdf.setFontSize(14);
    pdf.setTextColor(11,94,215);
    pdf.text(subject.name, 10, y);
    y+=6;
 
    let tableRows = [];
    let weakTopics = [];
    let notAttempted = [];
 
    subject.topics.forEach(topic=>{
      topic.subTopics.forEach(sub=>{
        let accuracy = sub.total===0?"NA":((sub.correct/sub.total)*100).toFixed(0)+"%";
        let status = sub.total===0?"Not Attempted":((sub.correct/sub.total)*100<50?"Weak":"Strong");
 
        tableRows.push([
          topic.topic,
          sub.name,
          sub.total,
          sub.correct,
          accuracy,
          status
        ]);
 
        if(sub.total===0) notAttempted.push(`${topic.topic} → ${sub.name}`);
        else if((sub.correct/sub.total)*100<50) weakTopics.push(`${topic.topic} → ${sub.name}`);
      });
    });
 
    pdf.autoTable({
      startY: y,
      head: [['Topic', 'Sub-Topic', 'Total', 'Correct', 'Accuracy', 'Status']],
      body: tableRows,
      theme: 'grid',
      headStyles: {fillColor:[11,94,215], textColor:255},
      styles: { fontSize: 10 },
      margin: { left: 10, right: 10 }
    });
 
    y = pdf.lastAutoTable.finalY + 6;
 
    if(weakTopics.length>0){
      pdf.setFontSize(12);
      pdf.setTextColor(220,53,69);
      pdf.text("Weak Sub-Topics:", 10, y);
      y+=6;
      pdf.setFontSize(11);
      pdf.setTextColor(0,0,0);
      weakTopics.forEach(w=>{
        pdf.text(`- ${w}`, 10, y);
        y+=5;
        if(y>280){pdf.addPage(); y=15;}
      });
      y+=4;
    }
 
    if(notAttempted.length>0){
      pdf.setFontSize(12);
      pdf.setTextColor(255,193,7);
      pdf.text("Not Attempted Sub-Topics:", 10, y);
      y+=6;
      pdf.setFontSize(11);
      pdf.setTextColor(0,0,0);
      notAttempted.forEach(n=>{
        pdf.text(`- ${n}`, 10, y);
        y+=5;
        if(y>280){pdf.addPage(); y=15;}
      });
      y+=6;
    }
  });
 
  // FINAL VERDICT
  if(y>250){pdf.addPage(); y=15;}
  pdf.setFontSize(14);
  pdf.setTextColor(25,135,84);
  pdf.text("Academic Verdict", 10, y);
  y+=6;
  pdf.setDrawColor(25,135,84);
  pdf.line(10,y,200,y);
  y+=8;
  pdf.setFontSize(11);
  pdf.setTextColor(0,0,0);
  pdf.text(
    "The student shows partial syllabus coverage. Focused improvement in weak and not attempted areas is recommended to enhance performance.",
    10, y, { maxWidth: 190 }
  );
 
  // FOOTER
  pdf.setFontSize(9);
  pdf.setTextColor(120);
  pdf.text(
    "Generated by Rankers Academy | Personalized Learning Diagnostics",
    105, 290, { align: "center" }
  );
 
  pdf.save("Rankers_WeakSubTopic_Report.pdf");
}
 
// Helper function to capitalize keys
function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

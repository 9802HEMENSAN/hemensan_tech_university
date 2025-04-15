document.addEventListener('DOMContentLoaded', function() {
    if (!Storage.isAdminLoggedIn()) return;
    
    const programmeSelect = document.getElementById('programmeSelect');
    const performanceResults = document.getElementById('performanceResults');
    
    updatePerformanceView();
    
    programmeSelect.addEventListener('change', updatePerformanceView);
    
    function updatePerformanceView() {
        const selectedProgramme = programmeSelect.value;
        const rankedData = Storage.calculateRanks();
        
        let html = '';
        
        if (selectedProgramme === 'all') {
            rankedData.forEach(program => {
                html += renderProgrammePerformance(program);
            });
        } else {
            const program = rankedData.find(p => p.programme === selectedProgramme);
            if (program) {
                html = renderProgrammePerformance(program);
            } else {
                html = '<p>No data available for selected program.</p>';
            }
        }
        
        performanceResults.innerHTML = html;
    }
    
    function renderProgrammePerformance(program) {
        let html = `
            <div class="programme-performance">
                <h3>${getProgrammeName(program.programme)}</h3>
                <table class="performance-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Subject Marks</th>
                            <th>Total</th>
                            <th>Percentile</th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        program.students.forEach(student => {
            const subjectsHtml = Object.entries(student.marks)
                .map(([subject, mark]) => `${subject}: ${mark}`)
                .join('<br>');
            
            html += `
                <tr>
                    <td>${student.rank}</td>
                    <td>${student.studentId}</td>
                    <td>${student.name}</td>
                    <td>${subjectsHtml}</td>
                    <td>${student.totalMarks}</td>
                    <td>${student.percentile}%</td>
                </tr>`;
        });
        
        html += `</tbody></table></div>`;
        return html;
    }
    
    function getProgrammeName(code) {
        const names = {
            'BTech-CS': 'B.Tech Computer Science',
            'BTech-EE': 'B.Tech Electrical Engineering',
            'BSc-Math': 'B.Sc Mathematics',
            'BBA': 'Bachelor of Business Administration'
        };
        return names[code] || code;
    }
});
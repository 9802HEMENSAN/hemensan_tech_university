document.addEventListener('DOMContentLoaded', function() {
    if (!Storage.isAdminLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Toggle functionality
    const performanceBtn = document.getElementById('performanceBtn');
    const feedbackBtn = document.getElementById('feedbackBtn');
    const performanceView = document.getElementById('performanceView');
    const feedbackView = document.getElementById('feedbackView');
    
    performanceBtn.addEventListener('click', function() {
        performanceBtn.classList.add('active');
        feedbackBtn.classList.remove('active');
        performanceView.classList.add('active');
        feedbackView.classList.remove('active');
    });
    
    feedbackBtn.addEventListener('click', function() {
        feedbackBtn.classList.add('active');
        performanceBtn.classList.remove('active');
        feedbackView.classList.add('active');
        performanceView.classList.remove('active');
    });
    
    // Load registrations data
    const students = Storage.getStudents();
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    
    if (students.length > 0) {
        students.forEach((student, index) => {
            const row = studentsTable.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.fullName}</td>
                <td>${student.email}</td>
                <td>${student.phone || 'N/A'}</td>
                <td>${student.programme || 'Not specified'}</td>
                <td>${new Date(student.registrationDate).toLocaleDateString()}</td>
            `;
        });
    } else {
        studentsTable.innerHTML = `<tr><td colspan="6">No student registrations yet</td></tr>`;
    }
    
    // Load feedback data
    const feedback = Storage.getFeedback();
    const feedbackTable = document.getElementById('feedbackTable').getElementsByTagName('tbody')[0];
    
    if (feedback.length > 0) {
        feedback.forEach((item, index) => {
            const row = feedbackTable.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.studentId || 'N/A'}</td>
                <td>${'★'.repeat(item.rating)}</td>
                <td>${item.feedbackTypes?.join(', ') || 'General'}</td>
                <td>${item.feedback.substring(0, 50)}${item.feedback.length > 50 ? '...' : ''}</td>
                <td>${new Date(item.date).toLocaleDateString()}</td>
            `;
        });
    } else {
        feedbackTable.innerHTML = `<tr><td colspan="8">No feedback submitted yet</td></tr>`;
    }
});
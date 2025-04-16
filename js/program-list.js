       // Programme descriptions (assumed data)
       const programmeDescriptions = {
        'BTech-CS': 'The B.Tech in Computer Science programme provides students with a strong foundation in computer science principles and practical skills in software development, algorithms, and system design.',
        'BTech-EE': 'The B.Tech in Electrical Engineering programme focuses on electrical systems, electronics, power generation, and control systems, preparing students for careers in various industries.'
    };

    // Function to determine if a student is qualified
    function isQualified(student) {
       return true;
    }

    // Get student data from localStorage or initialize with sample data
    let studentMarks = localStorage.getItem('studentMarks');
 

    // Parse the student marks
    const students = JSON.parse(studentMarks);
    
    // Get the programme list container
    const programmeListContainer = document.getElementById('programmeListContainer');
    const programmeSelect = document.getElementById('programmeSelect');
    
    // Function to render programme lists
    function renderProgrammeLists(selectedProgramme = 'all') {
        programmeListContainer.innerHTML = '';
        
        // Group students by programme  
        const programmes = {
            'BTech-CS': { name: 'B.Tech Computer Science', students: [] },
            'BTech-EE': { name: 'B.Tech Electrical Engineering', students: [] }
        };
        
        // Filter and group students
        students.forEach(student => {
            if (programmes[student.programme] && isQualified(student)) {
                programmes[student.programme].students.push(student);
            }
        });
        
        // Create programme lists
        const programmeList = document.createElement('ul');
        programmeList.className = 'programme-list';
        
        for (const [programmeCode, programmeData] of Object.entries(programmes)) {
            // Skip if not the selected programme (and not "all")
            if (selectedProgramme !== 'all' && selectedProgramme !== programmeCode) {
                continue;
            }
            
            const programmeItem = document.createElement('li');
            programmeItem.className = 'programme-item';
            
            const programmeTitle = document.createElement('div');
            programmeTitle.className = 'programme-title';
            programmeTitle.textContent = programmeData.name;
            
            const programmeDescription = document.createElement('div');
            programmeDescription.className = 'programme-description';
            programmeDescription.textContent = programmeDescriptions[programmeCode] || 'No description available.';
            
            const studentList = document.createElement('ul');
            studentList.className = 'student-list';
            
            if (programmeData.students.length > 0) {
                programmeData.students.forEach(student => {
                    const studentItem = document.createElement('li');
                    studentItem.className = 'student-item qualified';
                    
                    const studentInfo = document.createElement('div');
                    studentInfo.className = 'student-info';
                    
                    const studentName = document.createElement('div');
                    studentName.className = 'student-name';
                    studentName.textContent = student.name;
                    
                    const studentId = document.createElement('div');
                    studentId.className = 'student-id';
                    studentId.textContent = `ID: ${student.studentId}`;
                    
                    studentInfo.appendChild(studentName);
                    studentInfo.appendChild(studentId);
                    
                    const studentMarks = document.createElement('div');
                    studentMarks.className = 'student-marks';
                    
                    const totalMarks = document.createElement('div');
                    totalMarks.className = 'total-marks';
                    totalMarks.textContent = `Total: ${student.totalMarks}`;
                    
                    const status = document.createElement('div');
                    status.className = 'status';
                    status.textContent = 'Qualified';
                    
                    studentMarks.appendChild(totalMarks);
                    studentMarks.appendChild(status);
                    
                    studentItem.appendChild(studentInfo);
                    studentItem.appendChild(studentMarks);
                    
                    studentList.appendChild(studentItem);
                });
            } else {
                const noStudents = document.createElement('div');
                noStudents.className = 'no-students';
                noStudents.textContent = 'No qualified students found for this programme.';
                studentList.appendChild(noStudents);
            }
            
            programmeItem.appendChild(programmeTitle);
            programmeItem.appendChild(programmeDescription);
            programmeItem.appendChild(studentList);
            
            programmeList.appendChild(programmeItem);
        }
        
        programmeListContainer.appendChild(programmeList);
    }
    
    // Initial render
    renderProgrammeLists();
    
    // Add event listener for programme selection
    programmeSelect.addEventListener('change', function() {
        renderProgrammeLists(this.value);
    });
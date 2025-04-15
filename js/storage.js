const Storage = {
    // Student operations
    getStudents: () => {
        const students = localStorage.getItem('students');
        return students ? JSON.parse(students) : [];
    },
    addStudent: (student) => {
        const students = Storage.getStudents();
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    },
    getFeedback: () => {
        const feedback = localStorage.getItem('feedback');
        return feedback ? JSON.parse(feedback) : [];
    },
    addFeedback: (feedback) => {
        const allFeedback = Storage.getFeedback();
        allFeedback.push(feedback);
        localStorage.setItem('feedback', JSON.stringify(allFeedback));
    },
    
    // Placement operations
    getPlacements: () => {
        const placements = localStorage.getItem('placements');
        return placements ? JSON.parse(placements) : [];
    },
    addPlacement: (placement) => {
        const allPlacements = Storage.getPlacements();
        allPlacements.push(placement);
        localStorage.setItem('placements', JSON.stringify(allPlacements));
    },
    
    // Initialize sample placement data
    initPlacementData: () => {
        if (!localStorage.getItem('placements')) {
            const samplePlacements = [
                // Computer Science Placements
                {
                    id: 'PL001',
                    name: "Rahul Sharma",
                    programme: "BTech-CS",
                    studentImage: "rahul-sharma.jpg",
                    company: "Google",
                    companyLogo: "google.png",
                    position: "Software Engineer",
                    package: "32",
                    year: 2023
                },
                {
                    id: 'PL002',
                    name: "Priya Patel",
                    programme: "BTech-CS",
                    studentImage: "priya-patel.jpg",
                    company: "Microsoft",
                    companyLogo: "microsoft.png",
                    position: "Product Manager",
                    package: "28",
                    year: 2023
                },
                // Electrical Engineering Placements
                {
                    id: 'PL003',
                    name: "Sanjay Kumar",
                    programme: "BTech-EE",
                    studentImage: "sanjay-kumar.jpg",
                    company: "Siemens",
                    companyLogo: "siemens.png",
                    position: "Electrical Engineer",
                    package: "18",
                    year: 2023
                },
                {
                    id: 'PL004',
                    name: "Anjali Mishra",
                    programme: "BTech-EE",
                    studentImage: "anjali-mishra.jpg",
                    company: "Schneider Electric",
                    companyLogo: "schneider.png",
                    position: "Design Engineer",
                    package: "22",
                    year: 2023
                },
                // Mathematics Placements
                {
                    id: 'PL005',
                    name: "Arun Mehta",
                    programme: "BSc-Math",
                    studentImage: "arun-mehta.jpg",
                    company: "Goldman Sachs",
                    companyLogo: "goldman-sachs.png",
                    position: "Quantitative Analyst",
                    package: "35",
                    year: 2023
                },
                // BBA Placements
                {
                    id: 'PL006',
                    name: "Shreya Iyer",
                    programme: "BBA",
                    studentImage: "shreya-iyer.jpg",
                    company: "Aditya Birla Group",
                    companyLogo: "aditya-birla.png",
                    position: "Management Trainee",
                    package: "15",
                    year: 2023
                },
                {
                    id: 'PL007',
                    name: "Vivek Bhatia",
                    programme: "BBA",
                    studentImage: "vivek-bhatia.jpg",
                    company: "Reliance",
                    companyLogo: "reliance.png",
                    position: "Business Analyst",
                    package: "18",
                    year: 2023
                },
                // More placements
                {
                    id: 'PL008',
                    name: "Neha Gupta",
                    programme: "BTech-CS",
                    studentImage: "neha-gupta.jpg",
                    company: "Zomato",
                    companyLogo: "zomato.png",
                    position: "Backend Developer",
                    package: "24",
                    year: 2023
                },
                {
                    id: 'PL009',
                    name: "Amit Singh",
                    programme: "BTech-CS",
                    studentImage: "amit-singh.jpg",
                    company: "PhonePe",
                    companyLogo: "phonepe.png",
                    position: "Mobile Developer",
                    package: "26",
                    year: 2023
                },
                {
                    id: 'PL010',
                    name: "Divya Nair",
                    programme: "BSc-Math",
                    studentImage: "divya-nair.jpg",
                    company: "Myntra",
                    companyLogo: "myntra.png",
                    position: "Data Analyst",
                    package: "20",
                    year: 2023
                },
                {
                    id: 'PL011',
                    name: "Karan Malhotra",
                    programme: "BTech-EE",
                    studentImage: "karan-malhotra.jpg",
                    company: "Mahindra",
                    companyLogo: "mahindra.png",
                    position: "Automotive Engineer",
                    package: "16",
                    year: 2023
                }
            ];
            localStorage.setItem('placements', JSON.stringify(samplePlacements));
        }
    },
    // Marks of the existing students 
    getMarks: () => {
        const marks = localStorage.getItem('studentMarks');
        return marks ? JSON.parse(marks) : [];
    },
    addMarks: (marksData) => {
        const allMarks = Storage.getMarks();
        allMarks.push(marksData);
        localStorage.setItem('studentMarks', JSON.stringify(allMarks));
    },
    calculateRanks: () => {
        const marks = Storage.getMarks();
        const programs = [...new Set(marks.map(m => m.programme))];
        
        return programs.map(program => {
            const programMarks = marks.filter(m => m.programme === program)
                                      .sort((a, b) => b.totalMarks - a.totalMarks);
            
            const totalStudents = programMarks.length;
            programMarks.forEach((student, index) => {
                student.rank = index + 1;
                student.percentile = ((totalStudents - student.rank) / totalStudents * 100).toFixed(2);
            });
            
            return {
                programme: program,
                students: programMarks
            };
        });
    },
    
    // Get unique programmes from placements
    getProgrammes: () => {
        const placements = Storage.getPlacements();
        return [...new Set(placements.map(p => p.programme))];
    },
    setAdminCredentials: (credentials) => {
        localStorage.setItem('adminCredentials', JSON.stringify(credentials));
    },
    verifyAdmin: (username, password) => {
        const credentials = JSON.parse(localStorage.getItem('adminCredentials'));
        return credentials && 
               credentials.username === username && 
               credentials.password === password;
    },
    isAdminLoggedIn: () => {
        return localStorage.getItem('adminLoggedIn') === 'true';
    },
    setAdminLogin: (status) => {
        localStorage.setItem('adminLoggedIn', status);
    }
};

// Initialize default admin credentials if none exist
if (!localStorage.getItem('adminCredentials')) {
    Storage.setAdminCredentials({
        username: 'admin',
        password: 'admin123'
    });
}


// Initialize data when storage.js loads
Storage.initPlacementData();

 
// Initialize with sample marks data if none exists
if (!localStorage.getItem('studentMarks')) {
    const sampleMarks = [
        // Computer Science Students
        { studentId: 'CS001', name: 'Rahul Sharma', programme: 'BTech-CS', marks: { maths: 85, physics: 78, programming: 92 }, totalMarks: 255 },
        { studentId: 'CS002', name: 'Priya Patel', programme: 'BTech-CS', marks: { maths: 92, physics: 88, programming: 95 }, totalMarks: 275 },
        { studentId: 'CS003', name: 'Amit Singh', programme: 'BTech-CS', marks: { maths: 78, physics: 82, programming: 85 }, totalMarks: 245 },
        { studentId: 'CS004', name: 'Neha Gupta', programme: 'BTech-CS', marks: { maths: 88, physics: 90, programming: 89 }, totalMarks: 267 },
        { studentId: 'CS005', name: 'Vikram Joshi', programme: 'BTech-CS', marks: { maths: 80, physics: 85, programming: 90 }, totalMarks: 255 },
        
        // Electrical Engineering Students
        { studentId: 'EE001', name: 'Sanjay Kumar', programme: 'BTech-EE', marks: { maths: 82, physics: 90, circuits: 88 }, totalMarks: 260 },
        { studentId: 'EE002', name: 'Anjali Mishra', programme: 'BTech-EE', marks: { maths: 90, physics: 92, circuits: 95 }, totalMarks: 277 },
        { studentId: 'EE003', name: 'Rajesh Verma', programme: 'BTech-EE', marks: { maths: 75, physics: 80, circuits: 78 }, totalMarks: 233 },
        { studentId: 'EE004', name: 'Pooja Reddy', programme: 'BTech-EE', marks: { maths: 85, physics: 88, circuits: 90 }, totalMarks: 263 },
        { studentId: 'EE005', name: 'Karan Malhotra', programme: 'BTech-EE', marks: { maths: 78, physics: 85, circuits: 82 }, totalMarks: 245 }
    ];
    localStorage.setItem('studentMarks', JSON.stringify(sampleMarks));
}
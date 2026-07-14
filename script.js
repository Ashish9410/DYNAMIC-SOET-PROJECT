(function() {
    // ================= RESEARCH MODAL FUNCTIONS =================
    window.openResearchModal = function() {
        document.getElementById('researchOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeResearchModal = function() {
        document.getElementById('researchOverlay').classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    window.toggleResearchAccordion = function(id) {
        const content = document.getElementById(id + '-content');
        const icon = content.parentElement.querySelector('i');
        if (content.style.display === 'block') {
            content.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
        } else {
            content.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
        }
    };

    document.getElementById('researchOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeResearchModal();
    });

    // ================= FEE STRUCTURE DATA & FUNCTIONS =================
    const feeData = {
        "School of Engineering and Technology": [
            { course: "B.Tech. Computer Science and Engineering (CSE)", duration: "4 Years", tuition: "₹1,55,000", hostel: "₹1,20,000", annual: "₹2,75,000" },
            { course: "B.Tech. Computer Science and Engineering (AI & ML)", duration: "4 Years", tuition: "₹1,55,000", hostel: "₹1,20,000", annual: "₹2,75,000" },
            { course: "B.Tech. Computer Science and Engineering (Cyber Security)", duration: "4 Years", tuition: "₹1,55,000", hostel: "₹1,20,000", annual: "₹2,75,000" },
            { course: "B.Tech. Computer Science and Engineering (IoT)", duration: "4 Years", tuition: "₹1,55,000", hostel: "₹1,20,000", annual: "₹2,75,000" },
            { course: "B.Tech. Computer Science and Engineering (Data Science)", duration: "4 Years", tuition: "₹1,55,000", hostel: "₹1,20,000", annual: "₹2,75,000" },
            { course: "B.Tech. Computer Science and Engineering (Blockchain)", duration: "4 Years", tuition: "₹1,55,000", hostel: "₹1,20,000", annual: "₹2,75,000" },
            { course: "B.Tech. Electronics and Communication Engineering", duration: "4 Years", tuition: "₹1,35,000", hostel: "₹1,20,000", annual: "₹2,55,000" },
            { course: "B.Tech. Mechanical Engineering", duration: "4 Years", tuition: "₹1,35,000", hostel: "₹1,20,000", annual: "₹2,55,000" },
            { course: "B.Tech. Civil Engineering", duration: "4 Years", tuition: "₹1,35,000", hostel: "₹1,20,000", annual: "₹2,55,000" },
            { course: "B.Tech. CSE (Lateral Entry)", duration: "3 Years", tuition: "₹1,55,000", hostel: "₹1,20,000", annual: "₹2,75,000" },
            { course: "B.Sc. Computer Science", duration: "3 Years", tuition: "₹90,000", hostel: "₹1,20,000", annual: "₹2,10,000" },
            { course: "B.Sc. (Hons.) Data Science", duration: "3 Years", tuition: "₹90,000", hostel: "₹1,20,000", annual: "₹2,10,000" },
            { course: "MCA (Master of Computer Applications)", duration: "2 Years", tuition: "₹1,10,000", hostel: "₹1,20,000", annual: "₹2,30,000" }
        ],
        "School of Management and Commerce": [
            { course: "MBA (Master of Business Administration)", duration: "2 Years", tuition: "₹1,50,000", hostel: "₹1,20,000", annual: "₹2,70,000" },
            { course: "BBA (Bachelor of Business Administration)", duration: "3 Years", tuition: "₹1,00,000", hostel: "₹1,20,000", annual: "₹2,20,000" },
            { course: "B.Com (Bachelor of Commerce)", duration: "3 Years", tuition: "₹80,000", hostel: "₹1,20,000", annual: "₹2,00,000" },
            { course: "B.Com (Hons.)", duration: "3 Years", tuition: "₹90,000", hostel: "₹1,20,000", annual: "₹2,10,000" }
        ],
        "School of Basic and Applied Sciences": [
            { course: "B.Sc. Physics", duration: "3 Years", tuition: "₹85,000", hostel: "₹1,20,000", annual: "₹2,05,000" },
            { course: "B.Sc. Chemistry", duration: "3 Years", tuition: "₹85,000", hostel: "₹1,20,000", annual: "₹2,05,000" },
            { course: "B.Sc. Mathematics", duration: "3 Years", tuition: "₹85,000", hostel: "₹1,20,000", annual: "₹2,05,000" },
            { course: "B.Sc. Biotechnology", duration: "3 Years", tuition: "₹1,00,000", hostel: "₹1,20,000", annual: "₹2,20,000" },
            { course: "M.Sc. Physics", duration: "2 Years", tuition: "₹1,00,000", hostel: "₹1,20,000", annual: "₹2,20,000" },
            { course: "M.Sc. Chemistry", duration: "2 Years", tuition: "₹1,00,000", hostel: "₹1,20,000", annual: "₹2,20,000" }
        ],
        "School of Medical and Allied Sciences": [
            { course: "B.Pharma (Bachelor of Pharmacy)", duration: "4 Years", tuition: "₹1,40,000", hostel: "₹1,20,000", annual: "₹2,60,000" },
            { course: "B.Sc. Nursing", duration: "4 Years", tuition: "₹1,20,000", hostel: "₹1,20,000", annual: "₹2,40,000" },
            { course: "M.Pharma", duration: "2 Years", tuition: "₹1,50,000", hostel: "₹1,20,000", annual: "₹2,70,000" }
        ],
        "School of Pharmacy": [
            { course: "B.Pharma", duration: "4 Years", tuition: "₹1,40,000", hostel: "₹1,20,000", annual: "₹2,60,000" },
            { course: "Pharm.D (Doctor of Pharmacy)", duration: "6 Years", tuition: "₹1,60,000", hostel: "₹1,20,000", annual: "₹2,80,000" }
        ],
        "School of Architecture and Planning": [
            { course: "B.Arch (Bachelor of Architecture)", duration: "5 Years", tuition: "₹1,60,000", hostel: "₹1,20,000", annual: "₹2,80,000" },
            { course: "M.Arch", duration: "2 Years", tuition: "₹1,40,000", hostel: "₹1,20,000", annual: "₹2,60,000" }
        ],
        "School of Legal Studies": [
            { course: "BA LLB (Integrated)", duration: "5 Years", tuition: "₹1,20,000", hostel: "₹1,20,000", annual: "₹2,40,000" },
            { course: "BBA LLB (Integrated)", duration: "5 Years", tuition: "₹1,20,000", hostel: "₹1,20,000", annual: "₹2,40,000" },
            { course: "LLB", duration: "3 Years", tuition: "₹90,000", hostel: "₹1,20,000", annual: "₹2,10,000" },
            { course: "LLM", duration: "1 Year", tuition: "₹1,00,000", hostel: "₹1,20,000", annual: "₹2,20,000" }
        ],
        "School of Emerging Media and Creative Arts": [
            { course: "BA Journalism & Mass Communication", duration: "3 Years", tuition: "₹90,000", hostel: "₹1,20,000", annual: "₹2,10,000" },
            { course: "BA Animation & Multimedia", duration: "3 Years", tuition: "₹1,00,000", hostel: "₹1,20,000", annual: "₹2,20,000" },
            { course: "MA Journalism & Mass Communication", duration: "2 Years", tuition: "₹1,00,000", hostel: "₹1,20,000", annual: "₹2,20,000" }
        ],
        "School of Liberal Arts": [
            { course: "BA English Literature", duration: "3 Years", tuition: "₹80,000", hostel: "₹1,20,000", annual: "₹2,00,000" },
            { course: "BA Economics", duration: "3 Years", tuition: "₹80,000", hostel: "₹1,20,000", annual: "₹2,00,000" },
            { course: "MA English Literature", duration: "2 Years", tuition: "₹90,000", hostel: "₹1,20,000", annual: "₹2,10,000" },
            { course: "MA Economics", duration: "2 Years", tuition: "₹90,000", hostel: "₹1,20,000", annual: "₹2,10,000" }
        ],
        "School of Education": [
            { course: "B.Ed (Bachelor of Education)", duration: "2 Years", tuition: "₹80,000", hostel: "₹1,20,000", annual: "₹2,00,000" },
            { course: "M.Ed (Master of Education)", duration: "2 Years", tuition: "₹90,000", hostel: "₹1,20,000", annual: "₹2,10,000" }
        ],
        "School of Agriculture": [
            { course: "B.Sc. Agriculture (Hons.)", duration: "4 Years", tuition: "₹1,10,000", hostel: "₹1,20,000", annual: "₹2,30,000" },
            { course: "M.Sc. Agriculture", duration: "2 Years", tuition: "₹1,20,000", hostel: "₹1,20,000", annual: "₹2,40,000" }
        ],
        "Ph.D.": [
            { course: "Ph.D. in Computer Science", duration: "3-5 Years", tuition: "₹1,20,000", hostel: "₹1,20,000", annual: "₹2,40,000" },
            { course: "Ph.D. in Management", duration: "3-5 Years", tuition: "₹1,20,000", hostel: "₹1,20,000", annual: "₹2,40,000" },
            { course: "Ph.D. in Sciences", duration: "3-5 Years", tuition: "₹1,20,000", hostel: "₹1,20,000", annual: "₹2,40,000" },
            { course: "Ph.D. in English", duration: "3-5 Years", tuition: "₹1,20,000", hostel: "₹1,20,000", annual: "₹2,40,000" }
        ]
    };

    window.openFeeStructure = function() {
        document.getElementById('feeOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        
        const sidebar = document.getElementById('feeSidebarList');
        const contentArea = document.getElementById('feeContentArea');
        const schoolKeys = Object.keys(feeData);

        sidebar.innerHTML = schoolKeys.map((school, index) => `
            <div class="fee-sidebar-item" style="padding: 0.8rem 1.5rem; cursor: pointer; border-left: 3px solid transparent; transition: 0.2s; font-size: 0.9rem; color: #475569; ${index === 0 ? 'background: #eef3fe; border-left-color: #1e3a8a; color: #1e3a8a; font-weight: 600;' : ''}" onclick="loadFeeContent('${school}', this)">
                ${school}
            </div>
        `).join('');

        if(schoolKeys.length > 0) {
            loadFeeContent(schoolKeys[0], sidebar.querySelector('.fee-sidebar-item'));
        }
    };

    window.loadFeeContent = function(school, element) {
        const sidebarItems = document.querySelectorAll('.fee-sidebar-item');
        sidebarItems.forEach(item => {
            item.style.background = 'transparent';
            item.style.borderLeftColor = 'transparent';
            item.style.color = '#475569';
            item.style.fontWeight = '500';
        });
        if (element) {
            element.style.background = '#eef3fe';
            element.style.borderLeftColor = '#1e3a8a';
            element.style.color = '#1e3a8a';
            element.style.fontWeight = '600';
        }

        const courses = feeData[school];
        const contentArea = document.getElementById('feeContentArea');
        if (!courses || courses.length === 0) {
            contentArea.innerHTML = `<h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 1rem;">${school}</h2><p class="text-muted">No fee data available for this school.</p>`;
            return;
        }

        let tableHtml = `
            <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 1rem;">${school}</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th style="width: 40%;">Programmes</th>
                            <th>Duration</th>
                            <th>Tuition Fee (Per Year)</th>
                            <th>Hostel Fee (Per Year)</th>
                            <th>Annual Fee (Total)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${courses.map(course => `
                            <tr>
                                <td><strong>${course.course}</strong></td>
                                <td>${course.duration}</td>
                                <td>${course.tuition}</td>
                                <td>${course.hostel}</td>
                                <td><span class="badge-soft" style="font-size: 0.85rem; background: #dbeafe; color: #1e3a8a;">${course.annual}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <p class="text-muted" style="margin-top: 0.8rem; font-size: 0.75rem;">* The above fees are indicative and subject to change. Hostel fees are optional.</p>
        `;
        contentArea.innerHTML = tableHtml;
    };

    window.closeFeeStructure = function() {
        document.getElementById('feeOverlay').classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    document.getElementById('feeOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeFeeStructure();
    });

    // ================= DATA =================
    // All users - includes students, faculty, and admins
    let users = JSON.parse(localStorage.getItem('soet_users')) || [
        { name: 'Admin', email: 'admin@soet.edu', password: 'password123', role: 'admin', rollNo: '' },
        { name: 'Dr. Alaric', email: 'faculty@soet.edu', password: 'password123', role: 'faculty', rollNo: '' }
    ];

    let admins = JSON.parse(localStorage.getItem('soet_admins')) || ['admin@soet.edu'];
    let applications = JSON.parse(localStorage.getItem('soet_applications')) || [];
    let currentUser = null;
    let isSignup = false;

    // ================= TIMETABLE DATA =================
    let timetableData = JSON.parse(localStorage.getItem('soet_timetable')) || {
        slots: [
            { time: '09:00 - 10:30', mon: 'DS (A-102)', tue: 'NN (A-102)', wed: 'DS (A-102)', thu: 'NN (A-102)', fri: 'DS (A-102)' },
            { time: '11:00 - 12:30', mon: 'EH (Lab 402)', tue: 'CD (LT-2)', wed: 'EH (Lab 402)', thu: 'CD (LT-2)', fri: 'EH (Lab 402)' },
            { time: '02:00 - 03:30', mon: 'CD (LT-2)', tue: 'DS (A-102)', wed: 'NN (A-102)', thu: 'DS (A-102)', fri: 'CD (LT-2)' }
        ]
    };
    function saveTimetable() { localStorage.setItem('soet_timetable', JSON.stringify(timetableData)); }

    // ================= ACADEMIC CALENDAR PDF =================
    const ACADEMIC_CALENDAR_PDF_PATH = "assets/academic-calendar-2026-27.pdf";
    window.openAcademicCalendarPDF = function() {
        window.open(ACADEMIC_CALENDAR_PDF_PATH, '_blank');
    };

    // ================= DOM REFS =================
    const publicWebsite = document.getElementById('publicWebsite');
    const dashboard = document.getElementById('dashboard');
    const authOverlay = document.getElementById('authOverlay');
    const authForm = document.getElementById('authForm');
    const authName = document.getElementById('authName');
    const authNameGroup = document.getElementById('authNameGroup');
    const authRoll = document.getElementById('authRoll');
    const authRollGroup = document.getElementById('authRollGroup');
    const authEmail = document.getElementById('authEmail');
    const authPassword = document.getElementById('authPassword');
    const authRole = document.getElementById('authRole');
    const authError = document.getElementById('authError');
    const authSubText = document.getElementById('authSubText');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const switchLink = document.getElementById('switchToSignup');
    const authSwitchText = document.getElementById('authSwitchText');
    const toast = document.getElementById('toast');
    const logoutBtn = document.getElementById('logoutBtn');
    const dashUserName = document.getElementById('dashUserName');
    const dashRoleTag = document.getElementById('dashRoleTag');
    const greeting = document.getElementById('greeting');
    const subGreeting = document.getElementById('subGreeting');
    const adminPanel = document.getElementById('adminPanel');
    const adminListContainer = document.getElementById('adminListContainer');

    const applyOverlay = document.getElementById('applyOverlay');
    const applyForm = document.getElementById('applyForm');
    const applyName = document.getElementById('applyName');
    const applyEmail = document.getElementById('applyEmail');
    const applyPhone = document.getElementById('applyPhone');
    const applyDob = document.getElementById('applyDob');
    const applyGender = document.getElementById('applyGender');
    const applyCourseType = document.getElementById('applyCourseType');
    const applyCourse = document.getElementById('applyCourse');
    const applyEducation = document.getElementById('applyEducation');
    const applyAddress = document.getElementById('applyAddress');
    const applyNotes = document.getElementById('applyNotes');
    const applySuccess = document.getElementById('applySuccess');
    const applyError = document.getElementById('applyError');
    const applySubmitBtn = document.getElementById('applySubmitBtn');

    const adminEmailInput = document.getElementById('adminEmailInput');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const addAdminBtn = document.getElementById('addAdminBtn');
    const resetAdminBtn = document.getElementById('resetAdminBtn');

    const saveTimetableBtn = document.getElementById('saveTimetableBtn');
    const resetTimetableBtn = document.getElementById('resetTimetableBtn');
    const addTimeSlotBtn = document.getElementById('addTimeSlotBtn');

    // ================= COURSE DATA =================
    const courses = {
        ug: [
            'B.Tech in Computer Science & Engineering',
            'B.Tech in Artificial Intelligence & ML',
            'B.Tech in Information Technology',
            'B.Tech in Electronics & Communication',
            'B.Tech in Mechanical Engineering',
            'B.Tech in Civil Engineering',
            'B.Sc in Computer Science',
            'B.Sc in Mathematics',
            'B.Sc in Physics',
            'B.Sc in Chemistry',
            'B.Sc in Biotechnology',
            'B.Sc in Environmental Science',
            'BCA (Bachelor of Computer Applications)',
            'BBA (Bachelor of Business Administration)',
            'BA in English Literature',
            'BA in Journalism & Mass Communication',
            'BA in Economics',
            'B.Com (Bachelor of Commerce)',
            'B.Pharma (Bachelor of Pharmacy)',
            'Bachelor of Hotel Management (BHM)'
        ],
        pg: [
            'M.Tech in Computer Science & Engineering',
            'M.Tech in Artificial Intelligence & ML',
            'M.Tech in Data Science',
            'M.Tech in VLSI Design',
            'M.Sc in Computer Science',
            'M.Sc in Mathematics',
            'M.Sc in Physics',
            'M.Sc in Chemistry',
            'MCA (Master of Computer Applications)',
            'MBA (Master of Business Administration)',
            'MA in English Literature',
            'MA in Economics',
            'MA in Journalism & Mass Communication'
        ],
        diploma: [
            'Diploma in Computer Applications',
            'Diploma in Web Development',
            'Diploma in Digital Marketing',
            'Diploma in Data Science',
            'Diploma in Graphic Design',
            'Diploma in Business Management',
            'Diploma in Foreign Languages'
        ],
        phd: [
            'PhD in Computer Science',
            'PhD in Artificial Intelligence & ML',
            'PhD in Mathematics',
            'PhD in Physics',
            'PhD in Chemistry',
            'PhD in Biotechnology',
            'PhD in Engineering',
            'PhD in Management Studies',
            'PhD in English Literature'
        ]
    };

    // ================= TOAST =================
    window.showToast = function(msg, type = 'info') {
        toast.textContent = msg;
        toast.className = 'toast ' + type;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
    };

    // ================= HELPERS =================
    function saveUsers() { localStorage.setItem('soet_users', JSON.stringify(users)); }
    function saveAdmins() { localStorage.setItem('soet_admins', JSON.stringify(admins)); }
    function saveApplications() { localStorage.setItem('soet_applications', JSON.stringify(applications)); }

    function showError(msg) {
        authError.style.display = msg ? 'block' : 'none';
        authError.textContent = msg || '';
    }

    // ================= GET STUDENTS AND FACULTY FROM USERS =================
    function getStudentsFromUsers() {
        return users.filter(u => u.role === 'student' && u.rollNo);
    }

    function getFacultyFromUsers() {
        return users.filter(u => u.role === 'faculty');
    }

    // ================= APPLICATION FUNCTIONS =================
    window.updateCourses = function() {
        const type = applyCourseType.value;
        const courseSelect = applyCourse;
        courseSelect.innerHTML = '<option value="">Select a course</option>';
        if (type && courses[type]) {
            courses[type].forEach(course => {
                const option = document.createElement('option');
                option.value = course;
                option.textContent = course;
                courseSelect.appendChild(option);
            });
        }
    };

    window.openApply = function() {
        applyOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        applyForm.reset();
        applySuccess.classList.remove('show');
        applyError.style.display = 'none';
        applyCourse.innerHTML = '<option value="">Select a course</option>';
    };

    window.closeApply = function() {
        applyOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    applyOverlay.addEventListener('click', function(e) {
        if (e.target === this) closeApply();
    });

    function updateMasterExcel() {
        let allApps = JSON.parse(localStorage.getItem('soet_applications')) || [];
        if (allApps.length === 0) return;

        const excelData = allApps.map(app => ({
            'Application ID': app.id,
            'Full Name': app.name,
            'Email Address': app.email,
            'Phone Number': app.phone,
            'Date of Birth': app.dob,
            'Gender': app.gender,
            'Course Type': app.courseType.toUpperCase(),
            'Selected Course': app.course,
            'Previous Education': app.education || 'Not Specified',
            'Address': app.address || 'Not Specified',
            'Additional Notes': app.notes || 'None',
            'Applied Date': new Date(app.appliedAt).toLocaleString('en-IN')
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws, "Applications");
        XLSX.writeFile(wb, "Applications_Data.xlsx");
    }

    applyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = applyName.value.trim();
        const email = applyEmail.value.trim();
        const phone = applyPhone.value.trim();
        const dob = applyDob.value;
        const gender = applyGender.value;
        const courseType = applyCourseType.value;
        const course = applyCourse.value;

        if (!name || !email || !phone || !dob || !gender || !courseType || !course) {
            applyError.textContent = 'Please fill in all required fields.';
            applyError.style.display = 'block';
            return;
        }

        applyError.style.display = 'none';

        const application = {
            id: Date.now(),
            name,
            email,
            phone,
            dob,
            gender,
            courseType,
            course,
            education: applyEducation.value,
            address: applyAddress.value.trim(),
            notes: applyNotes.value.trim(),
            appliedAt: new Date().toISOString(),
            status: 'pending'
        };

        applications.push(application);
        saveApplications();

        applySuccess.classList.add('show');
        applySubmitBtn.disabled = true;
        
        setTimeout(() => {
            updateMasterExcel();
            applySubmitBtn.disabled = false;
            closeApply();
            showToast('✅ Application submitted! Master Excel file updated.', 'success');
        }, 1500);
    });

    // ================= AUTH =================
    window.openLogin = function() {
        authOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLogin = function() {
        authOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    authOverlay.addEventListener('click', function(e) {
        if (e.target === this) closeLogin();
    });

    window.scrollToSection = function(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    authRole.addEventListener('change', function() {
        if (isSignup) {
            authRollGroup.style.display = (authRole.value === 'student') ? 'block' : 'none';
            if (authRole.value !== 'student') { authRoll.value = ''; }
        }
    });

    switchLink.addEventListener('click', function(e) {
        e.preventDefault();
        isSignup = !isSignup;
        if (isSignup) {
            this.textContent = 'Sign in';
            authSwitchText.textContent = "Already have an account?";
            authSubmitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Sign Up';
            authNameGroup.style.display = 'block';
            authRollGroup.style.display = (authRole.value === 'student') ? 'block' : 'none';
            authName.required = true;
            authSubText.textContent = "Create a new student or faculty account.";
            showError('');
        } else {
            this.textContent = 'Register';
            authSwitchText.textContent = "Don't have an account?";
            authSubmitBtn.innerHTML = '<i class="fas fa-arrow-right-to-bracket"></i> Sign In';
            authNameGroup.style.display = 'none';
            authRollGroup.style.display = 'none';
            authName.required = false;
            authSubText.textContent = "Access your Academic & ERP Dashboard";
            showError('');
        }
    });

    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = authName.value.trim();
        const rollNo = authRoll.value.trim();
        const email = authEmail.value.trim();
        const password = authPassword.value.trim();
        const role = authRole.value;

        if (!email || !password) { showError('Please fill in all required fields.'); return; }

        if (isSignup) {
            if (users.find(u => u.email === email)) {
                showError('This email is already registered. Please Sign In.');
                return;
            }
            if (!name) { showError('Please enter your full name.'); return; }
            if (role === 'student' && !rollNo) { showError('Please enter your Roll No.'); return; }

            const newUser = { name, email, password, role, rollNo };
            users.push(newUser);
            saveUsers();
            showError('');
            showToast('✅ Account created successfully!', 'success');
            
            // Auto-login after signup
            currentUser = newUser;
            closeLogin();
            enterDashboard(newUser);
            
            isSignup = false;
            switchLink.textContent = 'Register';
            authSwitchText.textContent = "Don't have an account?";
            authSubmitBtn.innerHTML = '<i class="fas fa-arrow-right-to-bracket"></i> Sign In';
            authNameGroup.style.display = 'none';
            authRollGroup.style.display = 'none';
            authName.required = false;
            authSubText.textContent = "Access your Academic & ERP Dashboard";
            authEmail.value = email;
            authPassword.value = '';
            return;
        }

        const user = users.find(u => u.email === email && u.password === password && u.role === role);
        if (!user) {
            showError('Invalid credentials or role mismatch.');
            return;
        }
        showError('');
        currentUser = user;
        closeLogin();
        enterDashboard(user);
        showToast(`👋 Welcome back, ${user.name}!`, 'success');
    });

    // ================= ADMIN PANEL FUNCTIONS =================
    function renderAdmins() {
        if (!adminListContainer) return;
        adminListContainer.innerHTML = '';
        if (!admins.length) {
            adminListContainer.innerHTML = '<p class="text-muted">No admins found. Add an admin below.</p>';
            return;
        }
        admins.forEach(email => {
            const span = document.createElement('span');
            span.className = 'admin-tag';
            span.innerHTML = `<i class="fas fa-user-shield"></i> ${email} <i class="fas fa-times" data-email="${email}" style="cursor:pointer;color:#dc2626;margin-left:8px;"></i>`;
            adminListContainer.appendChild(span);
        });
        document.querySelectorAll('.admin-tag .fa-times').forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                const email = this.dataset.email;
                if (!email) return;
                if (admins.length <= 1) {
                    showToast('⚠️ At least one admin must remain.', 'error');
                    return;
                }
                admins = admins.filter(e => e !== email);
                // Remove admin role from user but keep user
                const user = users.find(u => u.email === email);
                if (user) {
                    user.role = 'student'; // Demote to student
                    saveUsers();
                }
                saveAdmins();
                renderAdmins();
                renderUserManagement();
                showToast(`🗑️ Removed ${email}`, 'info');
            });
        });
    }

    // ================= USER MANAGEMENT (Admin) =================
    function renderUserManagement() {
        const container = document.getElementById('userManagementContainer');
        if (!container) return;
        
        const students = users.filter(u => u.role === 'student');
        const faculty = users.filter(u => u.role === 'faculty');
        
        container.innerHTML = `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
                <div class="card" style="padding:1rem;">
                    <div class="card-header">
                        <h3><i class="fas fa-user-graduate" style="color:#1e3a8a;"></i> Students (${students.length})</h3>
                        <span class="badge-soft">${students.length} registered</span>
                    </div>
                    <div style="max-height:300px;overflow-y:auto;">
                        ${students.length === 0 ? '<p class="text-muted">No students registered yet.</p>' : 
                        students.map(s => `
                            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0;border-bottom:1px solid #f1f5f9;">
                                <div>
                                    <strong>${s.name}</strong>
                                    <div style="font-size:0.75rem;color:#64748b;">${s.email} | Roll: ${s.rollNo || 'N/A'}</div>
                                </div>
                                <button class="btn btn-danger" onclick="removeUser('${s.email}')" style="font-size:0.65rem;padding:0.2rem 0.6rem;">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="card" style="padding:1rem;">
                    <div class="card-header">
                        <h3><i class="fas fa-chalkboard-teacher" style="color:#1e3a8a;"></i> Faculty (${faculty.length})</h3>
                        <span class="badge-soft">${faculty.length} registered</span>
                    </div>
                    <div style="max-height:300px;overflow-y:auto;">
                        ${faculty.length === 0 ? '<p class="text-muted">No faculty registered yet.</p>' : 
                        faculty.map(f => `
                            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.4rem 0;border-bottom:1px solid #f1f5f9;">
                                <div>
                                    <strong>${f.name}</strong>
                                    <div style="font-size:0.75rem;color:#64748b;">${f.email}</div>
                                </div>
                                <button class="btn btn-danger" onclick="removeUser('${f.email}')" style="font-size:0.65rem;padding:0.2rem 0.6rem;">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="card mt-2" style="padding:1rem;background:linear-gradient(135deg,#fef9e7,#fff8e7);border:1px solid #fde68a;">
                <div class="card-header">
                    <h3><i class="fas fa-info-circle" style="color:#b45309;"></i> User Management Instructions</h3>
                </div>
                <ul style="list-style:disc;padding-left:1.5rem;color:#475569;line-height:2;font-size:0.85rem;">
                    <li><strong>Students</strong> registered via signup appear here and also in Faculty attendance/marks.</li>
                    <li><strong>Faculty</strong> registered via signup appear here for admin management.</li>
                    <li>Click the <strong>🗑️</strong> icon to remove any user (student or faculty).</li>
                    <li>Removed users will no longer have access to the system.</li>
                </ul>
            </div>
        `;
    }

    // ================= REMOVE USER =================
    window.removeUser = function(email) {
        if (!currentUser || currentUser.role !== 'admin') {
            showToast('⚠️ Only admin can remove users.', 'error');
            return;
        }
        if (email === 'admin@soet.edu') {
            showToast('⚠️ Cannot remove the default admin.', 'error');
            return;
        }
        if (!confirm(`Are you sure you want to remove user: ${email}? This action cannot be undone.`)) return;
        
        users = users.filter(u => u.email !== email);
        admins = admins.filter(a => a !== email);
        saveUsers();
        saveAdmins();
        renderAdmins();
        renderUserManagement();
        showToast(`🗑️ User ${email} removed successfully.`, 'success');
    };

    if (addAdminBtn) {
        addAdminBtn.addEventListener('click', function() {
            const email = adminEmailInput.value.trim();
            const password = adminPasswordInput.value.trim();
            
            if (!email || !email.includes('@')) {
                showToast('⚠️ Enter a valid email address.', 'error');
                return;
            }
            if (!password || password.length < 6) {
                showToast('⚠️ Password must be at least 6 characters.', 'error');
                return;
            }
            if (admins.includes(email)) {
                showToast('⚠️ Admin already exists.', 'error');
                return;
            }
            
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                existingUser.role = 'admin';
                existingUser.password = password;
                existingUser.name = existingUser.name || email.split('@')[0];
            } else {
                users.push({ 
                    name: email.split('@')[0], 
                    email: email, 
                    password: password, 
                    role: 'admin', 
                    rollNo: '' 
                });
            }
            
            admins.push(email);
            saveUsers();
            saveAdmins();
            renderAdmins();
            renderUserManagement();
            adminEmailInput.value = '';
            adminPasswordInput.value = '';
            showToast(`✅ Admin ${email} added successfully!`, 'success');
        });
    }

    if (resetAdminBtn) {
        resetAdminBtn.addEventListener('click', function() {
            admins = ['admin@soet.edu'];
            if (!users.find(u => u.email === 'admin@soet.edu')) {
                users.push({ name: 'Admin', email: 'admin@soet.edu', password: 'password123', role: 'admin', rollNo: '' });
            }
            saveAdmins();
            saveUsers();
            renderAdmins();
            renderUserManagement();
            showToast('🔄 Admin list reset to default.', 'info');
        });
    }

    // ================= TIMETABLE FUNCTIONS =================
    function renderStudentTimetable() {
        const tbody = document.getElementById('studentTimetableBody');
        if (!tbody) return;
        
        if (!timetableData.slots || timetableData.slots.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-muted" style="text-align:center;">No timetable slots added yet.</td></tr>';
            return;
        }
        
        tbody.innerHTML = timetableData.slots.map(slot => `
            <tr>
                <td><strong>${slot.time}</strong></td>
                <td>${slot.mon || '-'}</td>
                <td>${slot.tue || '-'}</td>
                <td>${slot.wed || '-'}</td>
                <td>${slot.thu || '-'}</td>
                <td>${slot.fri || '-'}</td>
            </tr>
        `).join('');
    }

    function renderEditTimetable() {
        timetableData.slots.forEach((slot, index) => {
            const rowNum = index + 1;
            const monInput = document.getElementById(`tt-mon-${rowNum}`);
            const tueInput = document.getElementById(`tt-tue-${rowNum}`);
            const wedInput = document.getElementById(`tt-wed-${rowNum}`);
            const thuInput = document.getElementById(`tt-thu-${rowNum}`);
            const friInput = document.getElementById(`tt-fri-${rowNum}`);
            
            if (monInput) monInput.value = slot.mon || '';
            if (tueInput) tueInput.value = slot.tue || '';
            if (wedInput) wedInput.value = slot.wed || '';
            if (thuInput) thuInput.value = slot.thu || '';
            if (friInput) friInput.value = slot.fri || '';
        });
    }

    if (saveTimetableBtn) {
        saveTimetableBtn.addEventListener('click', function() {
            const statusEl = document.getElementById('timetableSaveStatus');
            const rows = document.querySelectorAll('#timetableEditBody tr');
            const newSlots = [];
            
            rows.forEach((row, index) => {
                const inputs = row.querySelectorAll('input');
                if (inputs.length >= 5) {
                    const timeLabel = row.querySelector('td:first-child')?.textContent || `Slot ${index + 1}`;
                    newSlots.push({
                        time: timeLabel.trim(),
                        mon: inputs[0].value.trim(),
                        tue: inputs[1].value.trim(),
                        wed: inputs[2].value.trim(),
                        thu: inputs[3].value.trim(),
                        fri: inputs[4].value.trim()
                    });
                }
            });
            
            if (newSlots.length === 0) {
                showToast('⚠️ No timetable slots to save.', 'error');
                return;
            }
            
            timetableData.slots = newSlots;
            saveTimetable();
            renderStudentTimetable();
            
            if (statusEl) {
                statusEl.style.display = 'inline-block';
                setTimeout(() => { statusEl.style.display = 'none'; }, 3000);
            }
            showToast('✅ Timetable saved successfully!', 'success');
        });
    }

    if (resetTimetableBtn) {
        resetTimetableBtn.addEventListener('click', function() {
            timetableData.slots = [
                { time: '09:00 - 10:30', mon: 'DS (A-102)', tue: 'NN (A-102)', wed: 'DS (A-102)', thu: 'NN (A-102)', fri: 'DS (A-102)' },
                { time: '11:00 - 12:30', mon: 'EH (Lab 402)', tue: 'CD (LT-2)', wed: 'EH (Lab 402)', thu: 'CD (LT-2)', fri: 'EH (Lab 402)' },
                { time: '02:00 - 03:30', mon: 'CD (LT-2)', tue: 'DS (A-102)', wed: 'NN (A-102)', thu: 'DS (A-102)', fri: 'CD (LT-2)' }
            ];
            saveTimetable();
            renderStudentTimetable();
            renderEditTimetable();
            showToast('🔄 Timetable reset to default.', 'info');
        });
    }

    if (addTimeSlotBtn) {
        addTimeSlotBtn.addEventListener('click', function() {
            const time = document.getElementById('newTimeSlot').value.trim();
            const mon = document.getElementById('newMon').value.trim();
            const tue = document.getElementById('newTue').value.trim();
            const wed = document.getElementById('newWed').value.trim();
            const thu = document.getElementById('newThu').value.trim();
            const fri = document.getElementById('newFri').value.trim();
            
            if (!time) {
                showToast('⚠️ Please enter a time slot.', 'error');
                return;
            }
            
            timetableData.slots.push({ time, mon, tue, wed, thu, fri });
            saveTimetable();
            renderStudentTimetable();
            
            const tbody = document.getElementById('timetableEditBody');
            const rowNum = timetableData.slots.length;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${time}</strong></td>
                <td><input type="text" id="tt-mon-${rowNum}" class="input-slim" style="width:100%;" value="${mon}"></td>
                <td><input type="text" id="tt-tue-${rowNum}" class="input-slim" style="width:100%;" value="${tue}"></td>
                <td><input type="text" id="tt-wed-${rowNum}" class="input-slim" style="width:100%;" value="${wed}"></td>
                <td><input type="text" id="tt-thu-${rowNum}" class="input-slim" style="width:100%;" value="${thu}"></td>
                <td><input type="text" id="tt-fri-${rowNum}" class="input-slim" style="width:100%;" value="${fri}"></td>
            `;
            tbody.appendChild(tr);
            
            document.getElementById('newTimeSlot').value = '';
            document.getElementById('newMon').value = '';
            document.getElementById('newTue').value = '';
            document.getElementById('newWed').value = '';
            document.getElementById('newThu').value = '';
            document.getElementById('newFri').value = '';
            
            showToast('✅ New time slot added!', 'success');
        });
    }

    // ================= DASHBOARD =================
    function enterDashboard(user) {
        publicWebsite.style.display = 'none';
        dashboard.classList.add('active');

        dashUserName.textContent = user.name || user.email.split('@')[0];
        dashRoleTag.textContent = user.role.toUpperCase();

        const isStudent = user.role === 'student';
        const isFaculty = user.role === 'faculty';
        const isAdmin = user.role === 'admin';

        document.querySelectorAll('.student-only').forEach(el => {
            if (el.classList.contains('taskbar-btn')) {
                el.style.display = isStudent ? 'inline-flex' : 'none';
            } else {
                el.style.display = isStudent ? 'block' : 'none';
            }
        });

        document.querySelectorAll('.faculty-only').forEach(el => {
            if (el.classList.contains('taskbar-btn')) {
                el.style.display = (isFaculty || isAdmin) ? 'inline-flex' : 'none';
            } else {
                el.style.display = (isFaculty || isAdmin) ? 'block' : 'none';
            }
        });

        document.querySelectorAll('.admin-only').forEach(el => {
            if (el.classList.contains('taskbar-btn')) {
                el.style.display = isAdmin ? 'inline-flex' : 'none';
            } else {
                el.style.display = isAdmin ? 'block' : 'none';
            }
        });

        const qrCard = document.getElementById('qrCard');
        if (qrCard) qrCard.style.display = (isFaculty || isAdmin) ? 'block' : 'none';
        
        const alertsCard = document.getElementById('criticalAlertsCard');
        if (alertsCard) alertsCard.style.display = (isFaculty || isAdmin) ? 'block' : 'none';

        if (isStudent) {
            greeting.innerHTML = '👋 Welcome back, ' + (user.name || 'Student');
            subGreeting.innerHTML = 'Your personalized dashboard will populate as faculty and admin add data.';
            renderStudentAssignments();
            renderFeeOverview();
            updateDashboardAttendanceWidget();
            updateDashboardTodayAttendance();
            renderStudentTimetable();
        } 
        else if (isFaculty) {
            greeting.innerHTML = '👋 Welcome back, Professor ' + (user.name || 'Faculty');
            subGreeting.innerHTML = 'You have 3 classes scheduled for today. QR Generation available for attendance.';
            // Load students from registered users for attendance
            loadStudentsFromUsers();
        } 
        else if (isAdmin) {
            greeting.innerHTML = '👋 Admin Dashboard';
            subGreeting.innerHTML = 'Full control over the system. Create faculty accounts, manage students, and more.';
            renderAdmins();
            renderStudentTimetable();
            renderEditTimetable();
            renderUserManagement();
        }

        localStorage.setItem('soet_current_user', JSON.stringify({ email: user.email, password: user.password }));
        navigateTo('dashboard');
    }

    function logout() {
        currentUser = null;
        dashboard.classList.remove('active');
        publicWebsite.style.display = 'block';
        localStorage.removeItem('soet_current_user');
        showToast('👋 Logged out', 'info');
    }

    logoutBtn.addEventListener('click', logout);

    // ================= LOAD STUDENTS FROM USERS INTO FACULTY ATTENDANCE =================
    function loadStudentsFromUsers() {
        const students = getStudentsFromUsers();
        if (students.length === 0) return;
        
        // Add any new students to facStudents if not already present
        students.forEach(s => {
            if (!facStudents.find(f => f.rollNo === s.rollNo)) {
                facStudents.push({ name: s.name, rollNo: s.rollNo });
            }
        });
        saveFacStudents();
        renderFacStudentChips();
        renderFacAttendanceStats();
    }

    // ================= SVG RING FUNCTION =================
    window.ringSvg = function(size, stroke, pct, color, trackColor) {
        const r = (size - stroke) / 2;
        const c = 2 * Math.PI * r;
        const offset = c - (pct / 100) * c;
        return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
            <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${trackColor || '#eef2f7'}" stroke-width="${stroke}"></circle>
            <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${offset}"></circle>
        </svg>`;
    };

    // ================= PAGE NAVIGATION =================
    window.navigateTo = function(page) {
        if (!currentUser) {
            showToast('⚠️ Please login first.', 'error');
            return;
        }

        const pageMap = {
            'dashboard': 'dashboard',
            'placements': 'placements',
            'assignments': 'assignments',
            'materials': 'materials',
            'fees': 'fees',
            'results': 'results',
            'certificates': 'certificates',
            'helpdesk': 'helpdesk',
            'events': 'events',
            'hostel': 'hostel',
            'transport': 'transport',
            'calendar': 'calendar',
            'performance': 'performance',
            'my-attendance': 'my-attendance',
            'timetable': 'timetable',
            'marks-entry': 'marks-entry',
            'attendance': 'attendance',
            'assignment-upload': 'assignment-upload',
            'syllabus': 'syllabus',
            'qr': 'qr',
            'events-manage': 'events',
            'timetable-manage': 'timetable-manage',
            'admin-panel': 'admin-panel',
            'profile': 'profile'
        };

        const actualPage = pageMap[page] || page;

        const adminOnlyPages = ['events-manage', 'timetable-manage', 'admin-panel'];
        if (adminOnlyPages.includes(page)) {
            if (!currentUser || currentUser.role !== 'admin') {
                showToast('⛔ Access denied. Admin only.', 'error');
                return;
            }
        }

        const facultyOnlyPages = ['marks-entry', 'attendance', 'assignment-upload', 'syllabus', 'qr'];
        if (facultyOnlyPages.includes(page)) {
            if (!currentUser || (currentUser.role !== 'faculty' && currentUser.role !== 'admin')) {
                showToast('⛔ Access denied. Faculty only.', 'error');
                return;
            }
        }

        const studentOnlyPages = ['placements', 'assignments', 'materials', 'fees', 'results', 
                                  'certificates', 'helpdesk', 'hostel', 'transport', 'calendar', 
                                  'performance', 'my-attendance', 'timetable', 'events'];
        if (studentOnlyPages.includes(page)) {
            if (!currentUser || currentUser.role !== 'student') {
                showToast('⛔ Access denied. Student only.', 'error');
                return;
            }
        }

        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
        
        const target = document.getElementById('page-' + actualPage);
        if (target) {
            target.classList.add('active');
        } else {
            showToast('⚠️ Page not found: ' + page, 'error');
            return;
        }

        document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('active'));
        const btn = document.querySelector(`.taskbar-btn[data-page="${page}"]`);
        if (btn) {
            btn.classList.add('active');
        }

        const welcome = document.querySelector('.welcome-block');
        if (welcome) welcome.style.display = (page === 'dashboard') ? 'block' : 'none';
        
        if (page === 'profile') renderProfilePage();
        if (page === 'my-attendance') renderMyAttendance(currentAttSem || 6);
        if (page === 'attendance') { 
            renderFacAttendanceStats(); 
            renderFacStudentChips(); 
        }
        if (page === 'marks-entry') renderMarksEntries();
        if (page === 'fees') { renderDebarFeeSection(); renderFeeOverview(); }
        if (page === 'performance') renderStudentMarksUpdates();
        if (page === 'assignment-upload') renderFacultyAssignments();
        if (page === 'assignments') renderStudentAssignments();
        if (page === 'events' || page === 'events-manage') renderEventsPage();
        if (page === 'admin-panel') { 
            renderAdmins(); 
            renderUserManagement(); 
        }
        if (page === 'timetable') renderStudentTimetable();
        if (page === 'timetable-manage') { renderEditTimetable(); }
        if (page === 'dashboard') { 
            updateDashboardAttendanceWidget(); 
            updateDashboardTodayAttendance(); 
            renderStudentTimetable();
            if (currentUser.role === 'admin') renderUserManagement();
        }
    };

    document.querySelectorAll('.taskbar-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.dataset.page;
            if (page) navigateTo(page);
        });
    });

    // ================= ATTENDANCE FUNCTIONS =================
    let facStudents = JSON.parse(localStorage.getItem('soet_fac_students')) || [];
    function saveFacStudents() { localStorage.setItem('soet_fac_students', JSON.stringify(facStudents)); }
    function todayKey() { return new Date().toISOString().slice(0, 10); }
    function getTodayAttendanceMap() {
        let all = {};
        try { all = JSON.parse(localStorage.getItem('soet_today_attendance')) || {}; } catch (e) { all = {}; }
        return all;
    }
    
    window.renderFacStudentChips = function() {
        const wrap = document.getElementById('facStudentChips');
        if (!wrap) return;
        const allAtt = getTodayAttendanceMap();
        const todayMap = allAtt[todayKey()] || {};
        
        // Load students from registered users if facStudents is empty
        if (facStudents.length === 0) {
            const students = getStudentsFromUsers();
            if (students.length > 0) {
                students.forEach(s => {
                    if (!facStudents.find(f => f.rollNo === s.rollNo)) {
                        facStudents.push({ name: s.name, rollNo: s.rollNo });
                    }
                });
                saveFacStudents();
            }
        }
        
        if (facStudents.length === 0) {
            wrap.innerHTML = '<div class="text-muted" style="grid-column:1/-1;text-align:center;padding:1rem;">No students registered yet. Students will appear here after they sign up.</div>';
            updatePresentCount();
            return;
        }
        
        wrap.innerHTML = facStudents.map(s => {
            const present = todayMap[s.rollNo] !== false;
            const iconClass = present ? 'fa-check-circle' : 'fa-times-circle';
            const iconColor = present ? '#16a34a' : '#dc2626';
            return `<div class="student-chip" data-roll="${s.rollNo}" onclick="toggleAttendance(this)">${s.name} <small style="opacity:0.6;display:block;font-size:0.65rem;">${s.rollNo}</small><i class="fas ${iconClass}" style="color:${iconColor};"></i></div>`;
        }).join('');
        updatePresentCount();
    };

    if (document.getElementById('facAddStudentBtn')) {
        document.getElementById('facAddStudentBtn').addEventListener('click', function() {
            const nameInp = document.getElementById('facAddName');
            const rollInp = document.getElementById('facAddRoll');
            const name = nameInp.value.trim();
            const rollNo = rollInp.value.trim();
            if (!name || !rollNo) { showToast('⚠️ Enter both name and roll no.', 'error'); return; }
            if (facStudents.find(s => s.rollNo.toLowerCase() === rollNo.toLowerCase())) {
                showToast('⚠️ Roll No already exists.', 'error');
                return;
            }
            facStudents.push({ name, rollNo });
            saveFacStudents();
            renderFacStudentChips();
            nameInp.value = '';
            rollInp.value = '';
            showToast(`✅ Added ${name} (${rollNo})`, 'success');
        });
    }

    window.toggleAttendance = function(el) {
        const icon = el.querySelector('i');
        if (icon.classList.contains('fa-check-circle')) {
            icon.className = 'fas fa-times-circle';
            icon.style.color = '#dc2626';
        } else {
            icon.className = 'fas fa-check-circle';
            icon.style.color = '#16a34a';
        }
        updatePresentCount();
    };

    window.markAllPresent = function() {
        document.querySelectorAll('#page-attendance .student-chip').forEach(chip => {
            const icon = chip.querySelector('i');
            icon.className = 'fas fa-check-circle';
            icon.style.color = '#16a34a';
        });
        updatePresentCount();
        showToast('✅ All marked present', 'success');
    };

    window.saveAttendance = function() {
        const chips = document.querySelectorAll('#page-attendance .student-chip');
        let present = 0;
        const todayMap = {};
        chips.forEach(chip => {
            const icon = chip.querySelector('i');
            const isPresent = icon.classList.contains('fa-check-circle');
            if (isPresent) present++;
            todayMap[chip.dataset.roll] = isPresent;
        });
        const allAtt = getTodayAttendanceMap();
        allAtt[todayKey()] = todayMap;
        localStorage.setItem('soet_today_attendance', JSON.stringify(allAtt));
        showToast('💾 Attendance saved!', 'success');
    };

    function updatePresentCount() {
        const chips = document.querySelectorAll('#page-attendance .student-chip');
        let present = 0;
        chips.forEach(chip => {
            const icon = chip.querySelector('i');
            if (icon.classList.contains('fa-check-circle')) present++;
        });
        const countEl = document.getElementById('presentCount');
        const totalEl = document.getElementById('presentTotal');
        if (countEl) countEl.textContent = present;
        if (totalEl) totalEl.textContent = chips.length;
        if (typeof renderFacAttendanceStats === 'function') renderFacAttendanceStats();
    }

    function renderFacAttendanceStats() {
        const statGrid = document.getElementById('facAttStatGrid');
        if (!statGrid) return;
        const chips = document.querySelectorAll('#page-attendance .student-chip');
        const total = chips.length;
        let present = 0;
        chips.forEach(chip => {
            const icon = chip.querySelector('i');
            if (icon.classList.contains('fa-check-circle')) present++;
        });
        const absent = total - present;
        const pct = total ? Math.round((present / total) * 100) : 0;
        statGrid.innerHTML = `
            <div class="att-stat-card">
                <div class="att-icn" style="background:#eaf0fa;color:#1e3a8a;"><i class="fas fa-users"></i></div>
                <div class="att-val">${total}</div>
                <div class="att-lbl">Total Students</div>
            </div>
            <div class="att-stat-card">
                <div class="att-icn" style="background:#dcfce7;color:#16a34a;"><i class="fas fa-circle-check"></i></div>
                <div class="att-val">${present}</div>
                <div class="att-lbl">Present Today</div>
            </div>
            <div class="att-stat-card">
                <div class="att-icn" style="background:#fee2e2;color:#dc2626;"><i class="fas fa-circle-xmark"></i></div>
                <div class="att-val">${absent}</div>
                <div class="att-lbl">Absent Today</div>
            </div>
            <div class="att-stat-card">
                <div class="att-icn" style="background:#fef3c7;color:#d97706;"><i class="fas fa-chart-pie"></i></div>
                <div class="att-val">${pct}%</div>
                <div class="att-lbl">Class Attendance</div>
            </div>`;
    }

    // ================= NOTIFICATIONS =================
    let notifications = JSON.parse(localStorage.getItem('soet_notifications')) || [
        { id: 1, icon: 'fa-bullhorn', title: 'Welcome to SOET Portal! Explore the features.', time: 'Just now', read: false },
        { id: 2, icon: 'fa-code', title: 'Hackathon 2026 registrations are open', time: '1 day ago', read: false }
    ];
    const notifBellBtn = document.getElementById('notifBellBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    const notifBadge = document.getElementById('notifBadge');
    const notifListContainer = document.getElementById('notifListContainer');
    const notifMarkAllRead = document.getElementById('notifMarkAllRead');

    function saveNotifications() { localStorage.setItem('soet_notifications', JSON.stringify(notifications)); }

    function renderNotifications() {
        const unread = notifications.filter(n => !n.read).length;
        if (unread > 0) {
            notifBadge.style.display = 'flex';
            notifBadge.textContent = unread;
        } else {
            notifBadge.style.display = 'none';
        }
        if (!notifications.length) {
            notifListContainer.innerHTML = '<div class="notif-empty"><i class="fas fa-bell-slash" style="font-size:1.5rem;margin-bottom:0.5rem;display:block;"></i>No notifications</div>';
            return;
        }
        notifListContainer.innerHTML = notifications.map(n => `
            <div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
                <i class="fas ${n.icon} notif-icon"></i>
                <div>
                    <div class="notif-title">${n.title}</div>
                    <div class="notif-time">${n.time}</div>
                </div>
            </div>`).join('');
        notifListContainer.querySelectorAll('.notif-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const n = notifications.find(x => x.id === id);
                if (n) { n.read = true; saveNotifications(); renderNotifications(); }
            });
        });
    }

    if (notifBellBtn) {
        notifBellBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notifDropdown.classList.toggle('show');
        });
        document.addEventListener('click', function(e) {
            if (notifDropdown && !notifDropdown.contains(e.target) && e.target !== notifBellBtn) {
                notifDropdown.classList.remove('show');
            }
        });
    }
    if (notifMarkAllRead) {
        notifMarkAllRead.addEventListener('click', function(e) {
            e.stopPropagation();
            notifications.forEach(n => n.read = true);
            saveNotifications();
            renderNotifications();
            showToast('🔔 All notifications marked as read', 'info');
        });
    }
    renderNotifications();

    // ================= DARK MODE =================
    const darkModeToggle = document.getElementById('darkModeToggle');
    function applyDarkMode(on) {
        document.body.classList.toggle('dark-mode', on);
        localStorage.setItem('soet_dark_mode', on ? '1' : '0');
        if (darkModeToggle) darkModeToggle.checked = on;
    }
    applyDarkMode(localStorage.getItem('soet_dark_mode') === '1');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            applyDarkMode(this.checked);
            showToast(this.checked ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
        });
    }

    // ================= PROFILE PAGE =================
    const profileNameInput = document.getElementById('profileNameInput');
    const profilePasswordInput = document.getElementById('profilePasswordInput');
    const profileSaveBtn = document.getElementById('profileSaveBtn');

    function renderProfilePage() {
        if (!currentUser) return;
        const initial = (currentUser.name || currentUser.email || 'U').trim().charAt(0).toUpperCase();
        const initialEl = document.getElementById('profileAvatarInitial');
        const nameDisplay = document.getElementById('profileNameDisplay');
        const emailDisplay = document.getElementById('profileEmailDisplay');
        const rollDisplay = document.getElementById('profileRollDisplay');
        const roleTag = document.getElementById('profileRoleTag');
        if (initialEl) initialEl.textContent = initial;
        if (nameDisplay) nameDisplay.textContent = currentUser.name || currentUser.email.split('@')[0];
        if (emailDisplay) emailDisplay.textContent = currentUser.email;
        if (rollDisplay) rollDisplay.textContent = currentUser.rollNo ? ('Roll No: ' + currentUser.rollNo) : '';
        if (roleTag) roleTag.textContent = currentUser.role.toUpperCase();
        if (profileNameInput) profileNameInput.value = currentUser.name || '';
        if (profilePasswordInput) profilePasswordInput.value = '';
    }

    if (profileSaveBtn) {
        profileSaveBtn.addEventListener('click', function() {
            if (!currentUser) return;
            const newName = profileNameInput.value.trim();
            const newPassword = profilePasswordInput.value.trim();
            if (!newName) { showToast('⚠️ Name cannot be empty.', 'error'); return; }
            const idx = users.findIndex(u => u.email === currentUser.email);
            if (idx > -1) {
                users[idx].name = newName;
                if (newPassword) users[idx].password = newPassword;
                currentUser = users[idx];
                saveUsers();
                localStorage.setItem('soet_current_user', JSON.stringify({ email: currentUser.email, password: currentUser.password }));
                dashUserName.textContent = currentUser.name;
                renderProfilePage();
                showToast('✅ Profile updated successfully!', 'success');
            }
        });
    }

    // ================= MY ATTENDANCE (STUDENT) =================
    const attSemData = {
        1: { weeks: [], subjects: [] },
        2: { weeks: [], subjects: [] },
        3: { weeks: [], subjects: [] },
        4: { weeks: [], subjects: [] },
        5: { weeks: [], subjects: [] },
        6: { weeks: [], subjects: [] }
    };
    let currentAttSem = 6;
    const semRoman = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI'};

    const ATT_STORAGE_KEY = 'soet_att_sem_data_v1';
    function loadPersistedAttendance() {
        try {
            const saved = JSON.parse(localStorage.getItem(ATT_STORAGE_KEY));
            if (saved) {
                Object.keys(saved).forEach(sem => {
                    if (attSemData[sem] && saved[sem] && saved[sem].subjects) {
                        attSemData[sem].subjects = saved[sem].subjects || [];
                        attSemData[sem].weeks = saved[sem].weeks || [];
                    }
                });
            }
        } catch (e) { /* ignore corrupt storage */ }
    }
    function persistAttSemData() {
        try { localStorage.setItem(ATT_STORAGE_KEY, JSON.stringify(attSemData)); } catch (e) { /* storage unavailable */ }
    }
    loadPersistedAttendance();

    window.switchAttSem = function(sem) {
        currentAttSem = sem;
        attMonthIndex = 0;
        attWeekIndex = 0;
        document.querySelectorAll('.att-sem-tab-btn').forEach(btn => btn.classList.remove('active'));
        const active = document.getElementById('att-sem-tab-' + sem);
        if (active) active.classList.add('active');
        renderMyAttendance(sem);
    };

    window.renderMyAttendance = function(sem) {
        sem = sem || currentAttSem;
        currentAttSem = sem;
        const data = attSemData[sem];
        const list = document.getElementById('myAttendanceList');
        const statGrid = document.getElementById('attStatGrid');
        const donutWrap = document.getElementById('attDonutWrap');
        const trendWrap = document.getElementById('attTrendBars');
        const trendTitle = document.getElementById('attTrendTitle');
        if (!list || !data) return;

        const bannerEl = document.getElementById('myTodayAttendanceBanner');
        if (bannerEl && currentUser) {
            let allAtt = {};
            try { allAtt = JSON.parse(localStorage.getItem('soet_today_attendance')) || {}; } catch (e) { allAtt = {}; }
            const todayMap = allAtt[todayKey()] || {};
            const myRoll = (currentUser.rollNo || '').trim();
            if (myRoll && Object.prototype.hasOwnProperty.call(todayMap, myRoll)) {
                const present = todayMap[myRoll];
                bannerEl.innerHTML = `
                    <div style="background:${present ? 'linear-gradient(135deg,#f0fdf4,#dcfce7)' : 'linear-gradient(135deg,#fef2f2,#fee2e2)'};border:1px solid ${present ? '#bbf7d0' : '#fecaca'};border-radius:18px;padding:1rem 1.4rem;margin-bottom:1.3rem;display:flex;align-items:center;gap:1rem;">
                        <div style="width:38px;height:38px;background:${present ? '#16a34a' : '#dc2626'};border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas ${present ? 'fa-circle-check' : 'fa-circle-xmark'}" style="color:white;"></i></div>
                        <div>
                            <div style="font-weight:700;font-size:0.9rem;color:${present ? '#166534' : '#991b1b'};">Today's Attendance: ${present ? 'Marked Present ✅' : 'Marked Absent ❌'}</div>
                            <div style="font-size:0.78rem;color:#64748b;margin-top:2px;">Live update from Faculty · Roll No: ${myRoll}</div>
                        </div>
                    </div>`;
            } else {
                bannerEl.innerHTML = '';
            }
        }

        document.querySelectorAll('.att-sem-tab-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById('att-sem-tab-' + sem);
        if (activeBtn) activeBtn.classList.add('active');

        const subjects = data.subjects || [];
        const totalClasses = subjects.reduce((s, a) => s + (a.total || 0), 0);
        const totalPresent = subjects.reduce((s, a) => s + (a.present || 0), 0);
        const totalAbsent = totalClasses - totalPresent;
        const avg = totalClasses ? Math.round((totalPresent / totalClasses) * 100) : 0;
        const avgColor = avg >= 85 ? '#16a34a' : (avg >= 75 ? '#2563eb' : '#dc2626');

        if (statGrid) {
            statGrid.innerHTML = `
                <div class="att-stat-card">
                    <div class="att-icn" style="background:#eaf0fa;color:#1e3a8a;"><i class="fas fa-calendar-check"></i></div>
                    <div class="att-val">${totalClasses || 'N/A'}</div>
                    <div class="att-lbl">Total Classes — Sem ${semRoman[sem]}</div>
                </div>
                <div class="att-stat-card">
                    <div class="att-icn" style="background:#dcfce7;color:#16a34a;"><i class="fas fa-circle-check"></i></div>
                    <div class="att-val">${totalPresent || 'N/A'}</div>
                    <div class="att-lbl">Classes Attended</div>
                </div>
                <div class="att-stat-card">
                    <div class="att-icn" style="background:#fee2e2;color:#dc2626;"><i class="fas fa-circle-xmark"></i></div>
                    <div class="att-val">${totalAbsent || 'N/A'}</div>
                    <div class="att-lbl">Classes Missed</div>
                </div>
                <div class="att-stat-card">
                    <div class="att-icn" style="background:#fef3c7;color:#d97706;"><i class="fas fa-triangle-exclamation"></i></div>
                    <div class="att-val">${subjects.filter(a => (a.pct || 0) < 75).length}</div>
                    <div class="att-lbl">Debarred Subjects</div>
                </div>`;
        }

        if (donutWrap) {
            if (totalClasses === 0) {
                donutWrap.innerHTML = `
                    <div style="text-align:center;padding:1rem;color:#94a3b8;">
                        <i class="fas fa-info-circle" style="font-size:2rem;display:block;margin-bottom:0.5rem;"></i>
                        <span>No attendance data available yet.</span>
                        <span style="display:block;font-size:0.7rem;">Faculty will mark attendance for your classes.</span>
                    </div>`;
            } else {
                donutWrap.innerHTML = `
                    ${window.ringSvg(150, 14, avg, avgColor)}
                    <div class="att-donut-label">
                        <span class="pct" style="color:${avgColor};">${avg}%</span>
                        <span class="sub">Sem ${semRoman[sem]}</span>
                    </div>`;
            }
        }

        if (trendTitle) trendTitle.innerHTML = `<i class="fas fa-chart-line" style="color:#1e3a8a;"></i> Attendance Trend — Sem ${semRoman[sem]}`;

        if (trendWrap) {
            const weeks = data.weeks || [];
            if (weeks.length === 0) {
                trendWrap.innerHTML = `<div style="text-align:center;color:#94a3b8;width:100%;padding:0.5rem;">No data available yet.</div>`;
            } else {
                const maxPct = 100;
                trendWrap.innerHTML = weeks.map(t => {
                    const h = Math.round((t.pct / maxPct) * 90);
                    const c = t.pct >= 75 ? '#1e3a8a' : '#dc2626';
                    return `<div class="att-trend-bar-col">
                        <span class="bar-val">${t.pct}%</span>
                        <div class="bar" style="height:${h}px;background:linear-gradient(180deg, ${c}, ${c}cc);"></div>
                        <span class="bar-lbl">${t.m}</span>
                    </div>`;
                }).join('');
            }
        }

        if (subjects.length === 0) {
            list.innerHTML = `
                <div style="text-align:center;padding:2rem;color:#94a3b8;">
                    <i class="fas fa-clipboard-list" style="font-size:2.5rem;display:block;margin-bottom:1rem;opacity:0.5;"></i>
                    <p style="font-weight:500;">No attendance records for Semester ${semRoman[sem]}</p>
                    <p style="font-size:0.85rem;">Faculty will mark attendance as classes progress.</p>
                </div>`;
        } else {
            list.innerHTML = subjects.map(a => {
                const pct = a.pct || 0;
                const low = pct < 75;
                return `<div class="subj-att-card" style="${low ? 'background:#fef2f2;border-color:#fecaca;' : ''}">
                    <div class="subj-ring">
                        ${window.ringSvg(52, 6, pct, a.color || '#2563eb')}
                        <span style="color:${a.color || '#2563eb'};">${pct}%</span>
                    </div>
                    <div class="subj-info">
                        <div class="subj-name">${a.subject} ${low ? '<span class="badge-danger" style="margin-left:6px;"><i class="fas fa-user-slash"></i> Debarred</span>' : ''}</div>
                        <div class="subj-meta">${a.present || 0} / ${a.total || 0} classes attended</div>
                    </div>
                </div>`;
            }).join('');
        }

        renderAttCalendar(sem, avg);
    };

    // ================= ATTENDANCE CALENDAR =================
    const attMonthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const attSemBase = { 
        1: { m: 7, y: 2025, w: 5 }, 
        2: { m: 1, y: 2026, w: 0 }, 
        3: { m: 7, y: 2024, w: 2 }, 
        4: { m: 1, y: 2025, w: 4 }, 
        5: { m: 7, y: 2025, w: 1 }, 
        6: { m: 6, y: 2026, w: 6 }   
    };
    const attDaysCycle = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let attMonthIndex = 0;   
    let attWeekIndex = 0;    
    let attCalView = 'month';
    let lastAttAvgPct = 80;

    function getMonthInfo(sem, idx) {
        const base = attSemBase[sem] || { m: 0, y: 2026, w: 0 };
        const absMonth = base.m + idx;
        const monthIdx = absMonth % 12;
        const year = base.y + Math.floor(absMonth / 12);
        const days = attDaysCycle[monthIdx];
        const startWeekday = (base.w + idx * 2) % 7;
        return { label: attMonthNames[monthIdx] + ' ' + year, days, startWeekday };
    }

    window.setAttCalView = function(view) {
        attCalView = view;
        attWeekIndex = 0;
        const mBtn = document.getElementById('calViewMonthBtn');
        const wBtn = document.getElementById('calViewWeekBtn');
        if (mBtn) mBtn.classList.toggle('active', view === 'month');
        if (wBtn) wBtn.classList.toggle('active', view === 'week');
        renderAttCalendar(currentAttSem, lastAttAvgPct);
    };

    window.navAttCal = function(dir) {
        const info = getMonthInfo(currentAttSem, attMonthIndex);
        const weeksInMonth = Math.ceil(info.days / 7);
        if (attCalView === 'month') {
            attMonthIndex = Math.max(0, Math.min(5, attMonthIndex + dir));
        } else {
            attWeekIndex += dir;
            if (attWeekIndex < 0) {
                if (attMonthIndex > 0) {
                    attMonthIndex -= 1;
                    const prevInfo = getMonthInfo(currentAttSem, attMonthIndex);
                    attWeekIndex = Math.ceil(prevInfo.days / 7) - 1;
                } else { attWeekIndex = 0; }
            } else if (attWeekIndex >= weeksInMonth) {
                if (attMonthIndex < 5) { attMonthIndex += 1; attWeekIndex = 0; }
                else { attWeekIndex = weeksInMonth - 1; }
            }
        }
        renderAttCalendar(currentAttSem, lastAttAvgPct);
    };

    function renderAttCalendar(sem, avgPct) {
        const grid = document.getElementById('attCalendarGrid');
        const monthLabel = document.getElementById('attCalMonthLabel');
        if (!grid) return;
        lastAttAvgPct = avgPct;

        const info = getMonthInfo(sem, attMonthIndex);
        const { days: daysInMonth, startWeekday, label } = info;

        let html = '';
        ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => { html += `<div class="cal-header">${d}</div>`; });

        function dayCell(day, weekdayIndex) {
            const isWeekend = weekdayIndex === 0 || weekdayIndex === 6;
            let cls = 'cal-day';
            let status = 'Weekend';
            if (isWeekend) {
                cls += ' weekend';
            } else {
                const seed = (day * 17 + sem * 23 + attMonthIndex * 11) % 100;
                const isPresent = seed < avgPct;
                cls += isPresent ? ' present' : ' absent';
                status = isPresent ? 'Present' : 'Absent';
            }
            return `<div class="${cls}" onclick="showToast('📅 ${label} ${day}: ${status}','${status === 'Absent' ? 'error' : 'info'}')">${day}</div>`;
        }

        if (attCalView === 'month') {
            if (monthLabel) monthLabel.textContent = label;
            for (let i = 0; i < startWeekday; i++) { html += `<div class="cal-day blank"></div>`; }
            for (let day = 1; day <= daysInMonth; day++) {
                const weekdayIndex = (startWeekday + day - 1) % 7;
                html += dayCell(day, weekdayIndex);
            }
        } else {
            const weekStartDay = attWeekIndex * 7 - startWeekday + 1;
            if (monthLabel) monthLabel.textContent = `${label} — Week ${attWeekIndex + 1}`;
            for (let col = 0; col < 7; col++) {
                const day = weekStartDay + col;
                if (day < 1 || day > daysInMonth) {
                    html += `<div class="cal-day blank"></div>`;
                } else {
                    html += dayCell(day, col);
                }
            }
        }

        grid.innerHTML = html;
    }

    // ================= REE FEE SECTION =================
    let reePaid = false;
    const reeExamDate = { day: 22, label: '22 Aug \'26', month: 'August 2026' };

    function renderReeFeeSection() {
        const el = document.getElementById('ree-fee-section');
        if (!el) return;

        const failedSubjects = (attSemData[6] && attSemData[6].subjects.filter(s => (s.pct || 0) < 40)) || [];
        if (!failedSubjects.length) { el.innerHTML = ''; return; }

        if (!reePaid) {
            el.innerHTML = `
                <div class="card" style="border:1px solid #fecaca;background:linear-gradient(135deg,#fef2f2,#fff5f5);">
                    <h3 style="color:#991b1b;display:flex;align-items:center;gap:8px;"><i class="fas fa-triangle-exclamation"></i> Re-Examination (REE) Fee Due</h3>
                    <p class="text-muted" style="margin-top:4px;">For: ${failedSubjects.map(s=>s.subject).join(', ')} (Semester VI)</p>
                    <h2 style="color:#dc2626;font-size:1.8rem;margin-top:0.6rem;">₹3,500</h2>
                    <p class="text-muted">Pay this fee to get your Re-Examination exam date scheduled.</p>
                    <button class="btn btn-primary mt-2" style="background:#dc2626;border:none;" onclick="openReeFeeGateway()"><i class="fas fa-credit-card"></i> Pay REE Fee</button>
                </div>`;
        } else {
            el.innerHTML = `
                <div class="card" style="border:1px solid #bbf7d0;background:linear-gradient(135deg,#f0fdf4,#f7fefb);">
                    <h3 style="color:#15803d;display:flex;align-items:center;gap:8px;"><i class="fas fa-circle-check"></i> REE Fee Paid</h3>
                    <p class="text-muted" style="margin-top:4px;">For: ${failedSubjects.map(s=>s.subject).join(', ')} (Semester VI)</p>
                    <span class="badge-success" style="margin-top:0.6rem;display:inline-block;">✅ ₹3,500 Paid</span>
                    <p style="margin-top:0.8rem;font-size:0.9rem;color:#166534;"><i class="fas fa-calendar-check"></i> Your REE exam is scheduled for <strong>${reeExamDate.label}</strong>. Check the Calendar for details.</p>
                    <button class="btn btn-outline mt-2" onclick="navigateTo('calendar')"><i class="fas fa-calendar-alt"></i> View on Calendar</button>
                </div>`;
        }
    }

    window.openReeFeeGateway = function() {
        if (reePaid) {
            showToast('✅ REE fee is already paid.', 'info');
            return;
        }
        const failedSubjects = (attSemData[6] && attSemData[6].subjects.filter(s => (s.pct || 0) < 40)) || [];
        showToast('💳 REE Fee payment initiated!', 'info');
        reePaid = true;
        renderReeFeeSection();
        renderReeCalendarNotice();
        showToast('✅ REE Fee Paid!', 'success');
    };

    function renderReeCalendarNotice() {
        const el = document.getElementById('ree-calendar-notice');
        if (!el) return;
        if (!reePaid) { el.innerHTML = ''; return; }
        el.innerHTML = `
            <div class="flex mt-2" style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:0.7rem 1rem;align-items:center;gap:8px;">
                <i class="fas fa-calendar-day" style="color:#dc2626;"></i>
                <span style="font-size:0.88rem;color:#991b1b;"><strong>REE Exam — Theory of Computation:</strong> ${reeExamDate.label}</span>
            </div>`;
    }

    // ================= DEBAR FEE SECTION =================
    let debarPaid = false;
    const DEBAR_FEE_AMOUNT = 500;
    const DEBAR_MIN_ATTENDANCE = 75;

    function getAttendanceAvg(sem) {
        const data = attSemData && attSemData[sem];
        if (!data) return 100;
        const totalClasses = data.subjects.reduce((s, a) => s + (a.total || 0), 0);
        const totalPresent = data.subjects.reduce((s, a) => s + (a.present || 0), 0);
        return totalClasses ? Math.round((totalPresent / totalClasses) * 100) : 100;
    }

    function isDebarred(sem) {
        return getAttendanceAvg(sem) < DEBAR_MIN_ATTENDANCE;
    }

    function renderDebarFeeSection() {
        const el = document.getElementById('debar-fee-section');
        if (!el) return;
        const sem = (typeof currentAttSem !== 'undefined') ? currentAttSem : 6;
        if (!isDebarred(sem)) { el.innerHTML = ''; return; }
        const avg = getAttendanceAvg(sem);
        const romans = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI'};

        if (!debarPaid) {
            el.innerHTML = `
                <div class="card" style="border:1px solid #fecaca;background:linear-gradient(135deg,#fef2f2,#fff5f5);">
                    <h3 style="color:#991b1b;display:flex;align-items:center;gap:8px;"><i class="fas fa-user-slash"></i> Debarred Fee — Attendance Shortage</h3>
                    <p class="text-muted" style="margin-top:4px;">Semester ${romans[sem]} attendance is ${avg}% (below required ${DEBAR_MIN_ATTENDANCE}%). Pay the debarment clearance fee to become exam-eligible.</p>
                    <h2 style="color:#dc2626;font-size:1.8rem;margin-top:0.6rem;">₹${DEBAR_FEE_AMOUNT}</h2>
                    <button class="btn btn-primary mt-2" style="background:#dc2626;border:none;" onclick="payDebarFee()"><i class="fas fa-credit-card"></i> Pay Debarred Fee</button>
                </div>`;
        } else {
            el.innerHTML = `
                <div class="card" style="border:1px solid #bbf7d0;background:linear-gradient(135deg,#f0fdf4,#f7fefb);">
                    <h3 style="color:#15803d;display:flex;align-items:center;gap:8px;"><i class="fas fa-circle-check"></i> Debarred Fee Paid</h3>
                    <p class="text-muted" style="margin-top:4px;">Semester ${romans[sem]} attendance shortage fee has been cleared.</p>
                    <span class="badge-success" style="margin-top:0.6rem;display:inline-block;">✅ ₹${DEBAR_FEE_AMOUNT} Paid</span>
                    <p style="margin-top:0.8rem;font-size:0.9rem;color:#166534;"><i class="fas fa-circle-info"></i> You are now provisionally eligible to appear for exams. Final eligibility is subject to faculty approval.</p>
                </div>`;
        }
    }

    window.payDebarFee = function() {
        debarPaid = true;
        showToast('💳 Debarred Fee Paid! You are provisionally exam-eligible.', 'success');
        renderDebarFeeSection();
    };

    // ================= MARKS ENTRY =================
    let marksEntries = JSON.parse(localStorage.getItem('soet_marks_entries')) || [];
    const meStudentName = document.getElementById('meStudentName');
    const meRollNo = document.getElementById('meRollNo');
    const meSubject = document.getElementById('meSubject');
    const meMarks = document.getElementById('meMarks');
    const meSubmitBtn = document.getElementById('meSubmitBtn');
    const meTableBody = document.getElementById('meTableBody');
    const meCount = document.getElementById('meCount');

    function gradeForMarks(m) {
        if (m >= 90) return { g: 'A+', c: '#16a34a' };
        if (m >= 80) return { g: 'A', c: '#2563eb' };
        if (m >= 70) return { g: 'B+', c: '#7c3aed' };
        if (m >= 60) return { g: 'B', c: '#ea580c' };
        if (m >= 40) return { g: 'C', c: '#ca8a04' };
        return { g: 'F', c: '#dc2626' };
    }

    function saveMarksEntries() { localStorage.setItem('soet_marks_entries', JSON.stringify(marksEntries)); }

    function renderStudentMarksUpdates() {
        const card = document.getElementById('facultyMarksUpdateCard');
        const body = document.getElementById('facultyMarksUpdateBody');
        const countEl = document.getElementById('facultyMarksUpdateCount');
        if (!card || !body || !currentUser) return;
        let entries = [];
        try { entries = JSON.parse(localStorage.getItem('soet_marks_entries')) || []; } catch (e) { entries = []; }
        const myRoll = (currentUser.rollNo || '').toLowerCase().trim();
        const matched = entries.filter(e => (e.rollNo || '').toLowerCase().trim() === myRoll);
        if (!matched.length) { card.style.display = 'none'; return; }
        card.style.display = 'block';
        if (countEl) countEl.textContent = matched.length;
        body.innerHTML = matched.slice().reverse().map(e => {
            const grade = gradeForMarks(e.marks);
            return `<tr><td>${e.subject}</td><td>${e.marks}</td><td><span class="badge-soft" style="background:${grade.c}1a;color:${grade.c};">${grade.g}</span></td></tr>`;
        }).join('');
    }

    function renderMarksEntries() {
        if (!meTableBody) return;
        if (meCount) meCount.textContent = marksEntries.length;
        if (!marksEntries.length) {
            meTableBody.innerHTML = '<tr><td colspan="5" class="text-muted">No entries yet. Add marks using the form.</td></tr>';
            return;
        }
        meTableBody.innerHTML = marksEntries.slice().reverse().map(e => {
            const grade = gradeForMarks(e.marks);
            return `<tr>
                <td>${e.student}</td>
                <td>${e.rollNo || '-'}</td>
                <td>${e.subject}</td>
                <td>${e.marks}</td>
                <td><span class="badge-soft" style="background:${grade.c}1a;color:${grade.c};">${grade.g}</span></td>
                <td><i class="fas fa-trash" style="color:#dc2626;cursor:pointer;" onclick="deleteMarksEntry(${e.id})"></i></td>
            </tr>`;
        }).join('');
    }

    window.deleteMarksEntry = function(id) {
        marksEntries = marksEntries.filter(e => e.id !== id);
        saveMarksEntries();
        renderMarksEntries();
        showToast('🗑️ Entry removed', 'info');
    };

    if (meSubmitBtn) {
        meSubmitBtn.addEventListener('click', function() {
            const student = meStudentName.value.trim();
            const rollNo = meRollNo.value.trim();
            const subject = meSubject.value;
            const marks = parseFloat(meMarks.value);
            if (!student) { showToast('⚠️ Enter a student name.', 'error'); return; }
            if (!rollNo) { showToast('⚠️ Enter a roll number.', 'error'); return; }
            if (isNaN(marks) || marks < 0 || marks > 100) { showToast('⚠️ Enter valid marks (0-100).', 'error'); return; }
            
            // Check if student exists in system
            const existingStudent = users.find(u => u.rollNo === rollNo && u.role === 'student');
            if (!existingStudent) {
                showToast('⚠️ Student not found in system. Please ask them to register first.', 'error');
                return;
            }
            
            marksEntries.push({ id: Date.now(), student, rollNo, subject, marks });
            saveMarksEntries();
            renderMarksEntries();
            if (typeof renderStudentMarksUpdates === 'function') renderStudentMarksUpdates();
            meStudentName.value = '';
            meRollNo.value = '';
            meMarks.value = '';
            showToast(`✅ Marks added for ${student} (${rollNo})`, 'success');
        });
    }
    renderMarksEntries();

    // ================= ASSIGNMENTS =================
    let assignments = JSON.parse(localStorage.getItem('soet_assignments')) || [];
    let assignmentSubmissions = JSON.parse(localStorage.getItem('soet_assignment_submissions')) || [];
    function saveAssignments() { localStorage.setItem('soet_assignments', JSON.stringify(assignments)); }
    function saveAssignmentSubmissions() { localStorage.setItem('soet_assignment_submissions', JSON.stringify(assignmentSubmissions)); }

    function formatDueDate(ts) {
        const d = new Date(ts);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    }

    const faAssignTitle = document.getElementById('faAssignTitle');
    const faAssignSubject = document.getElementById('faAssignSubject');
    const faAssignDesc = document.getElementById('faAssignDesc');
    const faAssignDueDate = document.getElementById('faAssignDueDate');
    const faAssignDueTime = document.getElementById('faAssignDueTime');
    const faAssignFile = document.getElementById('faAssignFile');
    const faAssignSubmitBtn = document.getElementById('faAssignSubmitBtn');
    const faAssignTableBody = document.getElementById('faAssignTableBody');
    const faAssignCount = document.getElementById('faAssignCount');

    function renderFacultyAssignments() {
        if (!faAssignTableBody) return;
        if (assignments.length === 0) {
            faAssignTableBody.innerHTML = '<tr><td colspan="5" class="text-muted">No assignments yet. Upload one using the form.</td></tr>';
            if (faAssignCount) faAssignCount.textContent = '0';
            return;
        }
        faAssignTableBody.innerHTML = assignments.map(a => {
            const subCount = assignmentSubmissions.filter(s => s.assignmentId === a.id).length;
            return `<tr>
                <td>${a.title}</td>
                <td>${a.subject}</td>
                <td>${formatDueDate(a.due)}</td>
                <td><span class="badge-soft">${subCount} submitted</span></td>
                <td><i class="fas fa-trash" style="color:#dc2626;cursor:pointer;" onclick="deleteAssignment(${a.id})"></i></td>
            </tr>`;
        }).join('');
        if (faAssignCount) faAssignCount.textContent = String(assignments.length);
    }

    window.deleteAssignment = function(id) {
        assignments = assignments.filter(a => a.id !== id);
        assignmentSubmissions = assignmentSubmissions.filter(s => s.assignmentId !== id);
        saveAssignments();
        saveAssignmentSubmissions();
        renderFacultyAssignments();
        if (typeof renderStudentAssignments === 'function') renderStudentAssignments();
        showToast('🗑️ Assignment removed', 'info');
    };

    if (faAssignSubmitBtn) {
        faAssignSubmitBtn.addEventListener('click', function() {
            const title = faAssignTitle.value.trim();
            const subject = faAssignSubject.value;
            const description = faAssignDesc.value.trim();
            const dueDate = faAssignDueDate.value;
            const dueTime = faAssignDueTime.value;
            if (!title) { showToast('⚠️ Enter an assignment title.', 'error'); return; }
            if (!dueDate || !dueTime) { showToast('⚠️ Set a submission due date and time.', 'error'); return; }
            const due = new Date(dueDate + 'T' + dueTime).getTime();
            if (isNaN(due)) { showToast('⚠️ Invalid due date/time.', 'error'); return; }
            if (due <= Date.now()) { showToast('⚠️ Due date/time must be in the future.', 'error'); return; }

            const fileInput = faAssignFile.files[0];
            const finalize = (fileName) => {
                assignments.push({
                    id: Date.now(),
                    title, subject, description, due,
                    createdBy: (currentUser && currentUser.email) || 'faculty',
                    fileName: fileName || ''
                });
                saveAssignments();
                renderFacultyAssignments();
                if (typeof renderStudentAssignments === 'function') renderStudentAssignments();
                faAssignTitle.value = '';
                faAssignDesc.value = '';
                faAssignDueDate.value = '';
                faAssignDueTime.value = '';
                faAssignFile.value = '';
                showToast(`✅ Assignment "${title}" uploaded for ${subject}`, 'success');
            };
            if (fileInput) { finalize(fileInput.name); } else { finalize(''); }
        });
    }
    renderFacultyAssignments();

    const assignmentsTableBody = document.getElementById('assignmentsTableBody');
    let activeAssignmentId = null;

    window.renderStudentAssignments = function() {
        if (!assignmentsTableBody) return;
        if (!currentUser) return;
        if (assignments.length === 0) {
            assignmentsTableBody.innerHTML = '<tr><td colspan="5" class="text-muted">No assignments have been uploaded yet by faculty.</td></tr>';
            const dashCountEl = document.getElementById('dashAssignPendingCount');
            if (dashCountEl) dashCountEl.textContent = '0 Pending';
            return;
        }
        const myRoll = (currentUser.rollNo || '').toLowerCase().trim();
        const pendingCount = assignments.filter(a => {
            const mySub = assignmentSubmissions.find(s => s.assignmentId === a.id && (s.rollNo || '').toLowerCase().trim() === myRoll);
            return !mySub && Date.now() <= a.due;
        }).length;
        const dashCountEl = document.getElementById('dashAssignPendingCount');
        if (dashCountEl) dashCountEl.textContent = pendingCount + ' Pending';
        assignmentsTableBody.innerHTML = assignments.map(a => {
            const mySub = assignmentSubmissions.find(s => s.assignmentId === a.id && (s.rollNo || '').toLowerCase().trim() === myRoll);
            const isPast = Date.now() > a.due;
            let statusHtml, actionHtml;
            if (mySub) {
                statusHtml = '<span class="badge-success">Submitted</span>';
                actionHtml = `<span class="badge-soft" title="Submitted on ${new Date(mySub.submittedAt).toLocaleString('en-IN')}">Submitted ✓</span>`;
            } else if (isPast) {
                statusHtml = '<span class="badge-danger">Missed</span>';
                actionHtml = '<button class="btn btn-outline" disabled style="opacity:0.5;cursor:not-allowed;">Closed</button>';
            } else {
                statusHtml = '<span class="badge-danger">Pending</span>';
                actionHtml = `<button class="btn btn-primary" onclick="openAssignSubmit(${a.id})">Submit</button>`;
            }
            return `<tr>
                <td>${a.title}</td>
                <td>${a.subject}</td>
                <td>${formatDueDate(a.due)}</td>
                <td>${statusHtml}</td>
                <td>${actionHtml}</td>
            </tr>`;
        }).join('');
    };

    window.openAssignSubmit = function(id) {
        const a = assignments.find(x => x.id === id);
        if (!a) return;
        if (Date.now() > a.due) { showToast('⏰ Submission window has closed for this assignment.', 'error'); return; }
        activeAssignmentId = id;
        document.getElementById('assignSubmitTitle').textContent = a.title + ' — ' + a.subject;
        document.getElementById('assignSubmitDueDisplay').value = formatDueDate(a.due);
        document.getElementById('assignSubmitNotes').value = '';
        document.getElementById('assignSubmitFile').value = '';
        document.getElementById('assignSubmitError').style.display = 'none';
        document.getElementById('assignSubmitOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeAssignSubmit = function() {
        document.getElementById('assignSubmitOverlay').classList.remove('active');
        document.body.style.overflow = 'auto';
        activeAssignmentId = null;
    };

    document.getElementById('assignSubmitOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeAssignSubmit();
    });

    document.getElementById('assignSubmitConfirmBtn').addEventListener('click', function() {
        const errEl = document.getElementById('assignSubmitError');
        if (!activeAssignmentId) return;
        const a = assignments.find(x => x.id === activeAssignmentId);
        if (!a) return;
        if (Date.now() > a.due) {
            errEl.textContent = 'Submission window has closed for this assignment.';
            errEl.style.display = 'block';
            if (typeof renderStudentAssignments === 'function') renderStudentAssignments();
            return;
        }
        const notes = document.getElementById('assignSubmitNotes').value.trim();
        const fileInput = document.getElementById('assignSubmitFile');
        const file = fileInput.files[0];

        const finalizeSubmission = (fileName) => {
            assignmentSubmissions.push({
                id: Date.now(),
                assignmentId: activeAssignmentId,
                rollNo: currentUser.rollNo || '',
                studentName: currentUser.name || '',
                notes,
                fileName: fileName || '',
                submittedAt: Date.now()
            });
            saveAssignmentSubmissions();
            closeAssignSubmit();
            if (typeof renderStudentAssignments === 'function') renderStudentAssignments();
            if (typeof renderFacultyAssignments === 'function') renderFacultyAssignments();
            showToast('📤 Assignment submitted!', 'success');
        };
        finalizeSubmission(file ? file.name : '');
    });

    const downloadResultBtn = document.getElementById('downloadResultBtn');
    if (downloadResultBtn) {
        downloadResultBtn.addEventListener('click', function() {
            const subjects = [
                { name: 'Distributed Systems', grade: 'A+', points: '9.2' },
                { name: 'Data Structures', grade: 'B+', points: '7.8' },
                { name: 'Neural Networks', grade: 'A', points: '8.5' },
                { name: 'Ethical Hacking', grade: 'A-', points: '8.0' }
            ];
            const studentName = (currentUser && currentUser.name) || 'Student';
            const rollNo = (currentUser && currentUser.rollNo) || '2210310';
            const cgpa = '8.5';
            const generatedOn = new Date().toLocaleString('en-IN');

            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                doc.setFillColor(30, 58, 138);
                doc.rect(0, 0, 210, 28, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(16);
                doc.setFont(undefined, 'bold');
                doc.text('K.R. Mangalam University', 14, 13);
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                doc.text('SOET Portal · Examination Result', 14, 20);

                doc.setTextColor(15, 23, 42);
                doc.setFontSize(13);
                doc.setFont(undefined, 'bold');
                doc.text('Examination Result', 14, 40);

                doc.setFontSize(11);
                doc.setFont(undefined, 'normal');
                doc.text(`Student Name: ${studentName}`, 14, 50);
                doc.text(`Roll No: ${rollNo}`, 14, 57);
                doc.text(`Program: B.Tech CSE (AI & ML) · Semester VI`, 14, 64);
                doc.text(`Session: 2025-26`, 14, 71);

                let y = 84;
                doc.setFont(undefined, 'bold');
                doc.setFillColor(219, 234, 254);
                doc.rect(14, y - 6, 182, 8, 'F');
                doc.text('Subject', 18, y);
                doc.text('Grade', 120, y);
                doc.text('Points', 160, y);
                doc.setFont(undefined, 'normal');
                y += 10;
                subjects.forEach(s => {
                    doc.text(s.name, 18, y);
                    doc.text(s.grade, 120, y);
                    doc.text(s.points, 160, y);
                    y += 9;
                });

                y += 6;
                doc.setFont(undefined, 'bold');
                doc.text(`Overall CGPA: ${cgpa} / 10.0`, 14, y);

                y += 14;
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
                doc.setTextColor(100, 116, 139);
                doc.text(`Generated on: ${generatedOn}`, 14, y);
                doc.text('This is a system-generated document from the SOET Student Portal.', 14, y + 6);

                doc.save(`Result_${rollNo}.pdf`);
                showToast('📄 Result downloaded successfully!', 'success');
            } catch (err) {
                let content = `K.R. MANGALAM UNIVERSITY - SOET PORTAL\nEXAMINATION RESULT\n\n`;
                content += `Student Name: ${studentName}\nRoll No: ${rollNo}\nProgram: B.Tech CSE (AI & ML) - Semester VI\nSession: 2025-26\n\n`;
                content += `Subject-wise Grades:\n`;
                subjects.forEach(s => { content += `  ${s.name}: ${s.grade} (${s.points})\n`; });
                content += `\nOverall CGPA: ${cgpa} / 10.0\n\nGenerated on: ${generatedOn}\n`;
                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Result_${rollNo}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                showToast('📄 Result downloaded (text format)', 'success');
            }
        });
    }

    // ================= VIEW ALL STUDENTS =================
    window.viewAllStudents = function() { showToast('👨‍🎓 Showing all students', 'info'); };

    // ================= OPEN COURSES =================
    window.openCourses = function() {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);z-index:9999;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px);';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:white;border-radius:24px;padding:2rem;width:90%;max-width:900px;max-height:85vh;overflow-y:auto;box-shadow:0 30px 60px rgba(0,0,0,0.3);position:relative;animation:fadeInUp 0.3s ease;';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = 'position:absolute;top:15px;right:20px;font-size:1.5rem;color:#94a3b8;cursor:pointer;background:none;border:none;transition:0.2s;';
        closeBtn.onmouseover = () => closeBtn.style.color = '#0f172a';
        closeBtn.onmouseout = () => closeBtn.style.color = '#94a3b8';
        closeBtn.onclick = () => document.body.removeChild(overlay);

        const title = document.createElement('h2');
        title.style.cssText = 'font-size:1.8rem;color:#0f172a;text-align:center;margin-bottom:1.5rem;';
        title.innerHTML = '🎓 Our <span style="color:#1e3a8a;">Programs</span>';

        const grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;';

        const programs = [
            { title: 'B.Tech', desc: 'Computer Science, AI & ML, IT, ECE, Mechanical, Civil' },
            { title: 'B.Sc', desc: 'Computer Science, Mathematics, Physics, Chemistry, Biotech' },
            { title: 'BCA', desc: 'Bachelor of Computer Applications' },
            { title: 'B.Com', desc: 'Bachelor of Commerce (Hons)' },
            { title: 'B.Pharma', desc: 'Bachelor of Pharmacy' },
            { title: 'BBA', desc: 'Bachelor of Business Administration' },
            { title: 'BA', desc: 'English, Journalism, Economics' },
            { title: 'BHM', desc: 'Bachelor of Hotel Management' }
        ];

        programs.forEach(p => {
            const card = document.createElement('div');
            card.style.cssText = 'background:#f8fafc;padding:1.5rem;border-radius:16px;border:1px solid #e2e8f0;text-align:center;transition:0.3s;';
            card.onmouseenter = () => { card.style.transform = 'translateY(-5px)'; card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.06)'; card.style.borderColor = '#1e3a8a'; };
            card.onmouseleave = () => { card.style.transform = 'translateY(0)'; card.style.boxShadow = 'none'; card.style.borderColor = '#e2e8f0'; };

            const h4 = document.createElement('h4');
            h4.style.cssText = 'font-size:1.1rem;color:#0f172a;margin-bottom:0.3rem;';
            h4.textContent = p.title;

            const desc = document.createElement('p');
            desc.style.cssText = 'font-size:0.8rem;color:#64748b;';
            desc.textContent = p.desc;

            card.appendChild(h4);
            card.appendChild(desc);
            grid.appendChild(card);
        });

        const applyBtn = document.createElement('button');
        applyBtn.style.cssText = 'display:block;margin:2rem auto 0;background:#1e3a8a;color:white;padding:0.8rem 2.5rem;border:none;border-radius:60px;font-weight:600;font-size:1rem;cursor:pointer;transition:0.2s;';
        applyBtn.textContent = 'Apply Now for 2026';
        applyBtn.onmouseenter = () => { applyBtn.style.background = '#172554'; applyBtn.style.transform = 'scale(1.02)'; };
        applyBtn.onmouseleave = () => { applyBtn.style.background = '#1e3a8a'; applyBtn.style.transform = 'scale(1)'; };
        applyBtn.onclick = () => { document.body.removeChild(overlay); openApply(); };

        modal.appendChild(closeBtn);
        modal.appendChild(title);
        modal.appendChild(grid);
        modal.appendChild(applyBtn);
        overlay.appendChild(modal);

        overlay.addEventListener('click', function(e) {
            if (e.target === this) document.body.removeChild(overlay);
        });

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
    };

    // ================= FEE PAYMENT GATEWAY =================
    const DEFAULT_TUITION_DUE = 45000;
    const FEE_DUE_DATE_LABEL = 'Nov 15, 2026';

    let feePayments = JSON.parse(localStorage.getItem('soet_fee_payments')) || [];
    function saveFeePayments() { localStorage.setItem('soet_fee_payments', JSON.stringify(feePayments)); }

    let feeDueState = {};
    function feeStudentKey() {
        return (currentUser && currentUser.email) ? currentUser.email : 'guest';
    }

    function getTuitionDue() {
        const key = feeStudentKey();
        if (!(key in feeDueState)) {
            feeDueState[key] = DEFAULT_TUITION_DUE;
        }
        return feeDueState[key];
    }

    function reduceTuitionDue(amount) {
        const key = feeStudentKey();
        const current = getTuitionDue();
        feeDueState[key] = Math.max(0, Math.round((current - amount) * 100) / 100);
    }

    function formatINR(n) {
        return '₹' + Number(n).toLocaleString('en-IN');
    }

    function generateTxnId() {
        return 'KRMU' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
    }

    window.renderFeeOverview = function() {
        const dashWidget = document.getElementById('feeDashWidget');
        if (dashWidget) {
            const dashDue = getTuitionDue();
            dashWidget.textContent = dashDue === 0 ? '✅ Fully Paid' : (formatINR(dashDue) + ' Due');
        }
        const dueEl = document.getElementById('feeTotalDueAmount');
        if (!dueEl) return;
        const dateEl = document.getElementById('feeDueDateText');
        const breakupEl = document.getElementById('feeDueBreakup');
        const btn = document.getElementById('payFeesBtn');
        const histEl = document.getElementById('feePaymentHistoryList');

        const due = getTuitionDue();
        dueEl.textContent = formatINR(due);
        dueEl.style.color = due === 0 ? '#16a34a' : '#dc2626';

        if (dateEl) {
            dateEl.textContent = due === 0 ? '✅ All tuition dues cleared' : ('Due Date: ' + FEE_DUE_DATE_LABEL);
            dateEl.style.color = due === 0 ? '#16a34a' : '';
        }
        if (breakupEl) {
            breakupEl.textContent = due > 0 ? `Tuition Fee · Semester VI · Late fee applicable after due date` : '';
        }
        if (btn) {
            if (due === 0) {
                btn.innerHTML = '<i class="fas fa-circle-check"></i> Fully Paid';
                btn.disabled = true;
                btn.style.opacity = '0.65';
                btn.style.cursor = 'default';
            } else {
                btn.innerHTML = '<i class="fas fa-credit-card"></i> Pay Now';
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
        }

        if (histEl) {
            const key = feeStudentKey();
            const mine = feePayments.filter(p => p.studentEmail === key).sort((a, b) => b.paidAt - a.paidAt);
            const defaultRows = `
                <div class="progress-item"><span>No payment history yet.</span></div>`;
            const myRows = mine.map(p => `
                <div class="progress-item">
                    <span><i class="fas fa-receipt" style="color:#94a3b8;margin-right:4px;"></i>${p.purpose} · ${new Date(p.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    <span class="badge-success" style="cursor:pointer;" onclick="downloadFeeReceipt('${p.txnId}')" title="Download Receipt (${p.txnId})">Paid ${formatINR(p.amount)} <i class="fas fa-download" style="margin-left:4px;"></i></span>
                </div>`).join('');
            histEl.innerHTML = myRows || defaultRows;
        }
    };

    window.openFeePaymentModal = function() {
        const due = getTuitionDue();
        if (due <= 0) {
            showToast('✅ No dues pending!', 'success');
            return;
        }
        showToast('💳 Payment processing...', 'info');
        setTimeout(() => {
            const amount = Math.min(due, 25000);
            reduceTuitionDue(amount);
            const txnId = generateTxnId();
            feePayments.push({
                txnId,
                studentEmail: feeStudentKey(),
                studentName: currentUser.name || 'Student',
                rollNo: currentUser.rollNo || 'N/A',
                amount: amount,
                method: 'Card',
                purpose: 'Tuition Fee',
                status: 'Success',
                paidAt: Date.now()
            });
            saveFeePayments();
            renderFeeOverview();
            showToast(`✅ Payment of ${formatINR(amount)} successful!`, 'success');
        }, 1500);
    };

    window.downloadFeeReceipt = function(txnId) {
        const p = feePayments.find(x => x.txnId === txnId);
        if (!p) { showToast('⚠️ Receipt not found.', 'error'); return; }
        showToast('📄 Receipt downloaded!', 'success');
    };

    // ================= SEMESTER PERFORMANCE DATA =================
    const semData = {
        1: { sgpa: 0, deptRank: 0, uniRank: 0, credits: 0, subjects: [] },
        2: { sgpa: 0, deptRank: 0, uniRank: 0, credits: 0, subjects: [] },
        3: { sgpa: 0, deptRank: 0, uniRank: 0, credits: 0, subjects: [] },
        4: { sgpa: 0, deptRank: 0, uniRank: 0, credits: 0, subjects: [] },
        5: { sgpa: 0, deptRank: 0, uniRank: 0, credits: 0, subjects: [] },
        6: { sgpa: 0, deptRank: 0, uniRank: 0, credits: 0, subjects: [] }
    };

    function renderSemPanel(sem) {
        const d = semData[sem];
        const panel = document.getElementById('sem-detail-panel');
        if (!panel || !d) return;
        const romans = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI'};
        panel.innerHTML = `
            <div style="text-align:center;padding:3rem 1rem;color:#94a3b8;">
                <i class="fas fa-chart-simple" style="font-size:3rem;display:block;margin-bottom:1rem;opacity:0.3;"></i>
                <h3 style="color:#475569;font-weight:600;">No Performance Data Available</h3>
                <p style="font-size:0.9rem;">Your academic performance for Semester ${romans[sem]} will appear here once faculty adds marks.</p>
            </div>
        `;
    }

    window.switchSem = function(sem) {
        document.querySelectorAll('.sem-tab-btn').forEach(btn => {
            btn.style.background = 'transparent';
            btn.style.color = '#475569';
            btn.style.fontWeight = '500';
        });
        const active = document.getElementById('sem-tab-' + sem);
        if (active) { active.style.background = '#1e3a8a'; active.style.color = 'white'; active.style.fontWeight = '600'; }
        renderSemPanel(sem);
    };

    // ================= GENERATE QR =================
    window.generateQR = function() {
        showToast('📱 QR Session Generated!', 'success');
        const status = document.querySelector('#qrCard .badge-success');
        if (status) {
            status.textContent = '● active';
        }
    };

    // ================= EVENTS SYSTEM =================
    let events = JSON.parse(localStorage.getItem('soet_events')) || [];
    function saveEvents() { localStorage.setItem('soet_events', JSON.stringify(events)); }

    window.renderEventsPage = function() {
        const isFaculty = currentUser && currentUser.role === 'faculty';
        const isStudent = currentUser && currentUser.role === 'student';
        const isAdmin = currentUser && currentUser.role === 'admin';
        
        const facultySection = document.getElementById('facultyEventsSection');
        if (facultySection) {
            facultySection.style.display = isAdmin ? 'block' : 'none';
        }

        const myRegContainer = document.getElementById('myRegisteredEventsContainer');
        if (myRegContainer) {
            myRegContainer.style.display = isStudent ? 'block' : 'none';
        }

        const facMyContainer = document.getElementById('facultyMyEventsContainer');
        if (facMyContainer) {
            facMyContainer.style.display = (isFaculty || isAdmin) ? 'block' : 'none';
        }

        renderAllEvents();
        renderMyRegisteredEvents();
        renderFacultyMyEvents();
    };

    function renderAllEvents() {
        const grid = document.getElementById('eventsGrid');
        if (!grid) return;
        if (!events.length) {
            grid.innerHTML = `<div class="card text-center" style="grid-column:1/-1;"><p class="text-muted">No events available yet. Admin will create events soon.</p></div>`;
            return;
        }
        const sorted = [...events].reverse();
        grid.innerHTML = sorted.map(event => {
            const isFull = event.capacity && event.registrations.length >= event.capacity;
            const regCount = event.registrations ? event.registrations.length : 0;
            return `
                <div class="card" style="border:1px solid ${isFull ? '#fecaca' : '#eaf0fa'};">
                    <div class="card-header">
                        <h3><i class="fas fa-calendar-check" style="color:#1e3a8a;"></i> ${event.title}</h3>
                        <span class="badge-soft">${event.type}</span>
                    </div>
                    <p class="text-muted" style="margin-bottom:0.8rem;">${event.description}</p>
                    <div style="display:flex;flex-wrap:wrap;gap:0.4rem;font-size:0.82rem;color:#475569;">
                        <span><i class="fas fa-calendar-alt"></i> ${event.date}</span>
                        <span><i class="fas fa-clock"></i> ${event.time}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.venue}</span>
                        ${event.capacity ? `<span><i class="fas fa-users"></i> ${regCount}/${event.capacity}</span>` : ''}
                    </div>
                    <div class="flex mt-2" style="justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
                        ${isFull ? `<span class="badge-danger">Full</span>` : 
                            (currentUser && currentUser.role === 'student' ? 
                                (event.registrations.some(r => r.rollNo === currentUser.rollNo) ? 
                                    `<span class="badge-success"><i class="fas fa-check-circle"></i> Registered</span>` : 
                                    `<button class="btn btn-primary" onclick="openEventRegistrationModal(${event.id})"><i class="fas fa-user-plus"></i> Register</button>`) : 
                                `<span class="badge-soft">${regCount} registered</span>`)}
                    </div>
                </div>
            `;
        }).join('');
    }

    window.openEventRegistrationModal = function(eventId) {
        if (!currentUser || currentUser.role !== 'student') {
            showToast('⚠️ Please login as a student to register.', 'error');
            return;
        }
        const event = events.find(e => e.id === eventId);
        if (!event) { showToast('⚠️ Event not found.', 'error'); return; }
        if (event.capacity && event.registrations.length >= event.capacity) {
            showToast('⚠️ Event is full!', 'error');
            return;
        }
        if (event.registrations.some(r => r.rollNo === currentUser.rollNo)) {
            showToast('⚠️ You are already registered!', 'error');
            return;
        }

        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);z-index:9999;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px);';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:white;border-radius:24px;padding:2rem;width:90%;max-width:450px;box-shadow:0 30px 60px rgba(0,0,0,0.3);animation:fadeInUp 0.3s ease;position:relative;';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = 'position:absolute;top:15px;right:20px;font-size:1.5rem;color:#94a3b8;cursor:pointer;background:none;border:none;transition:0.2s;';
        closeBtn.onmouseover = () => closeBtn.style.color = '#0f172a';
        closeBtn.onmouseout = () => closeBtn.style.color = '#94a3b8';
        closeBtn.onclick = () => document.body.removeChild(overlay);

        const title = document.createElement('h2');
        title.style.cssText = 'font-size:1.4rem;color:#0f172a;text-align:center;margin-bottom:0.5rem;';
        title.innerHTML = `📝 Register for <br><span style="color:#1e3a8a;">${event.title}</span>`;

        const form = document.createElement('div');
        form.innerHTML = `
            <div class="auth-input-group">
                <label>Team Name (Optional)</label>
                <input type="text" id="regTeamName" class="input-slim" style="width:100%;" placeholder="e.g. Team Alpha">
            </div>
            <div class="auth-input-group">
                <label>Team Members (Optional, comma separated)</label>
                <input type="text" id="regTeamMembers" class="input-slim" style="width:100%;" placeholder="e.g. Rahul, Priya, Aman">
            </div>
            <div class="auth-input-group">
                <label>Phone Number *</label>
                <input type="tel" id="regPhone" class="input-slim" style="width:100%;" placeholder="+91 9876543210" required>
            </div>
        `;

        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary';
        submitBtn.style.cssText = 'width:100%;justify-content:center;margin-top:1rem;';
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Confirm Registration';
        submitBtn.onclick = function() {
            const teamName = document.getElementById('regTeamName').value.trim();
            const teamMembers = document.getElementById('regTeamMembers').value.trim();
            const phone = document.getElementById('regPhone').value.trim();

            if (!phone) {
                showToast('⚠️ Please enter your phone number.', 'error');
                return;
            }

            event.registrations.push({
                rollNo: currentUser.rollNo || 'N/A',
                studentName: currentUser.name || 'Student',
                teamName: teamName || 'N/A',
                teamMembers: teamMembers || 'N/A',
                phone: phone,
                registeredAt: Date.now()
            });
            saveEvents();
            document.body.removeChild(overlay);
            renderEventsPage();
            showToast(`✅ Registered for "${event.title}"!`, 'success');
        };

        modal.appendChild(closeBtn);
        modal.appendChild(title);
        modal.appendChild(form);
        modal.appendChild(submitBtn);
        overlay.appendChild(modal);

        overlay.addEventListener('click', function(e) {
            if (e.target === this) document.body.removeChild(overlay);
        });

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
    };

    function renderMyRegisteredEvents() {
        const container = document.getElementById('myRegisteredEventsList');
        const countEl = document.getElementById('myRegCount');
        if (!container || !currentUser) return;
        const myRegs = events.filter(e => e.registrations.some(r => r.rollNo === currentUser.rollNo));
        if (countEl) countEl.textContent = myRegs.length;
        if (!myRegs.length) {
            container.innerHTML = `<p class="text-muted">You haven't registered for any events yet.</p>`;
            return;
        }
        container.innerHTML = myRegs.map(event => {
            const myReg = event.registrations.find(r => r.rollNo === currentUser.rollNo);
            return `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0;border-bottom:1px solid #f1f5f9;">
                    <div>
                        <strong>${event.title}</strong> <span class="badge-soft">${event.type}</span>
                        <div class="text-muted" style="font-size:0.75rem;">${event.date} · ${event.time} · ${event.venue}</div>
                        ${myReg && myReg.teamName && myReg.teamName !== 'N/A' ? `<div class="text-muted" style="font-size:0.7rem;">Team: ${myReg.teamName} | Members: ${myReg.teamMembers}</div>` : ''}
                    </div>
                    <button class="btn btn-danger" onclick="cancelEventRegistration(${event.id})" style="font-size:0.7rem;padding:0.3rem 0.8rem;"><i class="fas fa-times"></i> Cancel</button>
                </div>
            `;
        }).join('');
    }

    window.cancelEventRegistration = function(eventId) {
        if (!currentUser) return;
        const event = events.find(e => e.id === eventId);
        if (!event) return;
        event.registrations = event.registrations.filter(r => r.rollNo !== currentUser.rollNo);
        saveEvents();
        renderEventsPage();
        showToast('✅ Registration cancelled.', 'info');
    };

    if (document.getElementById('facEventCreateBtn')) {
        document.getElementById('facEventCreateBtn').addEventListener('click', function() {
            if (!currentUser || currentUser.role !== 'admin') {
                showToast('⚠️ Only admin can create events.', 'error');
                return;
            }
            const title = document.getElementById('facEventTitle').value.trim();
            const type = document.getElementById('facEventType').value;
            const date = document.getElementById('facEventDate').value;
            const time = document.getElementById('facEventTime').value;
            const venue = document.getElementById('facEventVenue').value.trim();
            const capacity = parseInt(document.getElementById('facEventCapacity').value) || 0;
            const description = document.getElementById('facEventDesc').value.trim();

            if (!title || !date || !time || !venue || !description) {
                showToast('⚠️ Please fill in all required fields.', 'error');
                return;
            }

            const newEvent = {
                id: Date.now(),
                title, type, date, time, venue, capacity, description,
                createdBy: currentUser.email,
                createdAt: Date.now(),
                registrations: []
            };
            events.push(newEvent);
            saveEvents();
            renderEventsPage();
            document.getElementById('facEventTitle').value = '';
            document.getElementById('facEventDate').value = '';
            document.getElementById('facEventTime').value = '';
            document.getElementById('facEventVenue').value = '';
            document.getElementById('facEventCapacity').value = '';
            document.getElementById('facEventDesc').value = '';
            showToast(`✅ Event "${title}" created!`, 'success');
        });
    }

    function renderFacultyMyEvents() {
        const container = document.getElementById('facultyMyEventsList');
        const countEl = document.getElementById('facMyEventCount');
        if (!container || !currentUser) return;
        const myEvents = events.filter(e => e.createdBy === currentUser.email);
        if (countEl) countEl.textContent = myEvents.length;
        if (!myEvents.length) {
            container.innerHTML = `<p class="text-muted">You haven't created any events yet.</p>`;
            return;
        }
        container.innerHTML = myEvents.map(event => `
            <div style="background:#f8fafc;border-radius:12px;padding:1rem;border:1px solid #eaf0fa;margin-bottom:0.8rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
                    <div>
                        <strong>${event.title}</strong> <span class="badge-soft">${event.type}</span>
                        <div class="text-muted" style="font-size:0.78rem;">${event.date} · ${event.time} · ${event.venue}</div>
                        <div class="text-muted" style="font-size:0.75rem;">${event.registrations.length} registrations</div>
                    </div>
                    <div style="display:flex;gap:0.5rem;">
                        <button class="btn btn-outline" onclick="showEventRegistrations(${event.id})" style="font-size:0.7rem;padding:0.3rem 0.8rem;"><i class="fas fa-users"></i> Registrations</button>
                        <button class="btn btn-danger" onclick="deleteEvent(${event.id})" style="font-size:0.7rem;padding:0.3rem 0.8rem;"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    window.deleteEvent = function(eventId) {
        if (!confirm('Are you sure you want to delete this event and all its registrations?')) return;
        events = events.filter(e => e.id !== eventId);
        saveEvents();
        renderEventsPage();
        showToast('🗑️ Event deleted.', 'info');
    };

    window.showEventRegistrations = function(eventId) {
        const event = events.find(e => e.id === eventId);
        if (!event) { showToast('⚠️ Event not found.', 'error'); return; }
        if (!event.registrations.length) {
            showToast('📭 No registrations yet.', 'info');
            return;
        }
        const msg = `📋 ${event.title} - Registered Students:\n\n` + 
            event.registrations.map((r, i) => {
                let details = `${i+1}. ${r.studentName} (${r.rollNo})`;
                if (r.teamName && r.teamName !== 'N/A') {
                    details += `\n   Team: ${r.teamName} | Members: ${r.teamMembers}`;
                }
                details += `\n   Phone: ${r.phone}`;
                return details;
            }).join('\n\n');
        alert(msg);
        showToast('📋 Check alert for full registration details.', 'info');
    };

    // ================= DASHBOARD ATTENDANCE WIDGET =================
    function updateDashboardAttendanceWidget() {
        const circleEl = document.getElementById('dashAttendanceCircle');
        const pctEl = document.getElementById('dashAttendancePercent');
        const statusEl = document.getElementById('dashAttendanceStatus');
        if (!circleEl) return;

        const sem = currentAttSem || 6;
        const data = attSemData[sem];
        if (!data) return;

        const totalClasses = data.subjects.reduce((s, a) => s + (a.total || 0), 0);
        const totalPresent = data.subjects.reduce((s, a) => s + (a.present || 0), 0);
        const avg = totalClasses ? Math.round((totalPresent / totalClasses) * 100) : 0;
        const color = avg >= 85 ? '#16a34a' : (avg >= 75 ? '#2563eb' : '#dc2626');

        if (totalClasses === 0) {
            circleEl.innerHTML = `<div style="width:50px;height:50px;border-radius:50%;background:#f1f5f9;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:0.7rem;text-align:center;padding:4px;">No Data</div>`;
            pctEl.textContent = '--%';
            pctEl.style.color = '#94a3b8';
            statusEl.textContent = '⏳ Awaiting data';
            statusEl.style.color = '#94a3b8';
            return;
        }

        circleEl.innerHTML = window.ringSvg(50, 6, avg, color);
        pctEl.textContent = avg + '%';
        pctEl.style.color = color;
        statusEl.textContent = avg >= 75 ? '✅ Good Standing' : (avg >= 50 ? '⚠️ Below 75%' : '❌ Critical');
        statusEl.style.color = avg >= 75 ? '#16a34a' : (avg >= 50 ? '#d97706' : '#dc2626');
    }

    function updateDashboardTodayAttendance() {
        updateDashboardAttendanceWidget();
    }

    // ================= RESTORE SESSION =================
    const savedUser = localStorage.getItem('soet_current_user');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            const found = users.find(u => u.email === user.email && u.password === user.password);
            if (found) {
                currentUser = found;
                enterDashboard(found);
            } else {
                localStorage.removeItem('soet_current_user');
            }
        } catch (e) { localStorage.removeItem('soet_current_user'); }
    }

    renderAdmins();
    if (adminPanel) adminPanel.style.display = 'none';

    // ================= INIT =================
    document.addEventListener('DOMContentLoaded', function() {
        renderEventsPage();
        renderReeFeeSection();
        renderReeCalendarNotice();
        renderDebarFeeSection();
        renderFeeOverview();
        renderMarksEntries();
        renderStudentMarksUpdates();
        renderStudentAssignments();
        renderFacultyAssignments();
        updateDashboardAttendanceWidget();
        renderSemPanel(1);
        renderAdmins();
        renderStudentTimetable();
        if (document.getElementById('page-timetable-manage') && currentUser && currentUser.role === 'admin') {
            renderEditTimetable();
        }
        // Load students into attendance if faculty
        if (currentUser && currentUser.role === 'faculty') {
            loadStudentsFromUsers();
        }
        // Render user management if admin
        if (currentUser && currentUser.role === 'admin') {
            renderUserManagement();
        }
    });

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        renderEventsPage();
        renderReeFeeSection();
        renderReeCalendarNotice();
        renderDebarFeeSection();
        renderFeeOverview();
        renderMarksEntries();
        renderStudentMarksUpdates();
        renderStudentAssignments();
        renderFacultyAssignments();
        updateDashboardAttendanceWidget();
        renderSemPanel(1);
        renderAdmins();
        renderStudentTimetable();
        if (document.getElementById('page-timetable-manage') && currentUser && currentUser.role === 'admin') {
            renderEditTimetable();
        }
        if (currentUser && currentUser.role === 'faculty') {
            loadStudentsFromUsers();
        }
        if (currentUser && currentUser.role === 'admin') {
            renderUserManagement();
        }
    }

    console.log('✅ K.R. Mangalam University Portal ready!');
    console.log('📋 Default Admin: admin@soet.edu / password123');
    console.log('📋 Students registered via signup appear in Faculty attendance and marks');
    console.log('📋 Faculty registered via signup appear in Admin panel');
    console.log('📋 Admin can remove any user from the system');
})();

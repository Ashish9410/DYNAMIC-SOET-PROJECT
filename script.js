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
    let users = JSON.parse(localStorage.getItem('soet_users')) || [
        { name: 'Alex Sterling', email: 'student@soet.edu', password: 'password123', role: 'student', rollNo: '2024CSE001' },
        { name: 'Dr. Alaric', email: 'faculty@soet.edu', password: 'password123', role: 'faculty', rollNo: '' },
        { name: 'Admin', email: 'admin@soet.edu', password: 'password123', role: 'admin', rollNo: '' }
    ];

    let admins = JSON.parse(localStorage.getItem('soet_admins')) || ['admin@soet.edu', 'hoda@soet.edu', 'dean@soet.edu'];
    let applications = JSON.parse(localStorage.getItem('soet_applications')) || [];
    let currentUser = null;
    let isSignup = false;

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
    const addAdminBtn = document.getElementById('addAdminBtn');
    const newAdminInput = document.getElementById('newAdminInput');
    const resetAdminBtn = document.getElementById('resetAdminBtn');

    // Application form refs
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

    function renderAdmins() {
        adminListContainer.innerHTML = '';
        admins.forEach(email => {
            const span = document.createElement('span');
            span.className = 'admin-tag';
            span.innerHTML =
                `<i class="fas fa-user-shield"></i> ${email} <i class="fas fa-times" data-email="${email}"></i>`;
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
                saveAdmins();
                renderAdmins();
                showToast(`🗑️ Removed ${email}`, 'info');
            });
        });
    }

    function showError(msg) {
        authError.style.display = msg ? 'block' : 'none';
        authError.textContent = msg || '';
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

    // ================= AUTO EXCEL DOWNLOAD FUNCTION =================
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

    // ================= DASHBOARD =================
    function enterDashboard(user) {
        publicWebsite.style.display = 'none';
        dashboard.classList.add('active');

        dashUserName.textContent = user.name || user.email.split('@')[0];
        dashRoleTag.textContent = user.role.toUpperCase();

        const isStudent = user.role === 'student';
        const isFaculty = user.role === 'faculty';
        const isAdmin = user.role === 'admin';

        // Show/hide student-only elements - FIXED: Use proper display values
        document.querySelectorAll('.student-only').forEach(el => {
            if (el.classList.contains('taskbar-btn')) {
                el.style.display = isStudent ? 'inline-flex' : 'none';
            } else {
                el.style.display = isStudent ? 'block' : 'none';
            }
        });

        // Show/hide faculty-only elements (Faculty AND Admin)
        document.querySelectorAll('.faculty-only').forEach(el => {
            if (el.classList.contains('taskbar-btn')) {
                el.style.display = (isFaculty || isAdmin) ? 'inline-flex' : 'none';
            } else {
                el.style.display = (isFaculty || isAdmin) ? 'block' : 'none';
            }
        });

        // Show/hide admin-only elements (Admin only)
        document.querySelectorAll('.admin-only').forEach(el => {
            if (el.classList.contains('taskbar-btn')) {
                el.style.display = isAdmin ? 'inline-flex' : 'none';
            } else {
                el.style.display = isAdmin ? 'block' : 'none';
            }
        });

        // QR Card - visible to Faculty and Admin
        const qrCard = document.getElementById('qrCard');
        if (qrCard) qrCard.style.display = (isFaculty || isAdmin) ? 'block' : 'none';
        
        // Critical Alerts - visible to Faculty and Admin
        const alertsCard = document.getElementById('criticalAlertsCard');
        if (alertsCard) alertsCard.style.display = (isFaculty || isAdmin) ? 'block' : 'none';

        // Student dashboard
        if (isStudent) {
            greeting.innerHTML = '👋 Welcome back, ' + (user.name || 'Student');
            subGreeting.innerHTML = 'You\'ve completed 72% of your weekly targets. Mid-sems in 14 days.';
            renderStudentAssignments();
            renderFeeOverview();
            updateDashboardAttendanceWidget();
            updateDashboardTodayAttendance();
        } 
        // Faculty dashboard
        else if (isFaculty) {
            greeting.innerHTML = '👋 Welcome back, Professor ' + (user.name || 'Faculty');
            subGreeting.innerHTML = 'You have 3 classes scheduled for today. QR Generation available for attendance.';
        } 
        // Admin dashboard
        else if (isAdmin) {
            greeting.innerHTML = '👋 Admin Dashboard';
            subGreeting.innerHTML = 'Full control over the system. QR Generation, Events, and Timetable management available.';
            renderAdmins();
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

    // ================= PAGE NAVIGATION - FIXED =================
    window.navigateTo = function(page) {
        console.log('🔄 Navigating to:', page);
        
        // Check if user is logged in
        if (!currentUser) {
            showToast('⚠️ Please login first.', 'error');
            return;
        }

        // Map display names to actual page IDs
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
            'timetable-manage': 'timetable',
            'profile': 'profile'
        };

        // Get the actual page ID
        const actualPage = pageMap[page] || page;

        // Check permissions for admin-only pages
        const adminOnlyPages = ['events-manage', 'timetable-manage'];
        if (adminOnlyPages.includes(page)) {
            if (!currentUser || currentUser.role !== 'admin') {
                showToast('⛔ Access denied. Admin only.', 'error');
                return;
            }
        }

        // Check permissions for faculty-only pages
        const facultyOnlyPages = ['marks-entry', 'attendance', 'assignment-upload', 'syllabus', 'qr'];
        if (facultyOnlyPages.includes(page)) {
            if (!currentUser || (currentUser.role !== 'faculty' && currentUser.role !== 'admin')) {
                showToast('⛔ Access denied. Faculty only.', 'error');
                return;
            }
        }

        // Check permissions for student-only pages
        const studentOnlyPages = ['placements', 'assignments', 'materials', 'fees', 'results', 
                                  'certificates', 'helpdesk', 'hostel', 'transport', 'calendar', 
                                  'performance', 'my-attendance', 'timetable', 'events'];
        if (studentOnlyPages.includes(page)) {
            if (!currentUser || currentUser.role !== 'student') {
                showToast('⛔ Access denied. Student only.', 'error');
                return;
            }
        }

        // Hide all page content
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
        
        // Show the target page
        const target = document.getElementById('page-' + actualPage);
        if (target) {
            target.classList.add('active');
            console.log('✅ Page activated:', 'page-' + actualPage);
        } else {
            console.warn('⚠️ Page not found:', 'page-' + actualPage);
            showToast('⚠️ Page not found: ' + page, 'error');
            return;
        }

        // Update taskbar button states
        document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('active'));
        const btn = document.querySelector(`.taskbar-btn[data-page="${page}"]`);
        if (btn) {
            btn.classList.add('active');
            console.log('✅ Button activated:', page);
        } else {
            console.warn('⚠️ Button not found for page:', page);
        }

        // Show/hide welcome block
        const welcome = document.querySelector('.welcome-block');
        if (welcome) welcome.style.display = (page === 'dashboard') ? 'block' : 'none';
        
        // Render specific page content
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
        if (page === 'dashboard') { 
            updateDashboardAttendanceWidget(); 
            updateDashboardTodayAttendance(); 
        }
        
        // Show page-specific toast messages
        const pageMessages = {
            'placements': '🏢 Placements - Explore recruitment opportunities',
            'assignments': '📝 Assignments - Submit and track your work',
            'materials': '📚 Study Materials - Access your course materials',
            'fees': '💰 Fee Management - View and pay your fees',
            'results': '📊 Results - View your academic performance',
            'certificates': '📜 Certificates - Download your academic certificates',
            'helpdesk': '🆘 Help Desk - Support team is available 24/7',
            'hostel': '🏠 Hostel Management - View your accommodation details',
            'transport': '🚌 Transport - Bus routes and schedules',
            'calendar': '📅 Academic Calendar - Important dates and events',
            'performance': '📈 Performance - Track your academic progress',
            'my-attendance': '📋 Attendance - Track your semester attendance',
            'timetable': '📅 Timetable - View your weekly schedule',
            'qr': '📱 QR Generation - Available for Faculty & Admin',
            'marks-entry': '✏️ Marks Entry - Add or update student marks',
            'attendance': '📋 Attendance Marking - Mark attendance for classes',
            'assignment-upload': '📤 Assignment Upload - Upload assignments for students',
            'syllabus': '📚 Syllabus - Track your course progress',
            'profile': '👤 Profile - Manage your account settings'
        };
        
        if (pageMessages[page]) {
            showToast(pageMessages[page], 'info');
        }
    };
    // ================= TASKBAR CLICK BINDING =================
document.querySelectorAll('.taskbar-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const page = this.dataset.page;
        if (page) navigateTo(page);
    });
});

    // ================= ATTENDANCE FUNCTIONS =================
    let facStudents = JSON.parse(localStorage.getItem('soet_fac_students')) || [
        { name: 'Ishani', rollNo: '2024CSE001' },
        { name: 'Vihaan', rollNo: '2024CSE002' },
        { name: 'Ananya', rollNo: '2024CSE003' },
        { name: 'Rohan', rollNo: '2024CSE004' },
        { name: 'Meera', rollNo: '2024CSE005' },
        { name: 'Aditya', rollNo: '2024CSE006' },
        { name: 'Sia', rollNo: '2024CSE007' },
        { name: 'Aarav', rollNo: '2024CSE008' },
        { name: 'Kavya', rollNo: '2024CSE009' },
        { name: 'Arjun', rollNo: '2024CSE010' },
        { name: 'Priya', rollNo: '2024CSE011' },
        { name: 'Rahul', rollNo: '2024CSE012' }
    ];
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

        const total = chips.length;
        if (typeof attSemData !== 'undefined' && attSemData[6]) {
            const subj = attSemData[6].subjects.find(s => s.subject === 'Distributed Systems');
            if (subj && total > 0) {
                const dayPresent = (present / total) >= 0.5 ? 1 : 0;
                subj.total += 1;
                subj.present += dayPresent;
                subj.pct = Math.round((subj.present / subj.total) * 100);
                if (typeof persistAttSemData === 'function') persistAttSemData();
            }
        }
        showToast('💾 Attendance saved! Student attendance records updated.', 'success');
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

    // ================= NOTIFICATIONS =================
    let notifications = JSON.parse(localStorage.getItem('soet_notifications')) || [
        { id: 1, icon: 'fa-bullhorn', title: 'Mid Semester Exams start from 10 September', time: '2 hours ago', read: false },
        { id: 2, icon: 'fa-code', title: 'Hackathon 2026 registrations are open', time: '5 hours ago', read: false },
        { id: 3, icon: 'fa-credit-card', title: 'Fee payment reminder: ₹1,45,000 due Nov 15', time: '1 day ago', read: false },
        { id: 4, icon: 'fa-graduation-cap', title: 'Semester VI results have been published', time: '2 days ago', read: true }
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
        1: { weeks: [{m:'W1',pct:92},{m:'W2',pct:88},{m:'W3',pct:90},{m:'W4',pct:85},{m:'W5',pct:91},{m:'W6',pct:89}], subjects: [
            { subject: 'Engineering Mathematics I', pct: 90, present: 45, total: 50, color: '#2563eb' },
            { subject: 'Programming in C', pct: 94, present: 47, total: 50, color: '#16a34a' },
            { subject: 'Engineering Physics', pct: 86, present: 43, total: 50, color: '#ea580c' },
            { subject: 'Basic Electrical Engg.', pct: 80, present: 40, total: 50, color: '#7c3aed' },
            { subject: 'Communication Skills', pct: 88, present: 44, total: 50, color: '#0891b2' }
        ]},
        2: { weeks: [{m:'W1',pct:89},{m:'W2',pct:91},{m:'W3',pct:85},{m:'W4',pct:88},{m:'W5',pct:90},{m:'W6',pct:86}], subjects: [
            { subject: 'Engineering Mathematics II', pct: 87, present: 42, total: 48, color: '#2563eb' },
            { subject: 'Data Structures', pct: 92, present: 46, total: 50, color: '#16a34a' },
            { subject: 'Digital Logic Design', pct: 89, present: 43, total: 48, color: '#ea580c' },
            { subject: 'OOP with Java', pct: 91, present: 44, total: 48, color: '#7c3aed' },
            { subject: 'Environmental Science', pct: 93, present: 42, total: 45, color: '#0891b2' }
        ]},
        3: { weeks: [{m:'W1',pct:84},{m:'W2',pct:80},{m:'W3',pct:86},{m:'W4',pct:78},{m:'W5',pct:82},{m:'W6',pct:85}], subjects: [
            { subject: 'Discrete Mathematics', pct: 83, present: 40, total: 48, color: '#2563eb' },
            { subject: 'Database Management', pct: 90, present: 45, total: 50, color: '#16a34a' },
            { subject: 'Theory of Computation', pct: 76, present: 35, total: 46, color: '#ea580c' },
            { subject: 'Operating Systems', pct: 81, present: 39, total: 48, color: '#7c3aed' },
            { subject: 'Probability & Statistics', pct: 79, present: 38, total: 48, color: '#0891b2' }
        ]},
        4: { weeks: [{m:'W1',pct:88},{m:'W2',pct:85},{m:'W3',pct:90},{m:'W4',pct:87},{m:'W5',pct:84},{m:'W6',pct:89}], subjects: [
            { subject: 'Introduction to ML', pct: 91, present: 46, total: 50, color: '#2563eb' },
            { subject: 'Computer Networks', pct: 85, present: 41, total: 48, color: '#16a34a' },
            { subject: 'Design & Analysis of Algo', pct: 88, present: 42, total: 48, color: '#ea580c' },
            { subject: 'Python for Data Science', pct: 93, present: 47, total: 50, color: '#7c3aed' },
            { subject: 'Software Engineering', pct: 82, present: 39, total: 48, color: '#0891b2' }
        ]},
        5: { weeks: [{m:'W1',pct:95},{m:'W2',pct:92},{m:'W3',pct:90},{m:'W4',pct:93},{m:'W5',pct:91},{m:'W6',pct:94}], subjects: [
            { subject: 'Deep Learning', pct: 95, present: 48, total: 50, color: '#2563eb' },
            { subject: 'Natural Language Processing', pct: 91, present: 46, total: 50, color: '#16a34a' },
            { subject: 'Computer Vision', pct: 93, present: 47, total: 50, color: '#ea580c' },
            { subject: 'Big Data Analytics', pct: 89, present: 43, total: 48, color: '#7c3aed' },
            { subject: 'AI Ethics & Governance', pct: 92, present: 44, total: 48, color: '#0891b2' }
        ]},
        6: { weeks: [{m:'Jul',pct:90},{m:'Aug',pct:85},{m:'Sep',pct:78},{m:'Oct',pct:82},{m:'Nov',pct:74},{m:'Dec',pct:80}], subjects: [
            { subject: 'Distributed Systems', pct: 88, present: 44, total: 50, color: '#2563eb' },
            { subject: 'Data Structures', pct: 79, present: 38, total: 48, color: '#7c3aed' },
            { subject: 'Neural Networks', pct: 91, present: 41, total: 45, color: '#16a34a' },
            { subject: 'Ethical Hacking', pct: 68, present: 30, total: 44, color: '#ea580c' },
            { subject: 'Compiler Design', pct: 76, present: 34, total: 45, color: '#0891b2' }
        ]}
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
                        saved[sem].subjects.forEach(savedSubj => {
                            const target = attSemData[sem].subjects.find(s => s.subject === savedSubj.subject);
                            if (target) {
                                target.present = savedSubj.present;
                                target.total = savedSubj.total;
                                target.pct = savedSubj.pct;
                            }
                        });
                    }
                });
            }
        } catch (e) { /* ignore corrupt storage */ }
    }
    function persistAttSemData() {
        try { localStorage.setItem(ATT_STORAGE_KEY, JSON.stringify(attSemData)); } catch (e) { /* storage unavailable */ }
    }
    loadPersistedAttendance();
    window.addEventListener('storage', function(e) {
        if (e.key === ATT_STORAGE_KEY) {
            loadPersistedAttendance();
            const myAttPage = document.getElementById('page-my-attendance');
            if (myAttPage && myAttPage.classList.contains('active')) renderMyAttendance(currentAttSem);
        }
        if (e.key === 'soet_marks_entries') {
            const perfPage = document.getElementById('page-performance');
            if (perfPage && perfPage.classList.contains('active') && typeof renderStudentMarksUpdates === 'function') renderStudentMarksUpdates();
        }
    });

    function ringSvg(size, stroke, pct, color, trackColor) {
        const r = (size - stroke) / 2;
        const c = 2 * Math.PI * r;
        const offset = c - (pct / 100) * c;
        return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
            <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${trackColor || '#eef2f7'}" stroke-width="${stroke}"></circle>
            <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${offset}"></circle>
        </svg>`;
    }

    window.switchAttSem = function(sem) {
        currentAttSem = sem;
        attMonthIndex = 0;
        attWeekIndex = 0;
        document.querySelectorAll('.att-sem-tab-btn').forEach(btn => btn.classList.remove('active'));
        const active = document.getElementById('att-sem-tab-' + sem);
        if (active) active.classList.add('active');
        renderMyAttendance(sem);
    };

    function renderMyAttendance(sem) {
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
                            <div style="font-weight:700;font-size:0.9rem;color:${present ? '#166534' : '#991b1b'};">Today's Attendance (CS402 - Distributed Systems): ${present ? 'Marked Present ✅' : 'Marked Absent ❌'}</div>
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

        const subjects = data.subjects;
        const totalClasses = subjects.reduce((s, a) => s + a.total, 0);
        const totalPresent = subjects.reduce((s, a) => s + a.present, 0);
        const totalAbsent = totalClasses - totalPresent;
        const lowSubjects = subjects.filter(a => a.pct < 75).length;
        const avg = Math.round((totalPresent / totalClasses) * 100);
        const avgColor = avg >= 85 ? '#16a34a' : (avg >= 75 ? '#2563eb' : '#dc2626');

        if (statGrid) {
            statGrid.innerHTML = `
                <div class="att-stat-card">
                    <div class="att-icn" style="background:#eaf0fa;color:#1e3a8a;"><i class="fas fa-calendar-check"></i></div>
                    <div class="att-val">${totalClasses}</div>
                    <div class="att-lbl">Total Classes — Sem ${semRoman[sem]}</div>
                </div>
                <div class="att-stat-card">
                    <div class="att-icn" style="background:#dcfce7;color:#16a34a;"><i class="fas fa-circle-check"></i></div>
                    <div class="att-val">${totalPresent}</div>
                    <div class="att-lbl">Classes Attended</div>
                </div>
                <div class="att-stat-card">
                    <div class="att-icn" style="background:#fee2e2;color:#dc2626;"><i class="fas fa-circle-xmark"></i></div>
                    <div class="att-val">${totalAbsent}</div>
                    <div class="att-lbl">Classes Missed</div>
                </div>
                <div class="att-stat-card">
                    <div class="att-icn" style="background:#fef3c7;color:#d97706;"><i class="fas fa-triangle-exclamation"></i></div>
                    <div class="att-val">${lowSubjects}</div>
                    <div class="att-lbl">Debarred Subjects</div>
                </div>`;
        }

        if (donutWrap) {
            donutWrap.innerHTML = `
                ${ringSvg(150, 14, avg, avgColor)}
                <div class="att-donut-label">
                    <span class="pct" style="color:${avgColor};">${avg}%</span>
                    <span class="sub">Sem ${semRoman[sem]}</span>
                </div>`;
        }

        if (trendTitle) trendTitle.innerHTML = `<i class="fas fa-chart-line" style="color:#1e3a8a;"></i> Weekly Attendance Trend — Sem ${semRoman[sem]}`;

        if (trendWrap) {
            const maxPct = 100;
            trendWrap.innerHTML = data.weeks.map(t => {
                const h = Math.round((t.pct / maxPct) * 90);
                const c = t.pct >= 75 ? '#1e3a8a' : '#dc2626';
                return `<div class="att-trend-bar-col">
                    <span class="bar-val">${t.pct}%</span>
                    <div class="bar" style="height:${h}px;background:linear-gradient(180deg, ${c}, ${c}cc);"></div>
                    <span class="bar-lbl">${t.m}</span>
                </div>`;
            }).join('');
        }

        list.innerHTML = subjects.map(a => {
            const low = a.pct < 75;
            return `<div class="subj-att-card" style="${low ? 'background:#fef2f2;border-color:#fecaca;' : ''}">
                <div class="subj-ring">
                    ${ringSvg(52, 6, a.pct, a.color)}
                    <span style="color:${a.color};">${a.pct}%</span>
                </div>
                <div class="subj-info">
                    <div class="subj-name">${a.subject} ${low ? '<span class="badge-danger" style="margin-left:6px;"><i class="fas fa-user-slash"></i> Debarred</span>' : ''}</div>
                    <div class="subj-meta">${a.present} / ${a.total} classes attended</div>
                </div>
            </div>`;
        }).join('');

        renderAttCalendar(sem, avg);
    }

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

    let lastAttAvgPct = 80;

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

    // ================= UPDATE DASHBOARD ATTENDANCE WIDGET =================
    function updateDashboardAttendanceWidget() {
        const circleEl = document.getElementById('dashAttendanceCircle');
        const pctEl = document.getElementById('dashAttendancePercent');
        const statusEl = document.getElementById('dashAttendanceStatus');
        if (!circleEl) return;

        const sem = currentAttSem || 6;
        const data = attSemData[sem];
        if (!data) return;

        const totalClasses = data.subjects.reduce((s, a) => s + a.total, 0);
        const totalPresent = data.subjects.reduce((s, a) => s + a.present, 0);
        const avg = totalClasses ? Math.round((totalPresent / totalClasses) * 100) : 0;
        const color = avg >= 85 ? '#16a34a' : (avg >= 75 ? '#2563eb' : '#dc2626');

        circleEl.innerHTML = ringSvg(50, 6, avg, color);
        pctEl.textContent = avg + '%';
        pctEl.style.color = color;
        statusEl.textContent = avg >= 75 ? '✅ Good Standing' : (avg >= 50 ? '⚠️ Below 75%' : '❌ Critical');
        statusEl.style.color = avg >= 75 ? '#16a34a' : (avg >= 50 ? '#d97706' : '#dc2626');
    }

    function updateDashboardTodayAttendance() {
        updateDashboardAttendanceWidget();
    }

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
        const myName = (currentUser.name || currentUser.email.split('@')[0] || '').toLowerCase().trim();
        const myRoll = (currentUser.rollNo || '').toLowerCase().trim();
        const matched = entries.filter(e => {
            const entryRoll = (e.rollNo || '').toLowerCase().trim();
            if (myRoll && entryRoll) return entryRoll === myRoll;
            return myName ? (e.student.toLowerCase().trim().includes(myName) || myName.includes(e.student.toLowerCase().trim())) : false;
        });
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
    let assignments = JSON.parse(localStorage.getItem('soet_assignments')) || [
        { id: 1001, title: 'Backpropagation Implementation', subject: 'Neural Networks', description: 'Implement backpropagation from scratch.', due: new Date('2026-10-28T23:59:00').getTime(), createdBy: 'faculty@soet.edu', fileName: '' },
        { id: 1002, title: 'Network Sniffing Report', subject: 'Ethical Hacking', description: 'Write a report on packet sniffing tools.', due: new Date('2026-11-05T23:59:00').getTime(), createdBy: 'faculty@soet.edu', fileName: '' },
        { id: 1003, title: 'Lexical Analysis Parser', subject: 'Compiler Design', description: 'Build a simple lexical analyzer.', due: new Date('2026-11-12T23:59:00').getTime(), createdBy: 'faculty@soet.edu', fileName: '' }
    ];
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
            assignmentsTableBody.innerHTML = '<tr><td colspan="5" class="text-muted">No assignments have been uploaded yet.</td></tr>';
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
    window.viewAllStudents = function() { showToast('👨‍🎓 Showing all 12 students', 'info'); };

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

    // ================= REE FEE SECTION =================
    let reePaid = false;
    const reeExamDate = { day: 22, label: '22 Aug \'26', month: 'August 2026' };

    function renderReeFeeSection() {
        const el = document.getElementById('ree-fee-section');
        if (!el) return;

        const failedSubjects = (attSemData[6] && attSemData[6].subjects.filter(s => s.pct < 40)) || [];
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
        const failedSubjects = (attSemData[6] && attSemData[6].subjects.filter(s => s.pct < 40)) || [];
        openFeeGatewayModal({
            purpose: 'REE Fee' + (failedSubjects.length ? ' - ' + failedSubjects.map(s => s.subject).join(', ') : ''),
            amount: 3500,
            allowPartial: false,
            onPaid: function() {
                reePaid = true;
                renderReeFeeSection();
                renderReeCalendarNotice();
            },
            extraSummaryRows: function() {
                return `<div class="progress-item"><span>Exam Scheduled</span><span>${reeExamDate.label}</span></div>`;
            }
        });
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
        const totalClasses = data.subjects.reduce((s, a) => s + a.total, 0);
        const totalPresent = data.subjects.reduce((s, a) => s + a.present, 0);
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
            const mine = feePayments
                .filter(p => p.studentEmail === key)
                .sort((a, b) => b.paidAt - a.paidAt);
            const defaultRows = `
                <div class="progress-item"><span>Oct 2026</span><span class="badge-success">Paid ₹25,000</span></div>
                <div class="progress-item"><span>Sep 2026</span><span class="badge-success">Paid ₹25,000</span></div>
                <div class="progress-item"><span>Aug 2026</span><span class="badge-success">Paid ₹25,000</span></div>`;
            const myRows = mine.map(p => `
                <div class="progress-item">
                    <span><i class="fas fa-receipt" style="color:#94a3b8;margin-right:4px;"></i>${p.purpose} · ${new Date(p.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    <span class="badge-success" style="cursor:pointer;" onclick="downloadFeeReceipt('${p.txnId}')" title="Download Receipt (${p.txnId})">Paid ${formatINR(p.amount)} <i class="fas fa-download" style="margin-left:4px;"></i></span>
                </div>`).join('');
            histEl.innerHTML = myRows + defaultRows;
        }
    };

    function feeLuhnValid(num) {
        let sum = 0, alt = false;
        for (let i = num.length - 1; i >= 0; i--) {
            let d = parseInt(num.charAt(i), 10);
            if (alt) { d *= 2; if (d > 9) d -= 9; }
            sum += d;
            alt = !alt;
        }
        return sum % 10 === 0;
    }

    function feeDetectCardBrand(digits) {
        if (/^4/.test(digits)) return { name: 'Visa', icon: 'fa-cc-visa' };
        if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return { name: 'Mastercard', icon: 'fa-cc-mastercard' };
        if (/^3[47]/.test(digits)) return { name: 'Amex', icon: 'fa-cc-amex' };
        if (/^6/.test(digits)) return { name: 'RuPay', icon: 'fa-credit-card' };
        return { name: '', icon: 'fa-credit-card' };
    }

    let feeGatewayCtx = null;
    let feeQrTimer = null;

    window.openFeeGatewayModal = function(opts) {
        if (!currentUser || currentUser.role !== 'student') {
            showToast('⚠️ Please login as a student to pay fees.', 'error');
            return;
        }
        if (!opts || !(opts.amount > 0)) {
            showToast('✅ Nothing due to pay right now.', 'info');
            return;
        }
        feeGatewayCtx = opts;
        const amount = opts.amount;
        const cap = opts.allowPartial ? (opts.maxAmount || amount) : amount;

        const overlay = document.createElement('div');
        overlay.id = 'feePayOverlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);z-index:9999;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px);padding:1rem;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background:white;border-radius:24px;padding:2rem;width:100%;max-width:460px;max-height:92vh;overflow-y:auto;box-shadow:0 30px 60px rgba(0,0,0,0.3);animation:fadeInUp 0.3s ease;position:relative;';

        const closeModal = function() {
            if (feeQrTimer) { clearTimeout(feeQrTimer); feeQrTimer = null; }
            if (document.body.contains(overlay)) document.body.removeChild(overlay);
            document.body.style.overflow = '';
        };

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = 'position:absolute;top:15px;right:20px;font-size:1.5rem;color:#94a3b8;cursor:pointer;background:none;border:none;transition:0.2s;z-index:2;';
        closeBtn.onmouseover = () => closeBtn.style.color = '#0f172a';
        closeBtn.onmouseout = () => closeBtn.style.color = '#94a3b8';
        closeBtn.onclick = closeModal;

        const title = document.createElement('h2');
        title.style.cssText = 'font-size:1.4rem;color:#0f172a;text-align:center;margin-bottom:0.2rem;';
        title.innerHTML = '💳 KRMU Secure <span style="color:#1e3a8a;">Payment Gateway</span>';

        const subtitle = document.createElement('p');
        subtitle.style.cssText = 'text-align:center;color:#64748b;font-size:0.85rem;margin-bottom:1.2rem;';
        subtitle.innerHTML = '<i class="fas fa-lock" style="color:#16a34a;"></i> 256-bit encrypted &middot; Payable to K.R. Mangalam University';

        const body = document.createElement('div');
        body.id = 'feePayBody';
        body.innerHTML = `
            <style>
                .fee-tabs{display:flex;gap:6px;margin-bottom:1rem;}
                .fee-tab{flex:1;text-align:center;padding:0.55rem 0.3rem;border-radius:12px;border:1.5px solid #e2e8f0;cursor:pointer;font-size:0.72rem;font-weight:600;color:#64748b;transition:0.2s;}
                .fee-tab i{display:block;font-size:1.05rem;margin-bottom:4px;}
                .fee-tab.active{border-color:#1e3a8a;background:#eff4ff;color:#1e3a8a;}
                .fee-row{display:flex;gap:0.7rem;}
                .fee-row .auth-input-group{flex:1;}
                .fee-error{color:#dc2626;font-size:0.75rem;margin-top:3px;min-height:14px;}
                @keyframes feeSpin{to{transform:rotate(360deg);}}
                .fee-spinner{width:52px;height:52px;border:4px solid #dbeafe;border-top-color:#1e3a8a;border-radius:50%;animation:feeSpin 0.8s linear infinite;margin:1.5rem auto;}
                @keyframes feePop{0%{transform:scale(0.5);opacity:0;}70%{transform:scale(1.1);}100%{transform:scale(1);opacity:1;}}
                .fee-success-icon{width:70px;height:70px;border-radius:50%;background:#dcfce7;color:#16a34a;display:flex;align-items:center;justify-content:center;font-size:2.2rem;margin:0.5rem auto 1rem;animation:feePop 0.4s ease;}
                @keyframes feeDotPulse{0%,100%{opacity:0.3;transform:scale(0.8);}50%{opacity:1;transform:scale(1.2);}}
                .fee-qr-dot{width:9px;height:9px;border-radius:50%;background:#1e3a8a;display:inline-block;animation:feeDotPulse 1s ease-in-out infinite;}
                .fee-test-card-note{background:#eff6ff;border:1px dashed #93c5fd;border-radius:10px;padding:0.6rem 0.8rem;margin-top:0.3rem;margin-bottom:0.6rem;font-size:0.72rem;color:#1e3a8a;line-height:1.5;}
                .fee-test-card-note a{color:#1e3a8a;font-weight:600;text-decoration:underline;cursor:pointer;}
            </style>

            <div class="card" style="background:#f8fafc;border:1px solid #eaf0fa;padding:1rem 1.2rem;margin-bottom:1.2rem;display:flex;justify-content:space-between;align-items:center;">
                <div>
                    <div style="font-size:0.75rem;color:#64748b;">${opts.purpose}</div>
                    <div style="font-size:1.5rem;font-weight:700;color:#0f172a;" id="feePayAmountDisplay">${formatINR(amount)}</div>
                </div>
                <div style="text-align:right;font-size:0.75rem;color:#64748b;">
                    ${currentUser.name || 'Student'}<br>Roll: ${currentUser.rollNo || 'N/A'}
                </div>
            </div>

            ${opts.allowPartial ? `
            <div class="auth-input-group">
                <label>Amount to Pay (₹)</label>
                <input type="number" id="feePayAmount" class="input-slim" style="width:100%;" min="1" max="${cap}" step="1" value="${amount}">
                <div class="fee-error" id="feeAmountError"></div>
            </div>` : `
            <div class="auth-input-group">
                <label>Amount</label>
                <input type="text" class="input-slim" style="width:100%;background:#f1f5f9;color:#0f172a;font-weight:600;" value="${formatINR(amount)} (fixed one-time fee)" disabled>
            </div>`}

            <div class="fee-tabs">
                <div class="fee-tab active" data-method="card" onclick="selectFeeMethod('card')"><i class="fas fa-credit-card"></i>Card</div>
                <div class="fee-tab" data-method="upi" onclick="selectFeeMethod('upi')"><i class="fas fa-mobile-screen-button"></i>UPI</div>
                <div class="fee-tab" data-method="netbanking" onclick="selectFeeMethod('netbanking')"><i class="fas fa-building-columns"></i>Net Banking</div>
                <div class="fee-tab" data-method="qr" onclick="selectFeeMethod('qr')"><i class="fas fa-qrcode"></i>Scan QR</div>
            </div>

            <div id="feeMethodFields"></div>

            <button class="btn btn-primary" id="feePaySubmitBtn" style="width:100%;justify-content:center;margin-top:0.8rem;" onclick="submitFeePayment()">
                <i class="fas fa-lock"></i> Pay ${formatINR(amount)} Securely
            </button>
            <p style="text-align:center;font-size:0.7rem;color:#94a3b8;margin-top:0.8rem;">This is a simulated campus payment gateway for demo purposes.</p>
        `;

        modal.appendChild(closeBtn);
        modal.appendChild(title);
        modal.appendChild(subtitle);
        modal.appendChild(body);
        overlay.appendChild(modal);

        overlay.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        window.selectFeeMethod('card');

        if (opts.allowPartial) {
            const amtInput = document.getElementById('feePayAmount');
            amtInput.addEventListener('input', function() {
                const v = parseFloat(amtInput.value) || 0;
                const errEl = document.getElementById('feeAmountError');
                const submitBtn = document.getElementById('feePaySubmitBtn');
                if (v <= 0) { errEl.textContent = 'Enter an amount greater than ₹0.'; }
                else if (v > cap) { errEl.textContent = `Amount cannot exceed due amount of ${formatINR(cap)}.`; }
                else { errEl.textContent = ''; }
                const safe = v > 0 && v <= cap;
                submitBtn.innerHTML = `<i class="fas fa-lock"></i> Pay ${formatINR(safe ? v : amount)} Securely`;
            });
        }
    };

    window.openFeePaymentModal = function() {
        const due = getTuitionDue();
        window.openFeeGatewayModal({
            purpose: 'Tuition Fee',
            amount: due,
            allowPartial: true,
            maxAmount: due,
            onPaid: function(record) { reduceTuitionDue(record.amount); },
            extraSummaryRows: function() {
                return `<div class="progress-item"><span>Remaining Due</span><span>${formatINR(getTuitionDue())}</span></div>`;
            }
        });
    };

    window.selectFeeMethod = function(method) {
        if (feeQrTimer) { clearTimeout(feeQrTimer); feeQrTimer = null; }
        document.querySelectorAll('.fee-tab').forEach(t => t.classList.toggle('active', t.dataset.method === method));
        const container = document.getElementById('feeMethodFields');
        if (!container) return;

        if (method === 'card') {
            container.innerHTML = `
                <div class="auth-input-group">
                    <label>Card Number</label>
                    <input type="text" id="feeCardNumber" class="input-slim" style="width:100%;" placeholder="1234 5678 9012 3456" maxlength="19" inputmode="numeric">
                    <div class="fee-error" id="feeCardNumberError"></div>
                </div>
                <div class="auth-input-group">
                    <label>Name on Card</label>
                    <input type="text" id="feeCardName" class="input-slim" style="width:100%;" placeholder="As printed on card">
                    <div class="fee-error" id="feeCardNameError"></div>
                </div>
                <div class="fee-row">
                    <div class="auth-input-group">
                        <label>Expiry (MM/YY)</label>
                        <input type="text" id="feeCardExpiry" class="input-slim" style="width:100%;" placeholder="MM/YY" maxlength="5">
                        <div class="fee-error" id="feeCardExpiryError"></div>
                    </div>
                    <div class="auth-input-group">
                        <label>CVV</label>
                        <input type="password" id="feeCardCvv" class="input-slim" style="width:100%;" placeholder="•••" maxlength="4" inputmode="numeric">
                        <div class="fee-error" id="feeCardCvvError"></div>
                    </div>
                </div>
                <div class="fee-test-card-note">
                    <strong><i class="fas fa-flask"></i> Test Card (for checking payments):</strong><br>
                    Number: 4111 1111 1111 1111 &middot; Name: Test User<br>
                    Expiry: 12/30 &middot; CVV: 123
                    <br><a onclick="feeAutofillTestCard();return false;">⚡ Autofill test card</a>
                </div>
            `;
            const cardNumEl = document.getElementById('feeCardNumber');
            cardNumEl.addEventListener('input', function() {
                let digits = cardNumEl.value.replace(/\D/g, '').slice(0, 16);
                cardNumEl.value = digits.replace(/(.{4})/g, '$1 ').trim();
            });
            const expEl = document.getElementById('feeCardExpiry');
            expEl.addEventListener('input', function() {
                let digits = expEl.value.replace(/\D/g, '').slice(0, 4);
                if (digits.length >= 3) digits = digits.slice(0, 2) + '/' + digits.slice(2);
                expEl.value = digits;
            });
            const cvvEl = document.getElementById('feeCardCvv');
            cvvEl.addEventListener('input', function() { cvvEl.value = cvvEl.value.replace(/\D/g, '').slice(0, 4); });
        } else if (method === 'upi') {
            container.innerHTML = `
                <div class="auth-input-group">
                    <label>UPI ID</label>
                    <input type="text" id="feeUpiId" class="input-slim" style="width:100%;" placeholder="yourname@upi">
                    <div class="fee-error" id="feeUpiIdError"></div>
                </div>
                <p class="text-muted" style="font-size:0.75rem;margin-top:-0.3rem;margin-bottom:0.5rem;"><i class="fas fa-circle-info"></i> You'll get a payment request on your UPI app to approve. (Test ID: <strong>test@upi</strong>)</p>
            `;
        } else if (method === 'netbanking') {
            container.innerHTML = `
                <div class="auth-input-group">
                    <label>Select Bank</label>
                    <select id="feeBankSelect" class="input-slim" style="width:100%;">
                        <option value="">-- Select your bank --</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="AXIS">Axis Bank</option>
                        <option value="PNB">Punjab National Bank</option>
                        <option value="KOTAK">Kotak Mahindra Bank</option>
                    </select>
                    <div class="fee-error" id="feeBankSelectError"></div>
                </div>
            `;
        } else if (method === 'qr') {
            const ctx = feeGatewayCtx || {};
            const amtInput = document.getElementById('feePayAmount');
            const amount = ctx.allowPartial ? (parseFloat(amtInput && amtInput.value) || ctx.amount) : ctx.amount;
            const upiString = `upi://pay?pa=fees.krmu@okicici&pn=KR%20Mangalam%20University&am=${amount}&cu=INR&tn=${encodeURIComponent(ctx.purpose || 'Fee Payment')}`;
            const qrImgUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=' + encodeURIComponent(upiString);
            const fallbackSvg = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="190" height="190"><rect width="190" height="190" fill="#f1f5f9"/><text x="95" y="90" font-size="12" text-anchor="middle" fill="#64748b">QR unavailable</text><text x="95" y="108" font-size="12" text-anchor="middle" fill="#64748b">(no internet)</text></svg>');
            container.innerHTML = `
                <div style="text-align:center;padding:0.3rem 0 0.6rem;">
                    <img src="${qrImgUrl}" alt="Scan to Pay" width="190" height="190" style="border-radius:12px;border:1px solid #e2e8f0;padding:8px;background:#fff;" onerror="this.onerror=null;this.src='${fallbackSvg}';">
                    <p style="font-size:0.8rem;color:#334155;margin-top:0.7rem;font-weight:600;">Scan with any UPI app</p>
                    <p style="font-size:0.72rem;color:#64748b;">Google Pay &middot; PhonePe &middot; Paytm &middot; BHIM</p>
                    <div id="feeQrStatus" style="margin-top:0.8rem;display:flex;align-items:center;justify-content:center;gap:8px;font-size:0.8rem;color:#1e3a8a;">
                        <span class="fee-qr-dot"></span> Waiting for payment confirmation...
                    </div>
                    <button class="btn btn-outline mt-2" type="button" style="font-size:0.75rem;padding:0.4rem 1rem;" onclick="submitFeePayment()"><i class="fas fa-check"></i> I've Completed the Payment</button>
                </div>
            `;
        }
    };

    window.feeAutofillTestCard = function() {
        const numEl = document.getElementById('feeCardNumber');
        const nameEl = document.getElementById('feeCardName');
        const expEl = document.getElementById('feeCardExpiry');
        const cvvEl = document.getElementById('feeCardCvv');
        if (!numEl) return;
        numEl.value = '4111 1111 1111 1111';
        nameEl.value = 'Test User';
        expEl.value = '12/30';
        cvvEl.value = '123';
        [numEl, nameEl, expEl, cvvEl].forEach(el => el.dispatchEvent(new Event('input', { bubbles: true })));
        showToast('⚡ Test card details filled in.', 'info');
    };

    function validateFeePaymentForm(method) {
        let valid = true;
        const ctx = feeGatewayCtx || {};
        let amount = ctx.amount;

        if (ctx.allowPartial) {
            const amtInput = document.getElementById('feePayAmount');
            const amtErr = document.getElementById('feeAmountError');
            amount = parseFloat(amtInput.value) || 0;
            const cap = ctx.maxAmount || ctx.amount;
            amtErr.textContent = '';
            if (amount <= 0) { amtErr.textContent = 'Enter an amount greater than ₹0.'; valid = false; }
            else if (amount > cap) { amtErr.textContent = `Amount cannot exceed due amount of ${formatINR(cap)}.`; valid = false; }
        }

        if (method === 'card') {
            const num = document.getElementById('feeCardNumber').value.replace(/\s/g, '');
            const numErr = document.getElementById('feeCardNumberError');
            numErr.textContent = '';
            if (!/^\d{13,16}$/.test(num)) { numErr.textContent = 'Enter a valid 13-16 digit card number.'; valid = false; }
            else if (!feeLuhnValid(num)) { numErr.textContent = 'Card number appears to be invalid.'; valid = false; }

            const name = document.getElementById('feeCardName').value.trim();
            const nameErr = document.getElementById('feeCardNameError');
            nameErr.textContent = '';
            if (name.length < 2) { nameErr.textContent = 'Enter the name printed on the card.'; valid = false; }

            const expiry = document.getElementById('feeCardExpiry').value.trim();
            const expErr = document.getElementById('feeCardExpiryError');
            expErr.textContent = '';
            const m = expiry.match(/^(\d{2})\/(\d{2})$/);
            if (!m) { expErr.textContent = 'Use MM/YY format.'; valid = false; }
            else {
                const mm = parseInt(m[1], 10), yy = parseInt(m[2], 10);
                const now = new Date();
                const curYY = now.getFullYear() % 100, curMM = now.getMonth() + 1;
                if (mm < 1 || mm > 12) { expErr.textContent = 'Invalid month.'; valid = false; }
                else if (yy < curYY || (yy === curYY && mm < curMM)) { expErr.textContent = 'Card has expired.'; valid = false; }
            }

            const cvv = document.getElementById('feeCardCvv').value.trim();
            const cvvErr = document.getElementById('feeCardCvvError');
            cvvErr.textContent = '';
            if (!/^\d{3,4}$/.test(cvv)) { cvvErr.textContent = 'Enter a valid CVV.'; valid = false; }
        } else if (method === 'upi') {
            const upi = document.getElementById('feeUpiId').value.trim();
            const upiErr = document.getElementById('feeUpiIdError');
            upiErr.textContent = '';
            if (!/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z][a-zA-Z0-9]{1,}$/.test(upi)) { upiErr.textContent = 'Enter a valid UPI ID, e.g. name@bank.'; valid = false; }
        } else if (method === 'netbanking') {
            const bank = document.getElementById('feeBankSelect').value;
            const bankErr = document.getElementById('feeBankSelectError');
            bankErr.textContent = '';
            if (!bank) { bankErr.textContent = 'Please select your bank.'; valid = false; }
        } else if (method === 'qr') {
            // QR method is considered pre-approved once the user confirms the scan
        }

        return { valid, amount };
    }

    window.submitFeePayment = function() {
        const ctx = feeGatewayCtx;
        if (!ctx) return;
        if (feeQrTimer) { clearTimeout(feeQrTimer); feeQrTimer = null; }

        const activeTab = document.querySelector('.fee-tab.active');
        const method = activeTab ? activeTab.dataset.method : 'card';
        const { valid, amount } = validateFeePaymentForm(method);
        if (!valid) {
            showToast('⚠️ Please fix the highlighted fields.', 'error');
            return;
        }

        let methodLabel = 'Card', methodDetail = '';
        if (method === 'card') {
            const num = document.getElementById('feeCardNumber').value.replace(/\s/g, '');
            const brand = feeDetectCardBrand(num);
            methodLabel = (brand.name || 'Card');
            methodDetail = '•••• ' + num.slice(-4);
        } else if (method === 'upi') {
            methodLabel = 'UPI';
            methodDetail = document.getElementById('feeUpiId').value.trim();
        } else if (method === 'netbanking') {
            methodLabel = 'Net Banking';
            methodDetail = document.getElementById('feeBankSelect').selectedOptions[0].text;
        } else if (method === 'qr') {
            methodLabel = 'UPI (QR Scan)';
            methodDetail = 'Scanned via UPI app';
        }

        const body = document.getElementById('feePayBody');
        body.innerHTML = `
            <div style="text-align:center;padding:1.5rem 0;">
                <div class="fee-spinner"></div>
                <h3 style="color:#0f172a;font-size:1.05rem;">Processing your payment...</h3>
                <p class="text-muted" style="font-size:0.85rem;margin-top:0.3rem;">Please do not close or refresh this window.</p>
                <p class="text-muted" style="font-size:0.78rem;margin-top:0.6rem;"><i class="fas fa-shield-halved" style="color:#16a34a;"></i> Connecting to bank server securely...</p>
            </div>
        `;

        setTimeout(function() {
            const txnId = generateTxnId();
            const paidAt = Date.now();

            const record = {
                txnId,
                studentEmail: feeStudentKey(),
                studentName: currentUser.name || 'Student',
                rollNo: currentUser.rollNo || 'N/A',
                amount,
                method: methodLabel,
                methodDetail,
                purpose: ctx.purpose,
                status: 'Success',
                paidAt
            };
            feePayments.push(record);
            saveFeePayments();

            if (typeof ctx.onPaid === 'function') ctx.onPaid(record);

            const extraRows = (typeof ctx.extraSummaryRows === 'function') ? ctx.extraSummaryRows() : '';
            body.innerHTML = `
                <div style="text-align:center;padding:0.5rem 0 1rem;">
                    <div class="fee-success-icon"><i class="fas fa-check"></i></div>
                    <h3 style="color:#16a34a;font-size:1.2rem;">Payment Successful!</h3>
                    <p class="text-muted" style="font-size:0.85rem;margin-top:0.3rem;">${formatINR(amount)} paid via ${methodLabel}${methodDetail ? ' (' + methodDetail + ')' : ''}</p>
                </div>
                <div class="card" style="background:#f8fafc;border:1px solid #eaf0fa;font-size:0.85rem;">
                    <div class="progress-item"><span>Transaction ID</span><strong>${txnId}</strong></div>
                    <div class="progress-item"><span>Date &amp; Time</span><span>${new Date(paidAt).toLocaleString('en-IN')}</span></div>
                    <div class="progress-item"><span>Amount Paid</span><strong style="color:#16a34a;">${formatINR(amount)}</strong></div>
                    ${extraRows}
                </div>
                <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:1rem;" onclick="downloadFeeReceipt('${txnId}')"><i class="fas fa-file-arrow-down"></i> Download Receipt</button>
                <button class="btn btn-outline" style="width:100%;justify-content:center;margin-top:0.6rem;" onclick="document.body.removeChild(document.getElementById('feePayOverlay'));document.body.style.overflow='';"><i class="fas fa-check"></i> Done</button>
            `;

            if (typeof renderFeeOverview === 'function') renderFeeOverview();
            showToast(`✅ Payment of ${formatINR(amount)} successful!`, 'success');
        }, 1800);
    };

    window.downloadFeeReceipt = function(txnId) {
        const p = feePayments.find(x => x.txnId === txnId);
        if (!p) { showToast('⚠️ Receipt not found.', 'error'); return; }

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
            doc.text('SOET Portal · Fee Payment Receipt', 14, 20);

            doc.setTextColor(15, 23, 42);
            doc.setFontSize(13);
            doc.setFont(undefined, 'bold');
            doc.text('Payment Receipt', 14, 40);

            doc.setFontSize(11);
            doc.setFont(undefined, 'normal');
            doc.text(`Student Name: ${p.studentName}`, 14, 50);
            doc.text(`Roll No: ${p.rollNo}`, 14, 57);
            doc.text(`Transaction ID: ${p.txnId}`, 14, 64);
            doc.text(`Date & Time: ${new Date(p.paidAt).toLocaleString('en-IN')}`, 14, 71);

            let y = 84;
            doc.setFont(undefined, 'bold');
            doc.setFillColor(219, 234, 254);
            doc.rect(14, y - 6, 182, 8, 'F');
            doc.text('Description', 18, y);
            doc.text('Method', 110, y);
            doc.text('Amount', 160, y);
            doc.setFont(undefined, 'normal');
            y += 10;
            doc.text(p.purpose, 18, y);
            doc.text(p.method + (p.methodDetail ? ' (' + p.methodDetail + ')' : ''), 110, y);
            doc.text(formatINR(p.amount), 160, y);

            y += 16;
            doc.setFont(undefined, 'bold');
            doc.setTextColor(22, 163, 74);
            doc.text(`Status: ${p.status}`, 14, y);
            doc.setTextColor(15, 23, 42);
            y += 8;
            doc.text(`Total Paid: ${formatINR(p.amount)}`, 14, y);

            y += 14;
            doc.setFont(undefined, 'normal');
            doc.setFontSize(9);
            doc.setTextColor(100, 116, 139);
            doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 14, y);
            doc.text('This is a system-generated receipt from the SOET Student Portal.', 14, y + 6);

            doc.save(`Fee_Receipt_${p.txnId}.pdf`);
            showToast('📄 Receipt downloaded successfully!', 'success');
        } catch (err) {
            let content = `K.R. MANGALAM UNIVERSITY - SOET PORTAL\nFEE PAYMENT RECEIPT\n\n`;
            content += `Student Name: ${p.studentName}\nRoll No: ${p.rollNo}\nTransaction ID: ${p.txnId}\nDate: ${new Date(p.paidAt).toLocaleString('en-IN')}\n\n`;
            content += `Description: ${p.purpose}\nMethod: ${p.method}${p.methodDetail ? ' (' + p.methodDetail + ')' : ''}\nAmount Paid: ${formatINR(p.amount)}\nStatus: ${p.status}\n`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Fee_Receipt_${p.txnId}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('📄 Receipt downloaded (text format)', 'success');
        }
    };

    // ================= SEMESTER PERFORMANCE DATA =================
    const semData = {
        1: { sgpa: 8.2, deptRank: 4, uniRank: 52, credits: 22, subjects: [
            { name: 'Engineering Mathematics I', grade: 'A', score: 86, color: '#2563eb' },
            { name: 'Programming in C', grade: 'A+', score: 92, color: '#16a34a' },
            { name: 'Engineering Physics', grade: 'A', score: 84, color: '#ea580c' },
            { name: 'Basic Electrical Engg.', grade: 'B+', score: 78, color: '#7c3aed' },
            { name: 'Communication Skills', grade: 'A', score: 88, color: '#0891b2' }
        ]},
        2: { sgpa: 8.4, deptRank: 3, uniRank: 45, credits: 23, subjects: [
            { name: 'Engineering Mathematics II', grade: 'A', score: 85, color: '#2563eb' },
            { name: 'Data Structures', grade: 'A+', score: 93, color: '#16a34a' },
            { name: 'Digital Logic Design', grade: 'A', score: 87, color: '#ea580c' },
            { name: 'OOP with Java', grade: 'A', score: 89, color: '#7c3aed' },
            { name: 'Environmental Science', grade: 'A', score: 90, color: '#0891b2' }
        ]},
        3: { sgpa: 8.5, deptRank: 2, uniRank: 30, credits: 24, subjects: [
            { name: 'Discrete Mathematics', grade: 'A', score: 87, color: '#2563eb' },
            { name: 'Database Management', grade: 'A+', score: 94, color: '#16a34a' },
            { name: 'Theory of Computation', grade: 'A', score: 85, color: '#ea580c' },
            { name: 'Operating Systems', grade: 'A', score: 88, color: '#7c3aed' },
            { name: 'Probability & Statistics', grade: 'A', score: 86, color: '#0891b2' }
        ]},
        4: { sgpa: 8.6, deptRank: 2, uniRank: 27, credits: 24, subjects: [
            { name: 'Introduction to ML', grade: 'A+', score: 95, color: '#2563eb' },
            { name: 'Computer Networks', grade: 'A', score: 88, color: '#16a34a' },
            { name: 'Design & Analysis of Algo', grade: 'A', score: 86, color: '#ea580c' },
            { name: 'Python for Data Science', grade: 'A+', score: 93, color: '#7c3aed' },
            { name: 'Software Engineering', grade: 'A', score: 84, color: '#0891b2' }
        ]},
        5: { sgpa: 8.9, deptRank: 1, uniRank: 12, credits: 23, subjects: [
            { name: 'Deep Learning', grade: 'A+', score: 95, color: '#2563eb' },
            { name: 'Natural Language Processing', grade: 'A+', score: 92, color: '#16a34a' },
            { name: 'Computer Vision', grade: 'A+', score: 94, color: '#ea580c' },
            { name: 'Big Data Analytics', grade: 'A', score: 89, color: '#7c3aed' },
            { name: 'AI Ethics & Governance', grade: 'A', score: 90, color: '#0891b2' }
        ]},
        6: { sgpa: 6.8, deptRank: 9, uniRank: 86, credits: 22, subjects: [
            { name: 'Machine Learning', grade: 'A+', score: 94, color: '#2563eb' },
            { name: 'Deep Learning Lab', grade: 'A', score: 90, color: '#7c3aed' },
            { name: 'Data Structures & Algo', grade: 'A+', score: 96, color: '#16a34a' },
            { name: 'Theory of Computation', grade: 'F', score: 32, color: '#dc2626', failed: true },
            { name: 'Computer Networks', grade: 'A', score: 88, color: '#0891b2' },
            { name: 'AI Ethics & Governance', grade: 'A', score: 92, color: '#be185d' }
        ]}
    };

    function renderSemPanel(sem) {
        const d = semData[sem];
        const panel = document.getElementById('sem-detail-panel');
        if (!panel || !d) return;

        const failedSubjects = d.subjects.filter(s => s.failed);

        const bars = d.subjects.map((s, i) => {
            const h = Math.round(s.score * 1.5);
            const failTag = s.failed ? `<span style="background:#dc2626;color:white;font-size:0.6rem;font-weight:700;padding:1px 6px;border-radius:40px;margin-bottom:2px;">FAIL</span>` : '';
            return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;min-width:0;">
                ${failTag}
                <span style="font-size:0.72rem;font-weight:700;color:${s.color};">${s.score}%</span>
                <div style="width:60%;max-width:34px;height:${h}px;background:linear-gradient(180deg, ${s.color}, ${s.color}cc);border-radius:6px 6px 0 0;${s.failed ? 'border:2px dashed #dc2626;' : ''}"></div>
            </div>`;
        }).join('');

        const labels = d.subjects.map(s =>
            `<div style="flex:1;min-width:0;text-align:center;font-size:0.66rem;color:${s.failed ? '#dc2626' : '#64748b'};font-weight:${s.failed ? '700' : '600'};padding:0 2px;line-height:1.2;">${s.name}</div>`
        ).join('');

        const rows = d.subjects.map(s => `
            <div style="display:flex;align-items:center;justify-content:space-between;background:${s.failed ? '#fef2f2' : '#f8fafc'};border-radius:12px;padding:0.7rem 1rem;border:1px solid ${s.failed ? '#fecaca' : '#eef2f7'};">
                <div style="display:flex;align-items:center;gap:0.7rem;">
                    <span style="width:8px;height:8px;border-radius:50%;background:${s.color};display:inline-block;flex-shrink:0;"></span>
                    <span style="font-size:0.82rem;color:#334155;font-weight:500;">${s.name}</span>
                    ${s.failed ? `<span style="background:#dc2626;color:white;font-size:0.65rem;font-weight:700;padding:0.15rem 0.6rem;border-radius:40px;display:flex;align-items:center;gap:4px;"><i class="fas fa-circle-exclamation"></i> FAILED</span>` : ''}
                </div>
                <div style="display:flex;align-items:center;gap:0.7rem;">
                    <span style="font-size:0.85rem;font-weight:700;color:${s.color};">${s.score}%</span>
                    <span style="background:${s.color}1a;color:${s.color};font-size:0.7rem;font-weight:700;padding:0.15rem 0.6rem;border-radius:40px;min-width:34px;text-align:center;">${s.grade}</span>
                </div>
            </div>`).join('');

        const romans = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI'};

        const raAlert = failedSubjects.length ? `
            <div style="background:linear-gradient(135deg,#fef2f2,#fee2e2);border:1px solid #fecaca;border-radius:18px;padding:1.2rem 1.4rem;margin-bottom:1.5rem;display:flex;align-items:flex-start;gap:1rem;">
                <div style="width:40px;height:40px;background:#dc2626;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-triangle-exclamation" style="color:white;"></i></div>
                <div style="flex:1;">
                    <div style="font-weight:700;color:#991b1b;font-size:0.92rem;margin-bottom:3px;">Re-Examination (REE) Required — Semester ${romans[sem]}</div>
                    <div style="font-size:0.82rem;color:#7f1d1d;margin-bottom:0.8rem;">
                        You did not clear ${failedSubjects.map(s=>`<strong>${s.name}</strong>`).join(', ')}. Pay the REE exam fee to receive your exam date.
                    </div>
                    <button class="btn btn-primary" style="background:#dc2626;border:none;" onclick="navigateTo('fees'); showToast('➡️ Pay your REE fee below to unlock your exam date','info')"><i class="fas fa-credit-card"></i> Go to Fees &amp; Pay REE</button>
                </div>
            </div>` : '';

        const debarAttAvg = (typeof getAttendanceAvg === 'function') ? getAttendanceAvg(sem) : 100;
        const isSemDebarred = debarAttAvg < 75 && !(typeof debarPaid !== 'undefined' && debarPaid);
        const debarAlert = isSemDebarred ? `
            <div style="background:linear-gradient(135deg,#fff7ed,#ffedd5);border:1px solid #fed7aa;border-radius:18px;padding:1.2rem 1.4rem;margin-bottom:1.5rem;display:flex;align-items:flex-start;gap:1rem;">
                <div style="width:40px;height:40px;background:#ea580c;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-user-slash" style="color:white;"></i></div>
                <div style="flex:1;">
                    <div style="font-weight:700;color:#9a3412;font-size:0.92rem;margin-bottom:3px;">Debarred from Exams — Semester ${romans[sem]} (Attendance ${debarAttAvg}%)</div>
                    <div style="font-size:0.82rem;color:#7c2d12;margin-bottom:0.8rem;">
                        Your attendance is below the required 75%. You are debarred from sitting in exams for this semester until the debarment fee is cleared.
                    </div>
                    <button class="btn btn-primary" style="background:#ea580c;border:none;" onclick="navigateTo('fees'); showToast('➡️ Pay your Debarred fee below to become exam-eligible','info')"><i class="fas fa-credit-card"></i> Go to Fees &amp; Pay ₹500</button>
                </div>
            </div>` : '';

        panel.innerHTML = `
            ${debarAlert}
            ${raAlert}
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:0.9rem;margin-bottom:1.5rem;">
                <div style="background:white;border-radius:18px;padding:1rem 1.2rem;border:1px solid #eaf0fa;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                    <div style="font-size:0.68rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">SGPA</div>
                    <div style="font-size:1.5rem;font-weight:800;color:#1e3a8a;">${d.sgpa}</div>
                </div>
                <div style="background:white;border-radius:18px;padding:1rem 1.2rem;border:1px solid #eaf0fa;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                    <div style="font-size:0.68rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Dept. Rank</div>
                    <div style="font-size:1.5rem;font-weight:800;color:#0f172a;">${d.deptRank}</div>
                </div>
                <div style="background:white;border-radius:18px;padding:1rem 1.2rem;border:1px solid #eaf0fa;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                    <div style="font-size:0.68rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">University Rank</div>
                    <div style="font-size:1.5rem;font-weight:800;color:#0f172a;">${d.uniRank}</div>
                </div>
                <div style="background:white;border-radius:18px;padding:1rem 1.2rem;border:1px solid #eaf0fa;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                    <div style="font-size:0.68rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Credits</div>
                    <div style="font-size:1.5rem;font-weight:800;color:#0f172a;">${d.credits}</div>
                </div>
            </div>

            <div style="background:white;border-radius:22px;padding:1.4rem;border:1px solid #eaf0fa;box-shadow:0 2px 8px rgba(0,0,0,0.03);margin-bottom:1.5rem;">
                <div style="font-weight:700;font-size:0.95rem;color:#0f172a;margin-bottom:0.2rem;">Subject-wise Performance — Semester ${romans[sem]}</div>
                <div style="font-size:0.75rem;color:#94a3b8;margin-bottom:1.3rem;">Final scores across all subjects this semester</div>
                <div style="display:flex;align-items:flex-end;gap:4px;height:160px;border-bottom:1px solid #f1f5f9;padding-bottom:2px;">
                    ${bars}
                </div>
                <div style="display:flex;gap:4px;margin-top:0.6rem;">
                    ${labels}
                </div>
            </div>

            <div style="font-size:0.72rem;font-weight:700;letter-spacing:1px;color:#94a3b8;text-transform:uppercase;margin-bottom:0.8rem;">Subject-wise Result Sheet</div>
            <div style="display:flex;flex-direction:column;gap:0.6rem;">
                ${rows}
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
        const panel = document.getElementById('sem-detail-panel');
        if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // ================= GENERATE QR =================
    window.generateQR = function() {
        showToast('📱 QR Session Generated!', 'success');
        const status = document.querySelector('#qrCard .badge-success');
        if (status) {
            status.textContent = '● active';
        }
    };

    // ================= ADMIN CONTROLS =================
    addAdminBtn.addEventListener('click', function() {
        const email = newAdminInput.value.trim();
        if (!email || !email.includes('@')) {
            showToast('⚠️ Enter a valid email.', 'error');
            return;
        }
        if (admins.includes(email)) {
            showToast('⚠️ Admin already exists.', 'error');
            return;
        }
        admins.push(email);
        saveAdmins();
        renderAdmins();
        newAdminInput.value = '';
        showToast(`✅ Added ${email}`, 'success');
    });

    resetAdminBtn.addEventListener('click', function() {
        admins = ['admin@soet.edu', 'hoda@soet.edu', 'dean@soet.edu'];
        saveAdmins();
        renderAdmins();
        showToast('🔄 Admin list reset', 'info');
    });

    newAdminInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addAdminBtn.click();
    });

    // ================= EVENTS SYSTEM =================
    let events = JSON.parse(localStorage.getItem('soet_events')) || [
        { id: 1, title: 'Hackathon 2026', type: 'Hackathon', date: '2026-11-10', time: '09:00', venue: 'Main Auditorium', capacity: 200, description: 'Annual hackathon with prizes worth ₹50,000. Register now!', createdBy: 'admin@soet.edu', createdAt: Date.now(), registrations: [] },
        { id: 2, title: 'Guest Lecture: Dr. S. N. Gupta', type: 'Guest Lecture', date: '2026-11-15', time: '14:00', venue: 'LT-1', capacity: 150, description: 'Lecture on "AI in 2026" by Dr. S. N. Gupta, IIT Delhi.', createdBy: 'admin@soet.edu', createdAt: Date.now(), registrations: [] },
        { id: 3, title: 'Annual Sports Meet 2026', type: 'Sports Meet', date: '2026-11-20', time: '08:00', venue: 'Sports Complex', capacity: 500, description: 'Annual sports festival with multiple events. Register your team!', createdBy: 'admin@soet.edu', createdAt: Date.now(), registrations: [] }
    ];
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
            grid.innerHTML = `<div class="card text-center" style="grid-column:1/-1;"><p class="text-muted">No events available yet.</p></div>`;
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
    adminPanel.style.display = 'none';

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
        if (document.getElementById('sem-detail-panel')) renderSemPanel(1);
    });

    // Also run if DOM is already loaded
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
        if (document.getElementById('sem-detail-panel')) renderSemPanel(1);
    }

    console.log('✅ K.R. Mangalam University Portal ready!');
    console.log('Demo accounts:');
    console.log('  Student: student@soet.edu / password123');
    console.log('  Faculty: faculty@soet.edu / password123');
    console.log('  Admin: admin@soet.edu / password123');
})();
// ================= STRIPE CONFIGURATION =================
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Trhrvr24vwb86NeRbQtaAZp5huIAjasV4gHjIIwPYHCO2zq19oEfqRXCilQmzEzgry7iIjhPCtd1OV6dc0zff0YKj0oQaUJBsD9';

// ================= DATA STORE =================
let stripe = null;
let paymentHistory = JSON.parse(localStorage.getItem('soet_payment_history')) || [];
let users = JSON.parse(localStorage.getItem('soet_users')) || [
    { name: 'Student User', email: 'student@soet.edu', password: 'password123', role: 'student', rollNo: '2024CSE001' },
    { name: 'Faculty User', email: 'faculty@soet.edu', password: 'password123', role: 'faculty', rollNo: '' },
    { name: 'Admin User', email: 'admin@soet.edu', password: 'password123', role: 'admin', rollNo: '' }
];
let admins = JSON.parse(localStorage.getItem('soet_admins')) || ['admin@soet.edu', 'hoda@soet.edu', 'dean@soet.edu'];
let applications = JSON.parse(localStorage.getItem('soet_applications')) || [];
let currentUser = null;
let isSignup = false;

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

// ================= DOM REFS =================
const toast = document.getElementById('toast');
const authOverlay = document.getElementById('authOverlay');
const authForm = document.getElementById('authForm');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authRole = document.getElementById('authRole');
const authName = document.getElementById('authName');
const authRoll = document.getElementById('authRoll');
const authNameGroup = document.getElementById('authNameGroup');
const authRollGroup = document.getElementById('authRollGroup');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authSubText = document.getElementById('authSubText');
const authError = document.getElementById('authError');
const switchLink = document.getElementById('switchToSignup');
const authSwitchText = document.getElementById('authSwitchText');

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
const applyError = document.getElementById('applyError');
const applySuccess = document.getElementById('applySuccess');
const applySubmitBtn = document.getElementById('applySubmitBtn');

const publicWebsite = document.getElementById('publicWebsite');
const dashboard = document.getElementById('dashboard');
const dashUserName = document.getElementById('dashUserName');
const dashRoleTag = document.getElementById('dashRoleTag');
const greeting = document.getElementById('greeting');
const subGreeting = document.getElementById('subGreeting');
const logoutBtn = document.getElementById('logoutBtn');
const adminPanel = document.getElementById('adminPanel');
const adminListContainer = document.getElementById('adminListContainer');
const addAdminBtn = document.getElementById('addAdminBtn');
const resetAdminBtn = document.getElementById('resetAdminBtn');
const newAdminInput = document.getElementById('newAdminInput');

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

// ================= APPLICATION FUNCTIONS =================
window.updateCourses = function() {
    const type = applyCourseType.value;
    applyCourse.innerHTML = '<option value="">Select a course</option>';
    if (type && courses[type]) {
        courses[type].forEach(course => {
            const option = document.createElement('option');
            option.value = course;
            option.textContent = course;
            applyCourse.appendChild(option);
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
        applySubmitBtn.disabled = false;
        closeApply();
        showToast('✅ Application submitted successfully! We\'ll contact you soon.', 'success');
    }, 2500);
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

switchLink.addEventListener('click', function(e) {
    e.preventDefault();
    isSignup = !isSignup;
    if (isSignup) {
        this.textContent = 'Sign in';
        authSwitchText.textContent = "Already have an account?";
        authSubmitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Sign Up';
        authNameGroup.style.display = 'block';
        authRollGroup.style.display = 'block';
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

    document.querySelectorAll('.student-only').forEach(el => {
        el.style.display = isStudent ? 'flex' : 'none';
    });
    document.querySelectorAll('.faculty-only').forEach(el => {
        el.style.display = (isFaculty || isAdmin) ? 'flex' : 'none';
    });
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = isAdmin ? 'block' : 'none';
    });

    document.getElementById('criticalAlertsCard').style.display = (isFaculty || isAdmin) ? 'block' : 'none';
    document.getElementById('qrCard').style.display = (isFaculty || isAdmin) ? 'block' : 'none';

    if (isStudent) {
        greeting.innerHTML = '👋 Welcome back, ' + (user.name || 'Student');
        subGreeting.innerHTML = 'You\'ve completed 72% of your weekly targets. Mid-sems in 14 days.';
    } else if (isFaculty) {
        greeting.innerHTML = '👋 Welcome back, Professor';
        subGreeting.innerHTML = 'You have 3 classes scheduled for today.';
    } else if (isAdmin) {
        greeting.innerHTML = '👋 Admin Dashboard';
        subGreeting.innerHTML = 'Full control over the system.';
        renderAdmins();
    }

    localStorage.setItem('soet_current_user', JSON.stringify({ email: user.email, password: user.password }));
    window.updateChatbotUser && window.updateChatbotUser(user);
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

// ================= PAGE NAVIGATION =================
window.navigateTo = function(page) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');
    document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.taskbar-btn[data-page="${page}"]`);
    if (btn) btn.classList.add('active');
    const welcome = document.querySelector('.welcome-block');
    if (welcome) welcome.style.display = (page === 'dashboard') ? 'block' : 'none';
    
    if (page === 'profile') renderProfilePage();
    if (page === 'my-attendance') renderMyAttendance();
    if (page === 'attendance') { renderFacAttendanceStats(); renderFacStudentChips(); }
    if (page === 'marks-entry') renderMarksEntries();
    if (page === 'fees') { renderReeFeeSection(); renderDebarFeeSection(); }
    if (page === 'performance' && typeof renderStudentMarksUpdates === 'function') renderStudentMarksUpdates();
};

document.querySelectorAll('.taskbar-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        navigateTo(this.dataset.page);
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
    if (attSemData[6]) {
        const subj = attSemData[6].subjects.find(s => s.subject === 'Distributed Systems');
        if (subj && total > 0) {
            const dayPresent = (present / total) >= 0.5 ? 1 : 0;
            subj.total += 1;
            subj.present += dayPresent;
            subj.pct = Math.round((subj.present / subj.total) * 100);
            persistAttSemData();
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
    renderFacAttendanceStats();
}

// ================= NOTIFICATIONS =================
let notifications = JSON.parse(localStorage.getItem('soet_notifications')) || [
    { id: 1, icon: 'fa-bullhorn', title: 'Mid Semester Exams start from 10 September', time: '2 hours ago', read: false },
    { id: 2, icon: 'fa-code', title: 'Hackathon 2026 registrations are open', time: '5 hours ago', read: false },
    { id: 3, icon: 'fa-credit-card', title: 'Fee payment reminder: ₹45,000 due Nov 15', time: '1 day ago', read: false },
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

// ===== Daily Present/Absent Calendar =====
const attMonthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const attSemBase = { 1: { m: 7, y: 2025, w: 5 }, 2: { m: 1, y: 2026, w: 0 }, 3: { m: 7, y: 2024, w: 2 }, 4: { m: 1, y: 2025, w: 4 }, 5: { m: 7, y: 2025, w: 1 }, 6: { m: 6, y: 2026, w: 6 } };
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

// ================= FACULTY ATTENDANCE STATS =================
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

// ================= MARKS ENTRY (FACULTY) =================
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
        meTableBody.innerHTML = '<tr><td colspan="6" class="text-muted">No entries yet. Add marks using the form.</td></tr>';
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
        renderStudentMarksUpdates();
        meStudentName.value = '';
        meRollNo.value = '';
        meMarks.value = '';
        showToast(`✅ Marks added for ${student} (${rollNo})`, 'success');
    });
}
renderMarksEntries();

// ================= OTHER FUNCTIONS =================
window.viewAllStudents = function() { showToast('👨‍🎓 Showing all 12 students', 'info'); };
window.generateQR = function() { showToast('📱 QR Session Generated!', 'success'); };

// ================= CHATBOT FUNCTIONS =================
window.sendChat = function() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    const container = document.getElementById('chatContainer');
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg user';
    userDiv.textContent = msg;
    container.appendChild(userDiv);
    input.value = '';
    setTimeout(() => {
        const aiDiv = document.createElement('div');
        aiDiv.className = 'chat-msg ai';
        aiDiv.innerHTML = '<i class="fas fa-robot"></i> That\'s a great question! Let me help you with that.';
        container.appendChild(aiDiv);
        container.scrollTop = container.scrollHeight;
    }, 1000);
    container.scrollTop = container.scrollHeight;
};

document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendChat();
});

// ================= PUBLIC COURSES MODAL =================
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

// ================= REE FEE LOGIC =================
let reePaid = false;
const reeExamDate = { day: 22, label: '22 Aug \'26', month: 'August 2026' };

function renderReeFeeSection() {
    const el = document.getElementById('ree-fee-section');
    if (!el) return;
    const failedSubjects = (semData[6] && semData[6].subjects.filter(s => s.failed)) || [];
    if (!failedSubjects.length) { el.innerHTML = ''; return; }

    if (!reePaid) {
        el.innerHTML = `
            <div class="card" style="border:1px solid #fecaca;background:linear-gradient(135deg,#fef2f2,#fff5f5);">
                <h3 style="color:#991b1b;display:flex;align-items:center;gap:8px;"><i class="fas fa-triangle-exclamation"></i> Re-Examination (REE) Fee Due</h3>
                <p class="text-muted" style="margin-top:4px;">For: ${failedSubjects.map(s=>s.name).join(', ')} (Semester VI)</p>
                <h2 style="color:#dc2626;font-size:1.8rem;margin-top:0.6rem;">₹3,500</h2>
                <p class="text-muted">Pay this fee to get your Re-Examination exam date scheduled.</p>
                <button class="btn btn-primary mt-2" style="background:#dc2626;border:none;" onclick="handlePayment(3500, 'REE Fee - Re-Examination', 'ree')"><i class="fas fa-credit-card"></i> Pay REE Fee</button>
            </div>`;
    } else {
        el.innerHTML = `
            <div class="card" style="border:1px solid #bbf7d0;background:linear-gradient(135deg,#f0fdf4,#f7fefb);">
                <h3 style="color:#15803d;display:flex;align-items:center;gap:8px;"><i class="fas fa-circle-check"></i> REE Fee Paid</h3>
                <p class="text-muted" style="margin-top:4px;">For: ${failedSubjects.map(s=>s.name).join(', ')} (Semester VI)</p>
                <span class="badge-success" style="margin-top:0.6rem;display:inline-block;">✅ ₹3,500 Paid</span>
                <p style="margin-top:0.8rem;font-size:0.9rem;color:#166534;"><i class="fas fa-calendar-check"></i> Your REE exam is scheduled for <strong>${reeExamDate.label}</strong>. Check the Calendar for details.</p>
                <button class="btn btn-outline mt-2" onclick="navigateTo('calendar')"><i class="fas fa-calendar-alt"></i> View on Calendar</button>
            </div>`;
    }
}

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

// ================= DEBARRED FEE LOGIC =================
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
    const sem = currentAttSem || 6;
    if (!isDebarred(sem)) { el.innerHTML = ''; return; }
    const avg = getAttendanceAvg(sem);
    const romans = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI'};

    if (!debarPaid) {
        el.innerHTML = `
            <div class="card" style="border:1px solid #fecaca;background:linear-gradient(135deg,#fef2f2,#fff5f5);">
                <h3 style="color:#991b1b;display:flex;align-items:center;gap:8px;"><i class="fas fa-user-slash"></i> Debarred Fee — Attendance Shortage</h3>
                <p class="text-muted" style="margin-top:4px;">Semester ${romans[sem]} attendance is ${avg}% (below required ${DEBAR_MIN_ATTENDANCE}%). Pay the debarment clearance fee to become exam-eligible.</p>
                <h2 style="color:#dc2626;font-size:1.8rem;margin-top:0.6rem;">₹${DEBAR_FEE_AMOUNT}</h2>
                <button class="btn btn-primary mt-2" style="background:#dc2626;border:none;" onclick="handlePayment(${DEBAR_FEE_AMOUNT}, 'Debarred Fee - Attendance Clearance', 'debar')"><i class="fas fa-credit-card"></i> Pay Debarred Fee</button>
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

// ================= SEMESTER-WISE PERFORMANCE DATA =================
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
    const romans = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI'};

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

    const debarAttAvg = getAttendanceAvg(sem);
    const isSemDebarred = debarAttAvg < 75 && !debarPaid;
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

// ================= ADMIN CRUD =================
function renderAdmins() {
    adminListContainer.innerHTML = '';
    admins.forEach(email => {
        const span = document.createElement('span');
        span.className = 'admin-tag';
        span.innerHTML = `<i class="fas fa-user-shield"></i> ${email} <i class="fas fa-times" data-email="${email}"></i>`;
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

if (addAdminBtn) {
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
}

if (resetAdminBtn) {
    resetAdminBtn.addEventListener('click', function() {
        admins = ['admin@soet.edu', 'hoda@soet.edu', 'dean@soet.edu'];
        saveAdmins();
        renderAdmins();
        showToast('🔄 Admin list reset', 'info');
    });
}

if (newAdminInput) {
    newAdminInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addAdminBtn.click();
    });
}

// ================= STRIPE PAYMENT =================
window.handlePayment = function(amount, description, paymentType) {
    try {
        showToast('⏳ Initializing payment...', 'info');
        
        if (!currentUser) {
            showToast('⚠️ Please login first to make a payment.', 'error');
            return;
        }

        const orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);

        const paymentData = {
            id: orderId,
            amount: amount,
            description: description,
            type: paymentType || 'fee',
            status: 'pending',
            user: currentUser.email,
            date: new Date().toISOString()
        };

        localStorage.setItem('soet_pending_payment', JSON.stringify(paymentData));
        showStripeCheckoutModal(amount, description, paymentData);

    } catch (error) {
        console.error('Payment error:', error);
        showToast('❌ Payment failed: ' + error.message, 'error');
    }
};

function showStripeCheckoutModal(amount, description, paymentData) {
    const existingModal = document.getElementById('stripeCheckoutModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'stripeCheckoutModal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.7); z-index: 99999;
        display: flex; justify-content: center; align-items: center;
        backdrop-filter: blur(8px);
        animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="
            background: white; border-radius: 24px; padding: 2.5rem;
            max-width: 480px; width: 90%; max-height: 90vh; overflow-y: auto;
            box-shadow: 0 30px 60px rgba(0,0,0,0.3);
            position: relative;
            animation: fadeInUp 0.3s ease;
        ">
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="
                    width: 70px; height: 70px; background: linear-gradient(135deg, #635bff, #3d6aff);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 1rem;
                ">
                    <i class="fas fa-credit-card" style="color: white; font-size: 2rem;"></i>
                </div>
                <h2 style="font-size: 1.5rem; color: #0f172a;">Stripe Checkout</h2>
                <p style="color: #64748b; font-size: 0.9rem;">Secure payment gateway</p>
            </div>

            <div style="
                background: #f8fafc; border-radius: 16px; padding: 1.2rem;
                margin-bottom: 1.5rem; border: 1px solid #e2e8f0;
            ">
                <div style="display: flex; justify-content: space-between; padding: 0.4rem 0;">
                    <span style="color: #64748b;">Amount</span>
                    <span style="font-weight: 700; font-size: 1.2rem; color: #0f172a;">₹${amount.toLocaleString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 0.4rem 0;">
                    <span style="color: #64748b;">Description</span>
                    <span style="font-weight: 500; color: #0f172a;">${description}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 0.4rem 0;">
                    <span style="color: #64748b;">Payment Method</span>
                    <span style="font-weight: 500; color: #0f172a;">💳 Card / UPI</span>
                </div>
            </div>

            <div style="margin-bottom: 1.2rem;">
                <label style="display: block; font-weight: 600; font-size: 0.85rem; color: #334155; margin-bottom: 0.4rem;">
                    Card Details (Demo)
                </label>
                <div style="
                    background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px;
                    padding: 1rem; transition: border-color 0.2s;
                ">
                    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1; min-width: 150px;">
                            <i class="fas fa-credit-card" style="color: #94a3b8;"></i>
                            <span style="color: #475569; font-family: monospace; font-size: 0.9rem;">4242 4242 4242 4242</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: #94a3b8; font-size: 0.75rem;">MM/YY</span>
                            <span style="color: #475569; font-family: monospace; font-size: 0.9rem;">12/26</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="color: #94a3b8; font-size: 0.75rem;">CVC</span>
                            <span style="color: #475569; font-family: monospace; font-size: 0.9rem;">***</span>
                        </div>
                    </div>
                </div>
                <p style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.3rem;">
                    <i class="fas fa-info-circle"></i> Test card: 4242 4242 4242 4242 | Any future date | Any CVC
                </p>
            </div>

            <div style="display: flex; gap: 0.8rem;">
                <button onclick="closeStripeModal()" style="
                    flex: 1; padding: 0.8rem; border: 1px solid #e2e8f0; border-radius: 60px;
                    background: white; color: #475569; font-weight: 600; cursor: pointer;
                    transition: 0.2s;
                " onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
                    Cancel
                </button>
                <button onclick="processDemoPayment('${paymentData.id}')" style="
                    flex: 2; padding: 0.8rem; border: none; border-radius: 60px;
                    background: linear-gradient(135deg, #635bff, #3d6aff);
                    color: white; font-weight: 600; cursor: pointer;
                    transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
                " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-lock"></i> Pay ₹${amount.toLocaleString()}
                </button>
            </div>

            <div style="text-align: center; margin-top: 1rem; font-size: 0.7rem; color: #94a3b8;">
                <i class="fas fa-shield-alt"></i> Secured by Stripe · Test Mode
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

window.closeStripeModal = function() {
    const modal = document.getElementById('stripeCheckoutModal');
    if (modal) modal.remove();
};

window.processDemoPayment = function(orderId) {
    const modal = document.getElementById('stripeCheckoutModal');
    
    const payBtn = modal.querySelector('button:last-child');
    payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    payBtn.disabled = true;

    setTimeout(() => {
        const pendingData = JSON.parse(localStorage.getItem('soet_pending_payment'));
        
        if (pendingData) {
            pendingData.status = 'paid';
            pendingData.paidAt = new Date().toISOString();
            
            paymentHistory.push(pendingData);
            localStorage.setItem('soet_payment_history', JSON.stringify(paymentHistory));
            
            localStorage.removeItem('soet_pending_payment');
            
            closeStripeModal();
            
            showToast(`✅ Payment of ₹${pendingData.amount.toLocaleString()} successful!`, 'success');
            
            if (pendingData.type === 'ree') {
                reePaid = true;
                renderReeFeeSection();
                renderReeCalendarNotice();
            } else if (pendingData.type === 'debar') {
                debarPaid = true;
                renderDebarFeeSection();
                renderSemPanelSafe();
            }
        }
    }, 2000);
};

function renderSemPanelSafe() {
    if (document.getElementById('sem-detail-panel')) {
        renderSemPanel(currentAttSem || 6);
    }
}

// ================= CHATBOT =================
const PORTAL_DATA = {
    student: {
        name: 'Alex',
        attendance: {
            'Distributed Systems': { present: 33, total: 40 },
            'Data Structures':     { present: 25, total: 40 },
            'Neural Networks':     { present: 38, total: 40 },
            'Ethical Hacking':     { present: 20, total: 40 },
            'Compiler Design':     { present: 17, total: 40 }
        },
        syllabus: {
            'Distributed Systems': [
                { unit: 'Unit 1: Introduction',    pct: 100 },
                { unit: 'Unit 2: Communication',   pct: 100 },
                { unit: 'Unit 3: Synchronization', pct: 80  },
                { unit: 'Unit 4: Replication',     pct: 60  },
                { unit: 'Unit 5: Fault Tolerance', pct: 40  }
            ],
            'Data Structures': [
                { unit: 'Unit 1: Arrays',          pct: 100 },
                { unit: 'Unit 2: Linked Lists',    pct: 80  },
                { unit: 'Unit 3: Stacks & Queues', pct: 60  },
                { unit: 'Unit 4: Trees',           pct: 20  },
                { unit: 'Unit 5: Graphs',          pct: 0   }
            ]
        }
    },
    timetable: {
        Monday:    [{ time:'09:00-10:30',sub:'DS - Distributed Systems',room:'A-102'},{time:'11:00-12:30',sub:'EH - Ethical Hacking Lab',room:'Lab 402'},{time:'02:00-03:30',sub:'CD - Compiler Design',room:'LT-2'}],
        Tuesday:   [{ time:'09:00-10:30',sub:'NN - Neural Networks',room:'A-102'},{time:'11:00-12:30',sub:'CD - Compiler Design',room:'LT-2'},{time:'02:00-03:30',sub:'DS - Distributed Systems',room:'A-102'}],
        Wednesday: [{ time:'09:00-10:30',sub:'DS - Distributed Systems',room:'A-102'},{time:'11:00-12:30',sub:'EH - Ethical Hacking Lab',room:'Lab 402'},{time:'02:00-03:30',sub:'NN - Neural Networks',room:'A-102'}],
        Thursday:  [{ time:'09:00-10:30',sub:'NN - Neural Networks',room:'A-102'},{time:'11:00-12:30',sub:'CD - Compiler Design',room:'LT-2'},{time:'02:00-03:30',sub:'DS - Distributed Systems',room:'A-102'}],
        Friday:    [{ time:'09:00-10:30',sub:'DS - Distributed Systems',room:'A-102'},{time:'11:00-12:30',sub:'EH - Ethical Hacking Lab',room:'Lab 402'},{time:'02:00-03:30',sub:'CD - Compiler Design',room:'LT-2'}]
    },
    qrSessions: [
        { subject:'CS402 - Distributed Systems', time:'11:30 AM', present:12, total:12 },
        { subject:'CS310 - Data Structures',     time:'02:00 PM', present:6,  total:6  },
        { subject:'CS201 - Neural Networks',     time:'09:00 AM', present:8,  total:10 }
    ],
    admins: ['admin@soet.edu','hoda@soet.edu','dean@soet.edu'],
    totalStudents: 50,
    currentUser: null
};

const fab = document.getElementById('soetChatFab');
const chatWindow = document.getElementById('soetChatWindow');
const closeBtn = document.getElementById('chatCloseBtn');
const messagesEl = document.getElementById('chatMessages');
const inputEl = document.getElementById('chatInput');
const sendBtn = document.getElementById('chatSendBtn');
const quickWrap = document.getElementById('chatQuickWrap');
const statusEl = document.getElementById('chatStatus');
const tabs = document.querySelectorAll('.chat-tab');

let isOpen = false;
let isLoading = false;
let chatHistory = [];
let currentMode = 'chat';
let initialized = false;
let loggedInUser = null;

function getDayName() {
    return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];
}

function getAttendanceSummary() {
    const att = PORTAL_DATA.student.attendance;
    let lines = [];
    let totalP = 0, totalC = 0;
    for (const [sub, d] of Object.entries(att)) {
        const pct = Math.round((d.present / d.total) * 100);
        totalP += d.present; totalC += d.total;
        const flag = pct < 75 ? '⚠️' : '✅';
        lines.push(`${flag} ${sub}: ${d.present}/${d.total} = ${pct}%`);
    }
    const overall = Math.round((totalP / totalC) * 100);
    lines.push(`\n📊 Overall: ${totalP}/${totalC} = ${overall}%`);
    return lines.join('\n');
}

function calcClassesFor75(sub) {
    const d = PORTAL_DATA.student.attendance[sub];
    if (!d) return null;
    let p = d.present, t = d.total;
    if ((p/t)*100 >= 75) return { already: true, pct: Math.round((p/t)*100) };
    let extra = 0;
    while (((p + extra) / (t + extra)) * 100 < 75) extra++;
    return { extra, newP: p + extra, newT: t + extra, pct: Math.round(((p+extra)/(t+extra))*100) };
}

function getSyllabusSummary() {
    const syl = PORTAL_DATA.student.syllabus;
    let out = [];
    for (const [sub, units] of Object.entries(syl)) {
        const avg = Math.round(units.reduce((a,u)=>a+u.pct,0)/units.length);
        const pending = units.filter(u=>u.pct<100);
        out.push(`📘 ${sub}: ${avg}% complete. Pending: ${pending.map(u=>u.unit.split(':')[0]).join(', ') || 'None'}`);
    }
    return out.join('\n');
}

function getTodayTimetable() {
    const day = getDayName();
    const classes = PORTAL_DATA.timetable[day];
    if (!classes) return `Aaj ${day} hai — koi class schedule nahi hai.`;
    return `📅 Aaj ${day} ki classes:\n` + classes.map(c=>`• ${c.time} — ${c.sub} (${c.room})`).join('\n');
}

function getDayTimetable(day) {
    const d = Object.keys(PORTAL_DATA.timetable).find(k=>k.toLowerCase()===day.toLowerCase());
    if (!d) return `"${day}" ke liye schedule nahi mila.`;
    return `📅 ${d} ki classes:\n` + PORTAL_DATA.timetable[d].map(c=>`• ${c.time} — ${c.sub} (${c.room})`).join('\n');
}

function getStudyPlan(days) {
    const syl = PORTAL_DATA.student.syllabus;
    let allPending = [];
    for (const [sub, units] of Object.entries(syl)) {
        units.filter(u=>u.pct<100).forEach(u=> allPending.push({ sub, unit: u.unit, pct: u.pct }));
    }
    if (!allPending.length) return '✅ Sabhi units complete hain! Revision karo.';
    allPending.sort((a,b)=>a.pct-b.pct);
    const perDay = Math.ceil(allPending.length / (days || 15));
    let plan = `📅 ${days || 15}-Din Study Plan:\n`;
    let dayNum = 1, idx = 0;
    while (idx < allPending.length && dayNum <= (days || 15)) {
        let batch = allPending.slice(idx, idx + perDay);
        plan += `Day ${dayNum}: ` + batch.map(b=>`${b.sub} - ${b.unit.split(':')[0]}`).join(' | ') + '\n';
        dayNum++; idx += perDay;
    }
    if (dayNum <= (days||15)) {
        plan += `Day ${dayNum} to ${days||15}: Revision + Mock Tests`;
    }
    return plan;
}

function generateEmailContent(text) {
    const userName = loggedInUser?.name || 'Student';
    const date = new Date().toLocaleDateString('en-IN');
    
    if (text.includes('fever') || text.includes('sick') || text.includes('ill')) {
        return `✉️ **Leave Application (Fever)**

Subject: Leave Application - ${userName}

Dear Sir/Madam,

I hope this email finds you well. I am writing to request leave for today as I am not feeling well due to fever. I have consulted a doctor and have been advised rest.

I will be available on [Your Phone Number] if any urgent work arises. I will ensure that all pending work is completed upon my return.

Thank you for your understanding.

Yours sincerely,
${userName}
Roll No: [Your Roll No]
Date: ${date}`;
    }
    
    if (text.includes('meeting')) {
        return `✉️ **Meeting Request**

Subject: Meeting Request - ${userName}

Dear Sir/Madam,

I hope you are doing well. I would like to request a meeting to discuss [Topic/Issue] at your earliest convenience. Please let me know a suitable time slot.

Looking forward to your positive response.

Regards,
${userName}
Date: ${date}`;
    }
    
    if (text.includes('assignment') || text.includes('submission')) {
        return `✉️ **Late Submission Request**

Subject: Late Submission - Assignment [Subject]

Dear Sir/Madam,

I sincerely apologize for the delay in submitting the assignment for [Subject]. I was facing some technical issues and health problems due to which I couldn't submit it on time.

I have attached the completed assignment with this email. Please consider my request and accept the submission.

Thank you for your understanding.

Yours sincerely,
${userName}
Roll No: [Your Roll No]
Date: ${date}`;
    }

    return `✉️ **Email Draft**

Subject: [Subject Line]

Dear [Recipient],

[Write your message here]

Regards,
${userName}
Date: ${date}`;
}

function buildSystemPrompt() {
    const att = PORTAL_DATA.student.attendance;
    let attLines = Object.entries(att).map(([s,d])=>{
        const pct = Math.round((d.present/d.total)*100);
        return `  - ${s}: ${d.present}/${d.total} (${pct}%)${pct<75?' ⚠️ BELOW 75%':''}`;
    }).join('\n');

    let sylLines = '';
    for (const [sub, units] of Object.entries(PORTAL_DATA.student.syllabus)) {
        const avg = Math.round(units.reduce((a,u)=>a+u.pct,0)/units.length);
        sylLines += `  ${sub} (${avg}%):\n`;
        units.forEach(u => sylLines += `    - ${u.unit}: ${u.pct}%\n`);
    }

    let ttLines = '';
    for (const [day, cls] of Object.entries(PORTAL_DATA.timetable)) {
        ttLines += `  ${day}: ${cls.map(c=>`${c.time} ${c.sub} (${c.room})`).join(' | ')}\n`;
    }

    const today = getDayName();
    const todayCls = PORTAL_DATA.timetable[today] || [];

    const userName = loggedInUser?.name || PORTAL_DATA.student.name || 'Student';
    const userRole = loggedInUser?.role || 'student';

    return `You are SOET AI Assistant — a smart, friendly AI built into the SOETConnect college portal.

LOGGED IN USER: ${userName} (${userRole})
TODAY: ${today}
TODAY'S CLASSES: ${todayCls.length ? todayCls.map(c=>c.time+' '+c.sub).join(', ') : 'No classes today'}

REAL ATTENDANCE DATA:
${attLines}

REAL SYLLABUS DATA:
${sylLines}

TIMETABLE (all days):
${ttLines}

QR SESSION HISTORY:
${PORTAL_DATA.qrSessions.map(s=>`  - ${s.subject}: ${s.present}/${s.total} present`).join('\n')}

ADMIN INFO:
  - Total registered students: ${PORTAL_DATA.totalStudents}
  - Admins: ${PORTAL_DATA.admins.join(', ')}

YOUR JOB:
1. Answer questions using the REAL data above. Give exact numbers, not generic answers.
2. Attendance Calculator: if asked "75% ke liye kitni classes chahiye", calculate precisely.
3. Study Planner: if asked for exam plan, make a day-wise schedule using pending units.
4. Timetable: answer "aaj ki class", "kal ki class", "friday ka schedule" etc from real data.
5. Email Generator: write professional leave applications, meeting mails etc when asked.
6. Admin Analytics: answer questions about student count, attendance alerts etc.

LANGUAGE: Reply in Hinglish (Hindi+English mix) unless user writes in pure English.
TONE: Friendly, helpful, like a senior student helping a junior.
IMPORTANT: Always use the ACTUAL data provided above, never make up numbers.`;
}

function tryLocalAnswer(text) {
    const t = text.toLowerCase();

    if (!loggedInUser && (t.includes('attendance') || t.includes('syllabus') || t.includes('timetable'))) {
        return '⚠️ Please login first to access your personal data.';
    }

    if ((t.includes('attendance') || t.includes('kitni hai') || t.includes('meri attendance')) && !t.includes('75')) {
        return getAttendanceSummary();
    }
    
    if (t.includes('75') && (t.includes('class') || t.includes('attend') || t.includes('chahiye'))) {
        let result = '🧮 **75% Attendance Calculator:**\n\n';
        const att = PORTAL_DATA.student.attendance;
        for (const [sub, d] of Object.entries(att)) {
            const pct = Math.round((d.present/d.total)*100);
            if (pct >= 75) {
                result += `✅ ${sub}: Already ${pct}% — aap safe ho!\n`;
            } else {
                const r = calcClassesFor75(sub);
                if (r) {
                    result += `⚠️ ${sub} (${pct}%): ${r.extra} aur classes attend karo → ${r.newP}/${r.newT} = ${r.pct}%\n`;
                }
            }
        }
        return result;
    }
    
    if ((t.includes('aaj') || t.includes('today')) && (t.includes('class') || t.includes('lecture'))) {
        return getTodayTimetable();
    }
    
    if ((t.includes('kal') || t.includes('tomorrow')) && (t.includes('class') || t.includes('schedule'))) {
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const tomorrow = days[(new Date().getDay()+1)%7];
        return getDayTimetable(tomorrow);
    }
    
    const dayNames = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
    for (const d of dayNames) {
        if (t.includes(d)) {
            return getDayTimetable(d.charAt(0).toUpperCase()+d.slice(1));
        }
    }
    
    if (t.includes('syllabus') || t.includes('progress') || t.includes('complete')) {
        return getSyllabusSummary();
    }
    
    if ((t.includes('study plan') || t.includes('plan banao') || t.includes('exam')) && t.includes('din')) {
        const match = text.match(/(\d+)\s*din/);
        const days = match ? parseInt(match[1]) : 15;
        return getStudyPlan(days);
    }
    
    if (t.includes('student') || t.includes('registered')) {
        return `👥 Total registered students: **${PORTAL_DATA.totalStudents}**\n⚠️ Below 75% attendance:\n• Ethical Hacking: 50%\n• Compiler Design: 42.5%`;
    }
    
    if (t.includes('leave application') || t.includes('email') || t.includes('mail')) {
        return generateEmailContent(text);
    }
    
    return null;
}

function appendUserMessage(text) {
    const d = document.createElement('div');
    d.className = 'chat-bubble user';
    d.textContent = text;
    messagesEl.appendChild(d);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function appendBotMessage(text) {
    const d = document.createElement('div');
    d.className = 'chat-bubble bot';
    d.innerHTML = text
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
        .replace(/\n/g,'<br>');
    messagesEl.appendChild(d);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function appendTyping() {
    const d = document.createElement('div');
    d.className = 'chat-typing';
    d.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(d);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return d;
}

function updateChips() {
    const chipSets = {
        chat:       ['📋 My Attendance','📅 Today Classes','📚 Syllabus Progress','🧮 75% Calculator','🎯 Study Plan','✉️ Leave Mail'],
        attendance: ['Meri attendance kitni hai?','Ethical Hacking attendance?','75% ke liye kitni classes?'],
        timetable:  ['Aaj ki classes?','Kal ki classes?','Friday ka schedule?'],
        syllabus:   ['Sabse weak subject konsa hai?','DS syllabus progress?'],
        planner:    ['Exam 15 din baad hai, plan banao','Exam 7 din mein plan'],
        email:      ['Fever ke liye leave application','Meeting ke liye mail']
    };
    
    let chips = chipSets[currentMode] || chipSets.chat;
    if (!loggedInUser) {
        chips = chips.filter(c => !c.includes('Email') && !c.includes('✉️'));
    }
    
    quickWrap.innerHTML = chips.map((c) => {
        const q = c.startsWith('📋') ? 'Meri attendance kitni hai?' :
                  c.startsWith('📅') ? 'Aaj ki classes kaunsi hain?' :
                  c.startsWith('📚') ? 'Syllabus progress batao' :
                  c.startsWith('🧮') ? 'Attendance 75% ke liye kitni classes chahiye?' :
                  c.startsWith('🎯') ? 'Exam ke liye study plan banao 15 din mein' :
                  c.startsWith('✉️') ? 'Mujhe leave application likhni hai fever ke liye' : c;
        return `<span class="chat-chip" data-q="${q}">${c}</span>`;
    }).join('');
    quickWrap.querySelectorAll('.chat-chip').forEach(chip => {
        chip.addEventListener('click', () => sendMessage(chip.dataset.q));
    });
}

async function sendMessage(text) {
    if (isLoading) return;
    
    if (!loggedInUser) {
        appendUserMessage(text);
        appendBotMessage('⚠️ Please login first to use the chatbot.');
        return;
    }
    
    inputEl.value = '';
    appendUserMessage(text);
    isLoading = true;
    sendBtn.disabled = true;
    statusEl.textContent = '● Typing…';

    const localAnswer = tryLocalAnswer(text);
    if (localAnswer) {
        await new Promise(r => setTimeout(r, 400));
        appendBotMessage(localAnswer);
        statusEl.textContent = '● Online · Powered by AI';
        isLoading = false;
        sendBtn.disabled = false;
        inputEl.focus();
        return;
    }

    chatHistory.push({ role: 'user', content: text });
    const typingEl = appendTyping();

    try {
        // Try API call, fallback to local if fails
        const resp = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-sonnet-4-6',
                max_tokens: 1000,
                system: buildSystemPrompt(),
                messages: chatHistory
            })
        });
        typingEl.remove();
        if (!resp.ok) { throw new Error('API error ' + resp.status); }
        const data = await resp.json();
        const reply = data?.content?.[0]?.text || 'Sorry, kuch problem aa gayi. Dobara try karo.';
        chatHistory.push({ role: 'assistant', content: reply });
        appendBotMessage(reply);
    } catch (err) {
        typingEl.remove();
        // Fallback to local response
        const fallback = getAttendanceSummary() + '\n\n' + getSyllabusSummary();
        appendBotMessage('⚠️ Using offline mode:\n\n' + fallback);
        chatHistory.pop();
    }
    statusEl.textContent = '● Online · Powered by AI';
    isLoading = false;
    sendBtn.disabled = false;
    inputEl.focus();
}

window.updateChatbotUser = function(user) {
    loggedInUser = user;
    PORTAL_DATA.currentUser = user;
    if (user) {
        PORTAL_DATA.student.name = user.name || 'Student';
    }
    updateChips();
};

fab.addEventListener('click', () => {
    isOpen = !isOpen;
    chatWindow.classList.toggle('open', isOpen);
    if (isOpen && !initialized) {
        initialized = true;
        const name = loggedInUser?.name || 'Student';
        appendBotMessage(`👋 Namaste, ${name}! Main SOET AI Assistant hoon.\n\nMujhse kuch bhi puchho:\n• 📋 Attendance & 75% calculator\n• 📅 Timetable & class schedule\n• 📚 Syllabus progress\n• 🎯 Exam study planner\n• ✉️ Email/leave application`);
    }
    if (isOpen) setTimeout(() => inputEl.focus(), 300);
});

closeBtn.addEventListener('click', () => {
    isOpen = false;
    chatWindow.classList.remove('open');
});

sendBtn.addEventListener('click', () => { const t = inputEl.value.trim(); if(t) sendMessage(t); });

inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { 
        e.preventDefault(); 
        const t = inputEl.value.trim(); 
        if(t) sendMessage(t); 
    }
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentMode = tab.dataset.mode;
        updateChips();
    });
});

quickWrap.querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', () => sendMessage(chip.dataset.q));
});

// ================= INIT =================
const savedUser = localStorage.getItem('soet_current_user');
if (savedUser) {
    try {
        const user = JSON.parse(savedUser);
        const found = users.find(u => u.email === user.email && u.password === user.password);
        if (found) {
            currentUser = found;
            enterDashboard(found);
            window.updateChatbotUser(found);
        } else {
            localStorage.removeItem('soet_current_user');
        }
    } catch (e) { localStorage.removeItem('soet_current_user'); }
}

renderAdmins();
if (adminPanel) adminPanel.style.display = 'none';

document.addEventListener('DOMContentLoaded', function() {
    renderReeFeeSection();
    renderReeCalendarNotice();
    renderDebarFeeSection();
    if (document.getElementById('sem-detail-panel')) renderSemPanel(1);
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    renderReeFeeSection();
    renderReeCalendarNotice();
    renderDebarFeeSection();
    if (document.getElementById('sem-detail-panel')) renderSemPanel(1);
}

console.log('✅ K.R. Mangalam University Portal ready!');
console.log('Demo accounts:');
console.log('  Student: student@soet.edu / password123');
console.log('  Faculty: faculty@soet.edu / password123');
console.log('  Admin: admin@soet.edu / password123');
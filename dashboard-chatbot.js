/* ================= DASHBOARD AI CHATBOT ================= */
/* This chatbot appears only inside the dashboard after login */
(function() {

    // ---------- KNOWLEDGE BASE ----------
    // Extended knowledge base with dashboard-specific info
    const KB = {
        university: "K.R. Mangalam University",
        established: "2013",
        location: "Gurugram, Haryana",
        campus: "30-acre campus",
        accreditation: "recognized by UGC and accredited with a NAAC A Grade",
        students: "18,000+",
        faculty: "800+",
        schools: "12+",
        programs: "100+",
        email: "admission@krmangalam.edu.in",
        phone: "+91-123-456-7890",
        hostelFee: "₹1,20,000 / year (approx.)",

        // Dashboard pages
        pages: {
            dashboard: "Home dashboard with overview of your academic status",
            placements: "Placement highlights, recruiters, and package details",
            assignments: "View and submit assignments uploaded by faculty",
            materials: "Study materials, notes, and lecture slides",
            fees: "Fee management, payment gateway, and history",
            results: "Examination results and CGPA",
            certificates: "Download academic certificates and transcripts",
            helpdesk: "Support and contact information",
            events: "Campus events, registration, and management",
            hostel: "Hostel accommodation details and fees",
            transport: "Bus routes and transport schedules",
            calendar: "Academic calendar and important dates",
            performance: "Academic performance analytics and SGPA trends",
            "my-attendance": "Attendance tracking with calendar view",
            "qr-scan": "Scan QR code to mark attendance",
            timetable: "Weekly timetable view",
            profile: "Profile management and settings"
        },

        // Quick commands
        commands: [
            "open dashboard",
            "open placements",
            "open assignments",
            "open materials",
            "open fees",
            "open results",
            "open certificates",
            "open helpdesk",
            "open events",
            "open hostel",
            "open transport",
            "open calendar",
            "open performance",
            "open attendance",
            "open qr-scan",
            "open timetable",
            "open profile"
        ]
    };

    // ---------- INTENTS ----------
    const INTENTS = [
        {
            patterns: [/^(hi|hello|hey|hii+|namaste|good\s?(morning|evening|afternoon))\b/i],
            reply: (msg, user) => `Hello ${user ? user.name || 'there' : 'there'}! 👋 I'm your SOET Dashboard Assistant. I can help you navigate the portal, check assignments, fees, attendance, and more. Try asking "What can you do?" or "Open assignments".`
        },
        {
            patterns: [/\b(who are you|what are you|your name|what can you do|help)\b/i],
            reply: () => `I'm your SOET Dashboard Assistant — here to help you navigate the student portal.\n\n📌 **What I can do:**\n• Navigate to any page (e.g., "open assignments")\n• Check your assignments and submissions\n• View fee status and payment history\n• Track attendance and marks\n• Answer questions about courses, events, and more\n\nTry typing "open" followed by a page name!`
        },
        {
            patterns: [/\bopen\s+(.+)/i],
            reply: (msg, user) => {
                const match = msg.match(/open\s+(.+)/i);
                if (!match) return "Which page would you like to open? Try: dashboard, assignments, fees, results, attendance, timetable, profile, etc.";
                const page = match[1].trim().toLowerCase();
                const pageMap = {
                    'dashboard': 'dashboard',
                    'home': 'dashboard',
                    'placements': 'placements',
                    'assignment': 'assignments',
                    'assignments': 'assignments',
                    'materials': 'materials',
                    'study materials': 'materials',
                    'fee': 'fees',
                    'fees': 'fees',
                    'payment': 'fees',
                    'results': 'results',
                    'certificate': 'certificates',
                    'certificates': 'certificates',
                    'helpdesk': 'helpdesk',
                    'help desk': 'helpdesk',
                    'support': 'helpdesk',
                    'events': 'events',
                    'hostel': 'hostel',
                    'transport': 'transport',
                    'calendar': 'calendar',
                    'performance': 'performance',
                    'attendance': 'my-attendance',
                    'qr': 'qr-scan',
                    'qr scan': 'qr-scan',
                    'timetable': 'timetable',
                    'schedule': 'timetable',
                    'profile': 'profile',
                    'settings': 'profile'
                };
                const target = pageMap[page];
                if (target && typeof window.navigateTo === 'function') {
                    window.navigateTo(target);
                    return `✅ Opening **${target}** for you...`;
                }
                const suggestions = Object.keys(pageMap).filter(k => k.includes(page) || page.includes(k));
                if (suggestions.length) {
                    return `I'm not sure which page you mean. Did you mean: **${suggestions.slice(0, 3).join(', ')}**? Try "open [page name]".`;
                }
                return `I don't recognize "${page}". Available pages: dashboard, assignments, fees, results, attendance, timetable, profile, and more.`;
            }
        },
        {
            patterns: [/\b(assignment|submission|homework|project)\b/i],
            reply: (msg, user) => {
                const hasPending = window.assignments && window.assignments.length > 0;
                const myRoll = user && user.rollNo ? user.rollNo.toLowerCase().trim() : '';
                const mySubs = window.assignmentSubmissions ? window.assignmentSubmissions.filter(s => (s.rollNo || '').toLowerCase().trim() === myRoll) : [];
                const pending = window.assignments ? window.assignments.filter(a => {
                    const submitted = mySubs.some(s => s.assignmentId === a.id);
                    return !submitted && Date.now() <= a.due;
                }) : [];
                if (pending.length === 0 && hasPending) {
                    return `📝 You have submitted all your pending assignments! ${mySubs.length} submission${mySubs.length > 1 ? 's' : ''} completed. 🎉`;
                }
                if (pending.length > 0) {
                    return `📝 You have **${pending.length} pending assignment${pending.length > 1 ? 's' : ''}** to submit.\n• ${pending.map(a => a.title + ' (due: ' + new Date(a.due).toLocaleDateString() + ')').join('\n• ')}\n\nSay "open assignments" to view and submit.`;
                }
                return `📝 No assignments available at the moment. Faculty will upload assignments soon. Check back later!`;
            }
        },
        {
            patterns: [/\b(fee|fees|payment|due|pay)\b/i],
            reply: (msg, user) => {
                const due = typeof window.getTuitionDue === 'function' ? window.getTuitionDue() : 45000;
                if (due <= 0) {
                    return `✅ All your tuition fees are fully paid! 🎉\n\nYou can view payment history by saying "open fees".`;
                }
                return `💰 You have **${window.formatINR ? window.formatINR(due) : '₹' + due.toLocaleString()}** in tuition fees due.\n📅 Due Date: Nov 15, 2026\n\nSay "open fees" to pay now or view breakdown.`;
            }
        },
        {
            patterns: [/\b(attendance|present|absent|class)\b/i],
            reply: (msg, user) => {
                const sem = typeof window.currentAttSem !== 'undefined' ? window.currentAttSem : 6;
                const data = window.attSemData && window.attSemData[sem];
                if (!data || !data.subjects || data.subjects.length === 0) {
                    return `📋 No attendance records found yet. Faculty will mark attendance for your classes.\n\nSay "open attendance" to track your attendance.`;
                }
                const totalClasses = data.subjects.reduce((s, a) => s + (a.total || 0), 0);
                const totalPresent = data.subjects.reduce((s, a) => s + (a.present || 0), 0);
                const avg = totalClasses ? Math.round((totalPresent / totalClasses) * 100) : 0;
                const status = avg >= 85 ? '✅ Excellent!' : (avg >= 75 ? '✅ Good Standing' : (avg >= 50 ? '⚠️ Below 75%' : '❌ Critical'));
                const debarred = data.subjects.filter(s => (s.pct || 0) < 75);
                let msgText = `📋 **Attendance Summary — Semester ${sem}**\n• Total Classes: ${totalClasses}\n• Attended: ${totalPresent}\n• Percentage: ${avg}%\n• Status: ${status}`;
                if (debarred.length > 0) {
                    msgText += `\n\n⚠️ **Debarred Subjects:** ${debarred.map(s => s.subject).join(', ')} (below 75%)`;
                }
                msgText += `\n\nSay "open attendance" for detailed view.`;
                return msgText;
            }
        },
        {
            patterns: [/\b(result|grade|cgpa|gpa|exam|semester)\b/i],
            reply: (msg, user) => {
                const entries = JSON.parse(localStorage.getItem('soet_marks_entries') || '[]');
                const myRoll = user && user.rollNo ? user.rollNo.toLowerCase().trim() : '';
                const myMarks = entries.filter(e => (e.rollNo || '').toLowerCase().trim() === myRoll);
                if (myMarks.length === 0) {
                    return `📊 No results available yet. Faculty will add marks for your subjects.\n\nSay "open results" when marks are published.`;
                }
                const total = myMarks.reduce((s, e) => s + e.marks, 0);
                const avg = Math.round(total / myMarks.length);
                const grade = avg >= 90 ? 'A+' : avg >= 80 ? 'A' : avg >= 70 ? 'B+' : avg >= 60 ? 'B' : avg >= 40 ? 'C' : 'F';
                return `📊 **Your Results**\n• ${myMarks.length} subject${myMarks.length > 1 ? 's' : ''} graded\n• Average: ${avg}%\n• Overall Grade: **${grade}**\n\nSay "open results" for detailed subject-wise grades.`;
            }
        },
        {
            patterns: [/\b(events|event|workshop|hackathon|cultural|fest)\b/i],
            reply: () => {
                const events = JSON.parse(localStorage.getItem('soet_events') || '[]');
                if (events.length === 0) {
                    return `🎉 No events scheduled at the moment. Check back later for workshops, hackathons, and cultural events!\n\nSay "open events" to register when available.`;
                }
                const upcoming = events.filter(e => new Date(e.date) >= new Date()).slice(0, 3);
                if (upcoming.length === 0) {
                    return `🎉 All current events have passed. New events will be announced soon!\n\nSay "open events" to see past events.`;
                }
                return `🎉 **Upcoming Events:**\n• ${upcoming.map(e => e.title + ' (' + e.type + ') — ' + e.date + ' at ' + e.time).join('\n• ')}\n\nSay "open events" to register!`;
            }
        },
        {
            patterns: [/\b(placement|job|recruit|package|company)\b/i],
            reply: () => {
                return `📊 **Placement Highlights**\n• Highest Package: ₹56.6 LPA\n• 800+ Recruiters Visited\n• 100% Placement Assistance\n\n**Top Recruiters:** TCS, Infosys, Wipro, Accenture, Deloitte, Amazon, HCL, ICICI Bank, HDFC Bank\n\nSay "open placements" for complete details.`;
            }
        },
        {
            patterns: [/\b(calendar|academic|date|deadline|exam date)\b/i],
            reply: () => {
                return `🗓️ **Academic Calendar**\n• Mid Semester Exams: Starting Sept 10\n• End Semester Exams: Dec 1-15\n• Winter Break: Dec 20 - Jan 5\n• Admissions Open: 2026 Batch\n\nSay "open calendar" or "open timetable" to view schedules.`;
            }
        },
        {
            patterns: [/\b(hostel|room|accommodation|dorm)\b/i],
            reply: () => {
                return `🏠 **Hostel Information**\n• Block: A, Room: 204 (Double Sharing)\n• Fee: ${KB.hostelFee}\n• Status: Active ✅\n• Features: Wi-Fi, Mess, 24x7 Security\n\nSay "open hostel" for full details.`;
            }
        },
        {
            patterns: [/\b(transport|bus|route|pickup|drop)\b/i],
            reply: () => {
                return `🚌 **Transport Details**\n• Your Route: R-12 (Gurugram City)\n• Pickup: 7:30 AM\n• Drop: 5:30 PM\n• Status: Active ✅\n\nSay "open transport" for route details.`;
            }
        },
        {
            patterns: [/\b(profile|photo|picture|avatar)\b/i],
            reply: () => {
                return `👤 **Profile Management**\n• Update your name, photo, and password\n• Choose Dark Mode\n• Manage notification preferences\n\nSay "open profile" to update your settings.`;
            }
        },
        {
            patterns: [/\b(helpdesk|support|contact|help|issue|problem)\b/i],
            reply: () => {
                return `🆘 **Help Desk**\n• Email: support@krmangalam.edu\n• Phone: +91-123-456-7890\n• Hours: 9:00 AM - 5:00 PM\n• Location: Admin Block, Ground Floor\n\nSay "open helpdesk" for more support options.`;
            }
        },
        {
            patterns: [/\b(thank|thanks|thank you|thnx|ty)\b/i],
            reply: () => `You're welcome! 😊 Is there anything else I can help you with? Try asking "What can you do?" for ideas.`
        },
        {
            patterns: [/\b(bye|goodbye|see you|exit|close|good night)\b/i],
            reply: () => `Goodbye! 👋 I'll be here whenever you need assistance. Say "hi" to reopen the chat. Have a great day!`
        }
    ];

    const FALLBACK = (user) => {
        const name = user && user.name ? user.name : 'there';
        return `I'm not entirely sure about that, ${name} 🤔 — but I can help with:\n• Dashboard navigation ("open assignments")\n• Assignment tracking\n• Fee status\n• Attendance overview\n• Results and grades\n\nTry rephrasing or ask "What can you do?" for all options.`;
    };

    // ---------- HELPERS ----------
    function getBotReply(userMsg, user) {
        for (const intent of INTENTS) {
            for (const pattern of intent.patterns) {
                if (pattern.test(userMsg)) {
                    const reply = intent.reply(userMsg, user);
                    return reply;
                }
            }
        }
        return FALLBACK(user);
    }

    // ---------- UI WIRING ----------
    document.addEventListener('DOMContentLoaded', function() {
        // Check if we're in the dashboard by looking for the dashboard element
        const dashboard = document.getElementById('dashboard');
        if (!dashboard) return;

        // Create chatbot elements dynamically
        const btn = document.createElement('button');
        btn.id = 'dashChatbotBtn';
        btn.setAttribute('aria-label', 'Open Dashboard Assistant');
        btn.innerHTML = `<i class="fas fa-robot"></i><span class="dash-cb-pulse"></span>`;
        document.body.appendChild(btn);

        const win = document.createElement('div');
        win.id = 'dashChatbotWindow';
        win.innerHTML = `
            <div class="dash-cb-header">
                <div class="dash-cb-avatar"><i class="fas fa-robot"></i></div>
                <div class="dash-cb-title">
                    <h4>SOET Assistant</h4>
                    <span>Online · Dashboard helper</span>
                </div>
                <button class="dash-cb-close" id="dashCbCloseBtn" aria-label="Close chat"><i class="fas fa-times"></i></button>
            </div>
            <div class="dash-cb-body" id="dashCbBody"></div>
            <div class="dash-cb-quick-replies" id="dashCbQuickReplies">
                <span class="dash-cb-chip" data-q="What can you do?">Help</span>
                <span class="dash-cb-chip" data-q="open assignments">Assignments</span>
                <span class="dash-cb-chip" data-q="fees">Fees</span>
                <span class="dash-cb-chip" data-q="attendance">Attendance</span>
                <span class="dash-cb-chip" data-q="results">Results</span>
                <span class="dash-cb-chip" data-q="open events">Events</span>
            </div>
            <div class="dash-cb-input-row">
                <input type="text" id="dashCbInput" placeholder="Ask me anything..." autocomplete="off" />
                <button class="dash-cb-send-btn" id="dashCbSendBtn" aria-label="Send message"><i class="fas fa-paper-plane"></i></button>
            </div>
        `;
        document.body.appendChild(win);

        // DOM refs
        const body = document.getElementById('dashCbBody');
        const input = document.getElementById('dashCbInput');
        const sendBtn = document.getElementById('dashCbSendBtn');
        const closeBtn = document.getElementById('dashCbCloseBtn');
        const quickReplies = document.getElementById('dashCbQuickReplies');

        let greeted = false;

        function scrollToBottom() {
            if (body) body.scrollTop = body.scrollHeight;
        }

        function addMessage(text, sender) {
            if (!body) return;
            const msg = document.createElement('div');
            msg.className = 'dash-cb-msg ' + sender;
            // Convert markdown-like formatting
            let formatted = text
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>')
                .replace(/• /g, '• ');
            msg.innerHTML = formatted;
            body.appendChild(msg);
            scrollToBottom();
        }

        function showTyping() {
            if (!body) return;
            const typing = document.createElement('div');
            typing.className = 'dash-cb-typing';
            typing.id = 'dashCbTypingIndicator';
            typing.innerHTML = '<span></span><span></span><span></span>';
            body.appendChild(typing);
            scrollToBottom();
        }

        function hideTyping() {
            const typing = document.getElementById('dashCbTypingIndicator');
            if (typing) typing.remove();
        }

        function getCurrentUser() {
            try {
                const saved = localStorage.getItem('soet_current_user');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    const users = JSON.parse(localStorage.getItem('soet_users') || '[]');
                    return users.find(u => u.email === parsed.email && u.password === parsed.password) || null;
                }
            } catch (e) {}
            return null;
        }

        function handleUserMessage(text) {
            text = text.trim();
            if (!text) return;
            addMessage(text, 'user');
            input.value = '';
            sendBtn.disabled = true;
            showTyping();

            const delay = 400 + Math.random() * 600;
            setTimeout(function() {
                hideTyping();
                const user = getCurrentUser();
                const reply = getBotReply(text, user);
                addMessage(reply, 'bot');
                sendBtn.disabled = false;
                input.focus();
            }, delay);
        }

        // Toggle chat window
        function toggleChat() {
            const isOpen = win.classList.contains('open');
            if (isOpen) {
                win.classList.remove('open');
                win.style.display = 'none';
            } else {
                win.style.display = 'flex';
                setTimeout(() => win.classList.add('open'), 10);
                if (!greeted) {
                    greeted = true;
                    setTimeout(() => {
                        const user = getCurrentUser();
                        const name = user && user.name ? user.name : 'there';
                        addMessage(`Hi ${name}! 👋 I'm your SOET Dashboard Assistant. I can help you navigate the portal, check assignments, fees, attendance, and more. Try asking "What can you do?"`, 'bot');
                    }, 500);
                }
                input.focus();
            }
        }

        // Events
        btn.addEventListener('click', toggleChat);

        closeBtn.addEventListener('click', function() {
            win.classList.remove('open');
            setTimeout(() => { win.style.display = 'none'; }, 300);
        });

        sendBtn.addEventListener('click', function() {
            handleUserMessage(input.value);
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleUserMessage(input.value);
            }
        });

        if (quickReplies) {
            quickReplies.querySelectorAll('.dash-cb-chip').forEach(function(chip) {
                chip.addEventListener('click', function() {
                    handleUserMessage(chip.getAttribute('data-q'));
                });
            });
        }

        // ---------- SHOW CHATBOT ONLY IN DASHBOARD ----------
        // Observe dashboard state changes
        const observer = new MutationObserver(function() {
            const isDashboardActive = dashboard.classList.contains('active');
            if (isDashboardActive) {
                btn.style.display = 'flex';
            } else {
                btn.style.display = 'none';
                win.classList.remove('open');
                win.style.display = 'none';
            }
        });
        observer.observe(dashboard, { attributes: true, attributeFilter: ['class'] });

        // Initial check
        if (dashboard.classList.contains('active')) {
            btn.style.display = 'flex';
        }

        // Also show when dashboard becomes active via navigation
        const origNavigate = window.navigateTo;
        if (origNavigate) {
            window.navigateTo = function(page) {
                origNavigate(page);
                // Small delay to let dashboard activate
                setTimeout(() => {
                    if (dashboard.classList.contains('active')) {
                        btn.style.display = 'flex';
                    }
                }, 100);
            };
        }

        console.log('✅ Dashboard Chatbot initialized');
    });

})();
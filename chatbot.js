/* ================= SOET AI CHATBOT (added file — does not modify script.js) ================= */
(function () {

    // ---------- Knowledge base (mirrors real data used across the site) ----------
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
        hostelFee: "₹1,20,000 / year (approx., varies slightly by course)",
        schoolsList: [
            "School of Engineering and Technology (SOET)",
            "School of Management and Commerce",
            "School of Basic and Applied Sciences",
            "School of Medical and Allied Sciences",
            "School of Pharmacy",
            "School of Architecture and Planning",
            "School of Legal Studies",
            "School of Emerging Media and Creative Arts",
            "School of Liberal Arts",
            "School of Education",
            "School of Agriculture"
        ],
        ugCourses: [
            "B.Tech (CSE, AI & ML, Cyber Security, IoT, Data Science, ECE, Mechanical, Civil)",
            "B.Sc (Computer Science, Physics, Chemistry, Mathematics, Biotechnology)",
            "BCA, BBA, B.Com (Hons.), B.Pharma, BHM",
            "BA (English, Journalism & Mass Comm, Economics)",
            "BA LLB / BBA LLB (Integrated), B.Arch, B.Sc Nursing, B.Sc Agriculture (Hons.)"
        ],
        pgCourses: [
            "M.Tech (CSE, AI & ML, Data Science, VLSI Design)",
            "MCA, MBA, M.Sc (CS, Physics, Chemistry, Mathematics)",
            "MA (English, Economics, Journalism), M.Arch, LLM, M.Pharma, M.Ed"
        ],
        diplomaCourses: [
            "Diploma in Computer Applications, Web Development, Digital Marketing, Data Science, Graphic Design, Business Management, Foreign Languages"
        ],
        phdCourses: [
            "Ph.D. in Computer Science, Management, Sciences, English, AI & ML, Engineering and more"
        ],
        feeRange: "roughly ₹80,000 – ₹1,60,000 per year in tuition depending on the course (e.g. B.Tech CSE ≈ ₹1,55,000/yr, BBA ≈ ₹1,00,000/yr, MBA ≈ ₹1,50,000/yr)"
    };

    // ---------- Intent patterns: [regex keywords, responder] ----------
    const INTENTS = [
        {
            patterns: [/^(hi|hello|hey|hii+|namaste|good\s?(morning|evening|afternoon))\b/i],
            reply: () => `Hello! 👋 Welcome to ${KB.university}'s virtual assistant. I can help you with admissions, courses, fees, hostel, placements, and more. What would you like to know?`
        },
        {
            patterns: [/\b(who are you|what are you|your name)\b/i],
            reply: () => `I'm the SOET AI Assistant for ${KB.university} — here to answer your questions about admissions, courses, fees and campus life, 24/7.`
        },
        {
            patterns: [/\b(about|history|when.*(founded|established)|university.*(is|about))\b/i],
            reply: () => `${KB.university} was established in ${KB.established} and is located in ${KB.location} on a ${KB.campus}. It is ${KB.accreditation}. We currently have ${KB.students} students, ${KB.faculty} faculty & staff, ${KB.schools} schools, and ${KB.programs} programs.`
        },
        {
            patterns: [/\b(course|program|branch|stream|specialization)s?\b/i],
            reply: (msg) => {
                if (/pg|master|post\s?grad/i.test(msg)) {
                    return `📚 Postgraduate (PG) programs include:\n• ${KB.pgCourses.join('\n• ')}\n\nWant to see fees or apply? Just ask "fees" or "apply now".`;
                }
                if (/diploma/i.test(msg)) {
                    return `📚 Diploma programs include:\n• ${KB.diplomaCourses.join('\n• ')}`;
                }
                if (/phd|doctor/i.test(msg)) {
                    return `📚 Doctoral (Ph.D.) programs include:\n• ${KB.phdCourses.join('\n• ')}`;
                }
                return `📚 Undergraduate (UG) programs include:\n• ${KB.ugCourses.join('\n• ')}\n\nWe also offer PG, Diploma & Ph.D. programs — ask me about "PG courses", "diploma courses" or "PhD courses" for those lists.`;
            }
        },
        {
            patterns: [/\b(school|department|faculty of)s?\b/i],
            reply: () => `🏫 ${KB.university} has ${KB.schools} schools:\n• ${KB.schoolsList.join('\n• ')}`
        },
        {
            patterns: [/\b(fee|fees|tuition|cost|price|how much)\b/i],
            reply: () => `💰 Fees vary by course — ${KB.feeRange}. Hostel fees are around ${KB.hostelFee}.\n\nFor the exact fee of every course, click "Fee Structure" in the top menu, or I can open it for you — just say "open fee structure".`
        },
        {
            patterns: [/\bopen fee structure\b/i],
            reply: () => { if (window.openFeeStructure) window.openFeeStructure(); return `Opening the full Fee Structure for you... 📄`; }
        },
        {
            patterns: [/\b(admission|apply|application|how.*(apply|admit)|enroll|register)\b/i],
            reply: () => `📝 Applying is simple and requires no login:\n1. Click "Apply Now 2026"\n2. Fill your personal details, course type & preferred course\n3. Submit — our admissions team will contact you shortly\n\nShall I open the Application form for you? Say "open apply form".`
        },
        {
            patterns: [/\bopen apply form\b/i],
            reply: () => { if (window.openApply) window.openApply(); return `Opening the Application form for you... ✍️`; }
        },
        {
            patterns: [/\b(eligibility|criteria|documents?\s*(required|needed))\b/i],
            reply: () => `📋 Eligibility generally depends on the course (e.g. UG programs typically require 10+2 with relevant subjects; PG requires a relevant Bachelor's degree). Common documents needed: 10th & 12th mark sheets, transfer/character certificate, ID proof, passport-size photos, and category certificate (if applicable). For course-specific eligibility, please contact admissions at ${KB.email} or ${KB.phone}.`
        },
        {
            patterns: [/\b(placement|job|recruit|package|company)s?\b/i],
            reply: () => `📊 Placement highlights and company details are available inside the Student Portal after logging in. In general, KRMU has strong industry tie-ups across engineering, management and other schools. Log in to your student dashboard to see the full placement report.`
        },
        {
            patterns: [/\b(hostel|accommodation|residence|dorm)\b/i],
            reply: () => `🏠 On-campus hostel accommodation is available for around ${KB.hostelFee}, with separate facilities for boys and girls, mess, Wi-Fi, and 24x7 security.`
        },
        {
            patterns: [/\b(contact|phone|email|address|reach|location|where.*(university|campus))\b/i],
            reply: () => `📍 ${KB.university}\n${KB.location}\n✉️ ${KB.email}\n☎️ ${KB.phone}`
        },
        {
            patterns: [/\b(login|log in|sign in|portal|student portal|faculty portal)\b/i],
            reply: () => `🔐 You can log in via the "Student Login" button at the top-right of the page. Students, Faculty, and Admins all use the same login — just pick your role. Say "open login" and I'll open it for you.`
        },
        {
            patterns: [/\bopen login\b/i],
            reply: () => { if (window.openLogin) window.openLogin(); return `Opening the login window for you... 🔑`; }
        },
        {
            patterns: [/\b(calendar|academic calendar|exam date|semester date)s?\b/i],
            reply: () => `🗓️ You can download the full Academic Calendar (PDF) from the "Academic Calendar" quick-link on the home page. Say "open calendar" and I'll open it for you.`
        },
        {
            patterns: [/\bopen calendar\b/i],
            reply: () => { if (window.openAcademicCalendarPDF) window.openAcademicCalendarPDF(); return `Opening the Academic Calendar... 📅`; }
        },
        {
            patterns: [/\b(research|r&d|publication|patent)s?\b/i],
            reply: () => `🔬 KRMU has an active Research & Development Cell working across engineering, sciences, management and more. Say "open research" to view details.`
        },
        {
            patterns: [/\bopen research\b/i],
            reply: () => { if (window.openResearchModal) window.openResearchModal(); return `Opening the Research & Development section... 🔬`; }
        },
        {
            patterns: [/\b(scholarship|financial aid|discount)s?\b/i],
            reply: () => `🎓 Merit and category-based scholarships may be available depending on your entrance score and category. For the latest scholarship policy, please contact admissions at ${KB.email} or ${KB.phone}.`
        },
        {
            patterns: [/\b(thank|thanks|thank you|thnx|ty)\b/i],
            reply: () => `You're welcome! 😊 Is there anything else you'd like to know about ${KB.university}?`
        },
        {
            patterns: [/\b(bye|goodbye|see you|exit|close)\b/i],
            reply: () => `Goodbye! 👋 Feel free to reopen this chat anytime you have questions. All the best!`
        }
    ];

    const FALLBACK = () => `I'm not fully sure about that one 🤔 — could you rephrase, or try asking about: courses, fees, admission, hostel, placements, login, contact, or academic calendar? You can also reach our admissions team directly at ${KB.email} / ${KB.phone}.`;

    function getBotReply(userMsg) {
        for (const intent of INTENTS) {
            for (const pattern of intent.patterns) {
                if (pattern.test(userMsg)) return intent.reply(userMsg);
            }
        }
        return FALLBACK();
    }

    // ---------- UI wiring ----------
    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('soetChatbotBtn');
        const win = document.getElementById('soetChatbotWindow');
        const body = document.getElementById('cbBody');
        const input = document.getElementById('cbInput');
        const sendBtn = document.getElementById('cbSendBtn');
        const closeBtn = document.getElementById('cbCloseBtn');
        const quickReplies = document.getElementById('cbQuickReplies');

        if (!btn || !win || !body || !input || !sendBtn) return;

        let greeted = false;

        function scrollToBottom() {
            body.scrollTop = body.scrollHeight;
        }

        function addMessage(text, sender) {
            const msg = document.createElement('div');
            msg.className = 'cb-msg ' + sender;
            msg.textContent = text;
            body.appendChild(msg);
            scrollToBottom();
        }

        function showTyping() {
            const typing = document.createElement('div');
            typing.className = 'cb-typing';
            typing.id = 'cbTypingIndicator';
            typing.innerHTML = '<span></span><span></span><span></span>';
            body.appendChild(typing);
            scrollToBottom();
        }

        function hideTyping() {
            const typing = document.getElementById('cbTypingIndicator');
            if (typing) typing.remove();
        }

        function handleUserMessage(text) {
            text = text.trim();
            if (!text) return;
            addMessage(text, 'user');
            input.value = '';
            sendBtn.disabled = true;
            showTyping();
            const delay = 500 + Math.random() * 500;
            setTimeout(function () {
                hideTyping();
                const reply = getBotReply(text);
                addMessage(reply, 'bot');
                sendBtn.disabled = false;
                input.focus();
            }, delay);
        }

        btn.addEventListener('click', function () {
            win.classList.toggle('open');
            if (win.classList.contains('open')) {
                input.focus();
                if (!greeted) {
                    greeted = true;
                    showTyping();
                    setTimeout(function () {
                        hideTyping();
                        addMessage(`Hi! 👋 I'm the SOET AI Assistant. Ask me about admissions, courses, fees, hostel, placements or anything else about ${KB.university}.`, 'bot');
                    }, 600);
                }
            }
        });

        closeBtn.addEventListener('click', function () {
            win.classList.remove('open');
        });

        sendBtn.addEventListener('click', function () {
            handleUserMessage(input.value);
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleUserMessage(input.value);
            }
        });

        if (quickReplies) {
            quickReplies.querySelectorAll('.cb-chip').forEach(function (chip) {
                chip.addEventListener('click', function () {
                    handleUserMessage(chip.getAttribute('data-q'));
                });
            });
        }
    });

})();

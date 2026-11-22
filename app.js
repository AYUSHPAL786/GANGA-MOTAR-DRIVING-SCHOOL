// Ganga Motor Driving Training School - Interactive App Engine

// State Management
let currentFilterCategory = 'all';
let activeCourseForSyllabus = null;
let bookings = [];
let students = [];
let currentStudent = null;

// Calculator State
let calcState = {
  vehicleType: 'hatchback',
  basePrice: 4500,
  transmission: 'manual',
  durationDays: 15,
  hasPickup: false,
  hasLicense: true,
  hasWeekend: false,
  couponDiscount: 1000,
  appliedCoupon: 'GANGA1000'
};

// Quiz Engine State
let quizState = {
  currentQuestionIndex: 0,
  score: 0,
  timerSeconds: 30,
  timerInterval: null,
  answered: false,
  userAnswers: []
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initStudentAuth();
  renderCourses();
  renderFleet();
  renderInstructors();
  renderTestimonials();
  renderFAQs();
  populateBookingDropdowns();
  updateCalculator();
  updateAdminTable();
  lucide.createIcons();
});

// ==================== LOCAL STORAGE & BOOKINGS ====================
function initStorage() {
  const savedBookings = localStorage.getItem('ganga_bookings');
  if (savedBookings) {
    try {
      bookings = JSON.parse(savedBookings);
    } catch (e) {
      bookings = [...GANGA_DATA.initialBookings];
    }
  } else {
    bookings = [...GANGA_DATA.initialBookings];
    localStorage.setItem('ganga_bookings', JSON.stringify(bookings));
  }

  // Initialize Students Storage
  const savedStudents = localStorage.getItem('ganga_students');
  if (savedStudents) {
    try {
      students = JSON.parse(savedStudents);
    } catch (e) {
      students = [...GANGA_DATA.defaultStudents];
    }
  } else {
    students = [...GANGA_DATA.defaultStudents];
    localStorage.setItem('ganga_students', JSON.stringify(students));
  }

  // Check saved active student session
  const activeStudentId = localStorage.getItem('ganga_active_student_id');
  if (activeStudentId) {
    currentStudent = students.find(s => s.id === activeStudentId) || null;
  }
}

function saveStudents() {
  localStorage.setItem('ganga_students', JSON.stringify(students));
  if (currentStudent) {
    localStorage.setItem('ganga_active_student_id', currentStudent.id);
  } else {
    localStorage.removeItem('ganga_active_student_id');
  }
}

function saveBookings() {
  localStorage.setItem('ganga_bookings', JSON.stringify(bookings));
  updateAdminTable();
}

// ==================== COURSE RENDERING & FILTERING ====================
function renderCourses() {
  const grid = document.getElementById('course-grid');
  if (!grid) return;

  const filtered = currentFilterCategory === 'all' 
    ? GANGA_DATA.courses 
    : GANGA_DATA.courses.filter(c => c.category === currentFilterCategory);

  grid.innerHTML = filtered.map(course => `
    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <!-- Card Header & Badge -->
        <div class="p-6 pb-4 border-b border-slate-100 relative">
          <span class="inline-block px-3 py-1 rounded-full text-xs font-bold ${
            course.badge.includes('Popular') ? 'bg-amber-100 text-amber-800' :
            course.badge.includes('Best Value') ? 'bg-emerald-100 text-emerald-800' :
            'bg-sky-100 text-sky-800'
          } mb-3">
            ${course.badge}
          </span>
          <h3 class="text-xl font-bold text-slate-900 font-heading group-hover:text-sky-600 transition">${course.title}</h3>
          <p class="text-xs text-slate-500 mt-1.5 leading-relaxed">${course.description}</p>
        </div>

        <!-- Specs Bar -->
        <div class="px-6 py-3 bg-slate-50 border-b border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div class="flex items-center">
            <i data-lucide="clock" class="w-3.5 h-3.5 mr-1.5 text-sky-600"></i>
            <span>${course.durationDays} Days (${course.sessionMinutes}m/day)</span>
          </div>
          <div class="flex items-center">
            <i data-lucide="car" class="w-3.5 h-3.5 mr-1.5 text-sky-600"></i>
            <span>${course.transmission}</span>
          </div>
        </div>

        <!-- Features List -->
        <div class="p-6 space-y-2.5">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">What is Included:</div>
          ${course.features.map(f => `
            <div class="flex items-start text-xs text-slate-700">
              <i data-lucide="check" class="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5"></i>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Pricing & Actions -->
      <div class="p-6 pt-3 border-t border-slate-100 bg-slate-50/50">
        <div class="flex items-baseline justify-between mb-4">
          <div>
            <span class="text-xs text-slate-400 line-through">₹${course.originalPrice}</span>
            <div class="text-2xl font-extrabold text-slate-900 font-heading">₹${course.price.toLocaleString('en-IN')}</div>
          </div>
          <span class="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            Save ₹${(course.originalPrice - course.price).toLocaleString('en-IN')}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button onclick="viewSyllabus('${course.id}')" class="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition flex items-center justify-center">
            <i data-lucide="book-open" class="w-3.5 h-3.5 mr-1.5 text-sky-600"></i> Syllabus
          </button>
          <button onclick="bookSpecificCourse('${course.id}')" class="px-3 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition flex items-center justify-center">
            <i data-lucide="calendar" class="w-3.5 h-3.5 mr-1.5"></i> Book Now
          </button>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function filterCourses(category) {
  currentFilterCategory = category;
  document.querySelectorAll('.course-filter-btn').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.className = "course-filter-btn active px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition bg-sky-600 text-white shadow-sm";
    } else {
      btn.className = "course-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition bg-white text-slate-700 hover:bg-slate-100 border border-slate-200";
    }
  });
  renderCourses();
}

// ==================== SYLLABUS MODAL ====================
function viewSyllabus(courseId) {
  const course = GANGA_DATA.courses.find(c => c.id === courseId);
  if (!course) return;
  activeCourseForSyllabus = course;

  document.getElementById('modal-syllabus-title').textContent = `${course.title} - Day-by-Day Syllabus`;
  document.getElementById('modal-syllabus-badge').textContent = `${course.durationDays} Days Curriculum (${course.transmission})`;

  const contentBox = document.getElementById('modal-syllabus-content');
  contentBox.innerHTML = course.curriculum.map((item, index) => `
    <div class="flex items-start space-x-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
      <div class="px-2.5 py-1 rounded-lg bg-sky-600 text-white font-extrabold text-xs shrink-0">${item.day}</div>
      <div>
        <h4 class="text-xs sm:text-sm font-bold text-slate-900">${item.topic}</h4>
        <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${item.desc}</p>
      </div>
    </div>
  `).join('');

  document.getElementById('syllabus-modal').classList.remove('hidden');
  lucide.createIcons();
}

function closeSyllabusModal() {
  document.getElementById('syllabus-modal').classList.add('hidden');
}

function bookCurrentSyllabusCourse() {
  closeSyllabusModal();
  if (activeCourseForSyllabus) {
    bookSpecificCourse(activeCourseForSyllabus.id);
  } else {
    openBookingModal();
  }
}

// ==================== FLEET, INSTRUCTORS, FAQS, REVIEWS ====================
function renderFleet() {
  const grid = document.getElementById('fleet-grid');
  if (!grid) return;

  grid.innerHTML = GANGA_DATA.fleet.map(v => `
    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div class="h-48 relative overflow-hidden bg-slate-100">
        <img src="${v.image}" alt="${v.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
          ${v.category}
        </span>
      </div>
      <div class="p-6 space-y-3">
        <h3 class="text-lg font-bold text-slate-900 font-heading">${v.name}</h3>
        <p class="text-xs text-slate-600 leading-relaxed">${v.features}</p>
        
        <div class="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
          <div class="flex items-center text-slate-700">
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500 mr-2 shrink-0"></i>
            <span class="font-medium">${v.safety}</span>
          </div>
          <div class="flex items-center text-slate-700">
            <i data-lucide="settings" class="w-4 h-4 text-sky-500 mr-2 shrink-0"></i>
            <span class="font-medium">${v.engine}</span>
          </div>
        </div>

        <button onclick="openBookingModal()" class="w-full mt-2 py-2.5 rounded-xl border border-sky-600 text-sky-600 hover:bg-sky-50 text-xs font-bold transition">
          Book Session in this Car
        </button>
      </div>
    </div>
  `).join('');
}

function renderInstructors() {
  const grid = document.getElementById('instructors-grid');
  if (!grid) return;

  grid.innerHTML = GANGA_DATA.instructors.map(inst => `
    <div class="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-3 shadow-sm hover:shadow-lg transition">
      <img src="${inst.avatar}" alt="${inst.name}" class="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-sky-100">
      <div>
        <h4 class="text-base font-bold text-slate-900 font-heading">${inst.name}</h4>
        <p class="text-xs font-semibold text-sky-600">${inst.role}</p>
      </div>

      <div class="flex items-center justify-center text-amber-400 text-xs">
        <i data-lucide="star" class="w-3.5 h-3.5 fill-current mr-1"></i>
        <span class="font-bold text-slate-800">${inst.rating} / 5.0</span>
        <span class="text-slate-400 ml-1.5">(${inst.experience})</span>
      </div>

      <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600">
        <span class="font-semibold text-slate-800 block text-[11px] uppercase tracking-wider mb-0.5">Specialty</span>
        ${inst.specialty}
      </div>

      <div class="text-[11px] text-slate-500">
        Languages: <span class="font-medium text-slate-700">${inst.languages}</span>
      </div>

      <button onclick="bookWithInstructor('${inst.name}')" class="w-full mt-2 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition flex items-center justify-center border border-sky-100">
        <i data-lucide="calendar" class="w-3.5 h-3.5 mr-1.5"></i> Book with ${inst.name.split(' ')[0]}
      </button>
    </div>
  `).join('');
}

function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  grid.innerHTML = GANGA_DATA.testimonials.map(t => `
    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div class="space-y-3">
        <div class="flex justify-between items-start">
          <div class="flex items-center space-x-3">
            <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full object-cover">
            <div>
              <h4 class="text-sm font-bold text-slate-900">${t.name}</h4>
              <p class="text-[11px] text-slate-500">${t.course}</p>
            </div>
          </div>
          <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            ${t.badge}
          </span>
        </div>

        <div class="flex text-amber-400 text-xs">
          ${Array(t.rating).fill('<i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>').join('')}
        </div>

        <p class="text-xs text-slate-600 leading-relaxed italic">"${t.comment}"</p>
      </div>

      <div class="text-[10px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
        Verified Review • ${t.date}
      </div>
    </div>
  `).join('');
}

function renderFAQs() {
  const container = document.getElementById('faqs-accordion');
  if (!container) return;

  container.innerHTML = GANGA_DATA.faqs.map((faq, i) => `
    <div class="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button onclick="toggleFAQ(${i})" class="w-full text-left p-4 sm:p-5 flex justify-between items-center text-sm sm:text-base font-bold text-slate-800 hover:text-sky-600 transition">
        <span>${faq.q}</span>
        <i data-lucide="chevron-down" id="faq-icon-${i}" class="w-4 h-4 text-slate-400 transition-transform duration-200"></i>
      </button>
      <div id="faq-ans-${i}" class="hidden px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
        ${faq.a}
      </div>
    </div>
  `).join('');
}

function toggleFAQ(index) {
  const ans = document.getElementById(`faq-ans-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!ans) return;

  if (ans.classList.contains('hidden')) {
    ans.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    ans.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
  }
}

// ==================== FEE CALCULATOR ENGINE ====================
function setCalcVehicle(type, basePrice) {
  calcState.vehicleType = type;
  calcState.basePrice = basePrice;

  document.querySelectorAll('.calc-veh-btn').forEach(btn => {
    if (btn.dataset.veh === type) {
      btn.className = "calc-veh-btn active p-3 rounded-xl border-2 border-sky-600 bg-sky-50 text-left transition";
    } else {
      btn.className = "calc-veh-btn p-3 rounded-xl border border-slate-200 bg-white text-left hover:border-slate-300 transition";
    }
  });

  updateCalculator();
}

function handleDurationSlider(val) {
  calcState.durationDays = parseInt(val, 10);
  const label = document.getElementById('calc-days-label');
  if (label) {
    if (calcState.durationDays <= 7) {
      label.textContent = `${calcState.durationDays} Days (Crash / Refresher)`;
    } else if (calcState.durationDays <= 15) {
      label.textContent = `${calcState.durationDays} Days (Standard)`;
    } else if (calcState.durationDays <= 21) {
      label.textContent = `${calcState.durationDays} Days (Comprehensive)`;
    } else {
      label.textContent = `${calcState.durationDays} Days (Pro VIP)`;
    }
  }
  updateCalculator();
}

function applyCoupon() {
  const input = document.getElementById('calc-coupon');
  const status = document.getElementById('coupon-status');
  if (!input || !status) return;

  const code = input.value.trim().toUpperCase();
  if (code === 'DRIVE2026' || code === 'GANGA1000') {
    calcState.couponDiscount = 1000;
    calcState.appliedCoupon = code;
    status.textContent = `✅ Coupon '${code}' applied! Extra ₹1,000 discount.`;
    status.className = "text-[11px] text-emerald-600 font-semibold mt-1";
    showToast(`Coupon ${code} applied successfully!`);
  } else if (code === 'SAFETY500') {
    calcState.couponDiscount = 500;
    calcState.appliedCoupon = code;
    status.textContent = `✅ Coupon '${code}' applied! Extra ₹500 discount.`;
    status.className = "text-[11px] text-emerald-600 font-semibold mt-1";
    showToast(`Coupon ${code} applied successfully!`);
  } else {
    status.textContent = "❌ Invalid coupon code. Try 'DRIVE2026' or 'GANGA1000'.";
    status.className = "text-[11px] text-rose-500 font-semibold mt-1";
  }
  updateCalculator();
}

function updateCalculator() {
  const transRadio = document.querySelector('input[name="calc-transmission"]:checked');
  calcState.transmission = transRadio ? transRadio.value : 'manual';

  calcState.hasPickup = document.getElementById('addon-pickup')?.checked || false;
  calcState.hasLicense = document.getElementById('addon-license')?.checked || false;
  calcState.hasWeekend = document.getElementById('addon-weekend')?.checked || false;

  // Calculation Logic
  // Scale base price relative to 15 days standard
  const dayFactor = calcState.durationDays / 15;
  let calculatedBase = Math.round((calcState.basePrice * dayFactor) / 100) * 100;
  if (calculatedBase < 2000) calculatedBase = 2000;

  let transAdd = (calcState.transmission === 'automatic') ? 1000 : 0;
  
  let addOnsTotal = 0;
  if (calcState.hasPickup) addOnsTotal += 800;
  if (calcState.hasLicense) addOnsTotal += 1500;
  if (calcState.hasWeekend) addOnsTotal += 500;

  let totalBeforeDiscount = calculatedBase + transAdd + addOnsTotal;
  let finalPrice = Math.max(1500, totalBeforeDiscount - calcState.couponDiscount);

  // Update UI Breakdown
  const baseLabel = document.getElementById('breakdown-base-label');
  const basePriceEl = document.getElementById('breakdown-base-price');
  const transRow = document.getElementById('breakdown-trans-row');
  const addonsPriceEl = document.getElementById('breakdown-addons-price');
  const discountPriceEl = document.getElementById('breakdown-discount-price');
  const finalPriceEl = document.getElementById('calc-final-price');

  if (baseLabel) baseLabel.textContent = `Base Training (${calcState.durationDays} Days ${calcState.vehicleType.toUpperCase()}):`;
  if (basePriceEl) basePriceEl.textContent = `₹${calculatedBase.toLocaleString('en-IN')}`;
  
  if (transRow) {
    transRow.style.display = calcState.transmission === 'automatic' ? 'flex' : 'none';
  }

  if (addonsPriceEl) addonsPriceEl.textContent = `+₹${addOnsTotal.toLocaleString('en-IN')}`;
  if (discountPriceEl) discountPriceEl.textContent = `-₹${calcState.couponDiscount.toLocaleString('en-IN')}`;
  if (finalPriceEl) finalPriceEl.textContent = `₹${finalPrice.toLocaleString('en-IN')}`;
}

function bookCalculatedPackage() {
  openBookingModal();
  const courseSelect = document.getElementById('book-course');
  if (courseSelect) {
    if (calcState.vehicleType === 'twowheeler') {
      courseSelect.value = "Two-Wheeler Balance (Scooty / Bike)";
    } else if (calcState.transmission === 'automatic') {
      courseSelect.value = "Automatic Car Specialization (AMT/CVT)";
    } else if (calcState.durationDays > 15) {
      courseSelect.value = "Comprehensive Car Mastery + DL Package";
    } else {
      courseSelect.value = "Beginner 4-Wheeler Car Training";
    }
  }

  const transSelect = document.getElementById('book-transmission');
  if (transSelect) {
    transSelect.value = calcState.transmission === 'automatic' ? 'Automatic (AMT/CVT)' : 'Manual (Clutch/Gear)';
  }

  syncBookingPrice();
  showToast("Custom calculator options loaded into booking form!");
}

// ==================== INTERACTIVE RTO QUIZ ENGINE ====================
function startRTOQuiz() {
  quizState.currentQuestionIndex = 0;
  quizState.score = 0;
  quizState.userAnswers = [];
  
  document.getElementById('quiz-welcome').classList.add('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-play').classList.remove('hidden');

  loadQuizQuestion(0);
}

function loadQuizQuestion(index) {
  const q = GANGA_DATA.rtoQuizQuestions[index];
  if (!q) {
    showQuizResult();
    return;
  }

  quizState.answered = false;
  quizState.timerSeconds = 30;

  // Update progress
  document.getElementById('quiz-progress-text').textContent = `${index + 1} of ${GANGA_DATA.rtoQuizQuestions.length}`;
  document.getElementById('quiz-live-score').textContent = `${quizState.score}`;
  const pct = ((index + 1) / GANGA_DATA.rtoQuizQuestions.length) * 100;
  document.getElementById('quiz-progress-bar').style.width = `${pct}%`;

  // Display SVG if traffic sign
  const signBox = document.getElementById('quiz-sign-display');
  if (q.imageSvg) {
    signBox.innerHTML = q.imageSvg;
    signBox.classList.remove('hidden');
  } else {
    signBox.innerHTML = '';
    signBox.classList.add('hidden');
  }

  document.getElementById('quiz-question-title').textContent = q.question;

  // Options
  const optionsList = document.getElementById('quiz-options-list');
  optionsList.innerHTML = q.options.map((opt, optIndex) => `
    <button onclick="handleQuizAnswer(${optIndex})" id="quiz-opt-${optIndex}" class="quiz-option text-left p-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-700/60 text-slate-200 text-xs sm:text-sm font-medium flex items-center justify-between">
      <span><strong class="text-sky-400 mr-2">${String.fromCharCode(65 + optIndex)}.</strong> ${opt}</span>
      <span id="quiz-badge-${optIndex}" class="shrink-0 ml-2"></span>
    </button>
  `).join('');

  // Hide explanation & next button
  document.getElementById('quiz-explanation-box').classList.add('hidden');
  document.getElementById('quiz-next-btn').classList.add('hidden');

  // Start Timer
  clearInterval(quizState.timerInterval);
  const timerDisplay = document.getElementById('quiz-timer');
  timerDisplay.textContent = '30s';

  quizState.timerInterval = setInterval(() => {
    quizState.timerSeconds--;
    timerDisplay.textContent = `${quizState.timerSeconds}s`;

    if (quizState.timerSeconds <= 0) {
      clearInterval(quizState.timerInterval);
      if (!quizState.answered) {
        handleQuizAnswer(-1); // timeout
      }
    }
  }, 1000);

  lucide.createIcons();
}

function handleQuizAnswer(selectedIndex) {
  if (quizState.answered) return;
  quizState.answered = true;
  clearInterval(quizState.timerInterval);

  const q = GANGA_DATA.rtoQuizQuestions[quizState.currentQuestionIndex];
  const isCorrect = selectedIndex === q.correctIndex;

  if (isCorrect) {
    quizState.score++;
    document.getElementById('quiz-live-score').textContent = `${quizState.score}`;
  }

  // Visual cues on options
  q.options.forEach((_, optIndex) => {
    const btn = document.getElementById(`quiz-opt-${optIndex}`);
    const badge = document.getElementById(`quiz-badge-${optIndex}`);
    btn.classList.add('disabled');
    btn.onclick = null;

    if (optIndex === q.correctIndex) {
      btn.className = "quiz-option correct text-left p-4 rounded-xl border-2 border-emerald-500 bg-emerald-950/80 text-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-between";
      badge.innerHTML = `<span class="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full">Correct</span>`;
    } else if (optIndex === selectedIndex) {
      btn.className = "quiz-option incorrect text-left p-4 rounded-xl border-2 border-rose-500 bg-rose-950/80 text-rose-200 text-xs sm:text-sm font-bold flex items-center justify-between";
      badge.innerHTML = `<span class="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">Your Choice</span>`;
    }
  });

  // Show explanation
  const expBox = document.getElementById('quiz-explanation-box');
  const expText = document.getElementById('quiz-explanation-text');
  expText.textContent = q.explanation;
  expBox.classList.remove('hidden');

  // Show next button
  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  quizState.currentQuestionIndex++;
  if (quizState.currentQuestionIndex < GANGA_DATA.rtoQuizQuestions.length) {
    loadQuizQuestion(quizState.currentQuestionIndex);
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  clearInterval(quizState.timerInterval);
  document.getElementById('quiz-play').classList.add('hidden');
  const resultView = document.getElementById('quiz-result');
  resultView.classList.remove('hidden');

  const total = GANGA_DATA.rtoQuizQuestions.length;
  const score = quizState.score;
  const passed = score >= 9; // 60% standard RTO passing mark
  const pct = Math.round((score / total) * 100);

  const badgeIcon = document.getElementById('result-badge-icon');
  const title = document.getElementById('result-status-title');
  const subtitle = document.getElementById('result-status-subtitle');
  const certScore = document.getElementById('cert-score');

  if (passed) {
    badgeIcon.className = "w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40";
    badgeIcon.innerHTML = "🏆";
    title.textContent = "Congratulations! You Passed the RTO Exam!";
    title.className = "text-2xl sm:text-3xl font-extrabold font-heading text-emerald-400";
    subtitle.innerHTML = `You scored <span class="font-bold text-white">${score}/${total} (${pct}%)</span>. You have mastered Indian traffic signs and regulations!`;
  } else {
    badgeIcon.className = "w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl bg-amber-500/20 text-amber-400 border-2 border-amber-500/40";
    badgeIcon.innerHTML = "⚠️";
    title.textContent = "Keep Practicing! Needs Improvement";
    title.className = "text-2xl sm:text-3xl font-extrabold font-heading text-amber-400";
    subtitle.innerHTML = `You scored <span class="font-bold text-white">${score}/${total} (${pct}%)</span>. Passing mark is 9/15. Retake the test or join our classes for 1-on-1 coaching!`;
  }

  if (certScore) certScore.textContent = `${pct}%`;

  // Auto-record quiz result to active student profile
  if (currentStudent) {
    currentStudent.quizScore = `${score} / ${total} (${pct}% - ${passed ? 'RTO Ready' : 'Needs Practice'})`;
    saveStudents();
    updateStudentAuthUI();
  }

  lucide.createIcons();
}

function printCertificate() {
  const student = prompt("Enter your name for the RTO Readiness Certificate:", "Future Safe Driver");
  if (student) {
    document.getElementById('cert-student-name').textContent = student;
  }
  window.print();
}

// ==================== BOOKING & ADMISSION SYSTEM ====================
function populateBookingDropdowns() {
  const courseSelect = document.getElementById('book-course');
  if (!courseSelect) return;

  courseSelect.innerHTML = GANGA_DATA.courses.map(c => `
    <option value="${c.title}" data-price="${c.price}">
      ${c.title} - ₹${c.price.toLocaleString('en-IN')} (${c.durationDays} Days)
    </option>
  `).join('');

  // Default date to tomorrow
  const dateInput = document.getElementById('book-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }
}

function syncBookingPrice() {
  const courseSelect = document.getElementById('book-course');
  const priceDisplay = document.getElementById('book-price-display');
  if (!courseSelect || !priceDisplay) return;

  const selectedOpt = courseSelect.options[courseSelect.selectedIndex];
  const price = selectedOpt ? selectedOpt.getAttribute('data-price') : 4500;
  priceDisplay.textContent = `₹${parseInt(price || 4500, 10).toLocaleString('en-IN')}`;
}

function openBookingModal() {
  document.getElementById('booking-modal').classList.remove('hidden');
  syncBookingPrice();
  lucide.createIcons();
}

function closeBookingModal() {
  document.getElementById('booking-modal').classList.add('hidden');
}

function bookSpecificCourse(courseId) {
  const course = GANGA_DATA.courses.find(c => c.id === courseId);
  if (!course) return;

  openBookingModal();
  const courseSelect = document.getElementById('book-course');
  if (courseSelect) {
    courseSelect.value = course.title;
    syncBookingPrice();
  }

  const transSelect = document.getElementById('book-transmission');
  if (transSelect) {
    transSelect.value = course.transmission.includes('Automatic') ? 'Automatic (AMT/CVT)' : 'Manual (Clutch/Gear)';
  }
}

function handleHeroQuickBooking(event) {
  event.preventDefault();
  const name = document.getElementById('hero-name').value;
  const phone = document.getElementById('hero-phone').value;
  const course = document.getElementById('hero-course').value;
  const timing = document.getElementById('hero-timing').value;
  const pickup = document.getElementById('hero-pickup').value || "Doorstep Location";

  // Create booking object
  const bookingId = `GMD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking = {
    id: bookingId,
    studentName: name,
    phone: `+91 ${phone}`,
    email: "inquiry@gangamotordriving.com",
    courseTitle: course,
    transmission: course.includes('Automatic') ? 'Automatic' : 'Manual',
    slotTime: timing,
    startDate: new Date().toISOString().split('T')[0],
    pickupLocation: pickup,
    instructorPreference: "Senior Certified Trainer",
    amount: 4500,
    paymentStatus: "Pending Token",
    status: "Confirmed",
    bookedAt: new Date().toLocaleString()
  };

  bookings.unshift(newBooking);
  saveBookings();

  document.getElementById('hero-quick-form').reset();
  showAdmissionReceipt(newBooking);
  showToast(`Booking Successful! Your ID: ${bookingId}`);
}

function submitAdmissionBooking(event) {
  event.preventDefault();

  const name = document.getElementById('book-name').value;
  const phone = document.getElementById('book-phone').value;
  const email = document.getElementById('book-email').value || "student@gangamotordriving.com";
  const course = document.getElementById('book-course').value;
  const transmission = document.getElementById('book-transmission').value;
  const slot = document.getElementById('book-slot').value;
  const date = document.getElementById('book-date').value;
  const instructor = document.getElementById('book-instructor').value;
  const pickup = document.getElementById('book-pickup').value;
  const paymentMode = document.querySelector('input[name="payment-mode"]:checked')?.value || "Token Paid (₹500)";

  const courseObj = GANGA_DATA.courses.find(c => c.title === course) || { price: 4500 };

  const bookingId = `GMD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking = {
    id: bookingId,
    studentName: name,
    phone: `+91 ${phone}`,
    email: email,
    courseTitle: course,
    transmission: transmission,
    slotTime: slot,
    startDate: date,
    pickupLocation: pickup,
    instructorPreference: instructor,
    amount: courseObj.price,
    paymentStatus: paymentMode,
    status: "Confirmed",
    bookedAt: new Date().toLocaleString()
  };

  bookings.unshift(newBooking);
  saveBookings();

  closeBookingModal();
  document.getElementById('admission-form').reset();
  showAdmissionReceipt(newBooking);
  showToast(`Booking Confirmed! Welcome to Ganga Driving School.`);
}

function showAdmissionReceipt(booking) {
  document.getElementById('slip-id').textContent = booking.id;
  document.getElementById('slip-booking-date').textContent = new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  document.getElementById('slip-name').textContent = booking.studentName;
  document.getElementById('slip-phone').textContent = booking.phone;
  document.getElementById('slip-course').textContent = `${booking.courseTitle} (${booking.transmission})`;
  document.getElementById('slip-timing').textContent = booking.slotTime;
  document.getElementById('slip-start-date').textContent = booking.startDate;
  document.getElementById('slip-pickup').textContent = booking.pickupLocation;
  document.getElementById('slip-amount').textContent = `₹${booking.amount.toLocaleString('en-IN')}`;
  document.getElementById('slip-payment-status').textContent = booking.paymentStatus;

  // Configure WhatsApp link
  const waMsg = encodeURIComponent(
    `Hello Ganga Motor Driving School! I have booked my driving course.\n\n` +
    `*Booking ID:* ${booking.id}\n` +
    `*Student:* ${booking.studentName}\n` +
    `*Course:* ${booking.courseTitle}\n` +
    `*Batch Slot:* ${booking.slotTime}\n` +
    `*Start Date:* ${booking.startDate}\n` +
    `*Pickup Address:* ${booking.pickupLocation}\n` +
    `*Payment Mode:* ${booking.paymentStatus}\n\n` +
    `Please confirm my instructor and pickup schedule.`
  );

  const waBtn = document.getElementById('slip-whatsapp-btn');
  if (waBtn) {
    waBtn.href = `https://wa.me/${GANGA_DATA.schoolInfo.whatsapp}?text=${waMsg}`;
  }

  document.getElementById('receipt-modal').classList.remove('hidden');
  lucide.createIcons();
}

function closeReceiptModal() {
  document.getElementById('receipt-modal').classList.add('hidden');
}

// ==================== ADMIN & STAFF PORTAL ====================
function openAdminModal() {
  updateAdminTable();
  document.getElementById('admin-modal').classList.remove('hidden');
  lucide.createIcons();
}

function closeAdminModal() {
  document.getElementById('admin-modal').classList.add('hidden');
}

function updateAdminTable() {
  const tbody = document.getElementById('admin-bookings-table-body');
  if (!tbody) return;

  const search = document.getElementById('admin-search-input')?.value.toLowerCase() || '';
  const statusFilter = document.getElementById('admin-status-filter')?.value || 'all';

  const filtered = bookings.filter(b => {
    const matchSearch = b.studentName.toLowerCase().includes(search) || 
                        b.phone.includes(search) || 
                        b.id.toLowerCase().includes(search);
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Calculate Metrics
  const totalCount = bookings.length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const pendingCount = bookings.filter(b => b.status.includes('Pending')).length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);

  document.getElementById('admin-stat-total').textContent = totalCount;
  document.getElementById('admin-stat-confirmed').textContent = confirmedCount;
  document.getElementById('admin-stat-pending').textContent = pendingCount;
  document.getElementById('admin-stat-revenue').textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-8 text-center text-slate-400">
          No student records found matching the filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(b => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3.5 px-4">
        <div class="font-bold text-slate-900">${b.studentName}</div>
        <div class="font-mono text-[10px] text-slate-400">${b.id} • ${b.phone}</div>
      </td>
      <td class="py-3.5 px-4">
        <div class="font-semibold text-slate-800 text-[11px]">${b.courseTitle}</div>
        <span class="text-[10px] text-slate-500">${b.transmission}</span>
      </td>
      <td class="py-3.5 px-4">
        <div class="font-medium text-slate-800">${b.slotTime}</div>
        <div class="text-[10px] text-slate-500">Starts: ${b.startDate}</div>
      </td>
      <td class="py-3.5 px-4 text-[11px] text-slate-600 max-w-xs truncate" title="${b.pickupLocation}">
        ${b.pickupLocation}
      </td>
      <td class="py-3.5 px-4">
        <div class="font-bold text-slate-900">₹${b.amount ? b.amount.toLocaleString('en-IN') : '4,500'}</div>
        <div class="text-[10px] text-emerald-600">${b.paymentStatus}</div>
      </td>
      <td class="py-3.5 px-4">
        <button onclick="toggleBookingStatus('${b.id}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold ${
          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
          b.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
          'bg-amber-100 text-amber-800'
        } hover:opacity-80 transition" title="Click to cycle status">
          ${b.status} ↻
        </button>
      </td>
      <td class="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
        <button onclick="viewSlipById('${b.id}')" class="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100" title="View & Print Admission Slip">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
        </button>
        <a href="https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(b.studentName)},%20this%20is%20Ganga%20Motor%20Driving%20School%20regarding%20your%20class." target="_blank" class="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 inline-flex" title="WhatsApp Student">
          <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
        </a>
        <button onclick="deleteBooking('${b.id}')" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100" title="Delete record">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </td>
    </tr>
  `).join('');

  lucide.createIcons();
}

function filterAdminTable() {
  updateAdminTable();
}

function toggleBookingStatus(id) {
  const b = bookings.find(item => item.id === id);
  if (!b) return;

  if (b.status === 'Confirmed') {
    b.status = 'Completed';
  } else if (b.status === 'Completed') {
    b.status = 'Pending Verification';
  } else {
    b.status = 'Confirmed';
  }

  saveBookings();
  showToast(`Updated ${b.studentName}'s status to ${b.status}`);
}

function viewSlipById(id) {
  const b = bookings.find(item => item.id === id);
  if (b) {
    showAdmissionReceipt(b);
  }
}

function deleteBooking(id) {
  if (confirm("Are you sure you want to remove this booking record?")) {
    bookings = bookings.filter(b => b.id !== id);
    saveBookings();
    showToast("Booking record removed.");
  }
}

function exportBookingsCSV() {
  if (!bookings.length) {
    showToast("No bookings to export!");
    return;
  }

  const headers = ["Booking ID", "Student Name", "Phone", "Email", "Course", "Transmission", "Slot Time", "Start Date", "Pickup Location", "Amount", "Payment Status", "Status", "Booked At"];
  
  const rows = bookings.map(b => [
    `"${b.id}"`,
    `"${b.studentName}"`,
    `"${b.phone}"`,
    `"${b.email}"`,
    `"${b.courseTitle}"`,
    `"${b.transmission}"`,
    `"${b.slotTime}"`,
    `"${b.startDate}"`,
    `"${b.pickupLocation.replace(/"/g, '""')}"`,
    b.amount,
    `"${b.paymentStatus}"`,
    `"${b.status}"`,
    `"${b.bookedAt}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Ganga_Driving_School_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("CSV file exported successfully!");
}

// ==================== STUDENT AUTH & DASHBOARD SYSTEM ====================
function initStudentAuth() {
  updateStudentAuthUI();
}

function updateStudentAuthUI() {
  const authLabel = document.getElementById('student-auth-label');
  const topLabel = document.getElementById('top-student-label');
  const mobileLabel = document.getElementById('mobile-student-btn-label');
  const mobileNavLabel = document.getElementById('mobile-nav-user-label');

  if (currentStudent) {
    const firstName = currentStudent.name.split(' ')[0];
    if (authLabel) authLabel.innerHTML = `👤 ${firstName} (${currentStudent.completedDays}/${currentStudent.totalDays})`;
    if (topLabel) topLabel.textContent = `Student: ${firstName}`;
    if (mobileLabel) mobileLabel.textContent = firstName;
    if (mobileNavLabel) mobileNavLabel.textContent = firstName;
  } else {
    if (authLabel) authLabel.textContent = "Student Login";
    if (topLabel) topLabel.textContent = "Student Portal";
    if (mobileLabel) mobileLabel.textContent = "Login";
    if (mobileNavLabel) mobileNavLabel.textContent = "Portal";
  }
}

function openStudentAuthModal() {
  if (currentStudent) {
    openStudentDashboardModal();
    return;
  }
  document.getElementById('student-auth-modal').classList.remove('hidden');
  lucide.createIcons();
}

function closeStudentAuthModal() {
  document.getElementById('student-auth-modal').classList.add('hidden');
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('student-login-form');
  const regForm = document.getElementById('student-register-form');
  const tabLoginBtn = document.getElementById('tab-login-btn');
  const tabRegBtn = document.getElementById('tab-register-btn');
  const modalTitle = document.getElementById('auth-modal-title');

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    regForm.classList.add('hidden');
    tabLoginBtn.className = "flex-1 py-2.5 border-b-2 border-sky-600 text-sky-600 font-bold transition";
    tabRegBtn.className = "flex-1 py-2.5 border-b-2 border-transparent text-slate-500 font-bold hover:text-slate-800 transition";
    modalTitle.textContent = "Student Sign In";
  } else {
    loginForm.classList.add('hidden');
    regForm.classList.remove('hidden');
    tabRegBtn.className = "flex-1 py-2.5 border-b-2 border-sky-600 text-sky-600 font-bold transition";
    tabLoginBtn.className = "flex-1 py-2.5 border-b-2 border-transparent text-slate-500 font-bold hover:text-slate-800 transition";
    modalTitle.textContent = "New Student Registration";
  }
}

function loginDemoStudent() {
  const demoStudent = students.find(s => s.email === "rahul@gmail.com") || students[0];
  if (demoStudent) {
    currentStudent = demoStudent;
    saveStudents();
    closeStudentAuthModal();
    updateStudentAuthUI();
    openStudentDashboardModal();
    showToast(`Welcome back, ${demoStudent.name}! You are in the Student Dashboard.`);
  }
}

function handleStudentLogin(event) {
  event.preventDefault();
  const identifier = document.getElementById('login-identifier').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value.trim();

  const student = students.find(s => 
    (s.email.toLowerCase() === identifier || s.phone.replace(/[^0-9]/g, '').includes(identifier)) && 
    (s.password === password || password === "password123")
  );

  if (student) {
    currentStudent = student;
    saveStudents();
    closeStudentAuthModal();
    updateStudentAuthUI();
    openStudentDashboardModal();
    showToast(`Login Successful! Welcome, ${student.name}.`);
  } else {
    showToast("Invalid credentials. Try demo student 'rahul@gmail.com' / 'password123'");
  }
}

function handleStudentRegister(event) {
  event.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const course = document.getElementById('reg-course').value;
  const password = document.getElementById('reg-password').value.trim();
  const pickup = document.getElementById('reg-pickup').value.trim() || "School Campus Pickup";

  const studentId = `GMD-STD-${Math.floor(8200 + Math.random() * 800)}`;
  const newStudent = {
    id: studentId,
    name: name,
    email: email,
    password: password || "password123",
    phone: `+91 ${phone}`,
    enrolledCourse: course,
    vehicle: course.includes('Automatic') ? "Hyundai Grand i10 (Automatic)" : "Maruti Suzuki Swift (Manual)",
    instructor: "Rajesh Sharma (Senior Instructor)",
    batchTiming: "7:00 AM - 7:45 AM",
    totalDays: course.includes('21') ? 21 : course.includes('7') ? 7 : 15,
    completedDays: 1,
    status: "Active Learner",
    admissionDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    rtoDlNumber: `DL-04-${new Date().getFullYear()}-LL-${Math.floor(1000 + Math.random() * 9000)}`,
    nextLesson: "Tomorrow at 7:00 AM (Maruti Swift DL-04-AB-1234)",
    pickupAddress: pickup,
    quizScore: "Not Attempted Yet",
    attendance: [
      { day: 1, topic: "Cockpit Drill, Seat Adjust & ABC Controls", date: "Today", status: "Completed", score: "5/5" },
      { day: 2, topic: "Clutch Biting Point & Smooth Launch", date: "Tomorrow", status: "Scheduled", score: "Pending" },
      { day: 3, topic: "Gear Shifting 1st to 2nd", date: "Upcoming", status: "Scheduled", score: "Pending" },
      { day: 4, topic: "90° Left & Right Turns", date: "Upcoming", status: "Scheduled", score: "Pending" },
      { day: 5, topic: "City Traffic & Lane Discipline", date: "Upcoming", status: "Scheduled", score: "Pending" },
      { day: 6, topic: "Flyover Slope Handbrake Launch", date: "Upcoming", status: "Scheduled", score: "Pending" },
      { day: 7, topic: "Parallel & Reverse Parking", date: "Upcoming", status: "Scheduled", score: "Pending" },
      { day: 8, topic: "Automated RTO H-Track Simulator", date: "Upcoming", status: "Scheduled", score: "Pending" }
    ]
  };

  students.push(newStudent);
  currentStudent = newStudent;
  saveStudents();

  closeStudentAuthModal();
  updateStudentAuthUI();
  openStudentDashboardModal();
  showToast(`Registration Complete! Your Roll ID is ${studentId}.`);
}

function openStudentDashboardModal() {
  if (!currentStudent) {
    openStudentAuthModal();
    return;
  }

  // Populate Dashboard UI
  document.getElementById('dash-student-name').textContent = currentStudent.name;
  document.getElementById('dash-student-id').textContent = currentStudent.id;
  document.getElementById('dash-student-phone').textContent = currentStudent.phone;
  document.getElementById('dash-course-name').textContent = `${currentStudent.enrolledCourse} (${currentStudent.vehicle})`;
  document.getElementById('dash-status-badge').textContent = currentStudent.status;

  // Digital ID Card
  document.getElementById('id-card-name').textContent = currentStudent.name;
  document.getElementById('id-card-ll').textContent = currentStudent.rtoDlNumber;
  document.getElementById('id-card-trainer').textContent = currentStudent.instructor;
  document.getElementById('id-card-vehicle').textContent = currentStudent.vehicle;
  document.getElementById('id-card-slot').textContent = currentStudent.batchTiming;

  // Metrics
  const pct = Math.round((currentStudent.completedDays / currentStudent.totalDays) * 100);
  document.getElementById('dash-progress-pct').textContent = `${pct}%`;
  document.getElementById('dash-progress-fill').style.width = `${pct}%`;
  document.getElementById('dash-completed-days').textContent = currentStudent.completedDays;
  document.getElementById('dash-total-days').textContent = currentStudent.totalDays;

  document.getElementById('dash-next-lesson').textContent = currentStudent.nextLesson;
  document.getElementById('dash-trainer-name').textContent = currentStudent.instructor;
  document.getElementById('dash-quiz-score').textContent = currentStudent.quizScore;

  // WhatsApp Link for Assigned Trainer
  const waBtn = document.getElementById('dash-whatsapp-instructor');
  if (waBtn) {
    const msg = encodeURIComponent(`Hi ${currentStudent.instructor}, I am ${currentStudent.name} (Roll ID: ${currentStudent.id}). I wanted to check about my upcoming driving class.`);
    waBtn.href = `https://wa.me/${GANGA_DATA.schoolInfo.whatsapp}?text=${msg}`;
  }

  // Populate Attendance & Milestones
  const tbody = document.getElementById('dash-attendance-body');
  if (tbody && currentStudent.attendance) {
    tbody.innerHTML = currentStudent.attendance.map(item => `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-2.5 px-3.5 font-bold text-slate-900">Day ${item.day}</td>
        <td class="py-2.5 px-3.5 text-slate-800">${item.topic}</td>
        <td class="py-2.5 px-3.5 text-slate-500 font-mono text-[11px]">${item.date}</td>
        <td class="py-2.5 px-3.5 font-semibold ${item.score.includes('5') ? 'text-emerald-700' : 'text-slate-600'}">${item.score}</td>
        <td class="py-2.5 px-3.5 text-right">
          <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
            item.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
          }">
            ${item.status}
          </span>
        </td>
      </tr>
    `).join('');
  }

  document.getElementById('student-dashboard-modal').classList.remove('hidden');
  lucide.createIcons();
}

function closeStudentDashboardModal() {
  document.getElementById('student-dashboard-modal').classList.add('hidden');
}

function toggleStudentIdCard() {
  const card = document.getElementById('student-id-card-view');
  if (card) {
    card.classList.toggle('hidden');
    lucide.createIcons();
  }
}

function requestReschedule() {
  const reason = prompt("Enter preferred new date/time or reason for rescheduling:", "Need to reschedule to Sunday 8:00 AM");
  if (reason) {
    showToast("Reschedule request forwarded to training coordinator! You will receive confirmation via WhatsApp.");
  }
}

function logoutStudent() {
  currentStudent = null;
  saveStudents();
  closeStudentDashboardModal();
  updateStudentAuthUI();
  showToast("You have been logged out of the Student Portal.");
}

function bookWithInstructor(instructorName) {
  openBookingModal();
  const select = document.getElementById('book-instructor');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.includes(instructorName) || select.options[i].text.includes(instructorName)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  showToast(`Selected trainer: ${instructorName}`);
}

// ==================== REVIEWS & CONTACT ====================
function openReviewModal() {
  document.getElementById('review-modal').classList.remove('hidden');
  lucide.createIcons();
}

function closeReviewModal() {
  document.getElementById('review-modal').classList.add('hidden');
}

function submitReview(event) {
  event.preventDefault();
  const name = document.getElementById('review-name').value;
  const course = document.getElementById('review-course').value;
  const rating = parseInt(document.getElementById('review-rating').value, 10);
  const comment = document.getElementById('review-comment').value;

  const newReview = {
    name: name,
    course: course,
    rating: rating,
    date: "Just Now",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    comment: comment,
    badge: "Verified Student"
  };

  GANGA_DATA.testimonials.unshift(newReview);
  renderTestimonials();
  closeReviewModal();
  showToast("Thank you for your review! It is now live on our website.");
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contact-name').value;
  const phone = document.getElementById('contact-phone').value;
  const interest = document.getElementById('contact-interest').value;
  const message = document.getElementById('contact-message').value;

  showToast(`Thank you ${name}! Our senior instructor will call you at ${phone} shortly.`);
  event.target.reset();
}

// ==================== UI HELPERS ====================
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = "toast-message px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 border border-slate-700";
  toast.innerHTML = `
    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

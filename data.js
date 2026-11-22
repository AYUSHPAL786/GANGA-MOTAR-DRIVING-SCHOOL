// Ganga Motor Driving Training School - Data Store
const GANGA_DATA = {
  schoolInfo: {
    name: "Ganga Motor Driving Training School",
    hindiName: "गंगा मोटर ड्राइविंग ट्रेनिंग स्कूल",
    tagline: "Drive with Confidence, Master Every Road",
    govtReg: "Govt. Regd. No. RTO/DL/2011/5892",
    establishedYear: 2011,
    phone: "+91 89575 19919",
    altPhone: "+91 80905 19188",
    whatsapp: "918957519919",
    email: "admissions@gangamotordriving.com",
    address: "Plot No. 42, Ganga Complex, Opp. Regional Transport Office (RTO), Main Ring Road",
    branchAddress: "Shop 14, Metro Pillar 218, Sector 12 Market",
    operatingHours: "6:00 AM - 8:00 PM (Monday to Sunday)",
    stats: {
      studentsTrained: "14,500+",
      passingRate: "99.4%",
      experienceYears: "15+",
      certifiedTrainers: "18+",
      dualControlCars: "12"
    }
  },

  courses: [
    {
      id: "course-car-beginner",
      title: "Beginner 4-Wheeler Car Training",
      category: "car",
      badge: "Most Popular",
      durationDays: 15,
      sessionsCount: 15,
      sessionMinutes: 30,
      price: 4500,
      originalPrice: 5500,
      vehicle: "Maruti Suzuki Swift / WagonR (Dual Control)",
      transmission: "Manual",
      description: "Complete zero-to-expert training designed for total beginners. Covers basic controls, clutch biting point, city traffic, parking drills, and RTO test readiness.",
      features: [
        "15 Days Daily 30 mins Practical Driving",
        "Dual-Control Safety Car (Instructor brake & clutch)",
        "Zero-clutch stalling & bumper traffic drills",
        "L-Parking, Parallel Parking & Reverse training",
        "Mechanical briefing (Engine oil, coolant, tyre puncture change)",
        "Free RTO Mock Test & Sarathi LL application assistance",
        "Doorstep pickup & drop available"
      ],
      curriculum: [
        { day: "Day 1-2", topic: "Cockpit Drill & ABC Controls", desc: "Seat adjustment, mirrors, pedals (Accelerator, Brake, Clutch), neutral gear check & ignition." },
        { day: "Day 3-4", topic: "Biting Point & Smooth Moving", desc: "Finding clutch bite point, smooth movement without stalling, steering rotation technique." },
        { day: "Day 5-6", topic: "Gear Shifting (1st to 3rd)", desc: "Synchronized clutch-gear shift, speed-matching, gentle deceleration & smooth braking." },
        { day: "Day 7-8", topic: "Turns, Intersections & U-Turns", desc: "Indicator usage, side mirror checks, 90-degree turns, U-turns, and roundabout protocol." },
        { day: "Day 9-10", topic: "Moderate City Traffic", desc: "Lane discipline, maintaining safe following distance, dealing with two-wheelers and pedestrians." },
        { day: "Day 11-12", topic: "Slopes & Hill Start (Flyover)", desc: "Handbrake launch technique on steep inclines without rolling backward." },
        { day: "Day 13-14", topic: "Parking Mastery (H-Track & 8)", desc: "Parallel parking, reverse parking into tight slots, driving on RTO-simulated H and 8 tracks." },
        { day: "Day 15", topic: "Final Evaluation & RTO Simulation", desc: "Comprehensive driving trial without instructor intervention, emergency braking test." }
      ]
    },
    {
      id: "course-car-comprehensive",
      title: "Comprehensive Car Mastery + DL Package",
      category: "car",
      badge: "Best Value",
      durationDays: 21,
      sessionsCount: 21,
      sessionMinutes: 40,
      price: 6800,
      originalPrice: 8500,
      vehicle: "Swift / Dzire / Grand i10 (Dual Control)",
      transmission: "Manual & Intro to Automatic",
      description: "Our complete end-to-end package including 21 extensive practical sessions, highway driving, night driving, and end-to-end RTO Permanent License test representation.",
      features: [
        "21 Days Extended 40 mins Practical Driving",
        "Includes 2 sessions on Automatic Transmission car",
        "Highway Driving (60+ km/h safe cruising & overtaking)",
        "Night Driving session (Headlight beams, glare handling)",
        "Complete RTO Permanent License (DL) test slot booking & track practice",
        "Free Doorstep Pickup & Drop included",
        "Unlimited RTO Mock Tests access"
      ],
      curriculum: [
        { day: "Day 1-4", topic: "Basic Controls & Smooth Maneuvers", desc: "Pedal feel, friction point, steady speed maintenance, lane centering." },
        { day: "Day 5-8", topic: "Urban Traffic & Shifting", desc: "Bumper-to-bumper traffic management, half-clutch crawl, quick emergency stops." },
        { day: "Day 9-12", topic: "Complex Maneuvers & Flyovers", desc: "Navigating crowded markets, flyover hill-starts, roundabout navigation." },
        { day: "Day 13-16", topic: "Reverse, H-Track, 8-Track & Parallel", desc: "Precision reverse using 3 mirrors, parallel parking between cones." },
        { day: "Day 17-18", topic: "Highway & Night Driving", desc: "Safe lane switching at high speed, high/low beam etiquette, anti-glare mirrors." },
        { day: "Day 19", topic: "Automatic Car Familiarization", desc: "Creep mode, P-R-N-D gear selection, left-foot rest discipline." },
        { day: "Day 20-21", topic: "Full RTO Track Simulation & Review", desc: "RTO test mock drills, zero fault practice, complete document check." }
      ]
    },
    {
      id: "course-car-automatic",
      title: "Automatic Car Specialization (AMT/CVT)",
      category: "automatic",
      badge: "Stress Free",
      durationDays: 15,
      sessionsCount: 15,
      sessionMinutes: 30,
      price: 5500,
      originalPrice: 6500,
      vehicle: "Hyundai Grand i10 Nios / Maruti Dzire AMT",
      transmission: "Automatic",
      description: "Specially tailored for modern automatic vehicle drivers. Never worry about stalling or clutch burning. Focus 100% on steering, road judgment, and spatial awareness.",
      features: [
        "15 Days Daily 30 mins Training on Modern Automatic Cars",
        "Master single-foot driving technique (Zero left foot habit)",
        "Creep function control in stop-and-go city traffic",
        "Hill-hold assist & parking lock precautions",
        "Reverse camera & parking sensor utilization",
        "RTO automatic license guidance & test practice"
      ],
      curriculum: [
        { day: "Day 1-3", topic: "Automatic Drive Modes & Single Foot", desc: "P, R, N, D modes, creep behavior, resting left foot safely on footrest." },
        { day: "Day 4-7", topic: "Throttle Modulation & Braking", desc: "Smooth acceleration, progressive braking, speed regulation in traffic." },
        { day: "Day 8-11", topic: "City Congestion & Tight Turns", desc: "Navigating alleys, overtaking slow vehicles, judging car dimensions." },
        { day: "Day 12-14", topic: "Parking Sensors, Reverse Camera & Slopes", desc: "Reversing into bays using camera grids and mirrors, slope handling." },
        { day: "Day 15", topic: "Independent Highway & Traffic Trial", desc: "Solo evaluation with instructor observing from passenger seat." }
      ]
    },
    {
      id: "course-car-refresher",
      title: "Confidence Refresher / Crash Course",
      category: "refresher",
      badge: "Fast Track",
      durationDays: 7,
      sessionsCount: 7,
      sessionMinutes: 45,
      price: 2900,
      originalPrice: 3800,
      vehicle: "Hatchback / Sedan or Student's Own Car",
      transmission: "Manual or Automatic",
      description: "Already have a driving license but feel anxious or fearful in traffic? This 7-day intensive confidence booster cures driving phobia on high-traffic roads.",
      features: [
        "7 Days Intensive 45 mins per day sessions",
        "Option to train in student's own car in final sessions",
        "Conquer fear of heavy traffic, flyovers & crowded markets",
        "Basement ramp entry, toll booth navigation, night drive",
        "Tailored custom syllabus according to student's fear areas"
      ],
      curriculum: [
        { day: "Day 1", topic: "Skill Assessment & Habit Correction", desc: "Evaluating current comfort, posture correction, mirror alignments." },
        { day: "Day 2-3", topic: "Peak Hour Traffic Conquering", desc: "Bumper-to-bumper driving in evening peak rush, clutch recovery without panic." },
        { day: "Day 4-5", topic: "Basement Ramps, Flyovers & Parking", desc: "Mall basement parking ramps, parallel parking on busy roadsides." },
        { day: "Day 6-7", topic: "Student's Daily Commute Route", desc: "Practicing the exact route between student's home and office/college." }
      ]
    },
    {
      id: "course-two-wheeler",
      title: "Two-Wheeler Balance (Scooty / Bike)",
      category: "two-wheeler",
      badge: "Quick Learn",
      durationDays: 7,
      sessionsCount: 7,
      sessionMinutes: 30,
      price: 2200,
      originalPrice: 2800,
      vehicle: "Honda Activa 6G / Hero Splendor / Pulsar",
      transmission: "Gearless & Geared Available",
      description: "Designed for beginners struggling with balance, two-finger brake control, pillion handling, and heavy traffic filtering.",
      features: [
        "7 Days Practical Sessions with Safety Guard Gear",
        "Specialized slow-speed balance exercises (cone slalom)",
        "Front vs Rear brake distribution technique",
        "Pillion rider balance & emergency swerving",
        "RTO 8-track test guarantee for 2-wheeler license"
      ],
      curriculum: [
        { day: "Day 1-2", topic: "Balance & Throttle Control", desc: "Feet-up balancing, feather touch throttle, gentle front/rear braking." },
        { day: "Day 3-4", topic: "Figure-of-8 & Cone Slalom", desc: "Mastering tight circles and continuous 8-turns without putting feet down." },
        { day: "Day 5-6", topic: "Road Traffic & Pillion Handling", desc: "Riding in active traffic, lane changes, carrying a co-passenger smoothly." },
        { day: "Day 7", topic: "RTO 8-Track Mock Test", desc: "Full simulation of the automated RTO two-wheeler sensor track." }
      ]
    },
    {
      id: "course-vip-personalized",
      title: "VIP Executive Doorstep 1-on-1 Package",
      category: "car",
      badge: "Premium VIP",
      durationDays: 20,
      sessionsCount: 20,
      sessionMinutes: 45,
      price: 8900,
      originalPrice: 11000,
      vehicle: "Tata Nexon SUV / Maruti Dzire (Dual Control)",
      transmission: "Manual or Automatic",
      description: "Exclusive premium experience with our Senior Master Instructor. Flexible timing from your doorstep, customized routes, and complete white-glove license concierge service.",
      features: [
        "20 Days Dedicated 45 mins Training",
        "Top-rated Senior Instructor (10+ years exp)",
        "Guaranteed Doorstep Pickup & Drop at exact desired time",
        "Both Hatchback and SUV experience included",
        "Complete VIP RTO documentation, file preparation & escort",
        "Flexible reschedule with zero cancellation penalty"
      ],
      curriculum: [
        { day: "Day 1-5", topic: "Foundational Mastery & Controls", desc: "Deep dive into vehicular dynamics, steering returnability, smooth pedal transitions." },
        { day: "Day 6-10", topic: "Complex Traffic & Tight Navigation", desc: "High-density market driving, defensive positioning, overtaking strategies." },
        { day: "Day 11-15", topic: "Advanced Parking & SUV Dynamics", desc: "Perpendicular, angular, and parallel parking, judging SUV ground clearance & corners." },
        { day: "Day 16-20", topic: "Expressway Cruising, Night Driving & RTO Concierge", desc: "High-speed lane etiquette, rainy/night hazard anticipation, flawless RTO test pass." }
      ]
    }
  ],

  fleet: [
    {
      name: "Maruti Suzuki Swift (Dual-Control)",
      category: "Hatchback (Manual)",
      engine: "1.2L DualJet Petrol",
      safety: "Dual Airbags, ABS with EBD, Certified Instructor Dual Pedals",
      features: "Most popular learner car in India. Crisp steering response, light clutch, perfect for beginners to gauge car corners.",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Hyundai Grand i10 Nios (Automatic AMT)",
      category: "Hatchback (Automatic)",
      engine: "1.2L Kappa Petrol AMT",
      safety: "Hill-Start Assist, Rear Camera, Dual Airbags, Passenger Brake",
      features: "Super-smooth automatic gearbox. Ideal for students who want stress-free commute driving without gear shifting.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Maruti Suzuki Dzire (Dual-Control)",
      category: "Sedan (Manual & AMT)",
      engine: "1.2L K-Series Petrol",
      safety: "Dual Pedals, Reverse Parking Sensors, Rear View Camera",
      features: "Perfect for learning boot length judgment, 3-box sedan turning radius, and highway stability.",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Tata Nexon (Dual-Control)",
      category: "Compact SUV (Manual)",
      engine: "1.2L Turbocharged Revotron",
      safety: "5-Star Global NCAP Safety Rating, High Ground Clearance, Dual Brakes",
      features: "High seating position, commanding road view. Master modern compact SUVs with large wheels and tight turning.",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Honda Activa 6G (Two-Wheeler)",
      category: "Gearless Scooter",
      engine: "110cc PGM-FI HET",
      safety: "Combi-Brake System (CBS), Crash Guard Protection",
      features: "Lightweight, telescopic suspension, easy feet-reach, excellent for mastering two-wheeler balance.",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80"
    }
  ],

  instructors: [
    {
      name: "Rajesh Sharma",
      role: "Chief Instructor & RTO Specialist",
      experience: "16 Years Experience",
      languages: "Hindi, English, Punjabi",
      rating: 4.98,
      specialty: "Beginners with severe road anxiety & RTO Track perfection",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80"
    },
    {
      name: "Sunita Verma",
      role: "Senior Female Driving Instructor",
      experience: "10 Years Experience",
      languages: "Hindi, English",
      rating: 4.95,
      specialty: "Dedicated ladies batches, automatic transmission, defensive driving",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
    },
    {
      name: "Vikram Chauhan",
      role: "Senior Highway & SUV Specialist",
      experience: "12 Years Experience",
      languages: "Hindi, English",
      rating: 4.92,
      specialty: "Highway overtaking, hill start flyovers, parking precision",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80"
    },
    {
      name: "Pooja Mishra",
      role: "Two-Wheeler & City Traffic Trainer",
      experience: "8 Years Experience",
      languages: "Hindi, English",
      rating: 4.96,
      specialty: "Scooty balance training, figure-of-8 track mastery, female learners",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80"
    }
  ],

  rtoQuizQuestions: [
    {
      id: 1,
      category: "Traffic Signs",
      question: "What does this mandatory road sign indicate?",
      signType: "stop",
      imageSvg: `<svg viewBox="0 0 100 100" class="w-24 h-24 mx-auto"><polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#dc2626" stroke="#ffffff" stroke-width="4"/><text x="50" y="58" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">STOP</text></svg>`,
      options: [
        "Stop completely before the stop line and proceed only when clear",
        "Slow down and proceed if no vehicle is approaching",
        "Stop only if an emergency vehicle is passing",
        "No parking allowed at any time"
      ],
      correctIndex: 0,
      explanation: "The octagonal red 'STOP' sign is the only 8-sided road sign. You MUST come to a full and complete stop before the stop line or pedestrian crossing, check traffic both ways, and proceed only when safe."
    },
    {
      id: 2,
      category: "Traffic Signs",
      question: "What does an inverted triangular sign with a red border mean?",
      signType: "give-way",
      imageSvg: `<svg viewBox="0 0 100 100" class="w-24 h-24 mx-auto"><polygon points="50,92 5,15 95,15" fill="#ffffff" stroke="#dc2626" stroke-width="8"/><text x="50" y="42" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle" font-family="sans-serif">GIVE</text><text x="50" y="58" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle" font-family="sans-serif">WAY</text></svg>`,
      options: [
        "One way road ahead",
        "Give Way / Yield priority to vehicles on the major road",
        "Road narrows ahead",
        "No entry for heavy vehicles"
      ],
      correctIndex: 1,
      explanation: "The downward-pointing triangle is the 'Give Way' (Yield) sign. It instructs drivers to give priority to traffic already moving on the main road before entering."
    },
    {
      id: 3,
      category: "Road Rules",
      question: "From which side should you overtake a vehicle moving ahead of you in India?",
      options: [
        "From the left side always",
        "From the right side of the vehicle ahead",
        "From whichever side has more empty road space",
        "From the left side if honking continuously"
      ],
      correctIndex: 1,
      explanation: "Under the Indian Motor Vehicles Act, you must always overtake from the RIGHT side. Overtaking from the left (undertaking) is illegal and dangerous, except when the vehicle ahead is clearly turning right."
    },
    {
      id: 4,
      category: "Traffic Signs",
      question: "What does a circular blue sign with a white horn with a red slash across mean?",
      signType: "no-horn",
      imageSvg: `<svg viewBox="0 0 100 100" class="w-24 h-24 mx-auto"><circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#dc2626" stroke-width="8"/><path d="M30 44 L45 44 L60 32 L60 68 L45 56 L30 56 Z" fill="#1e293b"/><line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" stroke-width="8"/></svg>`,
      options: [
        "Use horn compulsory",
        "Horn prohibited (Silent Zone like hospitals, courts, schools)",
        "Faulty horn check area",
        "Speed limit applies here"
      ],
      correctIndex: 1,
      explanation: "The 'Horn Prohibited' sign is placed near hospitals, educational institutions, and courts. Honking in these silent zones attracts heavy RTO penalties."
    },
    {
      id: 5,
      category: "Road Safety",
      question: "When approaching an uncontrolled roundabout, which vehicle has the right of way?",
      options: [
        "Vehicles approaching from the left",
        "Vehicles already circulating inside the roundabout from your right",
        "The fastest moving vehicle",
        "The largest vehicle like a bus or truck"
      ],
      correctIndex: 1,
      explanation: "Traffic already inside the roundabout approaching from your right has priority. You must yield and wait for a safe gap before entering."
    },
    {
      id: 6,
      category: "Traffic Signs",
      question: "What does this triangular warning sign indicate?",
      signType: "pedestrian",
      imageSvg: `<svg viewBox="0 0 100 100" class="w-24 h-24 mx-auto"><polygon points="50,8 8,90 92,90" fill="#ffffff" stroke="#dc2626" stroke-width="8"/><circle cx="50" cy="40" r="6" fill="#1e293b"/><path d="M48 48 L46 62 L40 78 M48 55 L58 68 L64 78 M40 54 L60 52" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/><line x1="25" y1="84" x2="75" y2="84" stroke="#1e293b" stroke-width="4" stroke-dasharray="6,4"/></svg>`,
      options: [
        "School ahead",
        "Pedestrian crossing (Zebra Crossing) ahead",
        "Jogging track ahead",
        "No pedestrians permitted"
      ],
      correctIndex: 1,
      explanation: "This triangular cautionary sign warns drivers of a pedestrian zebra crossing ahead. You should slow down and be prepared to stop if pedestrians are crossing."
    },
    {
      id: 7,
      category: "License & Law",
      question: "What is the validity period of a Learner's License (LL) issued in India?",
      options: [
        "30 Days",
        "6 Months",
        "1 Year",
        "3 Years"
      ],
      correctIndex: 1,
      explanation: "A Learner's License (LL) is valid for 6 months from the date of issue. You can apply for a Permanent Driving License after 30 days of holding the LL."
    },
    {
      id: 8,
      category: "Road Rules",
      question: "What does a continuous solid white or yellow line in the center of the road mean?",
      options: [
        "Overtaking is strictly prohibited; stay in your lane",
        "You can cross anytime if no police is present",
        "Parking is permitted along the line",
        "Speed limit is 100 km/h"
      ],
      correctIndex: 0,
      explanation: "A solid unbroken center line means you MUST NOT cross or straddle the line to overtake or make U-turns. Broken lines permit overtaking when safe."
    },
    {
      id: 9,
      category: "Emergency & Safety",
      question: "What should you do when an ambulance or fire brigade vehicle approaches with siren blaring?",
      options: [
        "Speed up to clear the road ahead of them",
        "Immediately move your vehicle to the left edge of the road and allow free passage",
        "Stop in the center lane immediately",
        "Sound your horn to alert vehicles in front"
      ],
      correctIndex: 1,
      explanation: "Under Section 194E of the Motor Vehicles Act, failing to draw to the side of the road to clear passage for emergency vehicles is punishable with a fine up to ₹10,000 and/or imprisonment."
    },
    {
      id: 10,
      category: "Traffic Signs",
      question: "What does a circle with a number '50' inside a red border indicate?",
      signType: "speed-limit",
      imageSvg: `<svg viewBox="0 0 100 100" class="w-24 h-24 mx-auto"><circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#dc2626" stroke-width="8"/><text x="50" y="60" font-size="34" font-weight="bold" fill="#000000" text-anchor="middle" font-family="sans-serif">50</text></svg>`,
      options: [
        "Minimum speed allowed is 50 km/h",
        "Maximum speed limit is 50 km/h",
        "Highway number 50",
        "Distance to city center is 50 km"
      ],
      correctIndex: 1,
      explanation: "A number inside a red circle specifies the MAXIMUM mandatory speed limit in kilometers per hour on that stretch of road."
    },
    {
      id: 11,
      category: "Vehicle Operation",
      question: "When parking your vehicle uphill on a road with a curb, in which direction should you turn your front wheels?",
      options: [
        "Straight ahead parallel to the curb",
        "Turn the wheels away from the curb (towards the street center)",
        "Turn the wheels towards the curb",
        "Wheel direction does not matter if handbrake is pulled"
      ],
      correctIndex: 1,
      explanation: "When parking UPHILL with a curb, turn wheels away from the curb so if the brakes fail, the back of the front tire will roll into the curb and stop the car."
    },
    {
      id: 12,
      category: "Road Rules",
      question: "What is the permissible blood alcohol concentration (BAC) limit while driving in India?",
      options: [
        "30 mg per 100 ml of blood",
        "50 mg per 100 ml of blood",
        "Zero alcohol is always best; legal limit is max 30 mg / 100 ml blood",
        "80 mg per 100 ml of blood"
      ],
      correctIndex: 2,
      explanation: "Under Section 185 of the Motor Vehicles Act, alcohol exceeding 30 mg per 100 ml detected by a breathalyzer is a criminal offense leading to license cancellation and jail time."
    },
    {
      id: 13,
      category: "Traffic Signs",
      question: "What does this blue square sign with a letter 'P' and a car beneath it mean?",
      signType: "parking",
      imageSvg: `<svg viewBox="0 0 100 100" class="w-24 h-24 mx-auto"><rect x="10" y="10" width="80" height="80" rx="12" fill="#2563eb"/><text x="50" y="58" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">P</text><rect x="35" y="66" width="30" height="14" rx="4" fill="#ffffff"/><circle cx="42" cy="80" r="3" fill="#1e293b"/><circle cx="58" cy="80" r="3" fill="#1e293b"/></svg>`,
      options: [
        "No parking for cars",
        "Designated Parking lot for cars",
        "Petrol pump station ahead",
        "Police checkpoint ahead"
      ],
      correctIndex: 1,
      explanation: "A blue square or rectangular sign is an informatory sign. The 'P' with a car symbol indicates an authorized parking space designated specifically for motor cars."
    },
    {
      id: 14,
      category: "Defensive Driving",
      question: "What is the 'Two-Second Rule' in driving?",
      options: [
        "Time taken to shift between 1st and 2nd gear",
        "A safe minimum following distance behind the vehicle ahead in dry conditions",
        "The delay between applying brakes and car stopping",
        "Maximum time you can look at the GPS screen"
      ],
      correctIndex: 1,
      explanation: "The Two-Second Rule is a defensive driving guideline to maintain safe following distance behind the vehicle ahead, giving you enough time to react and brake safely."
    },
    {
      id: 15,
      category: "RTO Test Practice",
      question: "While taking the RTO Driving Skill Test for a 4-wheeler, what causes an immediate disqualification?",
      options: [
        "Adjusting your rear-view mirror before starting",
        "Touching the boundary curb/cones or stalling the engine on the gradient hill stop",
        "Putting on the seatbelt before turning on the ignition",
        "Giving proper turn indicators before changing direction"
      ],
      correctIndex: 1,
      explanation: "On automated RTO test tracks (like Parivahan ADTT), touching safety kerbs, rolling backward more than 6 inches on the gradient test, or knocking down cones leads to immediate automated failure."
    }
  ],

  faqs: [
    {
      q: "What documents are required to enroll and get a Learner's License?",
      a: "You only need: 1. Aadhaar Card (or Passport / Voter ID) for age and address proof; 2. 3 Passport size photographs; 3. Medical Certificate (Form 1A - which our affiliated doctor assists with). Minimum age is 18 years for 4-wheelers and gearless 2-wheelers, and 16 years for 50cc gearless."
    },
    {
      q: "What is the Dual-Control safety system in your cars?",
      a: "Every training car in our fleet is fitted with secondary clutch and brake pedals on the instructor's side. If a student panics, accelerates unintentionally, or fails to brake, the instructor can immediately stop the car. You are 100% safe at all times."
    },
    {
      q: "Do you offer doorstep pick-up and drop service?",
      a: "Yes! We provide convenient doorstep pick-up and drop services for all residential sectors, societies, and metro stations within our service radius. You can select your pickup landmark during booking."
    },
    {
      q: "Are there female driving instructors available for ladies?",
      a: "Absolutely. We have certified, experienced, and very patient female instructors (like Sunita Verma and Pooja Mishra) specifically dedicated for female learners who prefer learning with a lady instructor."
    },
    {
      q: "Can I choose my training time slot? What if I miss a class?",
      a: "Yes, we run batches from 6:00 AM to 8:00 PM, including dedicated early morning and weekend-only batches for working professionals. If you miss a class with 24 hours prior notice, we provide a compensatory makeup session at no extra charge."
    },
    {
      q: "Will Ganga Driving School assist me on the actual RTO Driving Test Day?",
      a: "Yes! Our package includes full pre-test simulation on the exact H-track, 8-track, and gradient hill track used by the RTO. On the test day, our school vehicle and instructor accompany you to the RTO track to give you full confidence."
    }
  ],

  testimonials: [
    {
      name: "Priya Sharma",
      course: "Beginner 4-Wheeler (Swift)",
      rating: 5,
      date: "October 2026",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      comment: "I had extreme driving phobia for 5 years after an accident. Sunita Ma'am was so patient and calm. By day 8, I was driving in peak office traffic. Passed my RTO test on the first attempt!",
      badge: "First Attempt Pass"
    },
    {
      name: "Amitabh Banerjee",
      course: "Comprehensive 21 Days + DL",
      rating: 5,
      date: "November 2026",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      comment: "The dual-control cars give you immense confidence. Rajesh Sir taught me flyover hill starts and parallel parking so thoroughly that the RTO automated test felt like a breeze. Highly recommended!",
      badge: "Permanent DL Holder"
    },
    {
      name: "Neha & Rahul Kapoor",
      course: "Automatic AMT Special",
      rating: 5,
      date: "September 2026",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      comment: "Both my husband and I learned on their i10 Automatic. Doorstep pickup saved us so much time before office hours. Honest pricing and genuine training with zero hidden fees.",
      badge: "Couple Enrolled"
    },
    {
      name: "Karan Singhal",
      course: "Confidence Refresher (7 Days)",
      rating: 5,
      date: "August 2026",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
      comment: "I had a license since 2022 but never drove after moving to a congested city. The 7-day refresher on tight turns and mall basement parking cured my hesitation completely.",
      badge: "Refresher Graduate"
    }
  ],

  // Sample initial bookings for Admin portal demonstration
  initialBookings: [
    {
      id: "GMD-2026-1042",
      studentName: "Rohan Malhotra",
      phone: "+91 98101 23456",
      email: "rohan.m@gmail.com",
      courseTitle: "Beginner 4-Wheeler Car Training",
      transmission: "Manual (Swift)",
      slotTime: "7:00 AM - 7:30 AM",
      startDate: "2026-11-22",
      pickupLocation: "Sector 14, Near City Mall Gate 2",
      instructorPreference: "Rajesh Sharma (Senior)",
      amount: 4500,
      paymentStatus: "Token Paid (₹500)",
      status: "Confirmed",
      bookedAt: "2026-11-18 16:30"
    },
    {
      id: "GMD-2026-1043",
      studentName: "Ananya Saxena",
      phone: "+91 97204 88192",
      email: "ananya.s@outlook.com",
      courseTitle: "Automatic Car Specialization",
      transmission: "Automatic (i10 Nios)",
      slotTime: "10:00 AM - 10:30 AM",
      startDate: "2026-11-24",
      pickupLocation: "Ganga Green Apartments, Tower B",
      instructorPreference: "Sunita Verma (Female Trainer)",
      amount: 5500,
      paymentStatus: "Full Paid Online",
      status: "Confirmed",
      bookedAt: "2026-11-18 19:15"
    },
    {
      id: "GMD-2026-1044",
      studentName: "Deepak Mehra",
      phone: "+91 98991 76543",
      email: "deepak.mehra@yahoo.com",
      courseTitle: "Confidence Refresher (7 Days)",
      transmission: "Manual",
      slotTime: "6:00 PM - 6:45 PM",
      startDate: "2026-11-20",
      pickupLocation: "Metro Pillar 198, Main Road",
      instructorPreference: "Any Trainer",
      amount: 2900,
      paymentStatus: "Pay on Day 1",
      status: "Pending Verification",
      bookedAt: "2026-11-19 09:10"
    }
  ],

  // Registered Student Profiles for Student Portal & Login
  defaultStudents: [
    {
      id: "GMD-STD-8102",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      password: "password123",
      phone: "+91 89575 19919",
      enrolledCourse: "Beginner 4-Wheeler Car Training",
      vehicle: "Maruti Suzuki Swift (Dual Control)",
      instructor: "Rajesh Sharma (Chief Instructor)",
      batchTiming: "7:00 AM - 7:45 AM (Morning Batch)",
      totalDays: 15,
      completedDays: 8,
      status: "Active Learner",
      admissionDate: "10 Nov 2026",
      rtoDlNumber: "DL-04-2026-LL-9921 (Learner License)",
      nextLesson: "Tomorrow at 7:00 AM (Maruti Swift DL-04-AB-1234)",
      pickupAddress: "Tower 4, Ganga Green Apartments, Main Ring Road",
      quizScore: "14 / 15 (93% - RTO Ready)",
      attendance: [
        { day: 1, topic: "Cockpit Drill & ABC Controls", date: "11 Nov 2026", status: "Completed", score: "5/5" },
        { day: 2, topic: "Steering Control & Clutch Biting Point", date: "12 Nov 2026", status: "Completed", score: "4/5" },
        { day: 3, topic: "Gear Shift 1st to 2nd & Gentle Stop", date: "13 Nov 2026", status: "Completed", score: "4.5/5" },
        { day: 4, topic: "90° Left & Right Intersections", date: "14 Nov 2026", status: "Completed", score: "4/5" },
        { day: 5, topic: "U-Turns & Roundabout Navigation", date: "15 Nov 2026", status: "Completed", score: "5/5" },
        { day: 6, topic: "Moderate City Traffic & Lane Centering", date: "16 Nov 2026", status: "Completed", score: "4/5" },
        { day: 7, topic: "Bumper-to-Bumper Rush Hour Drills", date: "17 Nov 2026", status: "Completed", score: "4.5/5" },
        { day: 8, topic: "Reverse Straight Line & Mirror Drills", date: "18 Nov 2026", status: "Completed", score: "4/5" },
        { day: 9, topic: "Flyover Slope Launch (Handbrake Launch)", date: "20 Nov 2026", status: "Scheduled", score: "Pending" },
        { day: 10, topic: "Parallel Parking between Cones", date: "21 Nov 2026", status: "Scheduled", score: "Pending" },
        { day: 11, topic: "RTO H-Track Simulator", date: "22 Nov 2026", status: "Scheduled", score: "Pending" },
        { day: 12, topic: "RTO 8-Track Sensor Practice", date: "23 Nov 2026", status: "Scheduled", score: "Pending" },
        { day: 13, topic: "Highway Overtaking & High Speed Braking", date: "24 Nov 2026", status: "Scheduled", score: "Pending" },
        { day: 14, topic: "Night Driving & Glare Handling", date: "25 Nov 2026", status: "Scheduled", score: "Pending" },
        { day: 15, topic: "Final RTO Mock Test Trial", date: "26 Nov 2026", status: "Scheduled", score: "Pending" }
      ]
    },
    {
      id: "GMD-STD-8103",
      name: "Pooja Gupta",
      email: "pooja.g@gmail.com",
      password: "password123",
      phone: "+91 98112 23344",
      enrolledCourse: "Automatic Car Specialization (AMT/CVT)",
      vehicle: "Hyundai Grand i10 Nios (Automatic)",
      instructor: "Sunita Verma (Senior Female Trainer)",
      batchTiming: "10:00 AM - 10:45 AM",
      totalDays: 15,
      completedDays: 4,
      status: "Active Learner",
      admissionDate: "14 Nov 2026",
      rtoDlNumber: "DL-04-2026-LL-8832",
      nextLesson: "Tomorrow at 10:00 AM (i10 Nios DL-04-CD-5678)",
      pickupAddress: "Flat 203, Sector 12, Near Metro Pillar 218",
      quizScore: "12 / 15 (80% - Passed)",
      attendance: [
        { day: 1, topic: "Automatic Gearbox Modes (P, R, N, D)", date: "15 Nov 2026", status: "Completed", score: "5/5" },
        { day: 2, topic: "Single Foot Throttle Modulation", date: "16 Nov 2026", status: "Completed", score: "4.5/5" },
        { day: 3, topic: "Creep Mode in Stop-and-Go Traffic", date: "17 Nov 2026", status: "Completed", score: "5/5" },
        { day: 4, topic: "Progressive Braking & Safe Following", date: "18 Nov 2026", status: "Completed", score: "4.5/5" },
        { day: 5, topic: "Mall Basement Ramp Ascend/Descend", date: "20 Nov 2026", status: "Scheduled", score: "Pending" }
      ]
    }
  ]
};

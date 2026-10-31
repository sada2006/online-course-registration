import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { 
  BookOpen, Calendar, Clock, CheckCircle, AlertCircle, XCircle, Search, 
  Filter, Award, Users, ChevronRight, ChevronLeft, LayoutDashboard, Compass, 
  GraduationCap, Bell, Settings, LogOut, Shield, BarChart3, 
  Layers, Plus, Trash2, Edit3, Download, Eye, Check, X, RefreshCw, 
  AlertTriangle, BookMarked, UserCheck, ArrowRight, Menu, HelpCircle,
  FileText, Sparkles, ExternalLink, Code, User, Lock, Mail, Phone,
  School, CalendarCheck, CheckSquare, Info, ShieldAlert, SlidersHorizontal,
  ChevronDown, Send, FileCheck, Ban, Power
} from 'lucide-react';

// --- INITIAL DEPARTMENTS ---
const INITIAL_DEPARTMENTS = [
  { id: 'dept-1', code: 'CSE', name: 'Computer Science & Engineering', icon: '💻', head: 'Prof. A. Thorne' },
  { id: 'dept-2', code: 'ECE', name: 'Electronics & Communication', icon: '📡', head: 'Dr. P. Ramanathan' },
  { id: 'dept-3', code: 'EEE', name: 'Electrical & Electronics', icon: '⚡', head: 'Dr. K. Venkatesh' },
  { id: 'dept-4', code: 'MECH', name: 'Mechanical Engineering', icon: '⚙️', head: 'Prof. A. Deshmukh' },
  { id: 'dept-5', code: 'CIVIL', name: 'Civil Engineering', icon: '🏗️', head: 'Dr. M. Sen' },
];

// --- INITIAL COURSE CATALOG (Available seats = totalSeats initially) ---
const INITIAL_COURSES = [
  {
    id: 'CS301',
    code: 'CS301',
    title: 'Distributed Systems & Cloud Computing',
    dept: 'CSE',
    category: 'Core Engineering',
    credits: 4,
    duration: '14 Weeks',
    instructor: 'Dr. Aris Thorne',
    difficulty: 'Advanced',
    totalSeats: 60,
    semester: 'Semester 5',
    academicYear: '2026-2027',
    schedule: 'Mon, Wed 10:00 - 11:30 AM',
    daySlot: ['Mon-10', 'Wed-10'],
    timeString: '10:00 AM - 11:30 AM',
    room: 'Lab 402, Raman Block',
    deadline: '2026-11-30',
    prerequisites: 'CS201: Data Structures, CS204: Operating Systems',
    description: 'Consensus protocols, Raft, distributed storage systems, container virtualization, and microservice resiliency.',
    isActive: true
  },
  {
    id: 'CS304',
    code: 'CS304',
    title: 'Advanced Database Engineering & NoSQL',
    dept: 'CSE',
    category: 'Elective',
    credits: 3,
    duration: '12 Weeks',
    instructor: 'Prof. Radhika Iyer',
    difficulty: 'Intermediate',
    totalSeats: 50,
    semester: 'Semester 5',
    academicYear: '2026-2027',
    schedule: 'Tue, Thu 02:00 - 03:30 PM',
    daySlot: ['Tue-14', 'Thu-14'],
    timeString: '02:00 PM - 03:30 PM',
    room: 'Seminar Hall B',
    deadline: '2026-11-28',
    prerequisites: 'CS102: Relational Databases',
    description: 'Storage engine architectures (B-Trees, LSM-Trees), query optimizers, distributed transactions, and document indexing.',
    isActive: true
  },
  {
    id: 'CS205',
    code: 'CS205',
    title: 'Artificial Intelligence & Neural Networks',
    dept: 'CSE',
    category: 'Elective',
    credits: 4,
    duration: '14 Weeks',
    instructor: 'Dr. Arvind Sharma',
    difficulty: 'Intermediate',
    totalSeats: 70,
    semester: 'Semester 3',
    academicYear: '2026-2027',
    schedule: 'Mon, Wed 02:00 - 03:30 PM',
    daySlot: ['Mon-14', 'Wed-14'],
    timeString: '02:00 PM - 03:30 PM',
    room: 'Hall 101, Ramanujan Block',
    deadline: '2026-11-25',
    prerequisites: 'MA201: Linear Algebra & Probability',
    description: 'Theoretical foundations of neural networks, gradient descent calculus, transformer architectures, and deep learning algorithms.',
    isActive: true
  },
  {
    id: 'EC202',
    code: 'EC202',
    title: 'Digital Signal Processing & Architectures',
    dept: 'ECE',
    category: 'Core Engineering',
    credits: 4,
    duration: '14 Weeks',
    instructor: 'Dr. Priya Ramanathan',
    difficulty: 'Advanced',
    totalSeats: 45,
    semester: 'Semester 3',
    academicYear: '2026-2027',
    schedule: 'Mon, Wed 10:00 - 11:30 AM',
    daySlot: ['Mon-10', 'Wed-10'],
    timeString: '10:00 AM - 11:30 AM',
    room: 'DSP Lab, Marconi Wing',
    deadline: '2026-11-20',
    prerequisites: 'EC101: Signals & Systems',
    description: 'Z-transforms, Discrete Fourier Transforms, digital filter synthesis (FIR/IIR), and DSP processor pipeline architecture.',
    isActive: true
  },
  {
    id: 'EE201',
    code: 'EE201',
    title: 'Smart Power Grids & Renewable Integration',
    dept: 'EEE',
    category: 'Specialization',
    credits: 3,
    duration: '12 Weeks',
    instructor: 'Prof. K. Venkatesh',
    difficulty: 'Intermediate',
    totalSeats: 50,
    semester: 'Semester 5',
    academicYear: '2026-2027',
    schedule: 'Fri 09:00 - 12:00 PM',
    daySlot: ['Fri-09'],
    timeString: '09:00 AM - 12:00 PM',
    room: 'Power Systems Lab',
    deadline: '2026-11-30',
    prerequisites: 'EE102: Network Analysis',
    description: 'Modern electrical infrastructure, micro-grids, solar-wind grid tie inverters, smart metering, and automated demand-response controllers.',
    isActive: true
  },
  {
    id: 'ME302',
    code: 'ME302',
    title: 'Robotics Kinematics & Autonomous Motion',
    dept: 'MECH',
    category: 'Core Engineering',
    credits: 4,
    duration: '14 Weeks',
    instructor: 'Dr. Anand Deshmukh',
    difficulty: 'Intermediate',
    totalSeats: 40,
    semester: 'Semester 5',
    academicYear: '2026-2027',
    schedule: 'Tue, Thu 09:30 - 11:00 AM',
    daySlot: ['Tue-09', 'Thu-09'],
    timeString: '09:30 AM - 11:00 AM',
    room: 'Robotics Workshop',
    deadline: '2026-11-22',
    prerequisites: 'ME201: Engineering Mechanics',
    description: 'Spatial descriptions and transformations, Denavit-Hartenberg parameters, Jacobian velocities, trajectory generation, and ROS integration.',
    isActive: true
  },
  {
    id: 'CE303',
    code: 'CE303',
    title: 'Earthquake Resistant Structural Engineering',
    dept: 'CIVIL',
    category: 'Specialization',
    credits: 3,
    duration: '12 Weeks',
    instructor: 'Prof. Meera Sen',
    difficulty: 'Advanced',
    totalSeats: 35,
    semester: 'Semester 5',
    schedule: 'Fri 02:00 - 05:00 PM',
    daySlot: ['Fri-14'],
    timeString: '02:00 PM - 05:00 PM',
    room: 'Structures Lab 2',
    deadline: '2026-11-27',
    prerequisites: 'CE201: Structural Analysis',
    description: 'Seismic wave transmission, dynamic response of building frameworks, base isolation, and ductile detailing codes.',
    isActive: true
  }
];

// Context for notifications
const ToastContext = createContext({
  addToast: (type, title, message) => {}
});

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'student-portal', 'admin-portal', 'auth-modal', 'api-docs'
  
  // Real database states (initialized with 0 students and 0 registrations)
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [registrations, setRegistrations] = useState([]); // Array of registration requests
  const [auditLogs, setAuditLogs] = useState([]);
  const [studentActivities, setStudentActivities] = useState([]); // In-app activity feed for students
  const [currentUser, setCurrentUser] = useState(null); // Authenticated session
  const [authMode, setAuthMode] = useState('STUDENT_LOGIN');

  // Toasts
  const [toasts, setToasts] = useState([]);
  const addToast = (type, title, message) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Helper: Calculate occupied seats from APPROVED registrations only
  const getCourseSeatStats = (courseId, totalSeats) => {
    const approvedCount = registrations.filter(r => r.courseId === courseId && r.status === 'Approved').length;
    const availableSeats = Math.max(0, totalSeats - approvedCount);
    const occupancyPercent = totalSeats > 0 ? Math.round((approvedCount / totalSeats) * 100) : 0;
    
    let statusLabel = 'Available';
    let statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (availableSeats === 0) {
      statusLabel = 'Course Full';
      statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
    } else if (occupancyPercent >= 90) {
      statusLabel = 'Almost Full';
      statusColor = 'text-rose-600 bg-rose-50 border-rose-200';
    } else if (occupancyPercent >= 70) {
      statusLabel = 'Filling Fast';
      statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
    }

    return { approvedCount, availableSeats, occupancyPercent, statusLabel, statusColor };
  };

  const handleStudentRegistered = (newStudentProfile) => {
    setRegisteredStudents(prev => [...prev, newStudentProfile]);
    setCurrentUser(newStudentProfile);
    setCurrentView('student-portal');
    addToast('success', 'Profile Initialized', `Welcome to CourseHub Pro, ${newStudentProfile.fullName}! Your account is active.`);
    
    // Add audit log
    const log = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: newStudentProfile.fullName,
      action: 'STUDENT_ACCOUNT_CREATED',
      details: `Created student account with Roll No: ${newStudentProfile.registrationNumber}`
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    if (user.role === 'ADMIN') {
      setCurrentView('admin-portal');
      addToast('info', 'Admin Access Granted', 'Signed in to University Registrar Command Console.');
    } else {
      setCurrentView('student-portal');
      addToast('success', 'Student Authenticated', `Welcome back, ${user.fullName}!`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    addToast('info', 'Signed Out', 'You have been safely signed out of the university portal.');
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="min-h-screen bg-[#F7F8FC] text-[#253047] font-sans antialiased flex flex-col">
        
        {/* TOAST SYSTEM */}
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
          {toasts.map(toast => (
            <div 
              key={toast.id}
              className={`p-4 rounded-xl shadow-lg border pointer-events-auto transition-all flex items-start gap-3 bg-white ${
                toast.type === 'success' ? 'border-emerald-200 text-emerald-800' :
                toast.type === 'error' ? 'border-rose-200 text-rose-800' :
                toast.type === 'warning' ? 'border-amber-200 text-amber-800' :
                'border-[#3157C8]/20 text-[#3157C8]'
              }`}
            >
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />}
              {toast.type === 'info' && <Sparkles className="w-5 h-5 text-[#3157C8] mt-0.5 shrink-0" />}
              <div>
                <p className="text-sm font-semibold">{toast.title}</p>
                <p className="text-xs text-[#737D90] mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TOP NAVBAR (Clean Light Theme) */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => setCurrentView('landing')}
            >
              <div className="w-9 h-9 rounded-lg bg-[#3157C8] flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-[#253047]">
                  CourseHub<span className="text-[#3157C8]">Pro</span>
                </span>
                <span className="ml-2 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-[#EAF1FF] text-[#3157C8]">
                  Academic Portal
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#737D90]">
              <button 
                onClick={() => setCurrentView('landing')} 
                className="hover:text-[#3157C8] transition-colors"
              >
                Catalog Overview
              </button>
              <button 
                onClick={() => setCurrentView('api-docs')} 
                className="hover:text-[#3157C8] transition-colors flex items-center gap-1.5 bg-[#F7F8FC] border border-slate-200 px-3 py-1.5 rounded-full text-[#253047]"
              >
                <Code className="w-3.5 h-3.5 text-[#3157C8]" />
                REST APIs & Architecture
              </button>
              {currentUser && (
                <button 
                  onClick={() => setCurrentView(currentUser.role === 'ADMIN' ? 'admin-portal' : 'student-portal')}
                  className="text-[#3157C8] font-bold"
                >
                  {currentUser.role === 'ADMIN' ? 'Admin Registrar Console' : 'My Student Workspace'}
                </button>
              )}
            </div>

            {/* User Controls */}
            <div className="flex items-center gap-3">
              {!currentUser ? (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setAuthMode('STUDENT_LOGIN'); setCurrentView('auth-modal'); }}
                    className="text-xs sm:text-sm font-medium px-3.5 py-2 rounded-lg text-[#253047] hover:bg-slate-100 transition"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => { setAuthMode('STUDENT_REGISTER'); setCurrentView('auth-modal'); }}
                    className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white shadow-xs transition"
                  >
                    Student Registration
                  </button>
                  <button 
                    onClick={() => { setAuthMode('ADMIN_LOGIN'); setCurrentView('auth-modal'); }}
                    className="text-xs sm:text-sm font-medium px-3 py-2 rounded-lg text-[#737D90] hover:text-[#253047] hover:bg-slate-100 transition flex items-center gap-1"
                    title="Dean & Registrar Access"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#3157C8]" />
                    <span className="hidden sm:inline">Admin</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#EAF1FF] text-[#3157C8] font-bold text-xs flex items-center justify-center border border-[#3157C8]/20">
                      {currentUser.fullName ? currentUser.fullName.charAt(0) : 'A'}
                    </div>
                    <div className="hidden lg:block text-left text-xs leading-tight">
                      <p className="font-semibold text-[#253047]">{currentUser.fullName}</p>
                      <span className="text-[10px] text-[#737D90]">
                        {currentUser.role === 'STUDENT' ? currentUser.registrationNumber : 'University Dean / Admin'}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-[#737D90] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" 
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN BODY ROUTING */}
        <main className="flex-1">
          {currentView === 'landing' && (
            <CleanLandingView 
              courses={courses}
              departments={INITIAL_DEPARTMENTS}
              getCourseSeatStats={getCourseSeatStats}
              onStartRegister={() => { setAuthMode('STUDENT_REGISTER'); setCurrentView('auth-modal'); }}
              onStartLogin={() => { setAuthMode('STUDENT_LOGIN'); setCurrentView('auth-modal'); }}
            />
          )}

          {currentView === 'auth-modal' && (
            <CleanAuthModal 
              initialMode={authMode}
              registeredStudents={registeredStudents}
              onRegisterSuccess={handleStudentRegistered}
              onLoginSuccess={handleLogin}
              onClose={() => setCurrentView('landing')}
            />
          )}

          {currentView === 'student-portal' && currentUser && currentUser.role === 'STUDENT' && (
            <CleanStudentPortal 
              student={currentUser}
              courses={courses.filter(c => c.isActive)}
              allCourses={courses}
              registrations={registrations.filter(r => r.studentId === currentUser._id)}
              allRegistrations={registrations}
              studentActivities={studentActivities.filter(a => a.studentId === currentUser._id)}
              getCourseSeatStats={getCourseSeatStats}
              onSubmitRegistrationRequest={(course) => {
                const reqId = `REQ-${Date.now().toString().slice(-5)}`;
                const newRequest = {
                  _id: `reg-${Date.now()}`,
                  registrationId: reqId,
                  studentId: currentUser._id,
                  studentName: currentUser.fullName,
                  studentRoll: currentUser.registrationNumber,
                  studentDept: currentUser.department,
                  courseId: course.id,
                  courseCode: course.code,
                  courseName: course.title,
                  credits: course.credits,
                  instructor: course.instructor,
                  schedule: course.schedule,
                  daySlot: course.daySlot,
                  requestedAt: new Date().toISOString().substring(0, 10),
                  status: 'Pending', // Pending does NOT consume seats
                  reviewedBy: null,
                  reviewedAt: null,
                  rejectionReason: null
                };

                setRegistrations(prev => [newRequest, ...prev]);

                // Student in-app activity
                setStudentActivities(prev => [{
                  id: `act-${Date.now()}`,
                  studentId: currentUser._id,
                  type: 'SUBMITTED',
                  title: 'Registration Request Submitted',
                  desc: `Requested registration for ${course.code}: ${course.title}. Awaiting administrator approval.`,
                  time: 'Just now'
                }, ...prev]);

                // Global Audit Log
                setAuditLogs(prev => [{
                  id: `LOG-${Date.now().toString().slice(-4)}`,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                  actor: currentUser.fullName,
                  action: 'STUDENT_REQUEST_REGISTRATION',
                  details: `Submitted pending registration request ${reqId} for ${course.code}`
                }, ...prev]);

                addToast('success', 'Request Submitted', 'Your registration request has been submitted successfully and sent for approval!');
              }}
              onCancelRequest={(registrationId) => {
                const target = registrations.find(r => r.registrationId === registrationId);
                if (!target) return;
                
                setRegistrations(prev => prev.map(r => r.registrationId === registrationId ? { ...r, status: 'Cancelled' } : r));
                
                setStudentActivities(prev => [{
                  id: `act-${Date.now()}`,
                  studentId: currentUser._id,
                  type: 'CANCELLED',
                  title: 'Request Cancelled',
                  desc: `Withdrew pending registration request for ${target.courseCode}.`,
                  time: 'Just now'
                }, ...prev]);

                setAuditLogs(prev => [{
                  id: `LOG-${Date.now().toString().slice(-4)}`,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                  actor: currentUser.fullName,
                  action: 'STUDENT_CANCEL_REQUEST',
                  details: `Cancelled pending request ${registrationId} for ${target.courseCode}`
                }, ...prev]);

                addToast('info', 'Request Cancelled', `Pending request ${registrationId} has been withdrawn.`);
              }}
              onUpdateProfile={(updated) => {
                setCurrentUser(updated);
                setRegisteredStudents(prev => prev.map(s => s._id === updated._id ? updated : s));
                addToast('success', 'Profile Updated', 'Student profile record updated in university database.');
              }}
            />
          )}

          {currentView === 'admin-portal' && currentUser && currentUser.role === 'ADMIN' && (
            <CleanAdminPortal 
              courses={courses}
              registrations={registrations}
              registeredStudents={registeredStudents}
              departments={INITIAL_DEPARTMENTS}
              auditLogs={auditLogs}
              getCourseSeatStats={getCourseSeatStats}
              onAddCourse={(newCourse) => {
                setCourses(prev => [newCourse, ...prev]);
                setAuditLogs(prev => [{
                  id: `LOG-${Date.now().toString().slice(-4)}`,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                  actor: 'Dean of Academic Affairs',
                  action: 'ADMIN_COURSE_CREATE',
                  details: `Created new course ${newCourse.code} (${newCourse.title}) with ${newCourse.totalSeats} seats.`
                }, ...prev]);
                addToast('success', 'Course Created', `Course ${newCourse.code} is now listed in the academic catalog.`);
              }}
              onEditCourse={(updatedCourse) => {
                setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
                setAuditLogs(prev => [{
                  id: `LOG-${Date.now().toString().slice(-4)}`,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                  actor: 'Dean of Academic Affairs',
                  action: 'ADMIN_COURSE_UPDATE',
                  details: `Updated details and capacity for course ${updatedCourse.code}.`
                }, ...prev]);
                addToast('success', 'Course Updated', `Changes for ${updatedCourse.code} saved successfully.`);
              }}
              onDeleteCourse={(courseId) => {
                // Dependency check: prevent deleting course if active approved or pending records exist
                const activeDeps = registrations.filter(r => r.courseId === courseId && (r.status === 'Approved' || r.status === 'Pending'));
                if (activeDeps.length > 0) {
                  addToast('error', 'Cannot Delete Course', `Cannot remove course with ${activeDeps.length} active approved/pending registration records.`);
                  return false;
                }

                const target = courses.find(c => c.id === courseId);
                setCourses(prev => prev.filter(c => c.id !== courseId));
                setAuditLogs(prev => [{
                  id: `LOG-${Date.now().toString().slice(-4)}`,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                  actor: 'Dean of Academic Affairs',
                  action: 'ADMIN_COURSE_DELETE',
                  details: `Deleted course ${target?.code} from registry.`
                }, ...prev]);
                addToast('info', 'Course Removed', `Course ${target?.code} removed from catalog.`);
                return true;
              }}
              onToggleCourseActive={(courseId) => {
                setCourses(prev => prev.map(c => c.id === courseId ? { ...c, isActive: !c.isActive } : c));
                const c = courses.find(item => item.id === courseId);
                addToast('info', 'Status Changed', `${c?.code} is now ${!c?.isActive ? 'Active' : 'Inactive'}.`);
              }}
              onApproveRegistration={(reqId) => {
                const targetReq = registrations.find(r => r.registrationId === reqId);
                if (!targetReq) return;

                const targetCourse = courses.find(c => c.id === targetReq.courseId);
                if (!targetCourse) return;

                // Seat check
                const { availableSeats } = getCourseSeatStats(targetCourse.id, targetCourse.totalSeats);
                if (availableSeats <= 0) {
                  addToast('error', 'Seat Allocation Failed', `Course ${targetCourse.code} has 0 available seats. Request cannot be approved.`);
                  return;
                }

                // Approve request (locks 1 seat atomically)
                setRegistrations(prev => prev.map(r => r.registrationId === reqId ? {
                  ...r,
                  status: 'Approved',
                  reviewedBy: 'Dean of Academic Affairs',
                  reviewedAt: new Date().toISOString().substring(0, 10),
                  rejectionReason: null
                } : r));

                // Notify student via in-app activity
                setStudentActivities(prev => [{
                  id: `act-${Date.now()}`,
                  studentId: targetReq.studentId,
                  type: 'APPROVED',
                  title: 'Registration Request Approved 🎉',
                  desc: `Your enrollment for ${targetReq.courseCode} (${targetReq.courseName}) has been officially approved. One seat reserved.`,
                  time: 'Just now'
                }, ...prev]);

                // Audit log
                setAuditLogs(prev => [{
                  id: `LOG-${Date.now().toString().slice(-4)}`,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                  actor: 'Dean of Academic Affairs',
                  action: 'ADMIN_REGISTRATION_APPROVE',
                  details: `Approved enrollment request ${reqId} for student ${targetReq.studentRoll} in ${targetReq.courseCode}. Seat reserved.`
                }, ...prev]);

                addToast('success', 'Registration Approved', `Approved request for ${targetReq.studentName}. Seat officially reserved.`);
              }}
              onRejectRegistration={(reqId, rejectionReason) => {
                const targetReq = registrations.find(r => r.registrationId === reqId);
                if (!targetReq) return;

                setRegistrations(prev => prev.map(r => r.registrationId === reqId ? {
                  ...r,
                  status: 'Rejected',
                  reviewedBy: 'Dean of Academic Affairs',
                  reviewedAt: new Date().toISOString().substring(0, 10),
                  rejectionReason: rejectionReason || 'Institutional prerequisite or capacity limit not met.'
                } : r));

                // Notify student
                setStudentActivities(prev => [{
                  id: `act-${Date.now()}`,
                  studentId: targetReq.studentId,
                  type: 'REJECTED',
                  title: 'Registration Request Declined',
                  desc: `Request for ${targetReq.courseCode} was declined. Reason: "${rejectionReason}"`,
                  time: 'Just now'
                }, ...prev]);

                // Audit log
                setAuditLogs(prev => [{
                  id: `LOG-${Date.now().toString().slice(-4)}`,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                  actor: 'Dean of Academic Affairs',
                  action: 'ADMIN_REGISTRATION_REJECT',
                  details: `Declined request ${reqId} for ${targetReq.courseCode}. Reason: ${rejectionReason}`
                }, ...prev]);

                addToast('warning', 'Registration Declined', `Request ${reqId} rejected. Student notified with specified reason.`);
              }}
            />
          )}

          {currentView === 'api-docs' && (
            <CleanApiDocsView onClose={() => setCurrentView('landing')} />
          )}
        </main>
      </div>
    </ToastContext.Provider>
  );
}

// ============================================================================
// 1. CLEAN LIGHT LANDING VIEW WITH REAL-TIME AVAILABILITY BADGES
// ============================================================================
function CleanLandingView({ courses, departments, getCourseSeatStats, onStartRegister, onStartLogin }) {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(c => {
    const matchesDept = selectedDept === 'ALL' || c.dept === selectedDept;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch && c.isActive;
  });

  return (
    <div className="space-y-16 py-10">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FF] text-[#3157C8] text-xs font-semibold">
              <School className="w-3.5 h-3.5" />
              <span>Official University Course Registration System</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#253047] tracking-tight leading-tight">
              One Platform. Controlled & Transparent Academic Enrollment.
            </h1>
            <p className="text-base text-[#737D90] leading-relaxed">
              Explore accredited university courses, submit registration requests for faculty dean approval, and manage course quotas with real-time seat availability.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onStartRegister}
                className="px-6 py-3 rounded-xl bg-[#3157C8] hover:bg-[#2847A5] text-white font-semibold text-sm shadow-xs transition flex items-center gap-2"
              >
                <span>Student Registration</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onStartLogin}
                className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-[#253047] font-semibold text-sm transition"
              >
                Student Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#253047]">Academic Departments</h2>
          <p className="text-xs text-[#737D90]">Browse faculty departments and course offerings</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setSelectedDept('ALL')}
            className={`p-4 rounded-xl border text-left transition ${
              selectedDept === 'ALL' 
                ? 'bg-[#3157C8] border-[#3157C8] text-white shadow-xs' 
                : 'bg-white border-slate-200 text-[#253047] hover:border-slate-300'
            }`}
          >
            <span className="text-xl">🏛️</span>
            <p className="font-bold text-xs mt-2">All Departments</p>
            <p className={`text-[11px] ${selectedDept === 'ALL' ? 'text-white/80' : 'text-[#737D90]'}`}>{courses.filter(c => c.isActive).length} Courses</p>
          </button>

          {departments.map(dept => {
            const isSelected = selectedDept === dept.code;
            const count = courses.filter(c => c.dept === dept.code && c.isActive).length;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.code)}
                className={`p-4 rounded-xl border text-left transition ${
                  isSelected 
                    ? 'bg-[#3157C8] border-[#3157C8] text-white shadow-xs' 
                    : 'bg-white border-slate-200 text-[#253047] hover:border-slate-300'
                }`}
              >
                <span className="text-xl">{dept.icon}</span>
                <p className="font-bold text-xs mt-2">{dept.code}</p>
                <p className={`text-[11px] ${isSelected ? 'text-white/80' : 'text-[#737D90]'}`}>{count} Courses</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Course Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#253047]">Active Course Catalog</h2>
            <p className="text-xs text-[#737D90]">Catalog of courses ready for student registration request</p>
          </div>

          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course code or title..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map(course => {
            const { approvedCount, availableSeats, occupancyPercent, statusLabel, statusColor } = getCourseSeatStats(course.id, course.totalSeats);
            return (
              <div key={course.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EAF1FF] text-[#3157C8]">
                      {course.code}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusColor}`}>
                      {statusLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-[#253047]">{course.title}</h3>
                    <p className="text-xs text-[#737D90] mt-1">{course.instructor} • {course.dept}</p>
                  </div>

                  <div className="bg-[#F7F8FC] p-3 rounded-lg text-xs text-[#737D90] space-y-1">
                    <p>🗓️ {course.schedule}</p>
                    <p>📍 {course.room}</p>
                    <p>⏱️ Deadline: {course.deadline}</p>
                  </div>

                  {/* Seat Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-semibold text-[#253047]">
                        {availableSeats} / {course.totalSeats} seats available
                      </span>
                      <span className="text-[#737D90]">{approvedCount} confirmed</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          occupancyPercent >= 90 ? 'bg-rose-500' :
                          occupancyPercent >= 70 ? 'bg-amber-500' : 'bg-[#3157C8]'
                        }`}
                        style={{ width: `${occupancyPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#737D90]">
                    {course.credits} Academic Credits
                  </span>
                  <button
                    onClick={onStartLogin}
                    className="px-3 py-1.5 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white text-xs font-semibold transition"
                  >
                    Sign In to Request
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 border-t border-slate-200 text-xs text-[#737D90] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#3157C8]" />
          <span>CourseHub Pro • University Course Registration System</span>
        </div>
        <p>Official Academic Year 2026-2027 Portal</p>
      </footer>
    </div>
  );
}

// ============================================================================
// 2. AUTHENTICATION & MULTI-STEP STUDENT REGISTRATION MODAL
// ============================================================================
function CleanAuthModal({ initialMode, registeredStudents, onRegisterSuccess, onLoginSuccess, onClose }) {
  const { addToast } = useContext(ToastContext);
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState(1);

  const [regData, setRegData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Prefer not to say',
    profilePhoto: '',
    registrationNumber: '',
    collegeName: 'University College of Engineering',
    department: 'CSE',
    degree: 'B.Tech',
    academicYear: '1st Year',
    semester: 'Semester 1',
    admissionYear: '2026',
    graduationYear: '2030',
    cgpa: '',
    completedCredits: '0',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const passwordStrength = useMemo(() => {
    const pw = regData.password;
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 6) score += 25;
    if (pw.length >= 8) score += 25;
    if (/[A-Z]/.test(pw)) score += 25;
    if (/[0-9!@#$%^&*]/.test(pw)) score += 25;
    return score;
  }, [regData.password]);

  const handleNextStep1 = (e) => {
    e.preventDefault();
    if (!regData.fullName.trim() || !regData.email.trim() || !regData.phone.trim() || !regData.dateOfBirth) {
      addToast('error', 'Validation Error', 'Please complete all required personal information fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(regData.email)) {
      addToast('error', 'Invalid Email', 'Please provide a valid email format.');
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = (e) => {
    e.preventDefault();
    if (!regData.registrationNumber.trim() || !regData.collegeName.trim()) {
      addToast('error', 'Validation Error', 'University Registration Number and College Name are required.');
      return;
    }
    if (registeredStudents.some(s => s.registrationNumber.toLowerCase() === regData.registrationNumber.trim().toLowerCase())) {
      addToast('error', 'Duplicate Roll Number', 'A student with this University Registration Number already exists.');
      return;
    }
    setStep(3);
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    if (regData.password.length < 6) {
      addToast('error', 'Weak Password', 'Password must be at least 6 characters long.');
      return;
    }
    if (regData.password !== regData.confirmPassword) {
      addToast('error', 'Password Mismatch', 'Password and Confirm Password must match identically.');
      return;
    }
    if (!regData.acceptTerms) {
      addToast('error', 'Terms Required', 'You must accept the university platform terms and conditions.');
      return;
    }

    const newStudent = {
      _id: `stu-${Date.now()}`,
      role: 'STUDENT',
      fullName: regData.fullName.trim(),
      email: regData.email.trim(),
      phone: regData.phone.trim(),
      dateOfBirth: regData.dateOfBirth,
      gender: regData.gender,
      profilePhoto: regData.profilePhoto.trim() || null,
      registrationNumber: regData.registrationNumber.trim().toUpperCase(),
      collegeName: regData.collegeName.trim(),
      department: regData.department,
      degree: regData.degree,
      academicYear: regData.academicYear,
      semester: regData.semester,
      admissionYear: regData.admissionYear,
      graduationYear: regData.graduationYear,
      cgpa: regData.cgpa ? parseFloat(regData.cgpa).toFixed(2) : null,
      completedCredits: parseInt(regData.completedCredits, 10) || 0,
      maxCreditsLimit: 18,
      password: regData.password,
      isEmailVerified: true,
      createdAt: new Date().toISOString()
    };

    onRegisterSuccess(newStudent);
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    const found = registeredStudents.find(
      s => s.email.toLowerCase() === loginEmail.trim().toLowerCase() && s.password === loginPassword
    );

    if (found) {
      onLoginSuccess(found);
    } else {
      addToast('error', 'Authentication Failed', 'No student account matches these credentials. If you are a new student, please complete registration.');
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === 'admin@university.edu' && adminPassword === 'admin2026') {
      onLoginSuccess({
        _id: 'admin-01',
        name: 'Dean of Academic Affairs',
        fullName: 'Office of the Dean & Academic Registrar',
        role: 'ADMIN',
        email: 'admin@university.edu'
      });
    } else {
      addToast('error', 'Access Denied', 'Invalid administrative credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#EAF1FF] text-[#3157C8] mx-auto flex items-center justify-center mb-2">
            {mode === 'ADMIN_LOGIN' ? <Shield className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
          </div>
          <h2 className="text-xl font-bold text-[#253047]">
            {mode === 'STUDENT_REGISTER' && 'Student Registration'}
            {mode === 'STUDENT_LOGIN' && 'Student Sign In'}
            {mode === 'ADMIN_LOGIN' && 'Administrator Console'}
          </h2>
          <p className="text-xs text-[#737D90] mt-0.5">
            {mode === 'STUDENT_REGISTER' && 'Enter your verified university and personal records'}
            {mode === 'STUDENT_LOGIN' && 'Access your personalized course dashboard'}
            {mode === 'ADMIN_LOGIN' && 'Authorized registrar personnel access only'}
          </p>
        </div>

        {/* STUDENT REGISTRATION */}
        {mode === 'STUDENT_REGISTER' && (
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
              {[
                { s: 1, label: '1. Personal' },
                { s: 2, label: '2. Academic' },
                { s: 3, label: '3. Security' },
              ].map(st => (
                <div key={st.s} className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    step === st.s ? 'bg-[#3157C8] text-white' : 
                    step > st.s ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > st.s ? '✓' : st.s}
                  </div>
                  <span className={`text-xs font-semibold ${step === st.s ? 'text-[#3157C8]' : 'text-slate-400'}`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {step === 1 && (
              <form onSubmit={handleNextStep1} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Full Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter your official full name"
                    value={regData.fullName}
                    onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#253047] mb-1">Email Address *</label>
                    <input 
                      type="email"
                      required
                      placeholder="student@university.edu"
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#253047] mb-1">Phone Number *</label>
                    <input 
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#253047] mb-1">Date of Birth *</label>
                    <input 
                      type="date"
                      required
                      value={regData.dateOfBirth}
                      onChange={(e) => setRegData({ ...regData, dateOfBirth: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#253047] mb-1">Gender</label>
                    <select
                      value={regData.gender}
                      onChange={(e) => setRegData({ ...regData, gender: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none"
                    >
                      <option value="Prefer not to say">Prefer not to say</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white font-semibold flex items-center gap-1.5 transition"
                  >
                    <span>Next: Academic Information</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNextStep2} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">University Roll Number *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. 2026CSE1082"
                    value={regData.registrationNumber}
                    onChange={(e) => setRegData({ ...regData, registrationNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#253047] mb-1">College / Institute Name *</label>
                  <input 
                    type="text"
                    required
                    value={regData.collegeName}
                    onChange={(e) => setRegData({ ...regData, collegeName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#253047] mb-1">Department</label>
                    <select
                      value={regData.department}
                      onChange={(e) => setRegData({ ...regData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none"
                    >
                      <option value="CSE">Computer Science & Eng (CSE)</option>
                      <option value="ECE">Electronics & Comm (ECE)</option>
                      <option value="EEE">Electrical & Electronics (EEE)</option>
                      <option value="MECH">Mechanical Eng (MECH)</option>
                      <option value="CIVIL">Civil Eng (CIVIL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#253047] mb-1">Degree Program</label>
                    <select
                      value={regData.degree}
                      onChange={(e) => setRegData({ ...regData, degree: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none"
                    >
                      <option value="B.Tech">B.Tech</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="BCA">BCA</option>
                      <option value="M.Tech">M.Tech</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#253047] mb-1">Current Semester</label>
                    <select
                      value={regData.semester}
                      onChange={(e) => setRegData({ ...regData, semester: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none"
                    >
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                      <option value="Semester 7">Semester 7</option>
                      <option value="Semester 8">Semester 8</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#253047] mb-1">Self-Reported CGPA</label>
                    <input 
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="e.g. 8.75"
                      value={regData.cgpa}
                      onChange={(e) => setRegData({ ...regData, cgpa: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white font-semibold flex items-center gap-1.5 transition"
                  >
                    <span>Next: Security</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleCompleteRegistration} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Create Password *</label>
                  <input 
                    type="password"
                    required
                    placeholder="Minimum 6 characters"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
                  />
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          passwordStrength <= 25 ? 'bg-rose-500 w-1/4' :
                          passwordStrength <= 50 ? 'bg-amber-500 w-2/4' :
                          passwordStrength <= 75 ? 'bg-sky-500 w-3/4' : 'bg-emerald-500 w-full'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {passwordStrength <= 25 ? 'Weak' : passwordStrength <= 50 ? 'Moderate' : 'Strong'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Confirm Password *</label>
                  <input 
                    type="password"
                    required
                    placeholder="Re-enter password"
                    value={regData.confirmPassword}
                    onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
                  />
                </div>

                <div className="p-3 rounded-lg bg-[#F7F8FC] border border-slate-200 flex items-start gap-2.5">
                  <input 
                    type="checkbox"
                    id="terms"
                    checked={regData.acceptTerms}
                    onChange={(e) => setRegData({ ...regData, acceptTerms: e.target.checked })}
                    className="mt-0.5 rounded text-[#3157C8]"
                  />
                  <label htmlFor="terms" className="text-[11px] text-[#737D90] leading-snug cursor-pointer">
                    I confirm that the academic details submitted are authentic and adhere to university academic policies.
                  </label>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white font-semibold transition"
                  >
                    Complete Registration
                  </button>
                </div>
              </form>
            )}

            <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-[#737D90]">
              Already registered?{' '}
              <button 
                type="button" 
                onClick={() => setMode('STUDENT_LOGIN')} 
                className="text-[#3157C8] font-semibold hover:underline"
              >
                Sign In here
              </button>
            </div>
          </div>
        )}

        {/* STUDENT LOGIN */}
        {mode === 'STUDENT_LOGIN' && (
          <form onSubmit={handleStudentLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#253047] mb-1">Registered Student Email</label>
              <input 
                type="email"
                required
                placeholder="student@university.edu"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#253047] mb-1">Password</label>
              <input 
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white font-semibold transition mt-2"
            >
              Sign In to Workspace
            </button>

            <div className="text-center pt-3 border-t border-slate-100 text-[#737D90]">
              New student?{' '}
              <button 
                type="button" 
                onClick={() => { setStep(1); setMode('STUDENT_REGISTER'); }} 
                className="text-[#3157C8] font-semibold hover:underline"
              >
                Create student profile
              </button>
            </div>
          </form>
        )}

        {/* ADMIN LOGIN */}
        {mode === 'ADMIN_LOGIN' && (
          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
              <strong>Administrator Credentials:</strong><br />
              Username: <code className="font-mono font-bold">admin@university.edu</code><br />
              Password: <code className="font-mono font-bold">admin2026</code>
            </div>

            <div>
              <label className="block font-semibold text-[#253047] mb-1">Administrator ID</label>
              <input 
                type="email"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#253047] mb-1">Security Key</label>
              <input 
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white font-semibold transition mt-2 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Authenticate Administrator</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 3. STUDENT PORTAL (REQUEST REGISTRATION, MY REGISTRATIONS, REAL DASHBOARD)
// ============================================================================
function CleanStudentPortal({ 
  student, 
  courses, 
  allCourses, 
  registrations, 
  allRegistrations, 
  studentActivities,
  getCourseSeatStats, 
  onSubmitRegistrationRequest, 
  onCancelRequest,
  onUpdateProfile 
}) {
  const { addToast } = useContext(ToastContext);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'explorer', 'my-registrations', 'profile'
  const [filterDept, setFilterDept] = useState('ALL');
  const [searchWord, setSearchWord] = useState('');
  
  // Registration Request Confirmation Modal state
  const [requestModalCourse, setRequestModalCourse] = useState(null);
  
  // Conflict warning modal
  const [conflictModalData, setConflictModalData] = useState(null);

  // View Approved Certificate / Confirmation Slip modal
  const [slipModalRecord, setSlipModalRecord] = useState(null);

  // Dynamic calculations:
  // 1. Total Requests
  const totalRequestsCount = registrations.length;
  // 2. Approved Courses (Active Enrollments)
  const approvedRequests = useMemo(() => registrations.filter(r => r.status === 'Approved'), [registrations]);
  // 3. Pending Requests
  const pendingRequests = useMemo(() => registrations.filter(r => r.status === 'Pending'), [registrations]);
  // 4. Completed Courses (Only genuinely completed courses count; initially 0 or from student.completedCourses)
  const completedCoursesCount = student.completedCoursesCount || 0;
  // 5. Earned Credits (strictly from completed courses, e.g. student.completedCredits, not just approved)
  const earnedCreditsCount = student.completedCredits || 0;
  // 6. Currently registered credits in current semester (Approved)
  const currentSemesterApprovedCredits = useMemo(() => approvedRequests.reduce((sum, r) => sum + r.credits, 0), [approvedRequests]);

  // Initiate Request Registration
  const handleInitiateRequest = (course) => {
    // 1. Check if an active request already exists (Pending or Approved)
    const existing = registrations.find(r => r.courseId === course.id && (r.status === 'Pending' || r.status === 'Approved'));
    if (existing) {
      addToast('warning', 'Request Already Active', `You already have an active ${existing.status.toLowerCase()} registration for ${course.code}.`);
      return;
    }

    // 2. Check if available seats == 0
    const { availableSeats } = getCourseSeatStats(course.id, course.totalSeats);
    if (availableSeats <= 0) {
      addToast('error', 'Course Full', 'There are no available seats in this course. You cannot submit a registration request.');
      return;
    }

    // 3. Credit ceiling limit check (approved + new course credits vs limit)
    if (currentSemesterApprovedCredits + course.credits > student.maxCreditsLimit) {
      addToast('error', 'Credit Limit Exceeded', `Adding ${course.credits} credits will exceed your maximum semester limit of ${student.maxCreditsLimit} credits.`);
      return;
    }

    // 4. Timetable conflict check with approved courses
    for (const app of approvedRequests) {
      const isClash = app.daySlot?.some(slot => course.daySlot?.includes(slot));
      if (isClash) {
        setConflictModalData({ desired: course, clashing: app });
        return;
      }
    }

    // Open Step 4 Modal
    setRequestModalCourse(course);
  };

  const handleConfirmSubmission = () => {
    if (!requestModalCourse) return;
    onSubmitRegistrationRequest(requestModalCourse);
    setRequestModalCourse(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Student Top Greeting Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#3157C8] uppercase tracking-wider">
            Student Academic Workspace
          </span>
          <h1 className="text-2xl font-bold text-[#253047] mt-1">
            Welcome back, {student.fullName}
          </h1>
          <p className="text-xs text-[#737D90] mt-1">
            Roll No: <span className="font-semibold text-[#253047]">{student.registrationNumber}</span> • {student.department} • {student.degree} ({student.semester})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-[#F7F8FC] border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-[#737D90] block">Approved Credits</span>
            <span className="text-base font-bold text-[#3157C8]">{currentSemesterApprovedCredits} / {student.maxCreditsLimit}</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#F7F8FC] border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-[#737D90] block">Current CGPA</span>
            <span className="text-base font-bold text-emerald-600">
              {student.cgpa ? student.cgpa : 'Not provided'}
            </span>
          </div>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'dashboard', label: 'Academic Overview', icon: LayoutDashboard },
          { id: 'explorer', label: 'Course Explorer', icon: Compass },
          { id: 'my-registrations', label: `My Registrations (${registrations.length})`, icon: BookOpen },
          { id: 'profile', label: 'Student Profile & Settings', icon: User },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
                isActive 
                  ? 'bg-[#3157C8] text-white shadow-xs' 
                  : 'text-[#737D90] hover:text-[#253047] hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ACADEMIC OVERVIEW DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Dynamic Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-[#737D90]">Total Requests</span>
              <p className="text-2xl font-bold text-[#253047] mt-1">{totalRequestsCount}</p>
              <span className="text-[11px] text-[#737D90]">Submitted requests</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-[#737D90]">Approved Courses</span>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{approvedRequests.length}</p>
              <span className="text-[11px] text-[#737D90]">Seats confirmed</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-[#737D90]">Pending Requests</span>
              <p className="text-2xl font-bold text-amber-600 mt-1">{pendingRequests.length}</p>
              <span className="text-[11px] text-[#737D90]">Awaiting Dean review</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-[#737D90]">Completed Courses</span>
              <p className="text-2xl font-bold text-[#3157C8] mt-1">{completedCoursesCount}</p>
              <span className="text-[11px] text-[#737D90]">Finished curriculum</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs col-span-2 md:col-span-1">
              <span className="text-xs text-[#737D90]">Earned Credits</span>
              <p className="text-2xl font-bold text-[#253047] mt-1">{earnedCreditsCount}</p>
              <span className="text-[11px] text-[#737D90]">From completed work</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Approved Active Courses List */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm text-[#253047]">Confirmed Enrolled Courses</h3>
                  <p className="text-xs text-[#737D90]">Approved course registrations holding active seats</p>
                </div>
                <span className="text-xs font-bold text-[#3157C8] bg-[#EAF1FF] px-2.5 py-1 rounded-full">
                  {approvedRequests.length} Approved
                </span>
              </div>

              {approvedRequests.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#EAF1FF] text-[#3157C8] flex items-center justify-center mx-auto">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#253047]">No courses registered yet.</h4>
                  <p className="text-xs text-[#737D90] max-w-sm mx-auto">
                    Explore available courses and submit a registration request to start building your academic schedule.
                  </p>
                  <button
                    onClick={() => setActiveTab('explorer')}
                    className="px-4 py-2 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white text-xs font-semibold transition"
                  >
                    Explore Courses
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {approvedRequests.map(r => (
                    <div key={r.id || r.registrationId} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#253047]">{r.courseCode}</span>
                          <span className="text-[11px] text-[#737D90]">— {r.courseName}</span>
                        </div>
                        <p className="text-[#737D90] text-[11px] mt-0.5">{r.instructor} • {r.schedule}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#3157C8] bg-[#EAF1FF] px-2 py-0.5 rounded text-[11px]">
                          {r.credits} Credits
                        </span>
                        <button
                          onClick={() => setSlipModalRecord(r)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[#3157C8]"
                          title="View Digital Slip"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Registration Activity Section */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-bold text-sm text-[#253047] mb-1">Recent Activity</h3>
              <p className="text-xs text-[#737D90] mb-4">Timeline of your submissions and administrator decisions</p>

              {studentActivities.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#737D90]">
                  No recent registration activities recorded yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {studentActivities.slice(0, 5).map(act => (
                    <div key={act.id} className="p-3 rounded-lg bg-[#F7F8FC] border border-slate-200 text-xs">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${
                          act.type === 'APPROVED' ? 'text-emerald-700' :
                          act.type === 'REJECTED' ? 'text-rose-700' :
                          act.type === 'CANCELLED' ? 'text-slate-600' : 'text-[#3157C8]'
                        }`}>
                          {act.title}
                        </span>
                        <span className="text-[10px] text-[#737D90]">{act.time}</span>
                      </div>
                      <p className="text-[11px] text-[#253047] mt-1 leading-relaxed">{act.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COURSE EXPLORER WITH PROMINENT SEAT AVAILABILITY */}
      {activeTab === 'explorer' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[240px] relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder="Search catalog by title, code, instructor..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-[#3157C8]"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#737D90]">Department:</span>
              <select 
                value={filterDept} 
                onChange={(e) => setFilterDept(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
              >
                <option value="ALL">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses
              .filter(c => filterDept === 'ALL' || c.dept === filterDept)
              .filter(c => c.title.toLowerCase().includes(searchWord.toLowerCase()) || c.code.toLowerCase().includes(searchWord.toLowerCase()))
              .map(course => {
                const existingReq = registrations.find(r => r.courseId === course.id);
                const { approvedCount, availableSeats, occupancyPercent, statusLabel, statusColor } = getCourseSeatStats(course.id, course.totalSeats);
                const isFull = availableSeats <= 0;

                return (
                  <div key={course.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EAF1FF] text-[#3157C8]">
                          {course.code}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusColor}`}>
                          {statusLabel}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-[#253047]">{course.title}</h4>
                        <p className="text-xs text-[#737D90] mt-1">{course.instructor} • {course.dept}</p>
                      </div>

                      <p className="text-xs text-[#737D90] line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="bg-[#F7F8FC] p-3 rounded-lg text-xs text-[#737D90] space-y-1">
                        <p>🗓️ {course.schedule}</p>
                        <p>📍 {course.room}</p>
                        <p>⏱️ Duration: {course.duration || '14 Weeks'}</p>
                        <p>📋 Prerequisites: {course.prerequisites || 'None'}</p>
                      </div>

                      {/* Prominent Available Seats Display */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-[#253047]">
                            {availableSeats} / {course.totalSeats} seats available
                          </span>
                          <span className="text-[11px] text-[#737D90]">{approvedCount} confirmed</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div 
                            className={`h-full transition-all ${
                              occupancyPercent >= 90 ? 'bg-rose-500' :
                              occupancyPercent >= 70 ? 'bg-amber-500' : 'bg-[#3157C8]'
                            }`}
                            style={{ width: `${occupancyPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#737D90]">
                        {course.credits} Credits
                      </span>

                      {existingReq ? (
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                          existingReq.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                          existingReq.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          existingReq.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {existingReq.status === 'Pending' ? 'Request Pending' : existingReq.status}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleInitiateRequest(course)}
                          disabled={isFull}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                            isFull 
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                              : 'bg-[#3157C8] hover:bg-[#2847A5] text-white shadow-xs'
                          }`}
                        >
                          {isFull ? 'Course Full' : 'Request Registration'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 3: MY REGISTRATIONS (Filterable, Cancellable, Rejection Details) */}
      {activeTab === 'my-registrations' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-[#253047]">My Registration Requests</h3>
              <p className="text-xs text-[#737D90]">Review the status of your submitted course enrollment requests</p>
            </div>
            <span className="text-xs text-[#737D90]">
              Total: <strong className="text-[#253047]">{registrations.length}</strong> records
            </span>
          </div>

          {registrations.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EAF1FF] text-[#3157C8] flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-xs text-[#737D90]">You have not submitted any course registration requests yet.</p>
              <button
                onClick={() => setActiveTab('explorer')}
                className="px-4 py-2 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white text-xs font-semibold transition"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F8FC] text-[#737D90] border-b border-slate-100 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Request ID</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Credits</th>
                    <th className="py-3 px-4">Request Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Remarks / Rejection Reason</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registrations.map(r => (
                    <tr key={r.registrationId || r._id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-semibold text-[#3157C8]">{r.registrationId}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#253047] block">{r.courseCode}</span>
                        <span className="text-[#737D90] text-[11px]">{r.courseName}</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#253047]">{r.credits}</td>
                      <td className="py-3 px-4 text-[#737D90]">{r.requestedAt}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          r.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                          r.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          r.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {r.status === 'Pending' ? 'Pending Review' : r.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#737D90] max-w-xs">
                        {r.status === 'Rejected' && r.rejectionReason ? (
                          <span className="text-rose-600 font-medium">{r.rejectionReason}</span>
                        ) : r.status === 'Approved' ? (
                          <span className="text-emerald-700 font-medium">Seat reserved and confirmed</span>
                        ) : r.status === 'Pending' ? (
                          <span className="text-slate-400 italic">Awaiting faculty dean review</span>
                        ) : (
                          <span className="text-slate-400 italic">Withdrawn by student</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {r.status === 'Pending' && (
                          <button
                            onClick={() => onCancelRequest(r.registrationId)}
                            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-[11px] font-semibold transition"
                          >
                            Cancel Request
                          </button>
                        )}
                        {r.status === 'Approved' && (
                          <button
                            onClick={() => setSlipModalRecord(r)}
                            className="px-2.5 py-1 rounded bg-[#EAF1FF] text-[#3157C8] hover:bg-[#3157C8] hover:text-white text-[11px] font-semibold transition"
                          >
                            View Slip
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PROFILE */}
      {activeTab === 'profile' && (
        <CleanStudentProfileTab student={student} onSaveProfile={onUpdateProfile} />
      )}

      {/* STEP 4 & 5: REGISTRATION REQUEST CONFIRMATION MODAL */}
      {requestModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 relative">
            <button 
              onClick={() => setRequestModalCourse(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#3157C8] flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#253047]">Confirm Registration Request</h3>
                <p className="text-xs text-[#737D90]">Review course details before submitting request to Dean</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F8FC] border border-slate-200 text-xs space-y-2.5 mb-5">
              <div className="flex justify-between">
                <span className="text-[#737D90]">Course Name:</span>
                <span className="font-bold text-[#253047]">{requestModalCourse.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Course Code:</span>
                <span className="font-mono font-bold text-[#3157C8]">{requestModalCourse.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Department:</span>
                <span className="font-semibold text-[#253047]">{requestModalCourse.dept}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Instructor:</span>
                <span className="text-[#253047]">{requestModalCourse.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Academic Credits:</span>
                <span className="font-bold text-[#253047]">{requestModalCourse.credits} Credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Available Seats:</span>
                <span className="font-semibold text-emerald-700">
                  {getCourseSeatStats(requestModalCourse.id, requestModalCourse.totalSeats).availableSeats} / {requestModalCourse.totalSeats} seats
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Registration Deadline:</span>
                <span className="text-[#253047]">{requestModalCourse.deadline}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50/80 border border-blue-200 text-[#3157C8] text-xs leading-relaxed mb-6">
              <Info className="w-4 h-4 inline-block mr-1 -mt-0.5" />
              <strong>Notice:</strong> Your registration request will be sent to the administrator for approval. You will be notified once your request has been reviewed. Submitting this request does not consume a confirmed seat until approved.
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRequestModalCourse(null)}
                className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmission}
                className="px-5 py-2.5 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <span>Confirm & Submit Request</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TIMETABLE CONFLICT MODAL */}
      {conflictModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl border border-rose-200 shadow-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#253047]">Lecture Schedule Conflict</h3>
            <p className="text-xs text-[#737D90] mt-1">
              CourseHub Pro detected an overlapping class time slot:
            </p>

            <div className="my-4 p-3 rounded-lg bg-[#F7F8FC] border border-slate-200 text-xs text-left space-y-2">
              <div>
                <span className="text-[#737D90] block text-[10px]">Desired Course</span>
                <span className="font-bold text-[#253047]">{conflictModalData.desired.code} ({conflictModalData.desired.schedule})</span>
              </div>
              <div className="border-t border-slate-200 pt-1">
                <span className="text-rose-600 block text-[10px] font-semibold">Conflicts With Registered Course</span>
                <span className="font-bold text-rose-700">{conflictModalData.clashing.courseCode} ({conflictModalData.clashing.schedule})</span>
              </div>
            </div>

            <button
              onClick={() => setConflictModalData(null)}
              className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
            >
              Dismiss Notice
            </button>
          </div>
        </div>
      )}

      {/* APPROVED ENROLLMENT CONFIRMATION SLIP MODAL */}
      {slipModalRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 relative">
            <button 
              onClick={() => setSlipModalRecord(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-4 border-b border-slate-100 mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-2">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#253047]">Enrollment Confirmation Certificate</h3>
              <p className="text-xs text-[#737D90]">Official Academic Course Registration Slip</p>
            </div>

            <div className="space-y-3 text-xs bg-[#F7F8FC] p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-[#737D90]">Registration ID:</span>
                <span className="font-mono font-bold text-[#3157C8]">{slipModalRecord.registrationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Student Name:</span>
                <span className="font-bold text-[#253047]">{student.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Roll Number:</span>
                <span className="font-mono text-[#253047]">{student.registrationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Course Code:</span>
                <span className="font-bold text-[#253047]">{slipModalRecord.courseCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Course Name:</span>
                <span className="font-semibold text-[#253047]">{slipModalRecord.courseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Academic Credits:</span>
                <span className="font-bold text-[#3157C8]">{slipModalRecord.credits} Credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Approved By:</span>
                <span className="text-[#253047]">{slipModalRecord.reviewedBy || 'Office of the Academic Dean'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Approved Date:</span>
                <span className="text-[#253047]">{slipModalRecord.reviewedAt || '2026-11-01'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Seat Status:</span>
                <span className="font-semibold text-emerald-700">Reserved & Active</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSlipModalRecord(null)}
                className="px-5 py-2 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white text-xs font-semibold"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 4. STUDENT PROFILE TAB
// ============================================================================
function CleanStudentProfileTab({ student, onSaveProfile }) {
  const [formData, setFormData] = useState({ ...student });

  const handleSave = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-4xl">
      <div className="mb-6 pb-4 border-b border-slate-100">
        <h3 className="font-bold text-lg text-[#253047]">Academic & Personal Profile</h3>
        <p className="text-xs text-[#737D90]">View and update your verified institutional details</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        <div>
          <h4 className="font-bold text-sm text-[#3157C8] mb-3">1. Personal Information</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#253047] mb-1">Full Name</label>
              <input 
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#253047] mb-1">Email (Permanent)</label>
              <input 
                type="email"
                value={formData.email}
                disabled
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#253047] mb-1">Phone Number</label>
              <input 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#253047] mb-1">Date of Birth</label>
              <input 
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-bold text-sm text-[#3157C8] mb-3">2. Academic Information</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#253047] mb-1">Roll Number (Read-Only)</label>
              <input 
                type="text"
                value={formData.registrationNumber}
                disabled
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 font-mono cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#253047] mb-1">College Name</label>
              <input 
                type="text"
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#253047] mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#253047] mb-1">Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
              >
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Semester 3">Semester 3</option>
                <option value="Semester 4">Semester 4</option>
                <option value="Semester 5">Semester 5</option>
                <option value="Semester 6">Semester 6</option>
                <option value="Semester 7">Semester 7</option>
                <option value="Semester 8">Semester 8</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#253047] mb-1">Self-Reported CGPA</label>
              <input 
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa || ''}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                placeholder="Leave blank if not available"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#253047] mb-1">Total Completed Credits</label>
              <input 
                type="number"
                min="0"
                max="160"
                value={formData.completedCredits || 0}
                onChange={(e) => setFormData({ ...formData, completedCredits: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white font-semibold transition"
          >
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// 5. ADMIN PORTAL (COURSE MANAGEMENT & REGISTRATION REQUESTS APPROVAL)
// ============================================================================
function CleanAdminPortal({ 
  courses, 
  registrations, 
  registeredStudents, 
  departments, 
  auditLogs,
  getCourseSeatStats,
  onAddCourse, 
  onEditCourse, 
  onDeleteCourse, 
  onToggleCourseActive,
  onApproveRegistration,
  onRejectRegistration
}) {
  const { addToast } = useContext(ToastContext);
  const [adminTab, setAdminTab] = useState('overview'); // 'overview', 'courses', 'requests', 'students', 'audit'

  // Course Modal (Add / Edit)
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // null if adding new

  const [courseForm, setCourseForm] = useState({
    code: '',
    title: '',
    description: '',
    dept: 'CSE',
    instructor: '',
    credits: 4,
    duration: '14 Weeks',
    totalSeats: 60,
    prerequisites: '',
    semester: 'Semester 1',
    academicYear: '2026-2027',
    schedule: 'Mon, Wed 10:00 - 11:30 AM',
    deadline: '2026-12-15',
    category: 'Core Engineering'
  });

  // Filter for Registration Requests
  const [requestFilter, setRequestFilter] = useState('All'); // 'All', 'Pending', 'Approved', 'Rejected', 'Cancelled'

  // Approval confirmation modal
  const [approveConfirmModal, setApproveConfirmModal] = useState(null); // contains target registration record

  // Rejection modal
  const [rejectModalRecord, setRejectModalRecord] = useState(null);
  const [rejectionReasonText, setRejectionReasonText] = useState('');

  // Course Details View Modal
  const [viewCourseDetails, setViewCourseDetails] = useState(null);

  // Real Database Metrics
  const totalCoursesCount = courses.length;
  const totalStudentsCount = registeredStudents.length;
  const totalRequestsCount = registrations.length;
  const pendingRequestsCount = registrations.filter(r => r.status === 'Pending').length;
  const approvedEnrollmentsCount = registrations.filter(r => r.status === 'Approved').length;
  const rejectedRequestsCount = registrations.filter(r => r.status === 'Rejected').length;

  // Filtered requests list
  const filteredRequests = useMemo(() => {
    if (requestFilter === 'All') return registrations;
    return registrations.filter(r => r.status === requestFilter);
  }, [registrations, requestFilter]);

  // Open Modal to Add
  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseForm({
      code: '',
      title: '',
      description: '',
      dept: 'CSE',
      instructor: '',
      credits: 4,
      duration: '14 Weeks',
      totalSeats: 60,
      prerequisites: 'None',
      semester: 'Semester 1',
      academicYear: '2026-2027',
      schedule: 'Mon, Wed 10:00 - 11:30 AM',
      deadline: '2026-12-15',
      category: 'Core Engineering'
    });
    setCourseModalOpen(true);
  };

  // Open Modal to Edit
  const handleOpenEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      code: course.code,
      title: course.title,
      description: course.description,
      dept: course.dept,
      instructor: course.instructor,
      credits: course.credits,
      duration: course.duration || '14 Weeks',
      totalSeats: course.totalSeats,
      prerequisites: course.prerequisites || 'None',
      semester: course.semester || 'Semester 1',
      academicYear: course.academicYear || '2026-2027',
      schedule: course.schedule,
      deadline: course.deadline,
      category: course.category || 'Core Engineering'
    });
    setCourseModalOpen(true);
  };

  const handleSaveCourseForm = (e) => {
    e.preventDefault();
    if (!courseForm.code.trim() || !courseForm.title.trim()) {
      addToast('error', 'Validation Error', 'Course Code and Course Title are required.');
      return;
    }

    if (editingCourse) {
      // Edit
      const updated = {
        ...editingCourse,
        code: courseForm.code.toUpperCase(),
        title: courseForm.title,
        description: courseForm.description,
        dept: courseForm.dept,
        instructor: courseForm.instructor,
        credits: Number(courseForm.credits),
        duration: courseForm.duration,
        totalSeats: Number(courseForm.totalSeats),
        prerequisites: courseForm.prerequisites,
        semester: courseForm.semester,
        academicYear: courseForm.academicYear,
        schedule: courseForm.schedule,
        deadline: courseForm.deadline,
        category: courseForm.category
      };
      onEditCourse(updated);
    } else {
      // Add
      const newC = {
        id: courseForm.code.toUpperCase(),
        code: courseForm.code.toUpperCase(),
        title: courseForm.title,
        description: courseForm.description,
        dept: courseForm.dept,
        instructor: courseForm.instructor,
        credits: Number(courseForm.credits),
        duration: courseForm.duration,
        totalSeats: Number(courseForm.totalSeats),
        prerequisites: courseForm.prerequisites,
        semester: courseForm.semester,
        academicYear: courseForm.academicYear,
        schedule: courseForm.schedule,
        daySlot: ['Mon-10', 'Wed-10'],
        deadline: courseForm.deadline,
        category: courseForm.category,
        room: 'Academic Complex Block B',
        isActive: true
      };
      onAddCourse(newC);
    }
    setCourseModalOpen(false);
  };

  // Submit Approval
  const handleConfirmApproval = () => {
    if (!approveConfirmModal) return;
    onApproveRegistration(approveConfirmModal.registrationId);
    setApproveConfirmModal(null);
  };

  // Submit Rejection
  const handleConfirmRejection = () => {
    if (!rejectModalRecord) return;
    if (!rejectionReasonText.trim()) {
      addToast('error', 'Reason Required', 'Please provide an administrative reason for rejecting the request.');
      return;
    }
    onRejectRegistration(rejectModalRecord.registrationId, rejectionReasonText.trim());
    setRejectModalRecord(null);
    setRejectionReasonText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold text-[#3157C8] uppercase tracking-wider">University Registrar Console</span>
          <h1 className="text-2xl font-bold text-[#253047] mt-1">Administrator Command Center</h1>
          <p className="text-xs text-[#737D90]">Manage courses, review student registration requests, and inspect audit logs</p>
        </div>

        <button
          onClick={handleOpenAddCourse}
          className="px-4 py-2.5 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'overview', label: 'Platform Metrics', icon: BarChart3 },
          { id: 'courses', label: `Course Management (${courses.length})`, icon: BookOpen },
          { id: 'requests', label: `Registration Requests (${pendingRequestsCount} Pending)`, icon: UserCheck },
          { id: 'students', label: `Registered Students (${registeredStudents.length})`, icon: Users },
          { id: 'audit', label: 'Audit Trail', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
                isActive 
                  ? 'bg-[#3157C8] text-white shadow-xs' 
                  : 'text-[#737D90] hover:text-[#253047] hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: METRICS OVERVIEW */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-[#737D90]">Total Courses</span>
              <p className="text-2xl font-bold text-[#253047] mt-1">{totalCoursesCount}</p>
              <span className="text-[11px] text-[#737D90]">In academic catalog</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-[#737D90]">Total Students</span>
              <p className="text-2xl font-bold text-[#253047] mt-1">{totalStudentsCount}</p>
              <span className="text-[11px] text-[#737D90]">Registered accounts</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-[#737D90]">Total Requests</span>
              <p className="text-2xl font-bold text-[#3157C8] mt-1">{totalRequestsCount}</p>
              <span className="text-[11px] text-[#737D90]">Submitted by students</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-[#737D90]">Pending Requests</span>
              <p className="text-2xl font-bold text-amber-600 mt-1">{pendingRequestsCount}</p>
              <span className="text-[11px] text-[#737D90]">Action required</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-[#737D90]">Approved</span>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{approvedEnrollmentsCount}</p>
              <span className="text-[11px] text-[#737D90]">Seats locked</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-[#737D90]">Rejected</span>
              <p className="text-2xl font-bold text-rose-600 mt-1">{rejectedRequestsCount}</p>
              <span className="text-[11px] text-[#737D90]">Declined requests</span>
            </div>
          </div>

          {/* Pending Approval Requests Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-[#253047]">Pending Approval Requests</h3>
                <p className="text-xs text-[#737D90]">Quick review of student registration submissions</p>
              </div>
              <button 
                onClick={() => { setRequestFilter('Pending'); setAdminTab('requests'); }}
                className="text-xs font-semibold text-[#3157C8] hover:underline"
              >
                View all in Requests tab →
              </button>
            </div>

            {pendingRequestsCount === 0 ? (
              <div className="text-center py-8 text-xs text-[#737D90]">
                No pending registration requests awaiting approval.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {registrations.filter(r => r.status === 'Pending').slice(0, 4).map(r => {
                  const targetC = courses.find(c => c.id === r.courseId);
                  const { availableSeats } = targetC ? getCourseSeatStats(targetC.id, targetC.totalSeats) : { availableSeats: 0 };
                  return (
                    <div key={r.registrationId} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#3157C8]">{r.registrationId}</span>
                          <span className="font-bold text-[#253047]">{r.studentName} ({r.studentRoll})</span>
                        </div>
                        <p className="text-[#737D90] text-[11px] mt-0.5">
                          Course: <strong className="text-[#253047]">{r.courseCode}</strong> • Requested: {r.requestedAt} • Available: <strong className="text-emerald-700">{availableSeats} seats</strong>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setApproveConfirmModal(r)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs flex items-center gap-1 transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => { setRejectModalRecord(r); setRejectionReasonText(''); }}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center gap-1 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COURSE MANAGEMENT (Add, Edit, Delete, Activate/Deactivate) */}
      {adminTab === 'courses' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-[#253047]">Institutional Course Catalog</h3>
              <p className="text-xs text-[#737D90]">Create, modify course quotas, and manage active status</p>
            </div>
            <button
              onClick={handleOpenAddCourse}
              className="px-3.5 py-2 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Course</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F8FC] text-[#737D90] border-b border-slate-100 font-semibold">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Dept</th>
                  <th className="py-3 px-4">Credits</th>
                  <th className="py-3 px-4">Instructor</th>
                  <th className="py-3 px-4">Seats (Available / Total)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map(course => {
                  const { approvedCount, availableSeats, occupancyPercent, statusLabel, statusColor } = getCourseSeatStats(course.id, course.totalSeats);
                  return (
                    <tr key={course.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-[#3157C8]">{course.code}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#253047] block">{course.title}</span>
                        <span className="text-[#737D90] text-[11px]">{course.category || 'Core'} • {course.duration || '14 Wks'}</span>
                      </td>
                      <td className="py-3 px-4 text-[#737D90]">{course.dept}</td>
                      <td className="py-3 px-4 text-[#253047] font-semibold">{course.credits}</td>
                      <td className="py-3 px-4 text-[#737D90]">{course.instructor}</td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <span className="font-semibold text-[#253047]">
                            {availableSeats} / {course.totalSeats} Available
                          </span>
                          <span className="text-[10px] text-[#737D90] block">({approvedCount} approved)</span>
                          <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div 
                              className={`h-full ${
                                occupancyPercent >= 90 ? 'bg-rose-500' :
                                occupancyPercent >= 70 ? 'bg-amber-500' : 'bg-[#3157C8]'
                              }`} 
                              style={{ width: `${occupancyPercent}%` }} 
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => onToggleCourseActive(course.id)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                            course.isActive 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}
                          title="Click to toggle active status"
                        >
                          {course.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setViewCourseDetails(course)}
                          className="p-1.5 rounded-md hover:bg-slate-100 text-[#737D90]"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditCourse(course)}
                          className="p-1.5 rounded-md hover:bg-slate-100 text-[#3157C8]"
                          title="Edit Course"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteCourse(course.id)}
                          className="p-1.5 rounded-md hover:bg-rose-50 text-rose-600"
                          title="Delete Course (If No Active Records)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: REGISTRATION REQUESTS (With Filters, Approval & Rejection Confirmation) */}
      {adminTab === 'requests' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-[#253047]">Course Registration Requests</h3>
              <p className="text-xs text-[#737D90]">Review and make decisions on student course enrollment requests</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#F7F8FC] p-1 rounded-lg border border-slate-200 text-xs font-semibold">
              {['All', 'Pending', 'Approved', 'Rejected', 'Cancelled'].map(f => (
                <button
                  key={f}
                  onClick={() => setRequestFilter(f)}
                  className={`px-3 py-1 rounded-md transition ${
                    requestFilter === f ? 'bg-[#3157C8] text-white shadow-xs' : 'text-[#737D90] hover:text-[#253047]'
                  }`}
                >
                  {f} {f === 'Pending' && pendingRequestsCount > 0 && `(${pendingRequestsCount})`}
                </button>
              ))}
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#737D90]">
              No registration requests matching the selected filter ({requestFilter}).
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F8FC] text-[#737D90] border-b border-slate-100 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Request ID</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Roll Number</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Credits</th>
                    <th className="py-3 px-4">Request Date</th>
                    <th className="py-3 px-4">Available Seats</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map(r => {
                    const targetC = courses.find(c => c.id === r.courseId);
                    const { availableSeats } = targetC ? getCourseSeatStats(targetC.id, targetC.totalSeats) : { availableSeats: 0 };
                    return (
                      <tr key={r.registrationId || r._id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-mono font-semibold text-[#3157C8]">{r.registrationId}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#253047] block">{r.studentName}</span>
                          <span className="text-[#737D90] text-[11px]">{r.studentDept}</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[#737D90]">{r.studentRoll}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#253047] block">{r.courseCode}</span>
                          <span className="text-[#737D90] text-[11px]">{r.courseName}</span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#253047]">{r.credits}</td>
                        <td className="py-3 px-4 text-[#737D90]">{r.requestedAt}</td>
                        <td className="py-3 px-4">
                          <span className={`font-semibold ${availableSeats === 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                            {availableSeats} seats
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                            r.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            r.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {r.status === 'Pending' ? 'Pending Review' : r.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          {r.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => setApproveConfirmModal(r)}
                                className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-[11px] transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => { setRejectModalRecord(r); setRejectionReasonText(''); }}
                                className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-[11px] transition"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {r.status === 'Rejected' && r.rejectionReason && (
                            <span className="text-[10px] text-rose-600 italic">Declined</span>
                          )}
                          {r.status === 'Approved' && (
                            <span className="text-[10px] text-emerald-700 font-semibold">Seat Locked</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: REGISTERED STUDENTS */}
      {adminTab === 'students' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          {registeredStudents.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#737D90]">
              No student accounts have registered yet. Initial database is clean.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F8FC] text-[#737D90] border-b border-slate-100 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Roll Number</th>
                    <th className="py-3 px-4">Full Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Semester</th>
                    <th className="py-3 px-4">CGPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registeredStudents.map(s => (
                    <tr key={s._id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-semibold text-[#3157C8]">{s.registrationNumber}</td>
                      <td className="py-3 px-4 font-semibold text-[#253047]">{s.fullName}</td>
                      <td className="py-3 px-4 text-[#737D90]">{s.email}</td>
                      <td className="py-3 px-4 text-[#737D90]">{s.department}</td>
                      <td className="py-3 px-4 text-[#737D90]">{s.semester}</td>
                      <td className="py-3 px-4 font-semibold text-emerald-600">{s.cgpa || 'Not provided'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {adminTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <h3 className="font-bold text-sm text-[#253047] mb-4">Official System Audit Trail</h3>
          {auditLogs.length === 0 ? (
            <p className="text-xs text-[#737D90] py-6 text-center">No system actions logged yet.</p>
          ) : (
            <div className="space-y-2">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3 rounded-lg bg-[#F7F8FC] border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#3157C8]">{log.action}</span>
                    <span className="text-[#737D90] ml-2">• Actor: {log.actor}</span>
                    <p className="text-[#253047] text-[11px] mt-0.5">{log.details}</p>
                  </div>
                  <span className="text-[#737D90] text-[10px] font-mono">{log.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: ADD / EDIT COURSE FORM */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setCourseModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#253047] mb-1">
              {editingCourse ? `Edit Course ${editingCourse.code}` : 'Add New University Course'}
            </h3>
            <p className="text-xs text-[#737D90] mb-5">
              Available seats are automatically calculated from total capacity minus approved registrations.
            </p>

            <form onSubmit={handleSaveCourseForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Course Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS402"
                    value={courseForm.code}
                    onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Course Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Vision"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#253047] mb-1">Course Description *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Overview, syllabus topics, and scope"
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Department</label>
                  <select
                    value={courseForm.dept}
                    onChange={(e) => setCourseForm({ ...courseForm, dept: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  >
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Instructor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. S. Raman"
                    value={courseForm.instructor}
                    onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  >
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="Elective">Elective</option>
                    <option value="Specialization">Specialization</option>
                    <option value="Open Elective">Open Elective</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Credits</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    required
                    value={courseForm.credits}
                    onChange={(e) => setCourseForm({ ...courseForm, credits: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Course Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 14 Weeks"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Total Seat Capacity *</label>
                  <input
                    type="number"
                    min="1"
                    max="150"
                    required
                    value={courseForm.totalSeats}
                    onChange={(e) => setCourseForm({ ...courseForm, totalSeats: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Prerequisites</label>
                  <input
                    type="text"
                    placeholder="e.g. CS201 Data Structures"
                    value={courseForm.prerequisites}
                    onChange={(e) => setCourseForm({ ...courseForm, prerequisites: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Class Schedule</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mon, Wed 10:00 - 11:30 AM"
                    value={courseForm.schedule}
                    onChange={(e) => setCourseForm({ ...courseForm, schedule: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Semester</label>
                  <select
                    value={courseForm.semester}
                    onChange={(e) => setCourseForm({ ...courseForm, semester: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Academic Year</label>
                  <input
                    type="text"
                    required
                    value={courseForm.academicYear}
                    onChange={(e) => setCourseForm({ ...courseForm, academicYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#253047] mb-1">Registration Deadline</label>
                  <input
                    type="date"
                    required
                    value={courseForm.deadline}
                    onChange={(e) => setCourseForm({ ...courseForm, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#3157C8] hover:bg-[#2847A5] text-white font-semibold shadow-xs"
                >
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPROVAL CONFIRMATION DIALOG (With Verification Checks) */}
      {approveConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 relative">
            <button 
              onClick={() => setApproveConfirmModal(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-4 border-b border-slate-100 mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#253047]">Confirm Course Enrollment</h3>
              <p className="text-xs text-[#737D90]">Verifying academic preconditions and reserving 1 seat</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F8FC] border border-slate-200 text-xs space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-[#737D90]">Request ID:</span>
                <span className="font-mono font-bold text-[#3157C8]">{approveConfirmModal.registrationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Student:</span>
                <span className="font-bold text-[#253047]">{approveConfirmModal.studentName} ({approveConfirmModal.studentRoll})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Course Code:</span>
                <span className="font-bold text-[#253047]">{approveConfirmModal.courseCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737D90]">Available Seats:</span>
                <span className="font-semibold text-emerald-700">
                  {getCourseSeatStats(approveConfirmModal.courseId, courses.find(c => c.id === approveConfirmModal.courseId)?.totalSeats || 50).availableSeats} seats remaining
                </span>
              </div>
            </div>

            {/* Validation Checklist */}
            <div className="space-y-1.5 text-xs text-[#253047] bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 mb-5">
              <p className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Course has available seats
              </p>
              <p className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Student meets prerequisites
              </p>
              <p className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> No lecture schedule conflicts
              </p>
              <p className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Student within semester credit limit
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setApproveConfirmModal(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApproval}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
              >
                Confirm & Reserve Seat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECTION REASON DIALOG */}
      {rejectModalRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 relative">
            <button 
              onClick={() => setRejectModalRecord(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-4 border-b border-slate-100 mb-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 mx-auto flex items-center justify-center mb-2">
                <Ban className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#253047]">Decline Registration Request</h3>
              <p className="text-xs text-[#737D90]">Provide an official reason to notify the student</p>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <div>
                <label className="block font-semibold text-[#253047] mb-1">Administrative Rejection Reason *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Prerequisites not completed, departmental quota filled, or academic probation."
                  value={rejectionReasonText}
                  onChange={(e) => setRejectionReasonText(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-[#737D90] w-full block">Quick Templates:</span>
                {[
                  'Prerequisites not verified',
                  'Department credit cap reached',
                  'Timetable conflict with core lab',
                  'Course capacity reallocated'
                ].map(tmpl => (
                  <button
                    key={tmpl}
                    type="button"
                    onClick={() => setRejectionReasonText(tmpl)}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-600"
                  >
                    {tmpl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectModalRecord(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRejection}
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW COURSE DETAILS MODAL */}
      {viewCourseDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 relative">
            <button 
              onClick={() => setViewCourseDetails(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs font-bold text-[#3157C8] bg-[#EAF1FF] px-2 py-0.5 rounded">
                  {viewCourseDetails.code}
                </span>
                <h3 className="font-bold text-base text-[#253047] mt-1">{viewCourseDetails.title}</h3>
              </div>
            </div>

            <div className="space-y-2.5 text-xs bg-[#F7F8FC] p-4 rounded-xl border border-slate-200 mb-4">
              <p><strong className="text-[#737D90]">Department:</strong> {viewCourseDetails.dept}</p>
              <p><strong className="text-[#737D90]">Instructor:</strong> {viewCourseDetails.instructor}</p>
              <p><strong className="text-[#737D90]">Credits:</strong> {viewCourseDetails.credits} Academic Credits</p>
              <p><strong className="text-[#737D90]">Duration:</strong> {viewCourseDetails.duration || '14 Weeks'}</p>
              <p><strong className="text-[#737D90]">Schedule:</strong> {viewCourseDetails.schedule}</p>
              <p><strong className="text-[#737D90]">Prerequisites:</strong> {viewCourseDetails.prerequisites || 'None'}</p>
              <p><strong className="text-[#737D90]">Registration Deadline:</strong> {viewCourseDetails.deadline}</p>
              <p><strong className="text-[#737D90]">Description:</strong> {viewCourseDetails.description}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setViewCourseDetails(null)}
                className="px-5 py-2 rounded-lg bg-[#3157C8] text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 6. REST API ARCHITECTURE DOCUMENTATION VIEW
// ============================================================================
function CleanApiDocsView({ onClose }) {
  const [activeEndpoint, setActiveEndpoint] = useState('POST /api/registrations');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EAF1FF] text-[#3157C8] text-xs font-semibold mb-1">
            <Code className="w-3.5 h-3.5" />
            <span>OpenAPI 3.0 Architecture</span>
          </div>
          <h1 className="text-2xl font-bold text-[#253047]">Course Registration & Approval REST APIs</h1>
          <p className="text-xs text-[#737D90]">Specification for Student Request and Admin Approval Endpoints</p>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-100 text-[#253047]"
        >
          Return to Portal
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4 text-xs">
          {[
            {
              cat: 'Student Registration Requests',
              items: [
                { method: 'POST', path: '/api/registrations', desc: 'Submits course registration request in Pending state (no seat consumed)' },
                { method: 'GET', path: '/api/registrations/my', desc: 'Retrieves all requests submitted by authenticated student' },
                { method: 'PATCH', path: '/api/registrations/:id/cancel', desc: 'Cancels student pending registration request' }
              ]
            },
            {
              cat: 'Administrator Course & Approval Management',
              items: [
                { method: 'GET', path: '/api/admin/registrations', desc: 'Fetches all student requests with status filtering' },
                { method: 'PATCH', path: '/api/admin/registrations/:id/approve', desc: 'Atomically verifies criteria & reserves 1 course seat' },
                { method: 'PATCH', path: '/api/admin/registrations/:id/reject', desc: 'Declines student request with mandatory justification reason' },
                { method: 'POST', path: '/api/courses', desc: 'Admin adds new course to the catalog' },
                { method: 'PATCH', path: '/api/courses/:id', desc: 'Admin updates course capacity and schedule' },
                { method: 'DELETE', path: '/api/courses/:id', desc: 'Deletes course when zero active dependencies exist' }
              ]
            }
          ].map((cat, i) => (
            <div key={i} className="space-y-2">
              <h4 className="font-bold text-[#737D90] uppercase tracking-wider text-[11px]">{cat.cat}</h4>
              <div className="space-y-1.5">
                {cat.items.map((it, idx) => {
                  const key = `${it.method} ${it.path}`;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveEndpoint(key)}
                      className={`w-full p-3 rounded-lg border text-left transition flex items-center justify-between ${
                        activeEndpoint === key 
                          ? 'bg-[#EAF1FF] border-[#3157C8] text-[#3157C8] font-semibold' 
                          : 'bg-white border-slate-200 text-[#253047] hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-[10px] px-1.5 py-0.5 rounded ${
                          it.method === 'POST' ? 'bg-emerald-100 text-emerald-800' :
                          it.method === 'PATCH' ? 'bg-amber-100 text-amber-800' :
                          it.method === 'DELETE' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {it.method}
                        </span>
                        <span className="font-mono text-[11px] truncate max-w-[210px]">{it.path}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono font-bold text-[#3157C8]">{activeEndpoint}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">201 Created / 200 OK</span>
            </div>

            <div>
              <span className="font-bold text-[#737D90] uppercase text-[10px] block mb-1">Contract Rules</span>
              <p className="text-[#253047] leading-relaxed">
                Available seats are strictly derived as <code>TotalSeats - ActiveApprovedCount</code>. Submitting a pending request guarantees 0 seat deduction until the Academic Dean invokes the atomic <code>/approve</code> endpoint.
              </p>
            </div>

            <div>
              <span className="font-bold text-[#737D90] uppercase text-[10px] block mb-1">Request Payload (JSON)</span>
              <pre className="p-3 rounded-lg bg-[#F7F8FC] border border-slate-200 text-[#253047] font-mono text-[11px] overflow-x-auto">
{`{
  "courseId": "CS301"
}`}
              </pre>
            </div>

            <div>
              <span className="font-bold text-[#737D90] uppercase text-[10px] block mb-1">Server Response</span>
              <pre className="p-3 rounded-lg bg-[#F7F8FC] border border-slate-200 text-emerald-700 font-mono text-[11px] overflow-x-auto">
{`{
  "success": true,
  "message": "Registration request submitted. Awaiting administrator review.",
  "data": {
    "registrationId": "REQ-2026-9021",
    "studentRoll": "2026CSE1082",
    "courseCode": "CS301",
    "status": "Pending",
    "requestedAt": "2026-11-01",
    "seatReserved": false
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

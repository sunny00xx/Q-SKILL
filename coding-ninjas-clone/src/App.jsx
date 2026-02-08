import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Stats from './components/Stats'
import WorkingProfessionals from './components/WorkingProfessionals'
import CollegeStudentCourses from './components/CollegeStudentCourses'
import ImpactStats from './components/ImpactStats'
import CollegeStudents from './components/CollegeStudents'
import CallbackSection from './components/CallbackSection'
import Testimonials from './components/Testimonials'
import EventsSection from './components/EventsSection'
import PaymentSection from './components/PaymentSection'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = (method) => {
    console.log('Logging in with:', method);
    // Simulate login
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-white font-outfit selection:bg-ninja-orange selection:text-white pb-20 md:pb-0">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      <main>
        <Hero />
        <WorkingProfessionals />
        <CollegeStudentCourses />
        <ImpactStats />
        <CollegeStudents />
        <CallbackSection />
        <Testimonials />
        <EventsSection />
        <PaymentSection />
      </main>
      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Clock, 
  Shield, 
  Activity,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const carouselImages = [
    '/home_page_1.jpg',
    '/home_page_2.jpg', 
    '/home_page_3.jpg',
    '/home_page_4.jpg'
  ];

  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Intelligent appointment booking with real-time availability and automated reminders.',
      color: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Comprehensive patient records with medical history, prescriptions, and treatment plans.',
      color: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Access your practice data anytime, anywhere with our cloud-based platform.',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Rajesh Sharma',
      role: 'Cardiologist',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'AbhiCure has transformed how I manage my practice. The scheduling system is intuitive and my patients love the automated reminders.',
      rating: 5
    },
    {
      name: 'Dr. Priya Patel',
      role: 'General Practitioner',
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'The digital records feature has streamlined my workflow significantly. I can now focus more on patient care rather than paperwork.',
      rating: 5
    },
    {
      name: 'Dr. Anita Singh',
      role: 'Pediatrician',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'Managing appointments and patient records has never been easier. The system is user-friendly and I adapted quickly.',
      rating: 5
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Patients' },
    { number: '500+', label: 'Healthcare Providers' },
    { number: '50+', label: 'Doctors' },
    { number: '99.9%', label: 'Uptime Guarantee' }
  ];

  // Image carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % carouselImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Scroll detection for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % carouselImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header with Glassmorphism */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
            : 'bg-white/80 backdrop-blur-lg'
        }`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            {/* Logo - Increased Size */}
            <div className="flex items-center">
              <img 
                src="/abhicure_logo copy.jpg" 
                alt="AbhiCure Logo" 
                className="h-16 w-auto sm:h-20 lg:h-24 xl:h-28 object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-[#4A4A4A] hover:text-[#143D6F] transition-colors font-medium">
                Features
              </a>
              <a href="#testimonials" className="text-[#4A4A4A] hover:text-[#143D6F] transition-colors font-medium">
                Testimonials
              </a>
              <a href="#contact" className="text-[#4A4A4A] hover:text-[#143D6F] transition-colors font-medium">
                Contact
              </a>
              
              {/* Auth Buttons */}
              <div className="flex items-center space-x-3">
                <Link 
                  to="/signin" 
                  className="bg-transparent border-2 border-[#143D6F] text-[#143D6F] hover:bg-[#143D6F] hover:text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-all duration-300 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button & Auth */}
            <div className="md:hidden flex items-center space-x-2">
              <Link 
                to="/signin" 
                className="bg-transparent border border-[#143D6F] text-[#143D6F] hover:bg-[#143D6F] hover:text-white px-3 py-2 rounded-lg transition-all duration-300 font-medium text-sm"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-3 py-2 rounded-lg transition-colors font-medium text-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="pt-24 lg:pt-32 xl:pt-36 bg-gradient-to-br from-[#EDF9FC] via-white to-[#D6EAF8] py-12 lg:py-20">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#4A4A4A] leading-tight mb-6">
                Doctors Personal
                <span className="text-[#143D6F] block">Assistant System</span>
              </h1>
              <p className="text-lg lg:text-xl text-[#AFAFAF] mb-8 leading-relaxed max-w-2xl">
                Streamline your medical practice with our comprehensive platform. 
                From appointment scheduling to patient records, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/doctor/dashboard"
                  className="flex items-center justify-center bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-colors group"
                >
                  <Activity className="w-5 h-5 mr-2" />
                   Access Doctor Portal
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-4 lg:p-6 transform hover:scale-105 transition-transform duration-300">
                {/* Carousel Container */}
                <div className="relative overflow-hidden rounded-xl">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {carouselImages.map((image, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <img 
                          src={image}
                          alt={`Healthcare scene ${index + 1}`}
                          className="w-full h-48 sm:h-56 lg:h-64 xl:h-72 object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#143D6F] p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#143D6F] p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-[#143D6F] w-6' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats Overlay */}
                <div className="mt-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-[#143D6F]">24/7</div>
                      <div className="text-xs text-[#AFAFAF]">Support</div>
                    </div>
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-[#E53935]">99.9%</div>
                      <div className="text-xs text-[#AFAFAF]">Uptime</div>
                    </div>
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-[#143D6F]">500+</div>
                      <div className="text-xs text-[#AFAFAF]">Doctors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-[#EDF9FC]">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-4xl font-bold text-[#143D6F] mb-2">{stat.number}</div>
                <div className="text-[#AFAFAF] text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Only 3 Features */}
      <section id="features" className="py-12 lg:py-20 bg-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4A4A] mb-4">
              Everything You Need to Run Your Practice
            </h2>
            <p className="text-lg lg:text-xl text-[#AFAFAF] max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to deliver exceptional patient care 
              while streamlining your operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border border-[#D0D0D0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-[#4A4A4A] mb-4">{feature.title}</h3>
                  <p className="text-[#AFAFAF] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 lg:py-20 bg-[#EDF9FC]">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4A4A] mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg lg:text-xl text-[#AFAFAF]">
              See what doctors are saying about AbhiCure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border border-[#D0D0D0] hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-[#AFAFAF] mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-[#4A4A4A]">{testimonial.name}</div>
                    <div className="text-[#AFAFAF] text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 lg:py-20 bg-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4A4A] mb-6">Get in Touch</h2>
              <p className="text-lg lg:text-xl text-[#AFAFAF] mb-8">
                Have questions about AbhiCure? Our team is here to help you get started.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#D6EAF8] rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-[#143D6F]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#4A4A4A]">Phone</div>
                    <div className="text-[#AFAFAF]">+91 98765 43210</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#A8D5BA] rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-[#4A4A4A]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#4A4A4A]">Email</div>
                    <div className="text-[#AFAFAF]">support@abhicure.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#D6EAF8] rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-[#143D6F]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#4A4A4A]">Address</div>
                    <div className="text-[#AFAFAF]">123 Healthcare Complex, Medical District, Mumbai, Maharashtra 400001</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#EDF9FC] p-6 lg:p-8 rounded-xl border border-[#D0D0D0]">
              <h3 className="text-xl lg:text-2xl font-semibold text-[#4A4A4A] mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-[#D0D0D0] rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-[#D0D0D0] rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF]"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-[#D0D0D0] rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number (+91 XXXXX XXXXX)"
                  className="w-full px-4 py-3 border border-[#D0D0D0] rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF]"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border border-[#D0D0D0] rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E2A38] text-white py-8 lg:py-12">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                
              </div>
              <p className="text-[#AFAFAF]">
                Empowering healthcare professionals with modern technology solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-[#AFAFAF]">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-[#AFAFAF]">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-[#AFAFAF]">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#AFAFAF] mt-8 pt-8 text-center text-[#AFAFAF]">
            <p>&copy; 2025 AbhiCure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
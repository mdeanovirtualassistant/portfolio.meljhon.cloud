import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button"
const profileImage = "/lovable-uploads/profile.png";


const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToWorks = () => {
    const element = document.querySelector("#works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen bg-hero-gradient flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-hero-overlay opacity-60"></div>
      
      {/* Floating geometric shapes for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce-gentle"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl float-animation"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/8 rounded-lg blur-lg float-animation" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left animate-slide-in-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hero-text mb-6 tracking-tight">
              <span className="block">Meljhon</span>
              <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Deaño
              </span>
            </h1>
            <div className="relative mb-6">
              <p className="text-xl md:text-2xl text-hero-text-muted font-medium">
                IT Support Specialist | Administrative &amp; Operations
              </p>
              <div className="h-1 w-24 bg-gradient-to-r from-white to-transparent mt-3 mx-auto lg:mx-0"></div>
            </div>
            <p className="text-lg text-hero-text-muted mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              IT Support and Administrative professional with 4+ years across technical support,
              endpoint management, and operations — Microsoft 365, Active Directory, Entra ID, Intune,
              records handling, scheduling, and executive support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                onClick={scrollToContact}
                className="bg-white text-primary hover:bg-white/95 hover:shadow-lg hover:scale-105 px-8 py-3 text-lg font-semibold transition-all duration-300 rounded-xl"
              >
                Work With Me
              </Button>
              <Button 
                onClick={scrollToWorks}
                variant="outline" 
                className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 px-8 py-3 text-lg font-semibold transition-all duration-300 rounded-xl backdrop-blur-sm"
              >
                View My Work
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-hero-text-muted justify-center lg:justify-start">
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="font-medium">Davao City, Philippines</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Phone size={18} />
                </div>
                <span className="font-medium">+63 907 729 1142</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <div className="relative group">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              
              {/* Main profile container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                {/* Profile image with enhanced styling */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-profile group-hover:border-white/50 transition-all duration-500">
                  <img 
                    src={profileImage} 
                    alt="Meljhon Deaño" 
                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Status indicator with enhanced animation */}
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 w-5 h-5 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                </div>
                
                {/* Decorative floating elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/20 rounded-full blur-sm animate-bounce-gentle"></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-white/15 rounded-full blur-sm float-animation" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
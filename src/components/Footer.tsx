import { Mail, Phone, Linkedin, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Meljhon Deaño</h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              IT Support Specialist with administrative and operations experience — 4+ years of
              endpoint management, network troubleshooting, records handling, and reliable remote
              and onsite support.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:deanomeljohn67@gmail.com"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:+639077291142"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/meljohn357"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "About", href: "#about" },
                { name: "Experience", href: "#experience" },
                { name: "Skills", href: "#skills" },
                { name: "Education", href: "#education" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-primary-foreground/80" />
                <span className="text-primary-foreground/80">Davao City, Philippines</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-primary-foreground/80" />
                <a 
                  href="tel:+639077291142"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  +63 907 729 1142
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary-foreground/80" />
                <a 
                  href="mailto:deanomeljohn67@gmail.com"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  deanomeljohn67@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80">
            © {currentYear} Meljhon Deaño. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
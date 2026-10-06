import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Shield, Server, ClipboardList } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: <Server className="w-8 h-8 text-primary" />,
      title: "Technical Expertise",
      description: "Skilled in troubleshooting hardware and software issues across multiple platforms"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Network Management",
      description: "TCP/IP, LAN/WAN/VLAN, and remote desktop support"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "System Security",
      description: "VPN, firewall troubleshooting, and access management"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "IT Infrastructure",
      description: "Windows 10/11, Microsoft 365, Entra ID, Intune, QNAP NAS, and servers"
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-primary" />,
      title: "Administrative & Operations",
      description: "Document and records management, meeting minutes, calendar coordination, and executive support"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            IT support and administrative professional combining technical troubleshooting,
            system administration, records and operations support, and customer service excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Professional Background</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              IT Support Specialist with 4+ years of experience delivering robust technical solutions,
              endpoint management, and network troubleshooting, alongside administrative and operations
              support. Proven expertise in Microsoft 365, Active Directory, Entra ID, and Intune.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Alongside technical work, I have handled administrative responsibilities — document and
              records management, meeting minutes, calendar coordination, and executive support — plus
              resolving complex service requests and large-scale device deployments for remote and onsite
              environments, reducing setup times and keeping operations running for global clients.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Certifications & Education</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-foreground">MTA: Introduction to Programming Using Java</h4>
                <p className="text-muted-foreground">Microsoft | January 2020</p>
                <p className="text-sm text-muted-foreground">Certified Professional</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-foreground">Bachelor's in Information Technology</h4>
                <p className="text-muted-foreground">University of Mindanao, Matina Davao City</p>
                <p className="text-sm text-muted-foreground">2017 - 2021</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="flex justify-center">{item.icon}</div>
                <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
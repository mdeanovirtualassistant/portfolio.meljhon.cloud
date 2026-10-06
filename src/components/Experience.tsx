import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";

const itExperiences = [
  {
    logo: "",
    title: "Independent IT Support Specialist",
    company: "Upwork",
    location: "Remote",
    period: "07/2025 - Present",
    description: "Supporting international clients",
    achievements: [
      "Provide comprehensive remote IT support for hardware, software, VPN, firewall, and network connectivity issues",
      "Administer Microsoft 365 and Google Workspace accounts, permissions, and security policies",
      "Perform system updates, data backups, security audits, and maintain technical documentation and SOPs"
    ]
  },
  {
    logo: "/lovable-uploads/1a9a5f4a-bc06-48d8-898f-4af4d72d2290.png",
    title: "IT Support Engineer (Project-Based)",
    company: "Bladegrass Technologies Inc. (Assigned to Concentrix)",
    location: "Davao City, Philippines",
    period: "04/2025 - 06/2025",
    description: "Project-based enterprise support",
    achievements: [
      "Resolved 50+ weekly incidents and service requests in BMC Remedy across PC, network, software, and telephony environments",
      "Imaged, configured, and deployed 200+ Windows 11 desktops, reducing setup time by approximately 30%",
      "Managed Active Directory OU moves, Entra ID and Intune compliance, user access provisioning, and audit-ready asset tracking"
    ]
  },
  {
    logo: "/lovable-uploads/4ff097e1-2cbb-4863-9210-94c2e5ab29e6.png",
    title: "IT Technical Support",
    company: "E&W Group of Companies",
    location: "Davao City, Philippines",
    period: "07/2023 - 03/2025",
    description: "",
    achievements: [
      "Delivered Tier 1 and Tier 2 remote and onsite support for websites, servers, POS systems, QNAP NAS, CCTV, and end-user devices",
      "Diagnosed and resolved hardware, software, connectivity, and performance issues to maintain seamless operations",
      "Managed the complete IT asset lifecycle, including inventory, hardware upgrades, and infrastructure maintenance"
    ]
  }
];

const adminExperiences = [
  {
    logo: "",
    title: "Board Administrative Assistant",
    company: "Boundless Freedom Project",
    location: "Remote",
    period: "08/2025 - 06/2026",
    description: "U.S.-based nonprofit",
    achievements: [
      "Maintained technical and administrative records, managing secure digital communication and board documentation",
      "Supported leadership with software access, digital workspace coordination, and technical troubleshooting as needed"
    ]
  },
  {
    logo: "/lovable-uploads/f1e07c37-2b89-4aa2-827d-1bb63867fd3e.png",
    title: "Passport / Authentication Staff",
    company: "Department of Foreign Affairs",
    location: "Davao City, Philippines",
    period: "03/2022 - 06/2023",
    description: "Government service",
    achievements: [
      "Assisted the internal IT officer with basic hardware and software troubleshooting, end-user support, and digital records maintenance",
      "Processed authentication applications while maintaining strict compliance with data privacy and security protocols"
    ]
  }
];

const ExperienceCard = ({ exp }: { exp: (typeof itExperiences)[number] }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <CardHeader className="bg-primary/5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {exp.logo ? (
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-12 h-12 object-contain rounded-lg bg-card p-1 shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                {exp.company.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-xl text-foreground">{exp.title}</CardTitle>
            <p className="text-lg font-semibold text-primary">{exp.company}</p>
            {exp.description && (
              <p className="text-muted-foreground italic">{exp.description}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <CalendarDays size={14} />
            {exp.period}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin size={14} />
            {exp.location}
          </Badge>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-6">
      <ul className="space-y-3">
        {exp.achievements.map((achievement, achievementIndex) => (
          <li key={achievementIndex} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <span className="text-muted-foreground">{achievement}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Work Experience</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A dual track record in IT support and administrative operations across
            private, government, and international remote environments.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
            <span className="inline-block h-1 w-10 rounded-full bg-primary" />
            IT Support Experience
          </h3>
          <div className="space-y-8">
            {itExperiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
            <span className="inline-block h-1 w-10 rounded-full bg-primary" />
            Administrative Experience
          </h3>
          <div className="space-y-8">
            {adminExperiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

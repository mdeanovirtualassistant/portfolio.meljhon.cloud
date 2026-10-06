import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Monitor,
  Server,
  Network,
  Wrench,
  ClipboardList,
  Heart
} from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Systems & Infrastructure",
      skills: [
        "Active Directory",
        "Microsoft 365",
        "Entra ID",
        "Intune",
        "QNAP NAS",
        "Servers"
      ]
    },
    {
      icon: <Monitor className="w-6 h-6 text-primary" />,
      title: "Operating Systems & Endpoints",
      skills: [
        "Windows 10/11",
        "Windows Server",
        "Hardware Diagnostics",
        "Software Diagnostics",
        "Device Deployment"
      ]
    },
    {
      icon: <Server className="w-6 h-6 text-primary" />,
      title: "Networking & Security",
      skills: [
        "TCP/IP",
        "LAN / WAN / VLAN",
        "VPN Configuration",
        "Firewall Troubleshooting",
        "Access Management"
      ]
    },
    {
      icon: <Network className="w-6 h-6 text-primary" />,
      title: "IT Service Management",
      skills: [
        "BMC Remedy",
        "Zendesk",
        "Jira",
        "Remote Desktop Support",
        "Incident Resolution"
      ]
    },
    {
      icon: <Wrench className="w-6 h-6 text-primary" />,
      title: "Productivity & Collaboration",
      skills: [
        "Microsoft Teams",
        "SharePoint",
        "Slack",
        "Google Workspace",
        "Project Documentation"
      ]
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-primary" />,
      title: "Administrative & Records",
      skills: [
        "Administrative Records Management",
        "Board Documentation",
        "Secure Digital Communication",
        "Digital Workspace Coordination",
        "Data Privacy Compliance",
        "Application Processing"
      ]
    },
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Operations",
      skills: [
        "Data Backups",
        "Security Audits",
        "Asset Tracking",
        "Technical Documentation",
        "Standard Operating Procedures"
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Skills Set</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Soft and technical skills across multiple platforms, tools, and technologies
            essential for modern IT support, infrastructure management, and administrative operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
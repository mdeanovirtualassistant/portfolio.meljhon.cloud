import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, CalendarDays } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Undergraduate Studies in Information Technology",
      institution: "University of Mindanao",
      period: "2019 - 2021",
      type: "Undergraduate"
    },
    {
      degree: "Senior High School — Information and Communications Technology",
      institution: "University of Mindanao",
      period: "2017 - 2019",
      type: "Senior High School"
    }
  ];

  const certifications = [
    {
      title: "Rekruuto Level 1 Virtual Assistant",
      issuer: "Rekruuto",
      date: "July 2025",
      credentialUrl: "https://images.bannerbear.com/direct/JNodmlzogArzjAgPEe/requests/000/098/764/008/5nDZ3xmVezbnl4k5zy2qpdWj9/416ef7db9f7a47f6db3513e7f90c45cc12e0e298.pdf",
      image: "/lovable-uploads/59e1f028-a7c3-4fda-a7fb-db9fd1c9cc34.png"

    },
    {
      title: "Attention to Detail Level 2",
      issuer: "Rekruuto", 
      date: "July 2025",
      credentialUrl: "https://images.bannerbear.com/direct/JNodmlzogArzjAgPEe/requests/000/098/764/361/OA0Ekvge5YdnlmJ56KqRLpWxX/47772e94c7d93b382bb1f784afe5ad2c07cf482b.pdf",
      image: "/lovable-uploads/32a6f4fe-98a9-47e7-9f5c-5cd84ea908dc.png"

    },
    {
      title: "Microsoft Technology Associate — Introduction to Programming Using Java",
      issuer: "Microsoft",
      date: "Certified",
      credentialUrl: "https://www.credly.com/badges/b4d1522f-41f74ad2-9bb7-ca5bf186b653",
      image: "/lovable-uploads/5397f133-5015-4ccd-971a-9f9fd1327e60.png"

    }
  ];

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Education & Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Academic foundation and professional certifications that support my technical expertise.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-semibold text-foreground">Education</h3>
            </div>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg text-foreground">{edu.degree}</CardTitle>
                        <p className="text-primary font-medium">{edu.institution}</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <CalendarDays size={14} />
                          {edu.period}
                        </Badge>
                        <Badge variant="secondary">{edu.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-semibold text-foreground">Certifications</h3>
            </div>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow overflow-hidden">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-foreground mb-2">{cert.title}</CardTitle>
                        <p className="text-primary font-medium">{cert.issuer}</p>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit mt-2">
                          <CalendarDays size={14} />
                          {cert.date}
                        </Badge>
                      </div>

                    </div>
                  </CardHeader>

                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

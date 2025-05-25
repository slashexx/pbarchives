import Image from "next/image";
import Link from "next/link";
import { Github, Globe, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Link {
  name: string;
  url: string;
}

interface ProfileHeaderProps {
  name: string;
  email: string;
  pictureUrl?: string;
  domain?: string;
  yearOfStudy?: number;
  links?: Link[];
}

export function ProfileHeader({ 
  name, 
  email, 
  pictureUrl, 
  domain, 
  yearOfStudy,
  links = []
}: ProfileHeaderProps) {
  // Format year of study with appropriate suffix
  const yearLabel = yearOfStudy === 1 
    ? "1st Year" 
    : yearOfStudy === 2 
    ? "2nd Year" 
    : yearOfStudy === 3 
    ? "3rd Year" 
    : yearOfStudy 
    ? `${yearOfStudy}th Year` 
    : null;
  
  const getSocialIcon = (name: string) => {
    name = name.toLowerCase();
    if (name.includes('github')) return <Github className="h-4 w-4" />;
    if (name.includes('linkedin')) return <Linkedin className="h-4 w-4" />;
    if (name.includes('twitter')) return <Twitter className="h-4 w-4" />;
    return <Globe className="h-4 w-4" />;
  };
  
  return (
    <Card className="overflow-hidden border-none bg-transparent shadow-none">
      <div className="h-32 bg-gradient-to-r from-green-500/20 via-green-400/10 to-green-600/20" />
      <div className="p-6 sm:p-8 -mt-16 relative">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-background bg-muted flex items-center justify-center">
              {pictureUrl ? (
                <Image
                  src={pictureUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-5xl font-bold text-muted-foreground/30">
                  {name.charAt(0)}
                </span>
              )}
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-muted-foreground">
                  {domain && (
                    <Badge variant="secondary" className="font-normal">
                      {domain}
                    </Badge>
                  )}
                  {yearLabel && (
                    <span className="text-sm flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {yearLabel}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  asChild
                >
                  <Link href={`mailto:${email}`}>
                    <Mail className="h-4 w-4" />
                    Email
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Social Links */}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-1">
                {links.map((link) => (
                  <Button
                    key={link.url}
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                      {getSocialIcon(link.name)}
                      {link.name}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
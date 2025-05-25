"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Globe, LucideIcon } from "lucide-react";

type LinkType = 'github' | 'linkedin' | 'email' | 'website';

interface Link {
  type: LinkType;
  url: string;
}

interface ProfileHeaderProps {
  name: string;
  email: string;
  pictureUrl: string;
  domain: string;
  yearOfStudy: number;
  links: Link[];
  isCurrentUser?: boolean;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

const iconMap: Record<LinkType, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  website: Globe,
};

export function ProfileHeader({
  name,
  email,
  pictureUrl,
  domain,
  yearOfStudy,
  links,
  isCurrentUser,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <Avatar className="h-32 w-32 border-4 border-background">
        <AvatarImage src={pictureUrl} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-muted-foreground mb-4">
          {domain} • Year {yearOfStudy}
        </p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {links.map((link) => {
            const Icon = iconMap[link.type];
            return (
              <Button
                key={link.type}
                variant="outline"
                size="sm"
                className="gap-2"
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-4 w-4" />
                  {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
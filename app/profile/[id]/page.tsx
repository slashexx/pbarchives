import { Metadata } from "next";
import { notFound } from "next/navigation";
import { 
  MemberService, 
  SkillService, 
  ExperienceService, 
  AchievementService,
  LinkService
} from "@/lib/db";
import { ProfileHeader } from "@/components/profile/profile-header";
import { SkillSection } from "@/components/profile/skill-section";
import { ExperienceSection } from "@/components/profile/experience-section";
import { AchievementSection } from "@/components/profile/achievement-section";
import { ResumeSection } from "@/components/profile/resume-section";
import { ExportProfileButton } from "@/components/profile/export-profile-button";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const member = await MemberService.getMemberById(params.id);
  
  if (!member) {
    return {
      title: "Profile Not Found",
    };
  }
  
  return {
    title: `${member.name} | Point Blank`,
    description: `View ${member.name}'s developer profile on Point Blank`,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const member = await MemberService.getMemberById(params.id);
  
  if (!member) {
    notFound();
  }
  
  // Fetch additional profile data
  const skills = await SkillService.getMemberSkills(params.id);
  const experiences = await ExperienceService.getMemberExperiences(params.id);
  const achievements = await AchievementService.getMemberAchievements(params.id);
  const links = await LinkService.getMemberLinks(params.id);
  
  return (
    <div className="container py-8">
      <div className="mb-6">
        <ProfileHeader
          name={member.name}
          email={member.email}
          pictureUrl={member.picture_url}
          domain={member.domain}
          yearOfStudy={member.year_of_study}
          links={links}
        />
      </div>
      
      <div className="flex justify-end mb-6">
        <ExportProfileButton
          memberId={member.id}
          memberName={member.name}
          memberEmail={member.email}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {experiences.length > 0 && (
            <ExperienceSection experiences={experiences} />
          )}
          
          {achievements.length > 0 && (
            <AchievementSection achievements={achievements} />
          )}
        </div>
        
        <div className="space-y-6">
          <SkillSection skills={skills.map(s => s.name)} />
          
          {member.resume_url && (
            <ResumeSection resumeUrl={member.resume_url} />
          )}
        </div>
      </div>
    </div>
  );
}
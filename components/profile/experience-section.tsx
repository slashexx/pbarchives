import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {experiences.map((experience) => {
            // Format dates
            const startDate = new Date(experience.start_date);
            const endDate = experience.end_date ? new Date(experience.end_date) : null;
            
            const formattedStartDate = format(startDate, 'MMM yyyy');
            const formattedEndDate = experience.is_current 
              ? 'Present' 
              : endDate 
              ? format(endDate, 'MMM yyyy') 
              : '';
              
            const dateRange = `${formattedStartDate} - ${formattedEndDate}`;
            
            return (
              <div key={experience.id} className="border-l-2 border-muted pl-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-semibold">{experience.role}</h3>
                  <span className="text-sm text-muted-foreground">{dateRange}</span>
                </div>
                <div className="text-sm text-muted-foreground">{experience.company}</div>
                {experience.description && (
                  <p className="text-sm mt-2">{experience.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
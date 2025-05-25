import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface AchievementSectionProps {
  achievements: Achievement[];
}

export function AchievementSection({ achievements }: AchievementSectionProps) {
  if (!achievements || achievements.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {achievements.map((achievement) => {
            // Format date if available
            const formattedDate = achievement.date 
              ? format(new Date(achievement.date), 'MMM yyyy')
              : null;
              
            return (
              <div key={achievement.id} className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  {formattedDate && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {formattedDate}
                    </div>
                  )}
                </div>
                {achievement.description && (
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
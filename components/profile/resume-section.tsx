import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResumeSectionProps {
  resumeUrl: string;
}

export function ResumeSection({ resumeUrl }: ResumeSectionProps) {
  if (!resumeUrl) return null;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Resume</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <span>Resume.pdf</span>
          </div>
          <Button asChild>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
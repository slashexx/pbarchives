"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillSectionProps {
  skills: string[];
}

export function SkillSection({ skills }: SkillSectionProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const categoryMap: Record<string, string[]> = {
    "Frontend": ["React", "Vue", "Angular", "Next.js", "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind"],
    "Backend": ["Node.js", "Express", "Django", "Flask", "Laravel", "Spring", "Java", "Python", "PHP"],
    "Mobile": ["React Native", "Flutter", "Swift", "Kotlin", "Android", "iOS"],
    "Data": ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase", "Redis"],
    "DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Git"],
    "Design": ["Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator"],
    "AI/ML": ["TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy"],
    "Other": []
  };
  
  // Categorize skills
  const categorizedSkills: Record<string, string[]> = {};
  
  skills.forEach(skill => {
    let category = "Other";
    
    for (const [cat, catSkills] of Object.entries(categoryMap)) {
      if (catSkills.includes(skill)) {
        category = cat;
        break;
      }
    }
    
    if (!categorizedSkills[category]) {
      categorizedSkills[category] = [];
    }
    
    categorizedSkills[category].push(skill);
  });
  
  // Remove empty categories
  Object.keys(categorizedSkills).forEach(category => {
    if (categorizedSkills[category].length === 0) {
      delete categorizedSkills[category];
    }
  });
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map(skill => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredSkill === skill ? 1.05 : 1,
                      backgroundColor: hoveredSkill === skill 
                        ? "var(--green-500-alpha)" 
                        : "var(--accent)" 
                    }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="transition-colors"
                    style={{ 
                      "--green-500-alpha": "hsla(142, 76%, 36%, 0.1)" 
                    } as React.CSSProperties}
                  >
                    <Badge 
                      variant="secondary"
                      className="text-sm py-1 px-3 font-normal"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
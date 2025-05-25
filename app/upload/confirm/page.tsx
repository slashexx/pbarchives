"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

interface ParsedData {
  id: string;
  name: string;
  email: string;
  skills: string[];
  domain?: string;
  year?: number;
  achievements: string[];
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
    year_of_study: "",
  });

  useEffect(() => {
    // Read parsed data from localStorage
    const parsed = localStorage.getItem('parsed_resume');
    if (parsed) {
      const data = JSON.parse(parsed);
      setParsedData({
        id: data.id || '',
        name: data.name || '',
        email: data.email || '',
        skills: data.skills || [],
        domain: data.domain || '',
        year: data.year || undefined,
        achievements: data.achievements || [],
      });
      setFormData({
        name: data.name || '',
        email: data.email || '',
        domain: data.domain || '',
        year_of_study: data.year?.toString() || '',
      });
      setLoading(false);
    } else {
      router.push('/upload');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Get the user id from localStorage
      const memberId = localStorage.getItem('user_id');
      if (!memberId) throw new Error('User ID not found');

      // 1. Create or update member
      const memberPayload = {
        id: memberId,
        name: formData.name,
        email: formData.email,
        domain: formData.domain,
        year_of_study: formData.year_of_study ? parseInt(formData.year_of_study) : null,
      };
      const memberRes = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberPayload),
      });
      const memberData = await memberRes.json();
      if (!memberRes.ok) throw new Error(memberData.error || 'Failed to save member');

      // 2. Save skills
      if (parsedData?.skills?.length) {
        await fetch('/api/member-skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ member_id: memberId, skills: parsedData.skills }),
        });
      }

      // 3. Save achievements
      if (parsedData?.achievements?.length) {
        await fetch('/api/achievements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ member_id: memberId, achievements: parsedData.achievements }),
        });
      }

      toast({
        title: 'Profile created successfully',
        description: 'Your profile has been created and is now visible in the directory.',
      });
      router.push(`/profile/${memberId}`);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Confirm Your Profile</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Review and confirm the information we extracted from your resume.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Please review and update your information before creating your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                value={formData.domain}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, domain: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year of Study</Label>
              <Input
                id="year"
                type="number"
                min="1"
                max="5"
                value={formData.year_of_study}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, year_of_study: e.target.value }))
                }
              />
            </div>

            {parsedData?.skills && parsedData.skills.length > 0 && (
              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {parsedData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-muted rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/upload")}
            >
              Back
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Creating Profile..." : "Create Profile"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
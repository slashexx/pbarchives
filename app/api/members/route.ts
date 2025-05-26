import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received body for /api/members:", body);

    // Ensure required fields are present
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Prepare member data
    const memberData = {
      id: body.id,
      name: body.name,
      email: body.email,
      domain: body.domain || null,
      year_of_study: body.year_of_study || null,
      picture_url: body.picture_url || '',
      resume_url: body.resume_url || '',
    };

    const { data, error } = await supabase
      .from('members')
      .upsert([memberData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { success: false, error: error.message, details: error.details },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 
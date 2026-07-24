import { NextRequest, NextResponse } from 'next/server';
import { matchDestinations, MatchRequest } from '@/lib/matcher';
import { QuizAnswer, MoodMode } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const answers: QuizAnswer[] = body.answers;
    const moodMode: MoodMode = body.moodMode ?? 'default';
    const topN: number = body.topN ?? 3;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'answers array is required' },
        { status: 400 }
      );
    }

    const result = matchDestinations({ answers, moodMode, topN });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[/api/match] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

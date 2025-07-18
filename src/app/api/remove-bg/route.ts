import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { removeBackgroundFromImageBase64 } from 'remove.bg';

interface RemoveBgResult {
  base64img?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { base64img?: string };
    const base64img = body.base64img;
    if (!base64img) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
    }
    // Call remove.bg
    const rawResult: unknown = await removeBackgroundFromImageBase64({
      base64img,
      apiKey: 'SeuRNw9fbaJAVdsDTq41kMVq',
      size: 'auto',
      type: 'auto',
      format: 'png',
    });
    let result: RemoveBgResult = {};
    if (typeof rawResult === 'object' && rawResult !== null && 'base64img' in rawResult) {
      result = rawResult as RemoveBgResult;
    }
    if (!result.base64img) {
      return NextResponse.json({ error: 'Failed to process image.' }, { status: 500 });
    }
    return NextResponse.json({ base64img: result.base64img });
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
} 
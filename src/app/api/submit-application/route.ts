import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

async function parseMultipartFormData(req: NextRequest): Promise<{ fields: Record<string, string>; file: { buffer: Buffer; name: string } | null }> {
  const formData = await req.formData();
  const fields: Record<string, string> = {};
  let file: { buffer: Buffer; name: string } | null = null;

  for (const [key, value] of formData.entries()) {
    if (typeof value === 'object' && 'arrayBuffer' in value) {
      const fileBuffer = await value.arrayBuffer();
      file = { buffer: Buffer.from(fileBuffer), name: value.name };
    } else {
      fields[key] = value;
    }
  }

  return { fields, file };
}

export async function POST(req: NextRequest) {
  try {
    const { fields, file } = await parseMultipartFormData(req);

    let tempFilePath = '';
    if (file) {
      const tempDir = path.join(process.cwd(), '.tmp');
      // In a real app, you might want to create the directory if it doesn't exist
      // await mkdir(tempDir, { recursive: true });
      tempFilePath = path.join(tempDir, `${Date.now()}-${file.name}`);
      await writeFile(tempFilePath, file.buffer);
    }

    const applicationData = { ...fields, tempFilePath };

    const origin = req.headers.get('origin') || '';
    const checkoutSessionResponse = await fetch(`${origin}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationData }),
    });

    if (!checkoutSessionResponse.ok) {
      const errorBody = await checkoutSessionResponse.json();
      throw new Error(`Failed to create checkout session: ${errorBody.error}`);
    }

    const session = await checkoutSessionResponse.json();
    return NextResponse.json(session);

  } catch (err: any) {
    console.error('Submission error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 
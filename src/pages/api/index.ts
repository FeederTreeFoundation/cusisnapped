import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export const config = {
  runtime: 'edge', // this must be set to `edge`
  // execute this function on iad1 or hnd1, based on the connecting client location
  regions: ['iad1', 'hnd1'],
};
 
export default function handler(request: NextRequest) {
  return NextResponse.json({
    data: `Welcome! I am an Edge Function! (executed on ${process.env.NEXT_PUBLIC_VERCEL_REGION})`,
  });
}
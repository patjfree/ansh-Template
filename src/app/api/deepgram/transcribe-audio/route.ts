import { NextRequest, NextResponse } from 'next/server';
import { Deepgram } from '@deepgram/sdk';

export async function POST(req: NextRequest) {
  try {
    const { audioUrl, apiKey } = await req.json();

    const deepgram = new Deepgram(apiKey);

    const { results } = await deepgram.transcription.preRecorded(
      { url: audioUrl },
      { punctuate: true, utterances: true }
    );

    const transcriptions = results.utterances?.map(
      (utterance) => utterance.transcript
    ) || [];

    return NextResponse.json({ transcriptions });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}
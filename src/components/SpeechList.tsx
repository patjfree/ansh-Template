import Link from 'next/link';
import { format } from 'date-fns';

interface Speech {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SpeechListProps {
  speeches: Speech[];
}

export default function SpeechList({ speeches }: SpeechListProps) {
  return (
    <div className="space-y-4">
      {speeches.map((speech) => (
        <Link href={`/speech/${speech.id}`} key={speech.id}>
          <div className="border rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <h3 className="text-xl font-semibold">{speech.title}</h3>
            <p className="text-sm text-gray-500">
              Created: {format(speech.createdAt, 'PPP')}
              {speech.updatedAt > speech.createdAt && ` (Updated: ${format(speech.updatedAt, 'PPP')})`}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
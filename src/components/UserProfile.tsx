import { User } from 'firebase/auth';

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">Welcome, {user.displayName || user.email}</h2>
    </div>
  );
}
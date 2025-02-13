'use client';

interface NotificationBadgeProps {
  count: number;
}

export default function NotificationBadge({ count }: NotificationBadgeProps) {
  if (count === 0) return null;
  
  return (
    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
      <span className="text-xs text-white font-medium">
        {count > 9 ? '9+' : count}
      </span>
    </span>
  );
}

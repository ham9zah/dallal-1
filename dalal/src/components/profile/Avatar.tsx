import Image from 'next/image';
import { useState } from 'react';

interface AvatarProps {
  src: string | null;
  size?: number;
  className?: string;
}

export default function Avatar({ src, size = 96, className = '' }: AvatarProps) {
  const [error, setError] = useState(false);
  const defaultAvatar = '/images/default-avatar.png';
  
  return (
    <div 
      className="relative"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`
      }}
    >
      <Image
        src={!error && src ? src : defaultAvatar}
        alt="الصورة الشخصية"
        fill
        sizes={`${size}px`}
        className={`rounded-full object-cover ${className}`}
        onError={() => setError(true)}
      />
    </div>
  );
}

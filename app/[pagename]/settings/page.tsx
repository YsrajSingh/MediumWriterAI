// /app/pagename/[pagename]/settings/page.tsx
'use client'
import { useParams } from 'next/navigation';

export default function SettingsPage() {
  const params = useParams();
  
  const { pagename } = params

  if (!pagename) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <h1>Settings for {pagename}</h1>
    </div>
  );
}

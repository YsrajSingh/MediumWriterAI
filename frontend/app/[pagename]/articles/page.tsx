// /app/username/[username]/articles/page.tsx
'use client'
import { useParams } from 'next/navigation';

export default function ArticlesPage() {
  const params = useParams();

  const { pagename } = params
  
  if (!pagename) {
    return <p>Loading...</p>; 
  }


  return (
    <div>
      <h1>Articles for {pagename}</h1>
    </div>
  );
}

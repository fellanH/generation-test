import Link from 'next/link';

export default async function StudioPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Studio</h1>
      <p>Choose a model and configure parameters to generate assets.</p>
      <ul style={{ display: 'flex', gap: 12, padding: 0, listStyle: 'none' }}>
        <li><Link href="/app/gallery">Go to Gallery</Link></li>
        <li><form action="/auth/signout" method="post"><button>Sign out</button></form></li>
      </ul>
      <div style={{ marginTop: 24 }}>
        <p>Model selector and dynamic form coming next…</p>
      </div>
    </main>
  );
}


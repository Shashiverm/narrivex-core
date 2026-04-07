import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Narrivex on X';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          background:
            'radial-gradient(circle at 20% 10%, #0f766e1f 0, transparent 45%), radial-gradient(circle at 95% 95%, #fb923c1f 0, transparent 38%), linear-gradient(145deg, #f8f5ef 0%, #ffffff 58%, #eef8f7 100%)',
          color: '#0f172a',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#0f766e' }}>Narrivex</div>
          <div style={{ fontSize: 24, color: '#334155' }}>x.com/narrivex</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '930px' }}>
          <div style={{ fontSize: 70, lineHeight: 1.05, fontWeight: 800 }}>
            See the market story before everyone else.
          </div>
          <div style={{ fontSize: 30, color: '#334155' }}>
            Real-time AI narratives, alerts, and cross-asset intelligence.
          </div>
        </div>

        <div style={{ fontSize: 24, color: '#1e293b' }}>narrivex.tech</div>
      </div>
    ),
    {
      ...size,
    },
  );
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Narrivex AI market intelligence';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
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
            'radial-gradient(circle at 15% 20%, #14b8a61f 0, transparent 45%), radial-gradient(circle at 90% 85%, #f973161f 0, transparent 40%), linear-gradient(135deg, #f6f3ee 0%, #fff8ef 45%, #f3f8f8 100%)',
          color: '#0f172a',
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: 1,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#0f766e',
          }}
        >
          Narrivex
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '940px' }}>
          <div style={{ fontSize: 72, lineHeight: 1.04, fontWeight: 800 }}>
            AI market narratives and real-time alerts.
          </div>
          <div style={{ fontSize: 30, color: '#334155' }}>
            Track crypto, equities, and forex with context-rich intelligence.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', fontSize: 24, color: '#1e293b' }}>
          <span style={{ padding: '10px 16px', border: '1px solid #cbd5e1', borderRadius: '9999px', backgroundColor: '#ffffffcc' }}>Real-time feeds</span>
          <span style={{ padding: '10px 16px', border: '1px solid #cbd5e1', borderRadius: '9999px', backgroundColor: '#ffffffcc' }}>Smart narratives</span>
          <span style={{ padding: '10px 16px', border: '1px solid #cbd5e1', borderRadius: '9999px', backgroundColor: '#ffffffcc' }}>Actionable signals</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

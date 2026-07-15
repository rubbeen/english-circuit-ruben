type Name = 'home' | 'route' | 'review' | 'mic' | 'chart' | 'settings' | 'bolt' | 'sync' | 'book' | 'check' | 'play' | 'pause' | 'trash';
const paths: Record<Name, string> = {
  home: 'M3 11.5 12 4l9 7.5v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z', route: 'M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 11a3 3 0 1 0 0-6 3 3 0 0 0 0 0 6ZM8.5 15.5c4 0 3-7 7-7',
  review: 'M4 4v6h6M20 20v-6h-6M5.1 15a8 8 0 0 0 13.2 2M18.9 9A8 8 0 0 0 5.7 7', mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v3M9 21h6',
  chart: 'M4 20V10m6 10V4m6 16v-7m5 7H2', settings: 'M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM19 13.5l2-1.5-2-1.5-.5-1.3.4-2.5-2.5-.4-1.3-.8L13.5 3h-3L9 5.5l-1.3.8-2.5.4.4 2.5-.5 1.3L3 12l2 1.5.5 1.3-.4 2.5 2.5.4 1.3.8 1.5 2.5h3l1.5-2.5 1.3-.8 2.5-.4-.4-2.5z',
  bolt: 'M13 2 5 14h6l-1 8 8-12h-6z', sync: 'M20 7h-5V2M4 17h5v5M19 12a7 7 0 0 0-12-5L5 9M5 12a7 7 0 0 0 12 5l2-2', book: 'M4 5a3 3 0 0 1 3-3h5v18H7a3 3 0 0 0-3 2Zm16 0a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 2Z',
  check: 'm5 12 4 4L19 6', play: 'm8 5 11 7-11 7z', pause: 'M8 5v14M16 5v14', trash: 'M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6',
};
export function Icon({ name, size = 22 }: { name: Name; size?: number }) { return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>; }


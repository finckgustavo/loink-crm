import type { Platform } from '../../types/metrics';

interface Props {
  value: Platform;
  onChange: (platform: Platform) => void;
}

const platforms = [
  {
    id: 'Kwai' as const,
    name: 'Kwai',
    icon: 'fa-solid fa-video',
  },
  {
    id: 'Facebook' as const,
    name: 'Facebook',
    icon: 'fa-brands fa-facebook',
  },
  {
    id: 'TikTok' as const,
    name: 'TikTok',
    icon: 'fa-brands fa-tiktok',
  },
];

export function PlatformSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {platforms.map((platform) => {
        const isSelected = value === platform.id;

        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => onChange(platform.id)}
            className={`
              flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all w-full
              ${isSelected 
                ? 'border-blue-600 bg-blue-50 text-blue-600' 
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            <i className={`${platform.icon} text-xl`} style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            <span className="font-medium">{platform.name}</span>
          </button>
        );
      })}
    </div>
  );
}
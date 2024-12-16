interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const platforms: Platform[] = [
  {
    id: 'all',
    name: 'Total',
    icon: 'fa-solid fa-house',
    color: 'bg-gray-100 text-gray-600',
  },
  {
    id: 'Kwai',
    name: 'Kwai',
    icon: 'fa-solid fa-video',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'Facebook',
    name: 'Facebook',
    icon: 'fa-brands fa-facebook',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'TikTok',
    name: 'TikTok',
    icon: 'fa-brands fa-tiktok',
    color: 'bg-purple-100 text-purple-600',
  },
];

interface Props {
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
}

export function PlatformFilter({ selectedPlatform, onPlatformChange }: Props) {
  return (
    <div className="flex gap-2">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onPlatformChange(platform.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            selectedPlatform === platform.id
              ? platform.color
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <i className={`${platform.icon} w-4 h-4`} />
          <span className="text-sm font-medium">{platform.name}</span>
        </button>
      ))}
    </div>
  );
}
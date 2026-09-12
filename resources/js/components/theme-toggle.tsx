import { Monitor, Moon, Sun } from 'lucide-react';
import { useAppearance, type Appearance } from '@/hooks/use-appearance';

const options: { value: Appearance; label: string; icon: typeof Sun }[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
];

export default function ThemeToggle({ className = '' }: { className?: string }) {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div
            role="group"
            aria-label="Color scheme"
            className={`flex items-stretch border border-[#111111] ${className}`}
        >
            {options.map(({ value, label, icon: Icon }, i) => {
                const active = appearance === value;
                return (
                    <button
                        key={value}
                        type="button"
                        title={`${label} mode`}
                        aria-label={`${label} mode`}
                        aria-pressed={active}
                        onClick={() => updateAppearance(value)}
                        className={`flex min-h-[44px] min-w-[44px] items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 ${
                            i > 0 ? 'border-l border-[#111111]' : ''
                        } ${
                            active
                                ? 'bg-[#111111] text-[#F9F9F7]'
                                : 'hover:bg-[#111111] hover:text-[#F9F9F7]'
                        }`}
                    >
                        <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    </button>
                );
            })}
        </div>
    );
}

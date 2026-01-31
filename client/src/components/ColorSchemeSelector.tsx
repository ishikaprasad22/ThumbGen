import { colorSchemes } from '../assets/assets';

const ColorSchemeSelector = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (color: string) => void;
}) => {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-200">
                Color Scheme
            </label>

            <div className="grid grid-cols-6 gap-3">
                {colorSchemes.map((scheme) => (
                    <button
                        key={scheme.id}
                        onClick={() => onChange(scheme.id.toLowerCase())} // <-- force lowercase
                        title={scheme.name}
                        className={`relative rounded-lg transition-all ${
                            value.toLowerCase() === scheme.id.toLowerCase()
                                ? 'ring-2 ring-pink-500'
                                : ''
                        }`}
                    >
                        <div className='flex h-10 rounded-lg overflow-hidden'>
                            {scheme.colors.map((color, i) => (
                                <div
                                    key={i}
                                    className="flex-1"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </button>
                ))}
            </div>
            <p className='text-xs text-zinc-400'>
                Selected: {colorSchemes.find((s) => s.id.toLowerCase() === value.toLowerCase())?.name}
            </p>
        </div>
    );
};

export default ColorSchemeSelector;

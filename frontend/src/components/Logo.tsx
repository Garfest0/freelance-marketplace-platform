export const Logo = ({
    className = "w-8 h-8",
    textClassName = "text-xl",
    withText = true,
    light = false
}: {
    className?: string,
    textClassName?: string,
    withText?: boolean,
    light?: boolean
}) => (
    <div className="flex items-center gap-2.5">
        <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
            </defs>
            <path
                d="M8 12C8 12 12 28 14 28C16 28 18 16 18 16C18 16 20 28 22 28C24 28 28 12 28 12"
                stroke="url(#logoGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="30" cy="10" r="3" className="fill-purple-500" />
            <circle cx="24" cy="28" r="2" className="fill-indigo-500" />
        </svg>
        {withText && (
            <span className={`font-extrabold tracking-tight ${textClassName} ${light ? 'text-white' : 'text-slate-900'}`}>
                WorkFlow
            </span>
        )}
    </div>
);

'use client';

export function Card({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`bg-black/50 border border-cyan-400/20 rounded-xl p-6 ${className}`}>
            {children}
        </div>
    );
}
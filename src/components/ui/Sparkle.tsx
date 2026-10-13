/** Static 4-point star. */
export function Sparkle({ className = '', size = 22, color = '#e6e8ea' }: { className?: string; size?: number; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={size} height={size} className={className}>
      <path fill={color} d="M12 0C12.6 6.4 17.6 11.4 24 12 17.6 12.6 12.6 17.6 12 24 11.4 17.6 6.4 12.6 0 12 6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  )
}

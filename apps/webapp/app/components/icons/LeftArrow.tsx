interface Props {
  className?: string;
  strokeWidth?: number;
}

export const LeftArrow: React.FC<Props> = ({
  className,
  strokeWidth,
}: Props) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth || 1.5}
    stroke="currentColor"
    className={`w-6 h-6 ${className || ""}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);

export default LeftArrow;

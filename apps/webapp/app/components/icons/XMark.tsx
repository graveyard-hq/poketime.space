interface Props {
  className?: string;
  strokeWidth?: number;
}

export const XMark: React.FC<Props> = ({ className, strokeWidth }: Props) => (
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
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

export default XMark;

interface Props {
  className?: string;
}

export const PokeTime: React.FC<Props> = ({ className }: Props) => (
  <img
    src="/logo.png"
    alt="PokeTime logo"
    className={`w-6 h-6 ${className || ""}`}
  />
);

export default PokeTime;

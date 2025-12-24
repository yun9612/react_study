import "./Button.css";

// 내부에서 typescript를 설정할 수 있음
type ButtonProps = {
  text: string;
  variant?: "primary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ text, variant = "primary", onClick, disabled }: ButtonProps) {
  return (
    <button className={`button ${variant}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

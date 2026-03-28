import styles from "./InputText.module.css";
import Text from "../base/Text";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function InputText({
  label,
  error,
  className = "",
  ...props
}: InputTextProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <Text variant="h4" className={styles.label}>{props.required ? "*" : ""}{label}</Text>}
      <input
        type="text"
        className={`${styles.input} ${error ? styles.error : ""}`}
        {...props}
      />
      {error && <Text variant="p2" className={styles.errorMessage}>{error}</Text>}
    </div>
  );
}

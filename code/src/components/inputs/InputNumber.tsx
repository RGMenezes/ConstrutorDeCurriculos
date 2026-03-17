import styles from "./InputNumber.module.css";
import Text from "../base/Text";

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function InputNumber({
  label,
  error,
  className = "",
  ...props
}: InputNumberProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <Text variant="h4" className={styles.label}>{label}</Text>}
      <input
        type="number"
        className={`${styles.input} ${error ? styles.error : ""}`}
        {...props}
      />
      {error && <Text variant="p2" className={styles.errorMessage}>{error}</Text>}
    </div>
  );
}

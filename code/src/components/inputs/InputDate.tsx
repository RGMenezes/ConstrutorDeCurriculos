import styles from "./InputDate.module.css";
import Text from "../base/Text";

interface InputDateProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export default function InputDate({
  label,
  error,
  className = "",
  ...props
}: InputDateProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <Text variant="h4" className={styles.label}>{props.required ? "*" : ""}{label}</Text>}
      <input
        type="date"
        className={`${styles.input} ${error ? styles.error : ""}`}
        {...props}
      />
      {error && <Text variant="p2" className={styles.errorMessage}>{error}</Text>}
    </div>
  );
}

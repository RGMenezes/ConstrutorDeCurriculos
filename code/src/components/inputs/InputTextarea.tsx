import styles from "./InputTextarea.module.css";
import Text from "../base/Text";

interface InputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function InputTextarea({
  label,
  error,
  className = "",
  ...props
}: InputTextareaProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <Text variant="h4" className={styles.label}>{label}</Text>}
      <textarea
        className={`${styles.textarea} ${error ? styles.error : ""}`}
        {...props}
      />
      {error && <Text variant="p2" className={styles.errorMessage}>{error}</Text>}
    </div>
  );
}

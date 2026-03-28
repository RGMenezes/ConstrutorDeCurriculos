import styles from "./InputTextarea.module.css";
import Text from "../base/Text";
import Checkbox from "./Checkbox";
import { useState } from "react";

interface InputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function InputTextarea({ label, error, className = "", ...props }: InputTextareaProps) {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <div className={`${styles.container} ${className}`}>

      <div className={styles.labelContainer}>
        {label && <Text variant="h4" className={styles.label}>{props.required ? "*" : ""}{label}</Text>}
        <Checkbox
          onValueChange={setShowPreview}
          checked={showPreview}
        >
          Pré-visualização
        </Checkbox>
      </div>

      {showPreview ? (
        <div className={styles.previewContainer}>
          <Text variant="md">{props.value as string}</Text>
        </div>
      ) : (
        <textarea
          className={`${styles.textarea} ${error ? styles.error : ""}`}
          {...props}
        />
      )}
      {error && (
        <Text variant="p2" className={styles.errorMessage}>
          {error}
        </Text>
      )}
    </div>
  );
}

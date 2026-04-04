import styles from "./InputTextarea.module.css";
import Text from "../base/Text";
import Checkbox from "./Checkbox";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

interface InputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function InputTextarea({ label, error, className = "", ...props }: InputTextareaProps) {
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  useLayoutEffect(() => {
    if (!showPreview) {
      adjustTextareaHeight();
    }
  }, [showPreview, props.value, adjustTextareaHeight]);

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
          ref={textareaRef}
          className={`${styles.textarea} ${error ? styles.error : ""}`}
          onInput={adjustTextareaHeight}
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

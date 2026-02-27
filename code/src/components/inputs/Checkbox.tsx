"use client";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styles from "./Checkbox.module.css";
import { useState } from "react";
import Text from "../base/Text";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    onValueChange?: (value: boolean) => void;
}

export default function Checkbox({ className, children, onValueChange, ...props }: CheckboxProps) {
  const [value, setValue] = useState(props.checked ?? false);
  
  return (
    <label className={`${styles.checkbox} ${className || ""}`}>
      <input className={styles.input} type="checkbox" {...props} 
        checked={value}
        onChange={(e) => {
          setValue(e.target.checked);
          onValueChange?.(e.target.checked);
        }}
      />
      {value ? <MdCheckBox className={styles.icon} size={24} /> : <MdCheckBoxOutlineBlank className={styles.icon} size={24} />}
      <Text>{children}</Text>
    </label>
  );
}
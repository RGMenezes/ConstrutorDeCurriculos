import { MdCheckBox, MdCheckBoxOutlineBlank, MdOutlineCompare } from "react-icons/md";
import styles from "./Checkbox.module.css";
import Text from "../base/Text";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  onValueChange?: (value: boolean) => void;
  indeterminate?: boolean;
}

export default function Checkbox(
  { className, children, onValueChange, checked, onChange, indeterminate, ...props }: 
  CheckboxProps) 
{
  let icon;

  if(indeterminate) {
    icon = <MdOutlineCompare className={styles.icon} size={24} />;
  } else if(checked) {
    icon = <MdCheckBox className={styles.icon} size={24} />;
  } else {
    icon = <MdCheckBoxOutlineBlank className={styles.icon} size={24} />;
  }

  return (
    <label className={`${styles.checkbox} ${className || ""}`}>
      <input
        className={styles.input}
        type="checkbox"
        checked={!!checked}
        onChange={e => {
          onChange?.(e);
          onValueChange?.(e.target.checked);
        }}
        {...props}
      />
      {icon}
      <Text>{children}</Text>
    </label>
  );
}
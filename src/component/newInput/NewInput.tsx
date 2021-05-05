import React from 'react';
import { Input } from 'antd';
import styles from './index.css';

interface InputProps {
  label: string;
  inputWidth?: number;
  disabled?: boolean;
  type?: 'input' | 'textarea';
  text?: string | number;
  onchange?: (test: string) => void;
}

const { TextArea } = Input;
const NewInput: React.FC<InputProps> = ({
  label,
  disabled = true,
  type = 'input',
  text,
  inputWidth = 200,
  onchange,
}) => {
  if (type === 'input') {
    return (
      <div className={styles.fontConfig}>
        <span>{label ? label + '：' : null}</span>
        <Input
          allowClear
          disabled={disabled}
          value={text}
          size="middle"
          style={{ width: inputWidth }}
          onChange={(event) => onchange && onchange(event.target.value)}
        />
      </div>
    );
  }

  return (
    <div className={styles.fontConfig}>
      <span>{label ? label + '：' : null}</span>
      <TextArea
        disabled={disabled}
        defaultValue={text}
        style={{ width: 200 }}
      ></TextArea>
    </div>
  );
};

export default NewInput;

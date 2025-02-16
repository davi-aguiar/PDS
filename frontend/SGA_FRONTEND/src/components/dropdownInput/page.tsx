import styles from "./page.module.css";
interface Props {
  title: string;
  name: string;
  placeholder: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string | undefined | null;
  error?: string;
}

export default function DropDownInput({
  title,
  name,
  placeholder,
  type = "text",
  onChange,
  onBlur, // Adicionado onBlur
  value,
  error,
}: Props) {
  return (
    <div className={styles.info}>
      <p>{title}</p>
      <input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur} // Adicionado onBlur
        value={value || ""}
        type={type}
      />
      {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
    </div>
  );
}


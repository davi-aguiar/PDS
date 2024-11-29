import styles from "./page.module.css";
interface Props {
  title: string;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined | null;
}
export default function DropDownInput({
  title,
  name,
  placeholder,
  onChange,
  value,
}: Props) {
  return (
    <>
      <div className={styles.info}>
        <p>{title}</p>
        <input
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value || ""}
        />
      </div>
    </>
  );
}

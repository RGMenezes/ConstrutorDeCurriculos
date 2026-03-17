import styles from "./Table.module.css";
import Button from "../base/Button";
import { MdDelete, MdEdit } from "react-icons/md";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface TableProps<T extends { id?: string }> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export default function Table<T extends { id?: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  loading = false,
  emptyMessage = "Nenhum registro encontrado",
}: TableProps<T>) {
  if (loading) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (!data || data.length === 0) {
    return <div className={styles.container}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
            <th className={styles.actionHeader}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? "-")}
                </td>
              ))}
              <td className={styles.actionCell}>
                {onEdit && (
                  <Button
                    variant="icon"
                    className={styles.actionButton}
                    Icon={MdEdit}
                    onClick={() => onEdit(item)}
                    title="Editar"
                  />
                )}
                {onDelete && item.id && (
                  <Button
                    variant="icon"
                    className={styles.actionButton}
                    Icon={MdDelete}
                    onClick={() => {
                      if (confirm("Tem certeza que deseja deletar?")) {
                        onDelete(item.id!);
                      }
                    }}
                    title="Deletar"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

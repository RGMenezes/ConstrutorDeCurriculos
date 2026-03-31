import styles from "./Table.module.css";
import Button from "../base/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import Loading from "../layout/Loading";
import { useEffect, useState } from "react";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Função para detectar largura da tela
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mostra só as 2 ou 3 primeiras colunas e a última (ações) em telas pequenas
  let visibleColumns = columns;
  if (isMobile) {
    visibleColumns = columns.slice(0, Math.min(2, columns.length));
  }

  if (loading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return <div className={styles.container}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {visibleColumns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
            <th className={styles.actionHeader}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {visibleColumns.map((col) => (
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

import styles from "./TableSelect.module.css";
import tableStyles from "./Table.module.css";
import Checkbox from "@/components/inputs/Checkbox";
import Text from "@/components/base/Text";
import Loading from "../layout/Loading";
import { useEffect, useState } from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface TableSelectProps<T extends { id?: string }> {
  data: T[];
  columns: Column<T>[];
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  deletedIds?: string[]; // IDs referenciados mas não encontrados
  emptyMessage?: string;
  loading?: boolean;
  selectionMode?: "single" | "multiple";
}

export default function TableSelect<T extends { id?: string }>({
  data,
  columns,
  selectedIds,
  onSelect,
  deletedIds = [],
  emptyMessage = "Nenhum registro encontrado",
  loading = false,
  selectionMode = "multiple",
}: TableSelectProps<T>) {
  // Responsividade: mantém as 4 primeiras colunas (além do checkbox) em telas pequenas
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Renderiza linhas "deletadas" (referenciadas mas não existem mais)
  const deletedRows = deletedIds.map((id) => (
    <tr key={id} className={styles.deletedRow}>
      <td>
        <Checkbox checked disabled />
      </td>
      <td colSpan={columns.length}>
        <Text variant="p2">
          Dado removido do sistema (id: {id})
        </Text>
      </td>
    </tr>
  ));

  if (loading) {
    return <Loading />;
  }

  if ((!data || data.length === 0) && deletedRows.length === 0) {
    return <div className={tableStyles.container}>{emptyMessage}</div>;
  }

  let visibleColumns = columns;
  if (isMobile) {
    visibleColumns = columns.slice(0, Math.min(3, columns.length));
  }

  return (
    <div className={tableStyles.wrapper}>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>
              {selectionMode === "multiple" && data.length > 0 && (
                <Checkbox
                  checked={selectedIds.length === data.length}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < data.length}
                  onChange={e => {
                    if (e.target.checked) {
                      onSelect(data.map(item => String(item.id)));
                    } else {
                      onSelect([]);
                    }
                  }}
                />
              )}
              {selectionMode === "single" && "Selecionar"}
            </th>
            {visibleColumns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <Checkbox
                  checked={selectedIds.includes(String(item.id))}
                  onChange={(e) => {
                    if (selectionMode === "single") {
                      onSelect(e.target.checked ? [String(item.id)] : []);
                    } else {
                      if (e.target.checked) {
                        onSelect([...selectedIds, String(item.id)]);
                      } else {
                        onSelect(selectedIds.filter((id) => id !== String(item.id)));
                      }
                    }
                  }}
                />
              </td>
              {visibleColumns.map((col) => (
                <td key={String(col.key)}>
                  {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
          {deletedRows}
        </tbody>
      </table>
    </div>
  );
}

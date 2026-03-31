import React, { useCallback } from "react";
import styles from "./CardPdf.module.css";
import { DocumentProps, pdf } from "@react-pdf/renderer";
import Text from "../base/Text";
import Button from "../base/Button";
import { FaRegNewspaper } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa";
import IllustrationResumePana from "../illustrations/IllustrationResumePana";
import A from "../base/A";
import Link from "../base/Link";
import { LuDownload, LuFileText, LuPencil, LuTrash2 } from "react-icons/lu";
import { deleteCurriculumAction } from "@/app/actions/curriculumActions";
import { useRouter } from "next/navigation";

  interface CardPDFProps {
    doc: React.ReactElement<DocumentProps>;
    name?: string;
    layout?: string;
    id?: string;
  }

export default function CardPDF({ doc, name = "Currículo", layout = "Default", id }: CardPDFProps) {
  const router = useRouter();
  // Visualizar em nova aba
  const handleOpenPdf = useCallback(async () => {
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }, [doc]);

  // Baixar PDF manualmente
  const handleDownloadPdf = useCallback(async () => {
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name.replace(/\s+/g, "_") + ".pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }, [doc, name]);
  
  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm("Tem certeza que deseja deletar este currículo?")) {
      const result = await deleteCurriculumAction(id);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "Erro ao deletar currículo");
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Text variant="h3">{name}</Text>
        <Text variant="p3">{layout} Layout</Text>
      </div>
      <hr />
      <div className={styles.cardContent}>
        <Text variant="p2" className={styles.description}>
            Visualize ou baixe seu currículo em PDF para imprimir ou compartilhar.
        </Text>
        <div className={styles.illustrationContainer}>
          <IllustrationResumePana  className={styles.illustration}/>
          <A variant="author" target="_blank" rel="external" href="https://storyset.com/online">Online illustrations by Storyset</A>
        </div>
        {id ? 
          <div className={styles.actions2}>
            <Button onClick={handleDelete} variant="icon" Icon={LuTrash2} />
            <Link href={`/dashboard/curriculum/create?id=${id}`} variant="icon" Icon={LuPencil} />
            <Button onClick={handleOpenPdf} variant="icon" Icon={LuFileText} />
            <Button onClick={handleDownloadPdf} variant="icon" Icon={LuDownload} detached />
          </div>
          : 
          <div className={styles.actions}>
            <Button onClick={handleOpenPdf} variant="buttonPrimary" Icon={FaRegNewspaper}>Ver</Button>
            <Button onClick={handleDownloadPdf} variant="buttonSecondary" Icon={FaRegFilePdf}>Baixar</Button>
          </div>
        }
      </div>
    </div>
  );
}
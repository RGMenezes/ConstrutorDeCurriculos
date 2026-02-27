import Text from "../base/Text";
import Tag from "../base/Tag";
import styles from "./CardStep.module.css";

export default function CardStep({ title, description, stepNumber }: { title: string; description: string; stepNumber: number }) {
  return (
    <article className={styles.card}>
      <Text variant="h3">{title}</Text>
      <Tag>{stepNumber}</Tag>
      <Text variant="p1">{description}</Text>
    </article>
  );
}

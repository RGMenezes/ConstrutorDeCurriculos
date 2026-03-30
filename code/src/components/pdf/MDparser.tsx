import { Text, View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import pdfStyles from "./pdfStyles";

// Função utilitária para dividir o texto em linhas
function splitLines(text: string) {
  return text.split(/\r?\n/);
}

// Parser simples de Markdown para elementos do @react-pdf/renderer
export function MDparser({ md }: { md: string }): ReactNode {
  const lines = splitLines(md);
  const elements: ReactNode[] = [];
  let inList = false;
  let listType: "ul" | "ol" | null = null;
  let listItems: ReactNode[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0 && listType) {
      elements.push(
        <View style={pdfStyles[listType]} key={elements.length}>
          {listItems}
        </View>
      );
      listItems = [];
    }
    inList = false;
    listType = null;
  };

  lines.forEach((raw, idx) => {
    const line = raw.trim();
    if (!line) {
      flushList();
      return;
    }
    // Headings
    if (/^# /.test(line)) {
      flushList();
      elements.push(
        <Text style={pdfStyles.h1} key={idx}>{line.replace(/^# /, "")}</Text>
      );
      return;
    }
    if (/^## /.test(line)) {
      flushList();
      elements.push(
        <Text style={pdfStyles.h2} key={idx}>{line.replace(/^## /, "")}</Text>
      );
      return;
    }
    // Blockquote
    if (/^> /.test(line)) {
      flushList();
      elements.push(
        <Text style={pdfStyles.blockquote} key={idx}>{line.replace(/^> /, "")}</Text>
      );
      return;
    }
    // Unordered List
    if (/^[-*] /.test(line)) {
      const content = line.replace(/^[-*] /, "");
      if (!inList || listType !== "ul") flushList();
      inList = true;
      listType = "ul";
      listItems.push(
        <Text style={pdfStyles.li} key={idx}>• {parseInline(content)}</Text>
      );
      return;
    }
    // Ordered List
    if (/^\d+\. /.test(line)) {
      const content = line.replace(/^\d+\. /, "");
      if (!inList || listType !== "ol") flushList();
      inList = true;
      listType = "ol";
      listItems.push(
        <Text style={pdfStyles.li} key={idx}>{parseInt(line)}. {parseInline(content)}</Text>
      );
      return;
    }
    // Code block (inline, not fenced)
    if (/^`.*`$/.test(line)) {
      flushList();
      elements.push(
        <Text style={pdfStyles.code} key={idx}>{line.replace(/`/g, "")}</Text>
      );
      return;
    }
    // Paragraph
    flushList();
    elements.push(
      <Text style={pdfStyles.text} key={idx}>{parseInline(line)}</Text>
    );
  });
  flushList();
  return elements;
}

// Parser inline para negrito, itálico e código
function parseInline(text: string): ReactNode[] {
  const result: ReactNode[] = [];
  let buffer = "";
  let i = 0;
  while (i < text.length) {
    // Bold (**) ou (__)
    if ((text[i] === "*" && text[i + 1] === "*" && text.indexOf("**", i + 2) !== -1) ||
        (text[i] === "_" && text[i + 1] === "_" && text.indexOf("__", i + 2) !== -1)) {
      if (buffer) { result.push(buffer); buffer = ""; }
      const delim = text[i];
      const end = text.indexOf(delim + delim, i + 2);
      result.push(<Text style={pdfStyles.strong} key={i}>{parseInline(text.slice(i + 2, end))}</Text>);
      i = end + 2;
      continue;
    }
    // Italic (* ou _)
    if ((text[i] === "*" || text[i] === "_") && text.indexOf(text[i], i + 1) !== -1 && text[i + 1] !== text[i]) {
      if (buffer) { result.push(buffer); buffer = ""; }
      const delim = text[i];
      const end = text.indexOf(delim, i + 1);
      result.push(<Text style={pdfStyles.em} key={i}>{parseInline(text.slice(i + 1, end))}</Text>);
      i = end + 1;
      continue;
    }
    // Strikethrough (~~)
    if (text[i] === "~" && text[i + 1] === "~" && text.indexOf("~~", i + 2) !== -1) {
      if (buffer) { result.push(buffer); buffer = ""; }
      const end = text.indexOf("~~", i + 2);
      result.push(<Text style={{ textDecoration: "line-through" }} key={i}>{parseInline(text.slice(i + 2, end))}</Text>);
      i = end + 2;
      continue;
    }
    // Bold + Italic (*** ou ___)
    if (((text[i] === "*" && text[i + 1] === "*" && text[i + 2] === "*" && text.indexOf("***", i + 3) !== -1) ||
         (text[i] === "_" && text[i + 1] === "_" && text[i + 2] === "_" && text.indexOf("___", i + 3) !== -1))) {
      if (buffer) { result.push(buffer); buffer = ""; }
      const delim = text[i];
      const end = text.indexOf(delim + delim + delim, i + 3);
      result.push(
        <Text style={{ ...pdfStyles.strong, ...pdfStyles.em }} key={i}>{parseInline(text.slice(i + 3, end))}</Text>
      );
      i = end + 3;
      continue;
    }
    // Inline code
    if (text[i] === "`" && text.indexOf("`", i + 1) !== -1) {
      if (buffer) { result.push(buffer); buffer = ""; }
      const end = text.indexOf("`", i + 1);
      result.push(<Text style={pdfStyles.code} key={i}>{text.slice(i + 1, end)}</Text>);
      i = end + 1;
      continue;
    }
    buffer += text[i];
    i++;
  }
  if (buffer) result.push(buffer);
  return result;
}

export default MDparser;

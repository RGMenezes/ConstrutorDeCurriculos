import { StyleSheet } from "@react-pdf/renderer";

const pdfStyles = StyleSheet.create({
  h1: { fontSize: 14, fontWeight: "bold", textTransform: "uppercase", marginBottom: 2 },
  h2: { fontSize: 13, fontWeight: "bold", textTransform: "uppercase", marginBottom: 11 },
  text: { marginBottom: 1 },
  strong: { fontWeight: "bold" },
  em: { fontStyle: "italic"},
  ul: { marginBottom: 4, marginLeft: 12 },
  ol: { marginBottom: 4, marginLeft: 12 },
  li: { marginBottom: 1 },
  code: { fontFamily: "Courier", fontSize: 10, backgroundColor: "#eee", padding: 2 },
  blockquote: { fontStyle: "italic", color: "#555", borderLeftWidth: 2, borderLeftColor: "#ccc", paddingLeft: 6, marginBottom: 4 },
  link: { color: "#0053ee", textDecoration: "underline" },
  rowContainer: { flexDirection: "row", flexWrap: "wrap" },
  lh: { borderBottomWidth: 0.5, borderBottomColor: "#000", marginVertical: 8, width: "100%" }
});

export default pdfStyles;

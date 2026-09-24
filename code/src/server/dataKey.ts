import "server-only";
import { createHash } from "node:crypto";
export const dataKey = (data: unknown) => createHash("sha256").update(JSON.stringify(data)).digest("hex");

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { id } = req.query;

  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ error: "Identifiant de projet manquant." });
  }

  try {
    if (req.method === "GET") {
      const rows = await sql`
        SELECT count FROM project_views WHERE project_id = ${id}
      `;
      const count = rows[0]?.count ?? 0;
      return res.status(200).json({ project_id: id, count });
    }

    if (req.method === "POST") {
      const rows = await sql`
        INSERT INTO project_views (project_id, count)
        VALUES (${id}, 1)
        ON CONFLICT (project_id)
        DO UPDATE SET count = project_views.count + 1
        RETURNING count
      `;
      const count = rows[0]?.count ?? 1;
      return res.status(200).json({ project_id: id, count });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Méthode non autorisée." });
  } catch (error) {
    console.error("Erreur /api/views:", error);
    return res.status(500).json({ error: "Erreur serveur." });
  }
}
// Emergência Pro — Edge Function: notifica admin sobre novo cadastro pending
// Recebe POST do trigger Postgres (pg_net) com dados do profile.
// Envia e-mail via Resend para o admin.
//
// Deploy:
//   supabase functions deploy notify-admin-pending
//   supabase secrets set RESEND_API_KEY=re_...
//
// Variáveis de ambiente esperadas:
//   - RESEND_API_KEY        (obrigatório)
//   - NOTIFY_SHARED_SECRET  (obrigatório — protege a function de chamadas externas)
//   - ADMIN_EMAIL           (opcional; default mateustcandido@gmail.com)
//   - RESEND_FROM           (opcional; default 'Emergência Pro <onboarding@resend.dev>')

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY       = Deno.env.get("RESEND_API_KEY")       ?? "";
const NOTIFY_SHARED_SECRET = Deno.env.get("NOTIFY_SHARED_SECRET") ?? "";
const ADMIN_EMAIL          = Deno.env.get("ADMIN_EMAIL")          ?? "mateustcandido@gmail.com";
const RESEND_FROM          = Deno.env.get("RESEND_FROM")          ?? "Emergência Pro <onboarding@resend.dev>";

function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  }[c]!));
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Shared secret obrigatório — só o trigger do banco conhece o valor
  if (!NOTIFY_SHARED_SECRET) {
    console.error("NOTIFY_SHARED_SECRET not configured");
    return new Response(JSON.stringify({ error: "Function not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  const auth = req.headers.get("Authorization") || "";
  if (auth !== `Bearer ${NOTIFY_SHARED_SECRET}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const profileId    = payload.profile_id    ?? "—";
  const profileEmail = payload.profile_email ?? "—";
  const profileNome  = payload.profile_nome  ?? "(sem nome)";
  const profileCrm   = payload.profile_crm   ?? "—";
  const profileUf    = payload.profile_crm_uf ?? "";
  const especialidade = payload.profile_especialidade ?? "—";

  const subject = `Novo cadastro pendente: ${profileNome}`;

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:20px;color:#111827">
      <h2 style="margin:0 0 16px;color:#a32d2d">Novo cadastro pendente</h2>
      <p style="font-size:14px;line-height:1.5">
        <strong>${esc(profileNome)}</strong> completou o KYC no Emergência Pro
        e aguarda sua aprovação.
      </p>
      <table style="font-size:13px;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280">E-mail</td><td>${esc(profileEmail)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280">CRM</td><td>${esc(profileCrm)}${profileUf ? "/" + esc(profileUf) : ""}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Especialidade</td><td>${esc(especialidade)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Profile ID</td><td>${esc(profileId)}</td></tr>
      </table>
      <p style="font-size:13px;color:#6b7280;margin-top:24px">
        Acesse o painel admin do app para revisar selfie + CRM e aprovar/rejeitar.
      </p>
    </div>
  `.trim();

  const text =
    `Novo cadastro pendente — Emergência Pro\n\n` +
    `${profileNome} completou o KYC e aguarda aprovação.\n\n` +
    `Email: ${profileEmail}\n` +
    `CRM: ${profileCrm}${profileUf ? "/" + profileUf : ""}\n` +
    `Especialidade: ${especialidade}\n` +
    `ID: ${profileId}\n\n` +
    `Acesse o painel admin para revisar.\n`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [ADMIN_EMAIL],
        subject,
        html,
        text,
      }),
    });

    if (!r.ok) {
      const errTxt = await r.text();
      console.error("Resend error:", r.status, errTxt);
      return new Response(JSON.stringify({ error: "Resend failed", status: r.status, detail: errTxt }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await r.json();
    return new Response(JSON.stringify({ ok: true, resend_id: result.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("handler error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

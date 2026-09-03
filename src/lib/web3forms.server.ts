import "@tanstack/react-start/server-only";

import process from "node:process";

import { contactFormSchema } from "./contact-input";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_TIMEOUT_MS = 8_000;

type Web3FormsResponse = {
  success?: boolean;
};

export async function submitContactFormToProvider(input: unknown): Promise<void> {
  const parsed = contactFormSchema.parse(input);
  if (parsed.botcheck) return;

  const accessKey = process.env["WEB3FORMS_ACCESS_KEY"]?.trim();
  if (!accessKey) throw new Error("WEB3FORMS_ACCESS_KEY is required.");

  const formData = new FormData();
  formData.set("access_key", accessKey);
  formData.set("subject", "Nueva consulta desde Mikuva");
  formData.set("from_name", "Sitio web de Mikuva");
  formData.set("name", parsed.name);
  formData.set("email", parsed.email);
  formData.set("phone", parsed.phone);
  formData.set("material", parsed.material);
  formData.set("message", parsed.message);

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    body: formData,
    signal: AbortSignal.timeout(WEB3FORMS_TIMEOUT_MS),
  });

  const result = (await response.json().catch(() => null)) as Web3FormsResponse | null;
  if (!response.ok || !result?.success) {
    throw new Error("Web3Forms could not process the contact form.");
  }
}

import { createServerFn } from "@tanstack/react-start";

import { contactFormSchema } from "./contact-input";

export const submitContactForm = createServerFn({ method: "POST" })
  .validator(contactFormSchema)
  .handler(async ({ data }) => {
    const [{ enforceRateLimit }, { submitContactFormToProvider }] = await Promise.all([
      import("./rate-limit.server"),
      import("./web3forms.server"),
    ]);

    enforceRateLimit("contact", { limit: 5, windowMs: 10 * 60_000 });
    await submitContactFormToProvider(data);
    return { accepted: true };
  });

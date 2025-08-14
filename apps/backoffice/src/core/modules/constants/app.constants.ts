import { formatDate } from "../utils/format-date.utils";

/* Version Application */
export const VERSION_APPLICATION = `0.0.1`;

/* Author Name */
export const AUTHOR_NAME = `Antônio Silva`;

/* Name Application */
export const NAME_APPLICATION = `Cardápio Certo`;

/* Icon Application */
export const LOGO_ICON = `${process.env.NEXT_PUBLIC_AWS_URL}/logo.webp`;

/* Email Contact Application */
export const EMAIL_CONTACT_APPLICATION = `contato@antoniobsilva.com.br`;

/* Last Updated Application */
export const LAST_UPDATED_APPLICATION = formatDate(
  new Date("Thu Aug 03 2025 22:53:05 GMT-0300"),
);

/* Security */
/* Hash Rounds Password Encryt */
export const HASH_ROUNDS = process.env.HASH_ROUNDS;

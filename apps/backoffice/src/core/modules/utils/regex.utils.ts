export const regex = {
  // CEP: accepts formats with or without hyphen, does not allow spaces or other characters
  cep: /^\d{5}-?\d{3}$/,

  // Email: more strict, prevents invalid characters and malformed domains
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // CPF: accepts only numbers, with or without punctuation, prevents invalid sequences
  cpf: /^(?!^(\d)\1{10}$)\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,

  // CNPJ: accepts only numbers, with or without punctuation, prevents invalid sequences
  cnpj: /^(?!^(\d)\1{13}$)\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/,

  // Phone: accepts national and international formats
  // National: (11) 99999-9999 or 11999999999
  // International: +55 11 99999-9999 or +5511999999999
  phone: /^(\+?\d{1,3}\s?)?\(?\d{1,4}\)?\s?\d{4,5}-?\d{4}$/,

  // UF: accepts only Brazilian state abbreviations, uppercase
  uf: /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/,
};

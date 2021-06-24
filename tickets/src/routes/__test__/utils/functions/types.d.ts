interface Error {
  message: string;
  field?: string;
}

interface Errors {
  errors: Error[];
}

export { Error, Errors };

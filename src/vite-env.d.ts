declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    VITE_API_URL_Account: string;
  }
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

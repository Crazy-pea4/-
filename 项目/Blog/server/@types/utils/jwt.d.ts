export default interface JWT {
  sign: (value: string, timeout: string) => string;
  verify: (token: string) => any;
}

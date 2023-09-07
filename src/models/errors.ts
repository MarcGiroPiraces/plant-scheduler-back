export type Error = {
  message: string;
  status: number;
};

export class ErrorHandler extends Error {
  constructor(
    public message: string,
    public status: number,
  ) {
    super();
    this.message = message;
    this.status = status;
  }
}

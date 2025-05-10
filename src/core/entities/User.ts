export class User {
    passwordResetTokenExpiresAt: any;
    constructor(
      public id: number,
      public name: string,
      public email: string,
      public password: string,
      public phone: string | null
    ) {}
  }
  
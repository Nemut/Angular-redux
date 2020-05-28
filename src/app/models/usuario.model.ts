

export class Usuario {

  static fromApi( { username, email, password, img, role, google, id } ) {
    return new Usuario(username, email, password, img, role, google, id);
  }

  constructor(
      public username: string,
      public email: string,
      public password: string,
      public img?: string,
      public role?: string,
      public google?: boolean,
      public id?: number
  ) { }

}
export class SignUpRequest {
    username: string;
    email: string;
    roles: string[];
    password: string;
  
    constructor(username: string, email: string, roles: string[],password: string) {
      this.username = username;
      this.email=email;
      this.roles= roles;
      this.password = password;
    }
  }
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scriptAsync = promisify(scrypt);

class PasswordManager {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString(`hex`);
    const buf = (await scriptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString(`hex`)}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(`.`);
    const buf = (await scriptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString(`hex`) === hashedPassword;
  }
}

export default PasswordManager;

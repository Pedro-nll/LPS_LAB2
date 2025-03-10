import { AxiosResponse } from "axios";
import { Message, User, UserLogin, UserToken } from "../helpers/types";
import BaseRepository from "./BaseRepository";

class UserRepository extends BaseRepository {
    constructor() {
        super({controller: 'auth'})
    }

    async login(user: UserLogin): Promise<User> {
        try {
          console.log('Attempting login with:', user);
          const response: AxiosResponse<User> = await this.post(user, "login");
          console.log('Login response:', response);
          return response.data;
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      }

    async register(user : User): Promise<User> {
        console.log(this.url)
        const response: AxiosResponse<User> = await this.post(user, "register")
        return response.data
    }

    async recoverpassword(email : string): Promise<AxiosResponse<Message | void>> {
        return await this.post(email, "recoverpassword")
    }

    async checktoken(userToken: UserToken): Promise<boolean> {
        const response: AxiosResponse<boolean> = await this.post(userToken, "checktoken");
        return response.data;
    }

    async changepassword(userLogin: UserLogin) : Promise<void> {
        await this.post(userLogin, "changepassword")
    }

}

export default UserRepository;

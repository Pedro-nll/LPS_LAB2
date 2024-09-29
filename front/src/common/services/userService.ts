import { AxiosResponse } from "axios";
import { Message, User, UserLogin, UserToken } from "../helpers/types";
import UserRepository from "../repositories/userRepository";

class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository()
  }

  async login(user : UserLogin): Promise<User> {
    return this.userRepository.login(user)
  }

  async register(user : User): Promise<User> {
    return this.userRepository.register(user)
  }

  async recoverpassword(email : string): Promise<AxiosResponse<Message | void>> {
    return this.userRepository.recoverpassword(email);
  }

  async checktoken(userToken: UserToken): Promise<boolean> {
      return this.userRepository.checktoken(userToken);
  }

  async changepassword(userLogin: UserLogin) : Promise<void> {
      return this.userRepository.changepassword(userLogin);
  }

}

const userService = new UserService();

export default userService;

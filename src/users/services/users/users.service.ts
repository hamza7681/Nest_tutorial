import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private fakeUsers = [{ username: 'Hamza', email: 'hamzambf@gmail.com' }];
  fetchUsers() {
    return this.fakeUsers;
  }
}

/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Books } from '../../models/Books';
import { UserModel } from '../../models/UserModel';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Books: Books,
    UserModel: UserModel,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}

/* tslint:disable */

declare var Object: any;
export interface BooksInterface {
  "title": string;
  "content": string;
  "url"?: string;
  "rating"?: number;
  "id"?: any;
}

export class Books implements BooksInterface {
  "title": string;
  "content": string;
  "url": string;
  "rating": number;
  "id": any;
  constructor(data?: BooksInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Books`.
   */
  public static getModelName() {
    return "Books";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Books for dynamic purposes.
  **/
  public static factory(data: BooksInterface): Books{
    return new Books(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Books',
      plural: 'Books',
      path: 'Books',
      idName: 'id',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "content": {
          name: 'content',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "rating": {
          name: 'rating',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}

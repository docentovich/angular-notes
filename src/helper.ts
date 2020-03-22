import { Update } from '@ngrx/entity';

export class Helper {
  static uniqId(): number {
    return new Date().getTime();
  }

  static removeElement<T>(
    array: T[],
    comparator: (element: T) => boolean
  ): T[] {
    array.splice(array.findIndex(comparator), 1);
    return [...array];
  }

  static updateElement<T>(
    array: T[],
    comparator: (element: T) => boolean,
    partOfElement: Partial<T>
  ): { array: T[]; updatedElement: T } {
    const index = array.findIndex(comparator);
    array[index] = { ...array[index], ...partOfElement };

    return { array: [...array], updatedElement: array[index] };
  }

  static updateElements<T>(
    array: T[],
    updates: Update<T>[],
    key: string = 'id'
  ): { array: T[]; updatedElements: T[] } {
    const arrayDictionary = Helper.buildDictionary(array, key);

    const updatedElements = updates.map(update => {
      arrayDictionary[update.id] = update.changes as T;
      return update.changes as T;
    });

    return { array: Object.values(arrayDictionary), updatedElements };
  }

  static butchElementsUpdate<T>(
    array: T[],
    comparator: (element: T) => boolean,
    partOfElement: Partial<T>
  ): { all: T[]; changed: T[] } {
    return array.reduce(
      (acc: { all: T[]; changed: T[] }, element) => {
        if (comparator(element)) {
          element = { ...element, ...partOfElement };
          acc.changed.push(element);
        }
        acc.all.push(element);
        return acc;
      },
      { all: [], changed: [] }
    );
  }

  static buildDictionary<T>(array: T[], key: string): { [key: string]: T };
  static buildDictionary<T>(array: T[], key: string): { [key: number]: T };
  static buildDictionary(array, key) {
    return array.reduce((acc, element) => {
      acc[element[key]] = element;

      return acc;
    }, {});
  }
}

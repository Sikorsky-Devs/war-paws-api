type Search<T> = {
  AND: {
    OR: {
      [K in keyof T]: {
        contains: string;
        mode: 'insensitive';
      };
    }[];
  }[];
};

export class DatabaseUtils {
  static getSearch<T>(
    search?: string,
    ...fields: (keyof T)[]
  ): Search<T> | object {
    if (!search) return {};
    const searchedNames = search.split(/\s+/g);
    return {
      AND: searchedNames.map((search) => ({
        OR: fields.map((field) => ({
          [field]: {
            contains: search,
            mode: 'insensitive',
          },
        })),
      })),
    };
  }
}

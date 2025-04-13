export interface UniqueCheckInterface<T> {
  findUniqueByField(field: string, value: T): Promise<boolean>;
}

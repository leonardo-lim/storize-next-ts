type ErrorsType = Record<string, string>;

interface FormInputType<T> {
    data: T;
    setData: React.Dispatch<React.SetStateAction<T>>;
    errors: ErrorsType;
}

export type { ErrorsType, FormInputType };
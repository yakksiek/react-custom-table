export type HandleSearchFunctionParams = {
    field: string;
    value: string;
};

export type HandleSearchFunction = ({ field, value }: HandleSearchFunctionParams) => void;

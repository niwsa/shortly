import { ShrtCodeData } from "./apiClient";

const STORAGE_KEY = "shortly";

export function addShrtCodesToLocalStorage(shrtCodeList: Array<ShrtCodeData>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shrtCodeList));
}

export function getAllShrtCodesFromLocalStorage(): Array<ShrtCodeData> | [] {
    const _val = localStorage.getItem(STORAGE_KEY);
    return _val !== null ? JSON.parse(_val) as Array<ShrtCodeData> : []
}

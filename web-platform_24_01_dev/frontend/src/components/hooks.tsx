import { useSelector } from "react-redux";

export function useSelectorCust(slice: any) {
  return useSelector((state: any) => state[slice.name]);
}

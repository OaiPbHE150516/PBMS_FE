import { useSelector } from "react-redux";

/**
 * @type {import("react-redux").TypedUseSelectorHook<import("../redux/store").RootState>}
 */
const useAppSelector = useSelector;

export default useAppSelector;
import { useSearchParams } from "react-router-dom";

export default function useQueyParams() {
  const [searchParams] = useSearchParams();
  return Object.fromEntries([...searchParams]);
}

import { useContext } from "react";
import AdminContext from "./AdminContext.js";

export function useAdmin() {
  return useContext(AdminContext);
}

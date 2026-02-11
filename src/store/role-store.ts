import { create } from "zustand";
import type { Role } from "@/modules/role-management/mock/role-data";

type RoleState = {
    roles: Role[];
    setRoles: (r: Role[]) => void;
    clearRoles: () => void;
};

const useRoleStore = create<RoleState>((set) => ({
    roles: [],
    setRoles: (r: Role[]) => set({ roles: r }),
    clearRoles: () => set({ roles: [] }),
}));

export default useRoleStore;

import { create} from "zustand";
import { devtools } from "zustand/middleware";
import type { StateCreator } from "zustand";


export interface UserSlice {
  username: string;
  email: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
}
// export const useAppStore = create<ZustandStateCreator<UserSlice>>(
//   devtools<UserSlice>((...a)=>({
//     ...createUserSlice(...a),
//   }))as ZustandStateCreator<UserSlice>
// );




// export const useUserStore = create<UserState, [["zustand/devtools", never]]>(
//   devtools<UserState>(
//     (set) => ({ username: "Arun Pandey",email: "arunpandeyom@gmail.com",
//     setUsername: (username: string) => set((state) => ({ ...state, username })),
//     setEmail: (email: string) => set((state) => ({ ...state, email })),})
// )
// );

export const createUserSlice: StateCreator<UserSlice> = ((set) => ({
  username: "Arun Pandey",
  email: "arunpandeyom@gmail.com",
  setUsername: (username: string) => set(() => ({ username })),
  setEmail: (email: string) => set(() => ({ email })),
}));

export const useAppStore = create(
  devtools<UserSlice>((...a)=>({
    ...createUserSlice(...a),
  }))
);
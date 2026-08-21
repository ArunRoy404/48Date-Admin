export interface UserProfile {
  name: string;
  role: string;
  avatarSrc: string;
  email?: string;
}

export const currentUserDummyData: UserProfile = {
  name: "Alex Rivera",
  role: "Super Admin",
  avatarSrc: "/assets/avatar.png",
  email: "alex.rivera@48date.com",
};

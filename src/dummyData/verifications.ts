export interface VerificationRequest {
  id: string;
  name: string;
  email: string;
  avatarSrc?: string;
  confidenceScore: number;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  selfieUrl: string;
  idPhotoUrl: string;
  documentsVerified: boolean;
  selfieVerified: boolean;
  idVerified: boolean;
  age?: number;
  location?: string;
}

export const verificationRequestsDummyData: VerificationRequest[] = [
  {
    id: "verif-1",
    name: "Nathan Foster",
    email: "nathan.foster@gmail.com",
    avatarSrc: "/assets/avatar.png",
    confidenceScore: 87,
    submittedAt: "2 hours ago",
    status: "pending",
    selfieUrl: "/assets/avatar.png",
    idPhotoUrl: "/assets/avatar.png",
    documentsVerified: true,
    selfieVerified: true,
    idVerified: true,
    age: 28,
    location: "San Francisco, CA",
  },
  {
    id: "verif-2",
    name: "Tyler Brooks",
    email: "tbrooks@email.com",
    avatarSrc: "/assets/avatar.png",
    confidenceScore: 63,
    submittedAt: "5 hours ago",
    status: "pending",
    selfieUrl: "/assets/avatar.png",
    idPhotoUrl: "/assets/avatar.png",
    documentsVerified: true,
    selfieVerified: true,
    idVerified: false,
    age: 30,
    location: "Palo Alto, CA",
  },
  {
    id: "verif-3",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    avatarSrc: "/assets/avatar.png",
    confidenceScore: 91,
    submittedAt: "1 day ago",
    status: "pending",
    selfieUrl: "/assets/avatar.png",
    idPhotoUrl: "/assets/avatar.png",
    documentsVerified: true,
    selfieVerified: true,
    idVerified: true,
    age: 26,
    location: "San Jose, CA",
  },
  {
    id: "verif-4",
    name: "Alex Nguyen",
    email: "alex.nguyen@outlook.com",
    avatarSrc: "/assets/avatar.png",
    confidenceScore: 34,
    submittedAt: "1 day ago",
    status: "pending",
    selfieUrl: "/assets/avatar.png",
    idPhotoUrl: "/assets/avatar.png",
    documentsVerified: false,
    selfieVerified: false,
    idVerified: false,
    age: 29,
    location: "Oakland, CA",
  },
  {
    id: "verif-5",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    avatarSrc: "/assets/avatar.png",
    confidenceScore: 78,
    submittedAt: "2 days ago",
    status: "pending",
    selfieUrl: "/assets/avatar.png",
    idPhotoUrl: "/assets/avatar.png",
    documentsVerified: true,
    selfieVerified: true,
    idVerified: true,
    age: 27,
    location: "Berkeley, CA",
  },
];

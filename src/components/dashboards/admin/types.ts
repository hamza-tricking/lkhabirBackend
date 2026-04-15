export interface User {
  _id: string;
  username: string;
  role: string;
  profilePicture?: string;
  unlockedSections?: string[];
  createdAt: string;
}

export interface Order {
  _id: string;
  type: string;
  price: number;
  phoneNumber: string;
  fullName: string;
  personType?: string;
  willaya?: string;
  city?: string;
  status: string;
  description: string;
  confirmer: {
    status: string;
    callAttempts: number;
    rendezvous?: {
      date: string;
      hour: string;
    };
    currentConfirmer?: {
      _id: string;
      username: string;
    };
    buyer?: {
      _id: string;
      username: string;
    };
  };
  buyer?: {
    _id: string;
    username: string;
    status: string;
    callAttemptsBuyer: number;
    buyerResponse?: string;
    paymentMethod?: string;
    reasonNotSold?: string;
    customReason?: string;
    followUpDate?: string;
    followUpTime?: string;
    addressConfirmation?: string;
    amountPaid?: number;
    remainingAmount?: number;
    isFullyPaid?: boolean;
  };
  additionalNotes?: string;
  createdAt: string;
}

export interface StatusUpdate {
  status: string;
  callAttempts: number;
  rendezvous: { 
    date: string;
    hour: string;
  };
  buyer: string;
  currentConfirmer: string;
  additionalNotes: string;
}

export interface NewUser {
  username: string;
  password: string;
  role: string;
}

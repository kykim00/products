export interface Club {
  id: string;
  name: string;
  place: string;
  description: string;
  type: string;
  coverUrl: string;
  meetings: Meeting[];
}

export interface Meeting {
  order: number;
  startedAt: string;
  endedAt: string;
}

export interface Leader {
  name: string;
}

export interface Partner {
  name: string;
}

export interface Product {
  club: Club;
  leaders: Leader[];
  partners: Partner[];
  price: number;
}


export type Resolver = {
  [k: string]: {
    [key: string]: (
      parent: any,
      args: { [key: string]: any },
      context: {
        db: {
          products: Product[];
        };
      },
      info: any
    ) => any;
  };
};

interface Club {
  id: string;
  name: string;
  place: string;
  description: string;
  type: string;
  coverUrl: string;
  meetings: Meeting[];
}

interface Meeting {
  order: number;
  startedAt: string;
  endedAt: string;
}

interface Leader {
  name: string;
}

interface Partner {
  name: string;
}

export interface Product {
  club: Club;
  leaders: Leader[];
  partners: Partner[];
  price: number;
}

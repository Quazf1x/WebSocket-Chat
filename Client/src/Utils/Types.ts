type MessageTypes = {
  added: string;
  userMessage: string;
  username: string;
};

type AdminMessageTypes = {
  message: string;
};

type RoomTypes = {
  name: string;
  id: string;
};

export type { MessageTypes, AdminMessageTypes, RoomTypes };

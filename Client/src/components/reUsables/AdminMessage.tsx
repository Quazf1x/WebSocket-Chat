type AdminMessageTypes = {
  message: string;
};

const AdminMessage = ({ message }: AdminMessageTypes) => {
  return <p>{message}</p>;
};

export default AdminMessage;

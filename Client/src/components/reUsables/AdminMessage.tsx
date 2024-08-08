type AdminMessageTypes = {
  message: string;
};

const AdminMessage = ({ message }: AdminMessageTypes) => {
  return <p className="text-center m-5">{message}</p>;
};

export default AdminMessage;

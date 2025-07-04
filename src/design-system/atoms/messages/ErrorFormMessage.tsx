interface ErrorFormMessageProps {
  message?: string;
}

const ErrorFormMessage = ({ message }: ErrorFormMessageProps) => {
  if (!message) return <></>;
  return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{message}</div>;
};

export default ErrorFormMessage;
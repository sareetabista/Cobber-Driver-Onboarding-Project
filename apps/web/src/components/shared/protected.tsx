const Protected = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    location.href = "/login";
  }

  return children;
};

export default Protected;

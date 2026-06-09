const Status = ({ text, icon, bg, color }) => {
  return (
    <div
      className={`${bg} ${color} flex items-center gap-1 rounded-sm px-2 py-2 font-medium`}
    >
      {text} {icon}
    </div>
  );
};

export default Status;

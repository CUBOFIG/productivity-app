const Tooltip = ({ children, text }) => {
  return (
    <div className="tooltip-hover">
      {children}
      <span className="tooltip-hover__text">{text}</span>
    </div>
  );
};

export default Tooltip;

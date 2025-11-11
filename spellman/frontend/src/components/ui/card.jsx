const Card = ({ className = '', children }) => (
  <div className={`rounded-3xl border border-white/10 bg-white/80 p-6 shadow-lg shadow-black/5 backdrop-blur-xl ${className}`}>
    {children}
  </div>
);

export default Card;

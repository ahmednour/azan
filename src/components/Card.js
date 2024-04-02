const Card = ({ name, time }) => {
  return (
    <div className="bg-[rgba(0,0,0,0.5)] h-[200px] w-[200px] rounded-lg shadow-lg mt-5 p-4 flex justify-center items-center flex-col">
      <h2 className="text-4xl text-white text-center">{name}</h2>
      <p className="text-3xl text-white text-center mt-3">{time}</p>
    </div>
  );
};

export default Card;

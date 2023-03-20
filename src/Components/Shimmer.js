const Shimmer = () => {
  return (
    <>
      {Array(20)
        .fill(0)
        .map((e, i) => (
          <div
            data-testid="shimmer"
            className="w-128 bg-white m-2 shadow-slate-800 p-2 relative"
            key={i}
          >
            <div className="w-64 h-40 bg-gray-200" />

            <div className="flex w-64 bg-gray-200" />

            <div className="w-64 bg-gray-200"></div>
          </div>
        ))}
    </>
  );
};

export default Shimmer;

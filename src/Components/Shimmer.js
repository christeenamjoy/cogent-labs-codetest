const Shimmer = () => {
  return (
    <div className="flex flex-wrap">
      {Array(20)
        .fill(0)
        .map((e, i) => (
          <div
            data-testid="shimmer"
            className="flexw-128 bg-white m-2 shadow-slate-800 p-2 relative"
            key={i}
          >
            <div className="w-64 h-40 bg-gray-200" />

            <div className="flex w-64 bg-gray-200" />

            <div className="w-64 bg-gray-200"></div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;

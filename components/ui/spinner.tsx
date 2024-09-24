export const Spinner = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="spinner w-16 h-16 border-4 border-t-4 border-blue-400 rounded-full animate-spin"></div>
        <p className="text-white mt-4 font-semibold">Loading...</p>
      </div>
      <style jsx>{`
        .spinner {
          border-color: rgba(255, 255, 255, 0.3);
          border-top-color: #3498db; /* Customize your accent color */
        }
      `}</style>
    </>
  );
};

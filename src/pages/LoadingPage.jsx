export default function LoadingPage({ title, children }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border-2 border-green-500 w-16 h-16 rounded-full animate-spin flex items-start justify-center pt-1">
        <span className="w-2 h-2 rounded-full bg-green-900" />
      </div>

      <h1 className="text-2xl font-bold mb-4">{title || "Loading..."}</h1>
      <p>{children || "Please wait while we fetch the data."}</p>
    </div>
  );
}

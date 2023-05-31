export default function Spinner() {
  return (
    <div className="flex w-full flex-col items-center p-10">
      <span className="relative flex">
        <span
          className="animate-spin relative inline-flex rounded-full h-20 w-20
          border-8 border-b-green-700 border-r-green-700"
        ></span>
      </span>
    </div>
  );
}

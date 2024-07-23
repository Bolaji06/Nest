interface IProgressBar {
    progress: number;
}
export default function ProgressBar({ progress }: IProgressBar) {
  return (
    <>
      <div className="rounded h-1 w-full bg-white mt-3"
      >
        <div
        className="h-full rounded ease-linear"
          style={{
            width: `${progress}%`,
           
            backgroundColor: progress < 100 ? "blue" : "green",
            transition: "width 0.5s",
          }}
        ></div>
      </div>
    </>
  );
}

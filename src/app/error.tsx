"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset(): void;
}) {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <div>
        <h1>Oops, something went wrong</h1>
        <p>{error.message}</p>
        <button onClick={reset}>Try again</button>
      </div>
    </div>
  );
}

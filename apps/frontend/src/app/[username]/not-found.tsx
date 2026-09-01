export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-text-primary">Profile not found</h1>
        <p className="text-text-secondary mt-2">
          This bento profile does not exist.
        </p>
      </div>
    </div>
  );
}

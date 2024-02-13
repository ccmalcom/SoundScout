
export default function Logo() {
    // logo is green circle 64x64 with white 'SpotiFind' text next to it
    return (
      <div className="flex items-center">
        <div className="h-12 w-12 bg-green rounded-full"></div>
        <h1 className="text-2xl font-bold ml-4">SpotiFind</h1>
      </div>
    );
}
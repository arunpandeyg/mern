export default function LoaderOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white px-4 py-2 rounded shadow">
        Loading...
      </div>
    </div>
  )
}

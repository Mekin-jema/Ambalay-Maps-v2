export default function GoogleMapsSearchBar() {
  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <input
        type="text"
        placeholder="Search Google Maps"
        className="w-full p-3 pl-10 pr-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 10a6 6 0 100-12 6 6 0 000 12zm0 0l6 6"
        />
      </svg>
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 p-2 rounded-full hover:bg-blue-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          width="16"
          height="16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M22 2L11 13"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M22 2L15 22 11 13 2 9l20-7z"
          />
        </svg>
      </button>
    </div>
  );
}

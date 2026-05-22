const NoData = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-[#fff4f8] text-center shadow-sm">

            {/* ICON */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 13h6m2 8H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z"
                    />
                </svg>
            </div>

            {/* TEXT */}
            <h3 className="text-2xl font-semibold text-gray-700">
            No Data found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
                Start looking for your desired data!
            </p>

        </div>
    );
};

export default NoData;
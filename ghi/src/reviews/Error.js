const Error = ({ error }) => {
    if (error) {
        return (
        <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
        >
            <span className="block sm:inline">
            Oops. Something went wrong. Please try again
            </span>
            <span className="block sm:inline"></span>
        </div>
        );
    };
};

export default Error;

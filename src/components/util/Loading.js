import React from "react";


const Loading = ({ loading, children }) => {
    return (
        loading
            ? <div
                className="loading"
            >
                Loading...
            </div>
            : children
    );
}


export default Loading;
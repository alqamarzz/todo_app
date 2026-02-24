import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-full py-8 text-blue-600">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current"></div>
        </div>
    );
};

export default Spinner;

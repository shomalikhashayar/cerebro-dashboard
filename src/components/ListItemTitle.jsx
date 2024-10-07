import React from 'react';
// text with a line beside it for titles in forms
const LisItemTitle = ({title}) => {
    return (
        <div className='flex flex-grow items-center p-2 justify-end'>
            <p className='font-bold flex-none text-c5 dark:text-c2'>{title}</p>
            <div className='w-full mx-2 h-0.5 rounded-full bg-c5 dark:bg-c2' />

        </div>
    );
};

export default LisItemTitle;

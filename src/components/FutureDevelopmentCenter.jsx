import React from "react";


const FutureDevelopmentCenter = ({ label, icon, desc }) => {
    return <div className='flex flex-col items-center h-full justify-center '>
        <div className='text-3xl p-7 rounded-xl m-5 text-c2 bg-slate-200 dark:bg-slate-800'>{icon} {label}</div>
        <p className='text-c2'>{desc}</p>
    </div>
}

export default FutureDevelopmentCenter
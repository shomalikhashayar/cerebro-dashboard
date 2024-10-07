import React from 'react';
import MoonSvg from "../../utils/moon.svg";
import SunSvg from "../../utils/sun.svg";
import { useStateContext } from "../../contexts/ContextProvider";

const DarkModeSwitcher = () => {
    const { theme, setTheme } = useStateContext()

    function onClickHandler() {
        const root = window.document.documentElement

        if (theme === 'light') {
            setTheme('dark')
            root.classList.remove('light')
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')

        } else {
            setTheme('light')
            root.classList.remove('dark')
            root.classList.add('light')
            localStorage.setItem('theme', 'light')
        }
    }


    return (
        <button className='flex items-center px-3' onClick={onClickHandler}>
            {theme === 'dark' ? <img src={SunSvg} className='w-8 h-8 p-1 rounded ring-1 bg-[#46C2CB]' /> :
                <img src={MoonSvg} className='w-8 h-8 rounded ring-1 bg-[#3C2A21]' />
            }
        </button>
    );
};

export default DarkModeSwitcher;
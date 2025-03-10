import React from 'react'
import { useLocation, useNavigate} from 'react-router'

export default function Layout({title, children}) {
    return (
        <div>
            <Header title={title}/>
            {children}
        </div>
    )
}

function Header({title}) {
    const location = useLocation()

    return (
        <div className='flex items-end border-text-color border-b-1 mb-5'>
            {location.pathname !== '/' && (
                <BackButton />
            )}
            <p className='text-text-color text-6xl select-none'>{title}</p>
        </div>
    )
}

function BackButton() {
    const navigate = useNavigate()

    return (
        <span onClick={() => navigate(-1)} className='material-symbols-outlined !text-6xl text-text-color cursor-pointer select-none hover:text-text-color-shade'>chevron_left</span>
    )
}
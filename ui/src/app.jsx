import React, { useState } from 'react'
import {BrowserRouter, useNavigate} from 'react-router'

import {useNuiEvent, debugNuiEvent} from './utils/nui-utils'

import HomeScreen from './home-screen'

export default function App() {
    return (
        <BrowserRouter basename={isEnvBrowser() ? '' : '/ui/index.html'}>
            <Visible>
                <div className='w-screen h-screen bg-background-shade p-10'>
                    <div className=''>
                        <Routes>
                            <Route path='/' element={<HomeScreen/>}/>
                        </Routes>
                    </div>
                </div>
            </Visible>
        </BrowserRouter>
    )
}

function Visible({children}) {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    useNuiEvent('open', data => {
        setVisible(true)
        navigate('/')
    })

    useEffect(() => {
        if (isEnvBrowser()) {
            debugNuiEvent('open')
        }
    })

    useEffect(() => {
        const keyDown = e => {
            if (e.key === 'Escape') {
                setVisible(false)
            }
        }

        window.addEventListener('keydown', keydown)
        return () => window.removeEventListener('keydown', keydown)
    })

    return (
        <>
            {visible && children}
        </>
    )
}
import {useEffect, useRef} from 'react'

export function isEnvBrowser() {
    return !window.invokeNative
}

export function debugNuiEvent(action, data) {
    window.dispatchEvent(new MessageEvent('message', {
        data: {
            action: action,
            data: data
        }
    }))
}

export function useNuiEvent(action, handler) {
    const savedHandler = useRef(()=>{})

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        const eventListener = (e) => {
            if (savedHandler.current) {
                if (e.data.action === action) {
                    savedHandler.current(e.data.data)
                }
            }
        }
        window.addEventListener('message', eventListener)
        return () => window.removeEventListener('message', eventListener)
    }, [action])
}

export function triggerClientEvent(eventName, data) {
    if (isEnvBrowser()) return
    fetch(`https://${GetParentResourceName()}/${eventName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data || {})
    })
}

export function triggerServerEvent(eventName, data) {
    if (isEnvBrowser()) return
    fetch(`https://${GetParentResourceName()}/serverPassthrough`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            eventName: eventName,
            data: data || {}
        })
    })
}
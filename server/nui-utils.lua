function SendUI(src, action, data)
    TriggerClientEvent('uiPassthrough', src, {
        action = action,
        data = data
    })
end
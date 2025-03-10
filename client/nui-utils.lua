function SendNUIAction(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end

function RegisterNUIEvent(name, callback)
    RegisterNUICallback(name, function(data, cb)
        callback(data)
        cb({})
    end)
end

RegisterNUIEvent('serverPassthrough', function(data)
    TriggerServerEvent(data.eventName, data.data)
end)

RegisterNetEvent('uiPassthrough', function(data)
    SendNUIAction(data.action, data.data)
end)
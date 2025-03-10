# FiveM React Template
A FiveM template with a React UI and utilities. 
* Vite to bundle 
* Includes Tailwind CSS and Google's Material Symbols
* A React Router implementation and a Visible wrapper is included in the [App](ui/src/app.jsx) component.

## Uility Usage
### JavaScript
Defined in [nui-utils.jsx](ui/src/util/nui-utils.jsx)
#### isEnvBrowser()
Returns true if running in the browser
#### debugNuiEvent(action, data)
Used to simulate a NUI event being fired. Will not work outside of the browser environment. Example usage:
```
debugNuiEvent('confirmBuy', {carId: 'kuruma'})
```
NOTE: This is used within the Visible component to show the UI by default in the browser environment.
#### useNuiEvent(action, handler)
React Hook to listen to NUI event. Example usage:
```
useNuiEvent('confirmBuy', (carId) => {
    showPurchaseConfirmation(carId)
})
```
#### triggerClientEvent(eventName, data)
Wraps FiveM's fetch call to trigger a client event. Will not work in the browser environment. Example usage:
```
function onSellClick() {
    triggerClientEvent('sellButtonClicked', {itemId, sellPrice})
}
```
#### triggerServerEvent(eventName, data)
Wraps FiveM's fetch call to trigger a client event which then triggers a server event. Will not work in the browser environment. Example usage:
```
function onBuyClick() {
    triggerServerEvent('buyCar', carId)
}
```
### Server Lua
Defined in [server/nui-utils.lua](server/nui-utils.lua)
### SendUI(src, action, data)
Sends an event directly to the UI, utilizing the client passthrough. This is effectively the opposite action of the JavaScript triggerServerEvent. Example usage:
```
RegisterNetEvent('buyCar', function(cardId)
    local src = source
    if CanBuyCar(src, carId) then
        SendUI(src, 'confirmBuy', carId)
    end
end)
```
### Client Lua
Defined in [client/nui-utils.lua](client/nui-utils.lua)
### SendNUIAction(action, data)
A wrapper for FiveM's SendNUIMessage. Example Usage:
```
RegisterCommand('start', function()
    SendNUIAction('openMissionStart', 'bankheist')
end, false)
```
### RegisterNUIEvent(name, callback)
A wrapper for FiveM's RegisterNUICallback. Example usage:
```
RegisterNUIEvent('startAnimation', function(animation)
    StartAnimation(animation)
end)
```

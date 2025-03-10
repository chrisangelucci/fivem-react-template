fx_version 'cerulean'
game 'gta5'

author 'author'
description 'description'
version '1.0.0'

client_scripts {
    'client/nui-utils.lua',
    'client/main.lua'
}

server_scripts {
    'server/nui-utils.lua'
}

ui_page 'ui/dist/index.html'

files {
    'ui/index.html',
    'ui/assets/index.js',
    'ui/assets/index.css'
}

lua54 'yes'
use_experimental_fxv2_oal 'yes'
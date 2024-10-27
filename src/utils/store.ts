import {Store} from "@tauri-apps/plugin-store";

export const store = async () => {
    const store = await Store.load('settings.json')

    await store.set('key', {value: 6})

    const val = await store.get<{ value: number }>('key')

    if (val) {
        console.log(val)
    } else {
        console.log('val is null')
    }
};
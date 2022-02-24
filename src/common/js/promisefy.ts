
export const eventPromisefy = (event) => {

    return new Promise(res => {
        window.chromeEvent.on(event, (value) => {
            res(value);
        });
    })
}
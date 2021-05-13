const setup = () => {
    const nearestColorScript = document.createElement('script');
    document.body.appendChild(nearestColorScript);

    nearestColorScript.onload = onScriptLoad;
    nearestColorScript.src = 'https://cdn.rawgit.com/dtao/nearest-color/a017c25b/nearestColor.js';
};

const onScriptLoad = () => {
    console.log('nearest color script loaded');

    self._colors = {
        cyan: '#30e3ff',
        green: '#30ff62',
        orange: '#ff9630',
        pink: '#ff309d',
        purple: '#8c30ff',
        red: '#ff3030',
        yellow: '#f1ff30',
    };

    self._replaceColor = nearestColor.from(self._colors);

    const chatlog = document.querySelector('#log');
    const config = { childList: true };
    const observer = new MutationObserver(onMutation);
    observer.observe(chatlog, config);
};

const onMutation = mutationsList => {
    for (let mutation of mutationsList) {
        if (mutation.addedNodes.length) {
            const addedNodesArray = [...mutation.addedNodes];
            const addedDivs = addedNodesArray.filter(node => node.nodeName === 'DIV');

            if (addedDivs.length) {
                const chatDiv = addedDivs.pop();
                const chatNick = chatDiv.querySelector('.meta');
                const oldColor = chatNick.style.color;
                const newColor = self._replaceColor(oldColor).value || self._colors.pink;

                chatNick.style.color = newColor;
            }
        }
    }
};
// Please use event listeners to run functions.
document.addEventListener('onLoad', function (obj) {
    // obj will be empty for chat widget
    // this will fire only once when the widget loads
    setup();
});

document.addEventListener('onEventReceived', function (obj) {
    // obj will contain information about the event
});

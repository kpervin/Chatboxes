// Please use event listeners to run functions.
document.addEventListener('onLoad', function (obj) {
    // obj will be empty for chat widget
    // this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function (obj) {
    // obj will contain information about the event
    id_index++;
    typeEffect(id_index);
});

var speed = 30;
var id_index = 1;

async function typeEffect(inp) {
    var o = inp;
    document.getElementById('message').id = 'message' + o;
    document.getElementById('caret').id = 'caret' + o;

    const temp = $('#message' + o).html();

    $('#message' + o).text('');

    var text = formatEmotes(temp);

    await new Promise(resolve => {
        setTimeout(() => {
            var i = 0;
            var timer = setInterval(function () {
                if (i < text.length) {
                    $('#message' + o).append(text[i]);
                    i++;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        }, 300);
    });
    document.getElementById('caret' + o).id = 'caret-complete';
}

function formatEmotes(text) {
    let spanStart = '<span';
    let spanEnd = '</span>';

    let emoteArray = [];

    let splitText = [...text]; //Spread the text out into an array based on characters

    for (let i = text.indexOf(spanStart); i >= 0; i = text.indexOf(spanStart, i + 1)) {
        let closeIndex = text.indexOf(spanEnd, i) + spanEnd.length;
        let emote = text.substring(i, closeIndex);
        emoteArray.push({ start: i, end: closeIndex, emote });
    }

    for (let index in emoteArray) {
        const { start, end, emote } = emoteArray[index];

        let length = end - start;

        let empty = Array.apply(null, new Array(length)).map(function () {
            return undefined;
        });

        splitText = splitText
            .slice(0, start)
            .concat(empty)
            .concat(splitText.slice(end, splitText.length));

        splitText.splice(start, 1, emote);
    }
    splitText = splitText.filter(val => typeof val !== 'undefined');

    return splitText;
}

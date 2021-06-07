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
    const message = $('#message' + o).text();

    $('#message' + o).text('');

    if(/^#heh$/.test(message)){
        return $('#message'+o).append("<img height='200px' src={hehField} />")
    }

    var text = formatEmotes(temp);

    function typewriter(o, text, i) {
        if (i < text.length) {
            $('#message' + o).append(text[i]);
            i++;
            setTimeout(function () {
                typewriter(o, text, i);
            }, 30);
        } else {
            document.getElementById('caret' + o).id = 'caret-complete';
        }
    }
    setTimeout(() => {
        typewriter(o, text, 0);
    }, 300);
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
    splitText = splitText.filter((val) => typeof val !== 'undefined');

    return splitText;
}

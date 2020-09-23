var riddleNumber = document.querySelector('#riddle-number');
var riddleNumberMax = document.querySelector('#riddle-number-max');
var riddleText = document.querySelector('#riddle-text');
var riddleAnwser = document.querySelector('#riddle-anwser');
var riddleButton = document.querySelector('#riddle-button');
var riddleError = document.querySelector('#riddle-error');

var hintLocation = document.querySelector('#show-location-hint');
var hintObject = document.querySelector('#show-object-hint');

var currentRiddleIndex = +(localStorage.getItem('roro-index') || 0);

var riddles = [
    {
        "id": 0,
        "text": "Bon Appétit!<br><br>While you're munching on these sweet delights,<br>there's something hiding between those chocolaty bites.",
        "codeword": "im ready"
    },
    {
        "id": 1,
        "text": "One of them is not like the others,<br>he's big, he's chonky, and looks over his brothers.",
        "codeword": "pika birb"
    },
    {
        "id": 2,
        "text": "Want your first date to go well?<br>Bring it and she'll be under your spell.",
        "codeword": "umbrella"
    },
    {
        "id": 3,
        "text": "His dayjob might not be as cool,<br>but at night he makes the boys drool.",
        "codeword": "froggo"
    },
    {
        "id": 4,
        "text": "Once memories filled these walls,<br>now only a beacon of light still calls.",
        "codeword": "boaties"
    },
    {
        "id": 5,
        "text": "A lovely couple, pretty as a bow,<br>with lights above and lights below.",
        "codeword": "ciw ciw"
    },
    {
        "id": 6,
        "text": "Nono don't touch me there,<br>this is my nono square.<br>- For the tiny one.",
        "codeword": "tiny one"
    },
    {
        "id": 7,
        "text": "Peekaboo, who there? No-one knows,<br>thank god they come with these holes.",
        "codeword": "looky hole"
    },
    {
        "id": 8,
        "text": "All three hanging in the middle,<br>happy to be part of this awesome riddle.",
        "codeword": "famoly"
    },
    {
        "id": 9,
        "text": "In their numbers they have grown,<br>and one by one we will watch them burn.",
        "codeword": "feel the bernn"
    },
    {
        "id": 10,
        "text": "Be careful when you pick my top,<br>im bottom heavy and might drop.",
        "codeword": "handy washy"
    },
    {
        "id": 11,
        "text": "Forbidden things hold tresure within,<br>stand infront and let your heart sing.",
        "codeword": "im singinging"
    },
    {
        "id": 12,
        "text": "Your heart is going boom boom boom, so open the doors and let our love forever bloom <3",
        "codeword": "the end"
    }
];

var timer = null;

function checkAnwser() {
    var value = riddleAnwser.value.toLowerCase().trim();

    if (value == 'reset') {
        currentRiddleIndex = 0;
        setupRiddle();
        return;
    }

    if (value != 'hax0r') {
        if (value == '') {
            if (timer != null) {
                clearTimeout(timer);
                timer = null;
            }

            setTimeout(function () {
                window.scrollTo(0, document.body.scrollHeight);
            }, 10);

            riddleButton.classList.add('shake-me');
            timer = setTimeout(function () {
                riddleButton.classList.remove('shake-me');
                timer = null;
            }, 500);

            riddleError.classList.add('show-error');
            riddleError.innerHTML = 'You need to write something dummy :3';
            return;
        }

        var match = riddles.find(function (riddle) {
            return riddle.codeword === value;
        });

        if (!match) {
            riddleError.classList.add('show-error');
            riddleError.innerHTML = 'Hmmm nope, thats not the codeword for any riddle. Did you write it correctly?';
            return;
        }

        if (currentRiddleIndex !== match.id) {
            riddleError.classList.add('show-error');
            riddleError.innerHTML = 'Oooo found one! But not the correct one. Please put it back. You might need it later :3';
            return;
        }
    }

    currentRiddleIndex++;

    if (currentRiddleIndex >= riddles.length) {
        currentRiddleIndex = 0;
    }

    setupRiddle();
}

function setupRiddle() {
    localStorage.setItem('roro-index', currentRiddleIndex);

    riddleError.classList.remove('show-error');
    riddleError.innerHTML = '';

    hintLocation.classList.add('hidden');
    hintObject.classList.add('hidden');

    if (currentRiddleIndex >= riddles.length - 2 || currentRiddleIndex == 0) {
        hintLocation.classList.add('d-none');
        hintObject.classList.add('d-none');
    } else {
        hintLocation.classList.remove('d-none');
        hintObject.classList.remove('d-none');
        hintLocation.querySelector('img').src = 'locations/' + currentRiddleIndex + '.jpg';
        hintObject.querySelector('img').src = 'hints/' + currentRiddleIndex + '.jpg';
    }

    riddleNumber.innerHTML = currentRiddleIndex;
    riddleText.innerHTML = riddles[currentRiddleIndex].text;
    riddleAnwser.value = '';
}

hintLocation.addEventListener('click', function () {
    hintLocation.classList.toggle('hidden');
});

hintObject.addEventListener('click', function () {
    hintObject.classList.toggle('hidden');
});

riddleNumberMax.innerHTML = riddles.length - 1;
setupRiddle();

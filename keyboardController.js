///////// Synthesizer
/* this is our basic synth setup */
let polySynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "fatsawtooth",
    count: 3,
    spread: 10,
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.5,
    release: 0.1,
    attackCurve: "exponential",
  }
});
/* we don't connect it immediately to our audio driver, we wait for user interaction (via the modal) */
function toneInit(){
  polySynth.toDestination();
}

///////// Intro Modal popup
/* find modal */
let introModal = document.getElementById("introDialog");
/* to get the backdrop working we need to open the modal with js */
document.getElementById("introDialog").showModal();
/* find modal close button and add an eventlistener */
document.getElementById("dialogCloseButton").addEventListener("click", () => {
  introModal.close();
});
/* finally we want to initialize the synthesizer when the modal is closed */
/* because this can be through the above button, or by pressing esc, we tie it to the actual close event */
/* the referenced toneInit function is defined in toneSetup.js */
introModal.addEventListener("close", toneInit);

/* find keys by their class and add to array */
let allKeys = Array.from(document.getElementsByClassName("whiteKey")).concat(Array.from(document.getElementsByClassName("blackKey")));

/* set default octace : we will update based on keys later on */
let octave = 3;

/* add an event listener to each key */
allKeys.forEach(key => {
    key.addEventListener("mousedown", e => {
        let note = e.target.textContent;
        polySynth.triggerAttackRelease(note + octave, '8n');
    });
});

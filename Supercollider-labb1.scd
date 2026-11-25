//DM1595 Program Development for Interactive Media
//SuperCollider, Mandatory Lab
//
//
//Plase write your name(s): Ebba Ekman Söderlund
//
//
// Don't forget to comment your code!


////////////////////////////
///                      ///
///        Task 1        ///
///                      ///
////////////////////////////

// Additive synthesis Synth
//Write a Synth using additive synthesis, no matter the method you want to implement,
//with the following properties: given a fundamental frequency \freq, it generates a
//sound based on its odd harmonics (at least 5), with decreasing amplitudes for each
//partial.

(
SynthDef(\additive, {
	// Public arguments: freq = 1 harmonic, fundamental freq
	// amp = amplitude of whole sound
	arg freq = 100, amp = 0.5;

	// sound: the sum of 10 sine waves, one for each odd harmonic
	var sound = Mix.fill(10, {|i| SinOsc.ar(freq*(2*i+1), 0, amp/(2*i+1))});

	// Sends the summed signal to the output.
	// !2 duplicates the mono signal into stereo (left + right channel)
	Out.ar(0, sound!2);
}).add;
)

// play sound
Synth(\additive, [\freq, 220]);


////////////////////////////
///                      ///
///        Task 2        ///
///                      ///
////////////////////////////

//Write a Synth using Klank.ar with PinkNoise as its input source. Fill the frequency
//array with 10 harmonic partials randomly detuned by ±10%. (Hint: a value generated
//by rrand(0.9, 1.1) represents a 10% deviation). Pay attention to the amplitudes!

// Subtractive synthesis Synth
// Use the UGen Klank.ar. You can read about it using the documentation help.
// Watch the ` before the opening bracket of the parameter array!
// It is needed to make Klank properly read the array you will give to it.
//
// Here is an example:
{Klank.ar(`[[300, 389, 450, 560], [0.1, 0.2, 0.3, 0.1]], Impulse.ar(2, 0, 0.5))!2}.play;

//Write your Synth here now:

(
SynthDef(\subtractive, {
	// reading the pink noise
	var noise = PinkNoise.ar;

	// creating 10 harmonics, that has a +-10% random detuning)
	var freqs = Array.fill(10, {|i| 200 * (i+1) * rrand(0.9, 1.1)});

	// creating array containing 10 amplitudes with 0.1 as amp
	var amps = Array.fill(10, {1/10});

	// creating sound with Klank, using Noise as input
	var sound = Klank.ar(`[freqs, amps], noise);

	// output sound using stereo
	Out.ar(0, sound!2);
}).add;
)

Synth(\subtractive);



////////////////////////////
///                      ///
///        Task 3        ///
///                      ///
////////////////////////////

// The previous two synths with envelopes
// Rework both previous synths so the first one is shaped by a perc envelope with
// attackTime = 0.01s and releaseTime = 0.5s, and the second one by a triangle
// envelope with duration = 5s and level = 0.7


// Task 1 rework
(
SynthDef(\additive, {
	// Public arguments: freq = 1 harmonic, fundamental freq
	// amp = amplitude of whole sound
	arg freq = 100, amp = 0.5;

	// creating envelope
	var envelope = Env.perc(0.01,0.5).kr(2);

	// sound: the sum of 10 sine waves, one for each odd harmonic
	var sound = Mix.fill(10, {|i| SinOsc.ar(freq*(2*i+1), 0, amp/(2*i+1))});

	// apply envelope to sound
	sound = sound * envelope;



	// Sends the summed signal to the output.
	// !2 duplicates the mono signal into stereo (left + right channel)
	Out.ar(0, sound!2);
}).add;
)

// play sound
Synth(\additive, [\freq, 220]);


// task 2 rework

(
SynthDef(\subtractive, {
	// reading the pink noise
	var noise = PinkNoise.ar;

	// creating 10 harmonics, that has a +-10% random detuning)
	var freqs = Array.fill(10, {|i| 200 * (i+1) * rrand(0.9, 1.1)});

	// creating array containing 10 amplitudes with 0.1 as amp
	var amps = Array.fill(10, {1/10});

	// creating sound with Klank, using Noise as input
	var sound = Klank.ar(`[freqs, amps], noise);

	// Creating triangle envelope
	var envelope = Env.triangle(5,0.7).kr(2);

	// apply env on sound

	sound = sound * envelope;

	// output sound using stereo
	Out.ar(0, sound!2);
}).add;
)

Synth(\subtractive);




////////////////////////////
///                      ///
///        Task 4        ///
///                      ///
////////////////////////////

// Granulation:
//he GrainIn.ar UGen is a granulator: it granulates an input signal, meaning it
//basically chunks the signal in microportions (grains) triggered by a given function.
//Give also a look at the help file for GrainIn.ar. This said, take the Task 1 (additive
//synthesis without the envelope) and set a fundamental frequency of 440Hz. Use that
//sound as input signal for the granulator. Also use the X cursor position to control the
//impulse frequency between 10 and 100 Hz and the Y position to control the grain size
//between 0.001 and 0.01 s. Run this new synth and make a video recording of your
//screen (with audio) while exploring the sound-space with the mouse. It will be useful
//having the FreqScope.new in foreground to visualize what is going on.

(
SynthDef(\grain, {
	// Fundamental frequency and amplitude
	arg freq = 440, amp = 0.5;

	// Variables for the additive sound and granulator
	var sound, grain;

	// Creating additive synthesis with 10 odd harmonics
	sound = Mix.fill(10, {|i|
		SinOsc.ar(freq*(2*i+1), 0, amp/(2*i+1))
	});

	// Grain frequency is controlled by the mouse X position
	// between 10 and 100 Hz
	grain = GrainIn.ar(
		2,
		Impulse.kr(MouseX.kr(10, 100)),

		// Grain size is controlled by the mouse Y position
		// between 0.001 and 0.01 seconds
		MouseY.kr(0.001, 0.01),

		// Additive synthesis sound is used as input
		sound
	);

	// Output the granulated sound in stereo
	Out.ar(0, grain);
}).add;
)

Synth(\grain);


//DM1595 Program Development for Interactive Media
//SuperCollider, Bonus Lab
//
//
//Plase write your name(s): Ebba Ekman Söderlund

//
// Don't forget to comment your code!

////////////////////////////
///                      ///
///        Task 1        ///
///                      ///
////////////////////////////

// FM synthesis
//1. Write a Synth that implements Frequency modulation (FM synthesis). Set the carrier
//frequency to freq_c = 200. Use the X cursor position to control the modulating index
//between 1 and 1000 and the Y position to control the modulator frequency between 1
//and 200 Hz.


(
SynthDef(\fm_mouse, {
	// Carrier frequency 200 Hz
	arg freq_c = 200, amp = 0.3;

	// Modulation index = amplitude of the modulator, X cursor position maps to 1-1000
	var index = MouseX.kr(1, 1000);

	// Modulator frequency = how fast the carrier is wobbled, Y cursor position maps to 1-200 Hz
	var freq_m = MouseY.kr(1, 200);

	// Modulator: sine wave with amplitude = index (swings between -index and +index)
	var modulator = SinOsc.ar(freq_m, 0, index);

	// Carrier: the sine wave we hear. Its frequency is freq_c + modulator
	var carrier = SinOsc.ar(freq_c + modulator, 0, amp);

	// Mono signal duplicated to stereo with !2
	Out.ar(0, carrier!2);
}).add;
)

Synth(\fm_mouse);


////////////////////////////
///                      ///
///        Task 2        ///
///                      ///
////////////////////////////

// Granular synthesis  with  LFNoise2


// Example of LFNoise:
{[LFNoise0.ar(100).range(10, 100), LFNoise1.ar(100).range(10, 100), LFNoise2.ar(100).range(10, 100)]}.plot(0.1);

(
SynthDef(\grain_auto, {
	// Fundamental frequency and amplitude
	arg freq = 440, amp = 0.5;

	// Variables for the additive sound, the two control signals and the granulator
	var sound, impFreq, grainSize, grain;

	// Additive synthesis with 10 odd harmonics and decreasing amplitudes
	sound = Mix.fill(10, {|i|
		SinOsc.ar(freq*(2*i+1), 0, amp/(2*i+1))
	});

	// LFNoise2.kr(2) generates smooth random values in (-1, 1), 2 new targets
	// per second. .range() remaps them to the window we want.
	// Impulse frequency (grains per second): between 10 and 100 Hz
	impFreq = LFNoise2.kr(2).range(10, 100);

	// Grain size (duration of each grain): between 0.001 and 0.01 s
	grainSize = LFNoise2.kr(2).range(0.001, 0.01);

	// GrainIn chops the input signal into grains.
	// Arguments: number of channels, trigger, grain duration, input signal
	// Each impulse from Impulse.kr triggers a new grain
	grain = GrainIn.ar(2, Impulse.kr(impFreq), grainSize, sound);

	// Output the granulated sound (already stereo)
	Out.ar(0, grain);
}).add;
)

Synth(\grain_auto);


////////////////////////////
///                      ///
///        Task 3        ///
///                      ///
////////////////////////////

// FM synthesis  with  LFNoise2
(
SynthDef(\fm_auto, {
	arg freq_c = 200, amp = 0.3;


	// LFNoise1 used as a control signal
	// It moves linearly between random values 0.5 times per second,
	// remapped to 1-1000. This replaces the fixed amplitude argument.
	var index = LFNoise2.kr(0.5).range(1, 1000);

	// Modulator frequency moves randomly between 1 and 200 Hz
	var freq_m = LFNoise2.kr(0.5).range(1, 200);

	// Same FM structure as in Task 1
	var modulator = SinOsc.ar(freq_m, 0, index);
	var carrier = SinOsc.ar(freq_c + modulator, 0, amp);

	Out.ar(0, carrier!2);
}).add;
)

Synth(\fm_auto);



////////////////////////////
///                      ///
///        Task 4        ///
///                      ///
////////////////////////////

// Synths from Taks 2 and Task 3 with  LFNoise1 on their amplitude.
// Play them at the s ame time and record the result!

// Synth task 2
(
SynthDef(\grain_amp, {
	arg freq = 440;
	var amp, sound, impFreq, grainSize, grain;

	// LFNoise1 used as a control signal
	// It moves linearly between random values 5 times per second,
	// remapped to 0-0.5. This replaces the fixed amplitude argument.
	amp = LFNoise1.kr(5).range(0, 0.5);

	// Additive source, its overall amplitude follows the control signal
	sound = Mix.fill(10, {|i|
		SinOsc.ar(freq*(2*i+1), 0, amp/(2*i+1))
	});

	// Grain parameters automated as in Task 2
	impFreq = LFNoise2.kr(2).range(10, 100);
	grainSize = LFNoise2.kr(2).range(0.001, 0.01);

	// The 5th argument of GrainIn is the pan position:
	// -1 = fully left, 0 = center, 1 = fully right
	grain = GrainIn.ar(2, Impulse.kr(impFreq), grainSize, sound, -1);

	Out.ar(0, grain);
}).add;

// Synth task 3
SynthDef(\fm_amp, {
	arg freq_c = 200;
	var amp, index, freq_m, modulator, carrier;

	// Random amplitude, same idea as in Synth A (5 Hz, range 0 to 0.5)
	amp = LFNoise1.kr(5).range(0, 0.5);

	// FM parameters automated as in Task 3
	index = LFNoise2.kr(0.5).range(1, 1000);
	freq_m = LFNoise2.kr(0.5).range(1, 200);

	modulator = SinOsc.ar(freq_m, 0, index);
	carrier = SinOsc.ar(freq_c + modulator, 0, amp);

	// A mono signal sent to bus 1 only is heard in the right channel only
	Out.ar(1, carrier);
}).add;
)

// Run both at the same time (evaluate this block on its own, after the SynthDefs)
(
Synth(\grain_amp);
Synth(\fm_amp);
FreqScope.new;   // spectrum window, needed for the video recording
s.meter;         // level meters, check that nothing clips
)

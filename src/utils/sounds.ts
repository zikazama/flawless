// Sound utility functions for the learning platform

export class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  
  private constructor() {
    // Initialize audio context on first user interaction
    this.initializeAudio();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private initializeAudio() {
    // Audio context will be created on first sound play
    try {
      if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  private async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Create a tone using Web Audio API
  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): Promise<void> {
    return new Promise((resolve) => {
      if (!this.audioContext) {
        resolve();
        return;
      }

      this.resumeAudioContext().then(() => {
        const oscillator = this.audioContext!.createOscillator();
        const gainNode = this.audioContext!.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext!.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext!.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, this.audioContext!.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + duration);

        oscillator.start(this.audioContext!.currentTime);
        oscillator.stop(this.audioContext!.currentTime + duration);

        oscillator.onended = () => resolve();
      });
    });
  }

  // Success sound - more exciting victory fanfare
  public async playCorrectSound(): Promise<void> {
    try {
      // Victory fanfare with multiple harmonies
      await this.createTone(523.25, 0.1, 'sine'); // C5
      await new Promise(resolve => setTimeout(resolve, 30));
      await this.createTone(659.25, 0.1, 'sine'); // E5
      await new Promise(resolve => setTimeout(resolve, 30));
      await this.createTone(783.99, 0.1, 'sine'); // G5
      await new Promise(resolve => setTimeout(resolve, 30));
      await this.createTone(1046.5, 0.15, 'sine'); // C6
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.createTone(1318.5, 0.2, 'triangle'); // E6 - triumphant finish
    } catch (error) {
      console.warn('Could not play correct sound:', error);
    }
  }

  // Error sound - dramatic game show buzzer
  public async playIncorrectSound(): Promise<void> {
    try {
      // Dramatic buzzer sound
      await this.createTone(200, 0.15, 'sawtooth'); // Low dramatic tone
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.createTone(150, 0.15, 'sawtooth'); // Even lower
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.createTone(100, 0.25, 'square'); // Final dramatic buzz
    } catch (error) {
      console.warn('Could not play incorrect sound:', error);
    }
  }

  // Completion sound - celebration melody
  public async playCompletionSound(): Promise<void> {
    try {
      await this.createTone(523.25, 0.1, 'sine'); // C5
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.createTone(659.25, 0.1, 'sine'); // E5
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.createTone(783.99, 0.1, 'sine'); // G5
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.createTone(1046.5, 0.2, 'sine');  // C6
    } catch (error) {
      console.warn('Could not play completion sound:', error);
    }
  }

  // Case study success - triumphant sound
  public async playCaseStudySuccess(): Promise<void> {
    try {
      await this.createTone(440.00, 0.1, 'triangle'); // A4
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.createTone(523.25, 0.1, 'triangle'); // C5
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.createTone(659.25, 0.1, 'triangle'); // E5
      await new Promise(resolve => setTimeout(resolve, 50));
      await this.createTone(880.00, 0.2, 'triangle'); // A5
    } catch (error) {
      console.warn('Could not play case study success sound:', error);
    }
  }

  // Timer tick sound - clock tick
  public async playTimerTick(): Promise<void> {
    try {
      // Sharp click sound like a clock tick
      await this.createTone(800, 0.05, 'square'); // Sharp high tick
    } catch (error) {
      console.warn('Could not play timer tick sound:', error);
    }
  }

  // Timer warning sound for last few seconds
  public async playTimerWarning(): Promise<void> {
    try {
      // More urgent tick for countdown
      await this.createTone(1000, 0.08, 'triangle'); // Higher, more urgent tick
    } catch (error) {
      console.warn('Could not play timer warning sound:', error);
    }
  }

  // Disable all sounds (for user preference)
  public static soundsEnabled = true;

  public static enableSounds() {
    SoundManager.soundsEnabled = true;
  }

  public static disableSounds() {
    SoundManager.soundsEnabled = false;
  }
}

// Convenient wrapper functions
export const soundManager = SoundManager.getInstance();

export const playCorrectSound = () => {
  if (SoundManager.soundsEnabled) {
    soundManager.playCorrectSound();
  }
};

export const playIncorrectSound = () => {
  if (SoundManager.soundsEnabled) {
    soundManager.playIncorrectSound();
  }
};

export const playCompletionSound = () => {
  if (SoundManager.soundsEnabled) {
    soundManager.playCompletionSound();
  }
};

export const playCaseStudySuccess = () => {
  if (SoundManager.soundsEnabled) {
    soundManager.playCaseStudySuccess();
  }
};

export const playTimerTick = () => {
  if (SoundManager.soundsEnabled) {
    soundManager.playTimerTick();
  }
};

export const playTimerWarning = () => {
  if (SoundManager.soundsEnabled) {
    soundManager.playTimerWarning();
  }
};
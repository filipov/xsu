import audioFile from '@/audio/neon-blink.mp3';

export class XsuPicture {
  private element: SVGElement;
  private audio: HTMLAudioElement;
  private colorFragments: XsuColorFragment[] = [];

  constructor(element: SVGElement) {
    this.element = element;

    element.classList.add('xsu-picture');

    this.audio = document.createElement('audio');

    const source = document.createElement('source');
    source.src = audioFile;
    this.audio.append(source);

    this.audio.volume = 0.6;
    this.audio.preload = "none";
    this.audio.load();

    document.body.append(this.audio);

    for (let fragment of element.querySelectorAll('g')) {
      if (fragment instanceof SVGElement) {
        this.colorFragments.push(new XsuColorFragment(fragment, this.audio));
      }
    }

    setInterval(() => {
      const element = this.colorFragments[Math.floor(Math.random() * this.colorFragments.length)];

      element.startAnimation();
    }, 15000);

    setTimeout(() => {
      const element = this.colorFragments[Math.floor(Math.random() * this.colorFragments.length)];

      element.startAnimation();
    }, 1000);
  }
}

class XsuColorFragment {
  private element: SVGElement;
  private audio: HTMLAudioElement;

  constructor(element: SVGElement, audio: HTMLAudioElement) {
    this.element = element;

    this.audio = audio;
  }

  public startAnimation() {
    this.element.classList.add('color-imbalance');
    this.audio.currentTime = 0.8;

    this.audio.play().then(r => {
      setTimeout(() => {
        this.element.classList.remove('color-imbalance');
        this.audio.pause();
      }, 1000)
    });
  }
}

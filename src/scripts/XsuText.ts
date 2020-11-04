export class XsuText {
  private readonly element: HTMLElement;

  private introText: string;
  private oldText: string;
  private replaceText: string;

  constructor (container: HTMLElement, introText: string, oldText: string, replaceText: string) {
    this.element = document.createElement('div');
    this.introText = introText;
    this.oldText = oldText;
    this.replaceText = replaceText;

    this.element.classList.add('xsu-text');

    container.append(this.element);

    this.startAnimation();
  }

  public startAnimation() {
    this.element.innerHTML = `${this.introText}<br /> <span>${this.oldText}</span> <div></div>`;

    setTimeout(() => {
      this.strikeOldAnimation();
    }, 2000);
  }

  public strikeOldAnimation() {
    let i = 0;

    const interval = setInterval(() => {
      this.element.innerHTML = `${this.introText}<br /> <span><s>${this.oldText.slice(0, i)}</s>${this.oldText.slice(i)}</span> <div></div>`;

      i += 1;

      if (i > this.oldText.length) {
        clearInterval(interval);

        this.writeReplaceTextAnimation();
      }
    }, 100);
  }

  public writeReplaceTextAnimation() {
    let i = 0;

    const interval = setInterval(() => {
      this.element.innerHTML = `${this.introText}<br /> <span><s>${this.oldText}</s></span> <div>${this.replaceText.slice(0, i)}</div>`;

      i += 1;

      if (i > this.replaceText.length) {
        clearInterval(interval);

        setTimeout(() => {
          this.startAnimation();
        }, 20000);
      }
    }, 100);
  }
}

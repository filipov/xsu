import { disablePreview } from '@/scripts/disablePreview.ts';
import { XsuPicture } from '@/scripts/XsuPicture.ts';
import image from '@/images/xsu.svg';
import { XsuText } from '@/scripts/XsuText.ts';
import { ClickMe } from '@/scripts/ClickMe.ts';
import audioFile from '@/audio/wild-west.mp3';

(() => {
  const body = document.body;

  setTimeout(disablePreview, 1000);

  setTimeout(() => {
    fetch(image)
      .then((response) =>
        response.text()
          .then((str) => {
            new ClickMe(() => {
              body.innerHTML = str;

              const audio = document.createElement('audio');

              const source = document.createElement('source');
              source.src = audioFile;
              audio.append(source);

              audio.loop = true;
              audio.volume = 0.2;
              audio.load();

              document.body.append(audio);

              audio.play();

              const image = body.firstElementChild;

              if (image instanceof SVGElement) {
                new XsuPicture(image);
              }

              new XsuText(body, 'git push','origin master', 'origin dev');

              return undefined;
            })
          })
      );
  }, 1000);

})();

document.querySelectorAll('.bio-music').forEach((deck) => {
  const audio = deck.querySelector('.music-player');
  const select = deck.querySelector('.music-select');
  const volume = deck.querySelector('.music-volume');
  const status = deck.querySelector('.music-status');
  const playBtn = deck.querySelector('[data-action="play"]');
  const muteBtn = deck.querySelector('[data-action="mute"]');

  if (!audio || !select || !volume || !status || !playBtn || !muteBtn) {
    return;
  }

  const selectedTrackName = () => select.options[select.selectedIndex].text;

  const syncSource = () => {
    audio.src = select.value;
    audio.load();
    status.textContent = `Selected: ${selectedTrackName()}`;
  };

  select.addEventListener('change', () => {
    syncSource();
    audio.play().then(() => {
      playBtn.textContent = 'Pause';
      status.textContent = `Now playing: ${selectedTrackName()}`;
    }).catch(() => {
      status.textContent = 'Track changed. Press Play to start.';
    });
  });

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        playBtn.textContent = 'Pause';
        status.textContent = `Now playing: ${selectedTrackName()}`;
      }).catch(() => {
        status.textContent = 'Browser blocked autoplay. Press Play again.';
      });
      return;
    }

    audio.pause();
    playBtn.textContent = 'Play';
    status.textContent = 'Paused';
  });

  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? 'Unmute' : 'Mute';
    status.textContent = audio.muted ? 'Muted' : `Volume ${Math.round(audio.volume * 100)}%`;
  });

  volume.addEventListener('input', () => {
    audio.volume = Number(volume.value);

    if (audio.muted && audio.volume > 0) {
      audio.muted = false;
      muteBtn.textContent = 'Mute';
    }

    status.textContent = `Volume ${Math.round(audio.volume * 100)}%`;
  });

  audio.volume = Number(volume.value);
  syncSource();
});

// Enhanced Music Player for Bio Pages
// Handles track selection, playback, volume, and status updates

document.querySelectorAll('.bio-music').forEach((deck) => {
  const audio = deck.querySelector('.music-player');
  const select = deck.querySelector('.music-select');
  const volume = deck.querySelector('.music-volume');
  const status = deck.querySelector('.music-status');
  const playBtn = deck.querySelector('[data-action="play"]');
  const muteBtn = deck.querySelector('[data-action="mute"]');

  // Validate all required elements exist
  if (!audio || !select || !volume || !status || !playBtn || !muteBtn) {
    console.error('Music player: Missing required elements');
    return;
  }

  // Helper function to get current track name
  const selectedTrackName = () => select.options[select.selectedIndex].text;

  // Sync audio source with selected track
  const syncSource = () => {
    audio.src = select.value;
    audio.load();
    status.textContent = `Selected: ${selectedTrackName()}`;
  };

  // Update status with current playback time
  const updatePlaybackStatus = () => {
    if (!audio.paused) {
      const currentTime = Math.floor(audio.currentTime);
      const duration = Math.floor(audio.duration);
      
      if (!isNaN(duration)) {
        const currentMin = Math.floor(currentTime / 60);
        const currentSec = currentTime % 60;
        const durationMin = Math.floor(duration / 60);
        const durationSec = duration % 60;
        
        status.textContent = `Playing: ${selectedTrackName()} [${currentMin}:${currentSec.toString().padStart(2, '0')} / ${durationMin}:${durationSec.toString().padStart(2, '0')}]`;
      } else {
        status.textContent = `Now playing: ${selectedTrackName()}`;
      }
    }
  };

  // Track selection change handler
  select.addEventListener('change', () => {
    syncSource();
    audio.play().then(() => {
      playBtn.textContent = 'Pause';
      updatePlaybackStatus();
    }).catch(() => {
      status.textContent = 'Track changed. Press Play to start.';
    });
  });

  // Play/Pause button handler
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        playBtn.textContent = 'Pause';
        updatePlaybackStatus();
      }).catch(() => {
        status.textContent = 'Browser blocked autoplay. Press Play again.';
      });
      return;
    }

    audio.pause();
    playBtn.textContent = 'Play';
    status.textContent = 'Paused';
  });

  // Mute/Unmute button handler
  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? 'Unmute' : 'Mute';
    
    if (audio.muted) {
      status.textContent = 'Audio muted';
    } else {
      status.textContent = `Volume ${Math.round(audio.volume * 100)}%`;
    }
  });

  // Volume slider handler
  volume.addEventListener('input', () => {
    audio.volume = Number(volume.value);

    // Auto-unmute if volume increased while muted
    if (audio.muted && audio.volume > 0) {
      audio.muted = false;
      muteBtn.textContent = 'Mute';
    }

    status.textContent = `Volume ${Math.round(audio.volume * 100)}%`;
  });

  // Audio event listeners for better status updates
  audio.addEventListener('timeupdate', updatePlaybackStatus);
  
  audio.addEventListener('ended', () => {
    playBtn.textContent = 'Play';
    status.textContent = 'Track ended. Press Play to restart.';
  });

  audio.addEventListener('error', () => {
    status.textContent = 'Error loading track. Try another.';
    playBtn.textContent = 'Play';
  });

  audio.addEventListener('loadstart', () => {
    status.textContent = 'Loading track...';
  });

  audio.addEventListener('canplay', () => {
    if (audio.paused) {
      status.textContent = `Ready: ${selectedTrackName()}`;
    }
  });

  // Initialize player
  audio.volume = Number(volume.value);
  syncSource();
});
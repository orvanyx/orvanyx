// Enhanced Music Player for Bio Pages
// Features: Auto-play, Floating panel, Prev/Next, Progress bar, Visualizer

// Toggle music deck panel
const toggleButton = document.getElementById('musicDeckToggle');
const panel = document.getElementById('musicDeckPanel');
const closeButton = document.getElementById('musicDeckClose');

if (toggleButton && panel) {
  toggleButton.addEventListener('click', () => {
    panel.classList.toggle('active');
  });
}

if (closeButton && panel) {
  closeButton.addEventListener('click', () => {
    panel.classList.remove('active');
  });
}

// Close panel when clicking outside
document.addEventListener('click', (e) => {
  if (panel && toggleButton && 
      !panel.contains(e.target) && 
      !toggleButton.contains(e.target) && 
      panel.classList.contains('active')) {
    panel.classList.remove('active');
  }
});

// Music player functionality
document.querySelectorAll('.bio-music').forEach((deck) => {
  const audio = deck.querySelector('.music-player');
  const select = deck.querySelector('.music-select');
  const volume = deck.querySelector('.music-volume');
  const status = deck.querySelector('.music-status');
  const playBtn = deck.querySelector('[data-action="play"]');
  const muteBtn = deck.querySelector('[data-action="mute"]');
  const prevBtn = deck.querySelector('[data-action="prev"]');
  const nextBtn = deck.querySelector('[data-action="next"]');
  const progressBar = deck.querySelector('.music-progress');
  const visualizer = deck.querySelector('.music-visualizer');

  // Validate required elements
  if (!audio || !select || !volume || !status || !playBtn) {
    console.error('Music player: Missing required elements');
    return;
  }

  let isUserSeeking = false;

  // Get current track name
  const selectedTrackName = () => select.options[select.selectedIndex].text;

  // Sync audio source with selected track
  const syncSource = () => {
    audio.src = select.value;
    audio.load();
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Update progress bar
  const updateProgress = () => {
    if (!isUserSeeking && audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      if (progressBar) {
        progressBar.value = progress;
        progressBar.style.background = `linear-gradient(to right, var(--color-accent) ${progress}%, rgba(10, 14, 23, 0.95) ${progress}%)`;
      }
    }
  };

  // Update status with playback time
  const updateStatus = () => {
    if (!audio.paused && audio.duration) {
      status.textContent = `Playing: ${selectedTrackName()} [${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}]`;
    }
  };

  // Update visualizer state
  const updateVisualizer = () => {
    if (visualizer) {
      if (audio.paused) {
        visualizer.parentElement.classList.add('music-paused');
      } else {
        visualizer.parentElement.classList.remove('music-paused');
      }
    }
  };

  // Auto-play on page load
  const autoPlay = () => {
    syncSource();
    // Use a slight delay to ensure better browser compatibility
    setTimeout(() => {
      audio.play().then(() => {
        playBtn.textContent = 'Pause';
        status.textContent = `Playing: ${selectedTrackName()}`;
        updateVisualizer();
      }).catch((error) => {
        console.log('Auto-play prevented by browser:', error);
        status.textContent = 'Click Play to start music';
        playBtn.textContent = 'Play';
      });
    }, 100);
  };

  // Track selection change
  select.addEventListener('change', () => {
    syncSource();
    audio.play().then(() => {
      playBtn.textContent = 'Pause';
      updateStatus();
      updateVisualizer();
    }).catch(() => {
      status.textContent = 'Track changed. Press Play to start.';
      playBtn.textContent = 'Play';
    });
  });

  // Play/Pause button
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        playBtn.textContent = 'Pause';
        updateStatus();
        updateVisualizer();
      }).catch(() => {
        status.textContent = 'Press Play to start.';
      });
    } else {
      audio.pause();
      playBtn.textContent = 'Play';
      status.textContent = `Paused: ${selectedTrackName()}`;
      updateVisualizer();
    }
  });

  // Mute/Unmute button
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted;
      muteBtn.textContent = audio.muted ? 'Unmute' : 'Mute';
      status.textContent = audio.muted ? 'Audio muted' : `Volume ${Math.round(audio.volume * 100)}%`;
    });
  }

  // Previous track button
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const currentIndex = select.selectedIndex;
      if (currentIndex > 0) {
        select.selectedIndex = currentIndex - 1;
        select.dispatchEvent(new Event('change'));
      } else {
        // Loop to last track
        select.selectedIndex = select.options.length - 1;
        select.dispatchEvent(new Event('change'));
      }
    });
  }

  // Next track button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const currentIndex = select.selectedIndex;
      if (currentIndex < select.options.length - 1) {
        select.selectedIndex = currentIndex + 1;
        select.dispatchEvent(new Event('change'));
      } else {
        // Loop to first track
        select.selectedIndex = 0;
        select.dispatchEvent(new Event('change'));
      }
    });
  }

  // Volume slider
  volume.addEventListener('input', () => {
    audio.volume = Number(volume.value);
    if (audio.muted && audio.volume > 0) {
      audio.muted = false;
      if (muteBtn) muteBtn.textContent = 'Mute';
    }
    status.textContent = `Volume ${Math.round(audio.volume * 100)}%`;
  });

  // Progress bar seeking
  if (progressBar) {
    progressBar.addEventListener('mousedown', () => {
      isUserSeeking = true;
    });

    progressBar.addEventListener('mouseup', () => {
      isUserSeeking = false;
    });

    progressBar.addEventListener('input', () => {
      if (audio.duration) {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
        updateProgress();
      }
    });
  }

  // Audio event listeners
  audio.addEventListener('timeupdate', () => {
    updateProgress();
    updateStatus();
  });

  audio.addEventListener('ended', () => {
    // Auto-play next track
    if (nextBtn) {
      nextBtn.click();
    } else {
      playBtn.textContent = 'Play';
      status.textContent = 'Track ended.';
      updateVisualizer();
    }
  });

  audio.addEventListener('error', () => {
    status.textContent = 'Error loading track. Try another.';
    playBtn.textContent = 'Play';
    updateVisualizer();
  });

  audio.addEventListener('loadstart', () => {
    status.textContent = 'Loading track...';
  });

  audio.addEventListener('canplay', () => {
    if (audio.paused) {
      status.textContent = `Ready: ${selectedTrackName()}`;
    }
  });

  audio.addEventListener('play', updateVisualizer);
  audio.addEventListener('pause', updateVisualizer);

  // Initialize player
  audio.volume = Number(volume.value);
  
  // Auto-play when page loads
  autoPlay();
});
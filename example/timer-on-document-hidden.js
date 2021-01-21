const log = document.getElementById('log');
const ilog = document.getElementById('ilog');

class Timer {
  constructor(timeout, interval) {
    this.timeout = timeout || 1000;
    this.interval = interval || 300;
  }

  clear() {
    clearTimeout(this.timeoutId);
    clearInterval(this.intervalId);
  }
  reset() {
    this.timeoutId = setTimeout(() => {
      const span = document.createElement('span');
      span.innerText = this.timeoutId;
      log.appendChild(span);
    }, this.timeout);

    this.intervalId = setInterval(() => {
      const span = document.createElement('span');
      span.innerText = this.intervalId;
      ilog.appendChild(span);
    }, this.interval);
  }
}

const timer = new Timer(3000, 300);
function handle() {
  if (document.hidden) {
    timer.clear();
  } else {
    timer.reset();
  }
}

document.addEventListener('visibilitychange', handle);

timer.reset();

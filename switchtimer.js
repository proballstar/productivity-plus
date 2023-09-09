let timer;

function startTimer() {
  timer = setInterval(function() {
    console.log("Timer is running...");
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopTimer();
  } else {
    startTimer();
  }
}

if (typeof document.hidden !== "undefined") {
  document.addEventListener("visibilitychange", handleVisibilityChange);
}

startTimer();

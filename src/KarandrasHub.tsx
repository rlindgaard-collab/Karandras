@keyframes slow-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.03);
  }
}

.slow-pulse {
  animation: slow-pulse 4s ease-in-out infinite;
}

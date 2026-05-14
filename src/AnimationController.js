// Animation controller with play/pause and step-by-step navigation

export class AnimationController {
  constructor(steps, onStep, animationSpeed = 50) {
    this.steps = steps;
    this.onStep = onStep;
    this.animationSpeed = animationSpeed;
    this.currentStep = 0;
    this.isPlaying = false;
    this.animationFrameId = null;
    this.pausePromise = null;
    this.pauseResolve = null;
  }

  setAnimationSpeed(speed) {
    // Convert speed (1-100) to delay in ms (1000-1)
    this.animationSpeed = 1000 - (speed - 1) * 10;
  }

  async play() {
    this.isPlaying = true;
    let lastFrameTime = performance.now();

    return new Promise((resolve) => {
      const animate = async (currentTime) => {
        if (!this.isPlaying) return;

        const deltaTime = currentTime - lastFrameTime;

        if (deltaTime >= this.animationSpeed) {
          if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.onStep(this.currentStep);
            lastFrameTime = currentTime;
          } else {
            this.isPlaying = false;
            resolve();
            return;
          }
        }

        if (this.isPlaying) {
          this.animationFrameId = requestAnimationFrame(animate);
        }
      };

      this.animationFrameId = requestAnimationFrame(animate);
    });
  }

  pause() {
    this.isPlaying = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.onStep(this.currentStep);
      return true;
    }
    return false;
  }

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.onStep(this.currentStep);
      return true;
    }
    return false;
  }

  reset() {
    this.pause();
    this.currentStep = 0;
    this.onStep(this.currentStep);
  }

  getCurrentStep() {
    return this.currentStep;
  }

  getSteps() {
    return this.steps;
  }

  getTotalSteps() {
    return this.steps.length;
  }
}

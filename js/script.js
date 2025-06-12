class CircularProgress {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.svg = this.container.querySelector('#svgProgress');
    this.path = this.container.querySelector('.meter');
    this.length = this.path.getTotalLength();

    this.state = {
      value: 0,
      animated: false,
      hidden: false,
    };
    this.updateArc();
    this.initEventListeners();
  }

  setValue(val) {
    const value = Math.max(0, Math.min(100, Number(val)));
    this.state.value = value;

    const offset = this.length * ((100 - value) / 100);
    this.path.style.strokeDashoffset = offset;
    this.path.style.strokeDasharray = this.length;

    this.svg.setAttribute('data-value', value);
  }

  setAnimated(enabled, period = 2) {
    this.state.animated = enabled;
    if (enabled) {
      this.svg.style.animationDuration = `${period}s`;
      this.svg.classList.add('rotate');
      if (this.state.value === 0) {
        this.setValue(20);
      }
    } else {
      this.svg.classList.remove('rotate');
      this.svg.style.animationDuration = '';
    }
  }

  setHidden(hidden) {
    this.state.hidden = hidden;
    this.container.classList.toggle('hidden', hidden);
  }

  getState() {
    return { ...this.state };
  }

  updateArc() {
    this.setValue(this.state.value);
  }

  initEventListeners() {
    const input = document.getElementById('inputValue');
    input.addEventListener('input', e => {
      this.setValue(e.target.value);
    });

    const animateSwitch = document.getElementById('switchAnimate');
    animateSwitch.addEventListener('change', e => {
      this.setAnimated(e.target.checked);
    });

    const visibleSwitch = document.getElementById('switchVisible');
    visibleSwitch.addEventListener('change', e => {
      this.setHidden(e.target.checked);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const progress = new CircularProgress('progress');
  progress.setValue(65);
  progress.setAnimated(true);
  progress.setHidden(false);

  document.getElementById('inputValue').value = 65;
  document.getElementById('switchAnimate').checked = true;
  document.getElementById('switchVisible').checked = false;
});

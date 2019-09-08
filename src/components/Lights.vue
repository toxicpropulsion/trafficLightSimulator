<template>
  <div>
    <p align="center">Смена сигнала: {{this.time | round}} сек.</p>
    <div class="lights">
      <div
        v-for="(value, color, index) in signals"
        :key="index"
        :class="{active: $route.name == color, fading: value.fading, signal: true}"
        :style="{backgroundColor: color}"
      ></div>
    </div>
  </div>
</template>

<script>
import { setTimeout, setInterval } from 'timers';

export default {
  name: 'Lights',
  data() {
    return {
      signals: {
        red: { color: 'red', time: 10000, fading: false },
        yellow: { color: 'yellow', time: 3000, fading: false },
        green: { color: 'green', time: 15000, fading: false }
      },
      time: null,
      interval: null
    };
  },
  computed: {
    timeToChange() {
      return this.signals[this.$route.name].time;
    },
    nextSignal() {
      const prev = this.$route.params.prev;
      const current = this.$route.name;

      switch (current) {
        case 'red':
        case 'green':
          return 'yellow';
        case 'yellow':
          if (prev === 'green') {
            return 'red';
          } else {
            return 'green';
          }
        default:
          console.log('The traffic light is broken :(');
      }
    }
  },
  methods: {
    goto(signal) {
      this.$router.push({
        name: signal,
        params: { prev: this.$route.name }
      });
    }
  },
  filters: {
    round(value) {
      return Math.round(value / 1000);
    }
  },
  watch: {
    time: function(value) {
      if (value <= 3000) {
        this.signals[this.$route.name].fading = true;
      }
    }
  },
  mounted() {
    this.$on('startTimer', () => {
      this.interval = setInterval(() => {
        this.time -= 100;
      }, 100);
    });

    this.$on('updateTimer', () => {
      this.time = this.timeToChange;
    });

    this.$on('newSignal', () => {
      setTimeout(() => {
        this.signals[this.$route.name].fading = false;
        this.goto(this.nextSignal);
        this.$emit('newSignal');
        this.$emit('updateTimer');
      }, this.timeToChange);
    });

    this.time = this.timeToChange;

    this.$emit('newSignal');
    this.$emit('startTimer');
  }
};
</script>

<style>
@keyframes pulse {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}

.lights {
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
  width: 200px;
  min-height: 450px;
  background-color: #282828;
  display: flex;
  border-radius: 2rem;
}

.signal {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  opacity: 0.2;
  transition: all 0.3s ease;
}

.active {
  opacity: 1;
}

.fading {
  animation: pulse 0.5s infinite;
}
</style>

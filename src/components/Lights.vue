<template>
  <div>
    <pre>
      previosSignal: {{this.$route.params.prev}}
      currentSignal: {{this.$route.name}}
      timeToChange: {{timeToChange}}
    </pre>
    <div class="lights">
      <div
        v-for="(value, color, index) in signals"
        :key="index"
        @click="goto(color)"
        class="signal"
        :class="{active: $route.name == color, fading: value.fading}"
        :style="{backgroundColor: color}"
      ></div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'Lights',
  data() {
    return {
      signals: {
        red: { color: 'red', time: 10000, fading: false },
        yellow: { color: 'yellow', time: 3000, fading: false },
        green: { color: 'green', time: 15000, fading: false }
      },
      time: this.timeToChange
    };
  },
  computed: {
    timeToChange() {
      return this.signals[this.$route.name].time;
    },
    nextSignal() {
      const prev = this.$route.params.prev;
      const current = this.$route.name;

      let result;

      switch (current) {
        case 'red':
        case 'green':
          return 'yellow';
        case 'yellow':
          if (prev === 'red') {
            return 'green';
          } else {
            return 'red';
          }
        default:
          console.log('The traffic light is broken :(');
      }
    }
  },
  methods: {
    goto(signal) {
      this.$router.push({ name: signal, params: { prev: this.$route.name } });
    },
    process() {
      setTimeout(() => {
        this.goto(this.nextSignal);
      }, this.timeToChange);
    }
  },
  watch: {
    time: function(value) {
      if (value <= 3000) {
        this.signals[this.$route.name].fading = true;
      }
    }
  },
  updated() {
    this.process();
  },
  mounted() {
    this.process();
  }
};
</script>

<style>
@keyframes pulse {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.lights {
  color: white;
  font-size: 10px;

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
  animation: pulse 1s infinite;
}
</style>

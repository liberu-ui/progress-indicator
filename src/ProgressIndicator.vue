<template>
    <div :style="style">
        <div class="level mb-0">
            <div class="level-left">
                <div class="level-item">
                    <strong class="is-family-code">{{ value }}</strong>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <strong class="is-family-code">{{ percentage }}%</strong>
                </div>
            </div>
        </div>
        <svg :width="totalWidth"
            :height="barHeight"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <rect v-for="i in 10"
                :key="i"
                :width="barWidth"
                :height="barHeight"
                :x="x(i)"
                :rx="radius"
                :style="`fill:${color(i)};`"/>
        </svg>
    </div>
</template>

<script>
export default {
    name: 'ProgressIndicators',

    props: {
        barHeight: {
            default: 20,
            type: Number,
        },
        barWidth: {
            default: 4,
            type: Number,
        },
        emptyColor: {
            default: '#C0C0C0',
            type: String,
        },
        fillColor: {
            default: '#00AA13',
            type: String,
        },
        spacing: {
            default: 3,
            type: Number,
        },
        total: {
            required: true,
            type: Number,
        },
        value: {
            required: true,
            type: Number,
        },
    },

    computed: {
        percentage() {
            return this.total
                ? parseInt(this.value / this.total * 100, 10)
                : 0;
        },
        radius() {
            return this.barWidth / 2;
        },
        style() {
            return {
                width: `${this.totalWidth}px`,
                margin: 'auto',
            };
        },
        totalWidth() {
            return (this.barWidth + this.spacing) * 10;
        },
    },

    methods: {
        color(i) {
            if (this.percentage / 10 >= i) {
                return this.fillColor;
            }
            return this.emptyColor;
        },
        x(i) {
            const x = (this.barWidth + this.spacing) * (i - 1) / this.totalWidth * 100;
            return `${x}%`;
        },
    },

};
</script>

<template>
    <div :style="style">
        <div class="level is-mobile mb-0">
            <div class="level-left">
                <div class="level-item mr-0">
                    <strong class="is-family-code">
                        {{ value }}
                    </strong>
                </div>
                <slot name="above"/>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <strong class="is-family-code">
                        {{ percentage.toFixed() }}%
                    </strong>
                </div>
            </div>
        </div>
        <svg :width="totalWidth"
            :height="totalHeight"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <rect v-for="i in 10"
                :key="i"
                :width="barWidth"
                :height="barHeight"
                :x="rectX(i)"
                :y="rectY"
                :rx="radius"
                :style="`fill:${color(i)};`"/>
            <line v-if="average"
                :x1="averageX"
                y1="0"
                :x2="averageX"
                :y2="totalHeight"
                :stroke="averageColor"/>
        </svg>
        <slot name="below"/>
    </div>
</template>

<script>

export default {
    name: 'ProgressIndicators',

    props: {
        average: {
            default: null,
            type: Number
        },
        averageColor: {
            default: '#1E90FF',
            type: String
        },
        barHeight: {
            default: 20,
            type: Number
        },
        barWidth: {
            default: 4,
            type: Number
        },
        emptyColor: {
            default: '#C0C0C0',
            type: String
        },
        fillColor: {
            default: '#00AA13',
            type: String
        },
        percentage: {
            required: true,
            type: Number,
            validator: value => value >= 0 && value <= 100
        },
        spacing: {
            default: 3,
            type: Number
        },
        value: {
            required: true,
            type: Number
        }
    },

    computed: {
        averageX() {
            if(this.average) {
                const max = (this.barWidth + this.spacing) * 9 + this.barWidth;
                return this.average * max / 100;
            }
            return null;
        },
        padding() {
           return this.average
            ? this.barHeight / 5
            : 0;
        },
        radius() {
            return this.barWidth / 2;
        },
        rectY() {
            return this.average ? this.padding : 0;
        },
        style() {
            return {
                width: `${this.totalWidth}px`,
                margin: 'auto',
            };
        },
        totalHeight() {
            return this.barHeight + (this.average ? 2 * this.padding : 0);
        },
        totalWidth() {
            return (this.barWidth + this.spacing) * 10;
        },
    },

    methods: {
        color(i) {
            const step = this.percentage / 10;

            if (step >= i) {
                return this.fillColor;
            }

            return step >= i - 1 && this.percentage % 10 >= 5
                ? this.fillColor
                : this.emptyColor;
        },
        rectX(i) {
            const x = (this.barWidth + this.spacing) * (i - 1) / this.totalWidth * 100;
            return `${x}%`;
        },
    },

};
</script>

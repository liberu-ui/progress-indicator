<template>
    <progress-indicator
        :value="value"
        :percentage="percentage"
        :fill-color="color"
        :average="average"
        v-bind="$attrs">
        <template v-slot:above
            v-if="emptyindicator && percentage < 5">
            <div class="level-item">
                <span class="icon"
                    :class="[inverted ? 'has-text-success' : 'has-text-danger']">
                    <fa :icon="inverted ? 'check-circle' : 'exclamation-circle'"
                        size="sm"/>
                </span>
            </div>
        </template>
    </progress-indicator>
</template>

<script>
import ProgressIndicator from './ProgressIndicator.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faExclamationCircle);

export default {
    name: 'EnhancedProgressIndicator',

    components: {
        ProgressIndicator,
    },

    props: {
        aboveThresholdColor: {
            default: '#00AA13',
            type: String
        },
        average: {
            default: null,
            type: Number,
            validator: value => value >= 0 && value <= 100
        },
        belowThresholdColor: {
            default: '#FF6666',
            type: String
        },
        emptyIndicator: {
            default: false,
            type: Boolean,
        },
        percentage: {
            required: true,
            type: Number,
            validator: value => value >= 0 && value <= 100
        },
        inverted: {
            default: false,
            type: Boolean
        },
        thresholdColor: {
            default: '#1E90FF',
            type: String
        },
        tolerance: {
            required: true,
            type: Number,
            validator: value => value >= 0 && value <= 100
        },
        value: {
            required: true,
            type: Number
        }
    },

    computed: {
        color() {
            if (this.average < (this.percentage - this.tolerance)) {
                return this.inverted 
                    ? this.belowThresholdColor
                    : this.aboveThresholdColor;
            }

            if (this.average > (this.percentage + this.tolerance)) {
                return this.inverted
                    ? this.aboveThresholdColor
                    : this.belowThresholdColor;
            }

            return this.thresholdColor;
        },
    },

};
</script>

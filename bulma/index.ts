import { VueConstructor } from 'vue';

/**
 * Represents a progress indicator component.
 * @component ProgressIndicator
 * @example
 * ```
 * <ProgressIndicator :percentage="75" />
 * ```
 */
declare const ProgressIndicator: VueConstructor;

/**
 * Represents an enhanced progress indicator component with additional features.
 * @component EnhancedProgressIndicator
 * @example
 * ```
 * <EnhancedProgressIndicator :percentage="50" color="#ff0000" />
 * ```
 */
declare const EnhancedProgressIndicator: VueConstructor;

export { ProgressIndicator, EnhancedProgressIndicator };
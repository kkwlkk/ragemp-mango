/**
 * ANSI color codes for terminal output
 * Maps RageMP color codes to their ANSI terminal equivalents
 */
export const ConsoleColors = {
    // Standard colors
    red: '\x1b[31m',        // ~r~ - Red
    blue: '\x1b[34m',       // ~b~ - Blue
    green: '\x1b[32m',      // ~g~ - Green
    yellow: '\x1b[33m',     // ~y~ - Yellow
    purple: '\x1b[35m',     // ~p~ - Purple
    pink: '\x1b[35m',       // ~q~ - Pink (using magenta)
    orange: '\x1b[38;5;208m', // ~o~ - Orange (using 256 color)
    grey: '\x1b[90m',       // ~c~ - Grey
    darkGrey: '\x1b[90m',   // ~m~ - Darker Grey
    black: '\x1b[30m',      // ~u~ - Black
    white: '\x1b[97m',      // ~w~ - White
    defaultWhite: '\x1b[0m', // ~s~ - Default White (reset)

    // Light/bright colors (prefixed with 'l')
    lightRed: '\x1b[91m',   // ~lr~ - Light Red
    lightBlue: '\x1b[94m',  // ~lb~ - Light Blue
    lightGreen: '\x1b[92m', // ~lg~ - Light Green
    lightYellow: '\x1b[93m', // ~ly~ - Light Yellow
    lightPurple: '\x1b[95m', // ~lp~ - Light Purple
    lightCyan: '\x1b[96m',  // ~lc~ - Light Cyan
    lightWhite: '\x1b[97m', // ~lw~ - Light White
    lightBlack: '\x1b[90m', // ~lk~ - Light Black (grey)

    // Text styles
    bold: '\x1b[1m',        // ~h~ - Bold Text
    reset: '\x1b[0m',       // Reset all styles
} as const;

/**
 * Helper function to colorize text for terminal output
 */
export function colorize(text: string, color: keyof typeof ConsoleColors): string {
    return `${ConsoleColors[color]}${text}${ConsoleColors.reset}`;
}

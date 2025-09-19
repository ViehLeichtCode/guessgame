// theme/preset.ts
import { definePreset } from 'primevue/themes';
import Aura from 'primevue/themes/aura';

// Custom Preset
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50:  '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}', // Hauptfarbe → Blau
            600: '{purple.500}', // Sekundärton (leicht in Richtung Gradient)
            700: '{pink.500}',   // Akzent
            800: '{purple.700}',
            900: '{blue.900}',
            950: '{blue.950}'
        },
        secondary: {
            50:  '{purple.50}',
            100: '{purple.100}',
            200: '{purple.200}',
            300: '{purple.300}',
            400: '{purple.400}',
            500: '{purple.500}',
            600: '{pink.400}',
            700: '{pink.500}',
            800: '{pink.600}',
            900: '{purple.900}',
            950: '{purple.950}'
        },
        accent: {
            50:  '{pink.50}',
            100: '{pink.100}',
            200: '{pink.200}',
            300: '{pink.300}',
            400: '{pink.400}',
            500: '{pink.500}',
            600: '{pink.600}',
            700: '{pink.700}',
            800: '{pink.800}',
            900: '{pink.900}',
            950: '{pink.950}'
        }
    }
});

export default MyPreset;
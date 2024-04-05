import posthog from "posthog-js";

export function trackEvent(eventName, properties) {
    posthog?.capture(eventName, {
        $session_recording_canvas_recording: true,
        ...properties
    } );
}
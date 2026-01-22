// ==================================================
// IMPROVED HAND GESTURE DETECTION MODULE
// Copy this code to improve gesture accuracy in all projects
// ==================================================

// Add these variables at the top of your script:
let smoothedHandX = 0, smoothedHandY = 0;
let gestureStability = { fist: 0, peace: 0, pinch: 0, openPalm: 0 };
const GESTURE_THRESHOLD = 3; // Frames needed for stable gesture
const SMOOTHING_FACTOR = 0.35; // 0-1, higher = more responsive

// ==================================================
// IMPROVED GESTURE DETECTION FUNCTIONS
// ==================================================

function detectImprovedFist(landmarks) {
    const palmCenter = landmarks[9];
    const fingersToCheck = [8, 12, 16, 20]; // Index, middle, ring, pinky tips
    
    const fingerDistances = fingersToCheck.map(tip => 
        Math.sqrt(
            Math.pow(landmarks[tip].x - palmCenter.x, 2) + 
            Math.pow(landmarks[tip].y - palmCenter.y, 2)
        )
    );
    
    const avgFingerDist = fingerDistances.reduce((a, b) => a + b) / 4;
    const fistDetected = avgFingerDist < 0.12; // More forgiving threshold
    
    // Stability counter
    gestureStability.fist = fistDetected 
        ? Math.min(gestureStability.fist + 1, 5) 
        : Math.max(gestureStability.fist - 1, 0);
    
    return gestureStability.fist >= GESTURE_THRESHOLD;
}

function detectImprovedPeace(landmarks, isFist) {
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];
    const wrist = landmarks[0];
    const palm = landmarks[9];
    
    // Check if index and middle are extended (above wrist level)
    const indexExtended = indexTip.y < wrist.y - 0.08;
    const middleExtended = middleTip.y < wrist.y - 0.08;
    
    // Check if ring and pinky are folded
    const ringFolded = ringTip.y > palm.y - 0.05;
    const pinkyFolded = pinkyTip.y > palm.y - 0.05;
    
    // Distance between index and middle tips
    const fingerSpacing = Math.sqrt(
        Math.pow(indexTip.x - middleTip.x, 2) + 
        Math.pow(indexTip.y - middleTip.y, 2)
    );
    const fingersApart = fingerSpacing > 0.025;
    
    const peaceDetected = indexExtended && middleExtended && ringFolded && 
                          pinkyFolded && fingersApart && !isFist;
    
    // Stability counter
    gestureStability.peace = peaceDetected 
        ? Math.min(gestureStability.peace + 1, 5) 
        : Math.max(gestureStability.peace - 1, 0);
    
    return gestureStability.peace >= GESTURE_THRESHOLD;
}

function detectImprovedPinch(landmarks) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    
    const pinchDist = Math.sqrt(
        Math.pow(thumbTip.x - indexTip.x, 2) + 
        Math.pow(thumbTip.y - indexTip.y, 2)
    );
    
    const pinchDetected = pinchDist < 0.06; // Slightly more forgiving
    
    // Stability counter
    gestureStability.pinch = pinchDetected 
        ? Math.min(gestureStability.pinch + 1, 5) 
        : Math.max(gestureStability.pinch - 1, 0);
    
    return gestureStability.pinch >= GESTURE_THRESHOLD;
}

function detectOpenPalm(landmarks) {
    const palm = landmarks[9];
    const fingersToCheck = [8, 12, 16, 20]; // Tips of 4 fingers
    
    // All fingers should be extended above palm
    const allExtended = fingersToCheck.every(tip => 
        landmarks[tip].y < palm.y - 0.06
    );
    
    // Check finger spacing (not too close together)
    const indexMiddleSpacing = Math.sqrt(
        Math.pow(landmarks[8].x - landmarks[12].x, 2) + 
        Math.pow(landmarks[8].y - landmarks[12].y, 2)
    );
    
    const palmDetected = allExtended && indexMiddleSpacing > 0.02;
    
    // Stability counter
    gestureStability.openPalm = palmDetected 
        ? Math.min(gestureStability.openPalm + 1, 5) 
        : Math.max(gestureStability.openPalm - 1, 0);
    
    return gestureStability.openPalm >= GESTURE_THRESHOLD;
}

function getSmoothHandPosition(landmarks) {
    // Get raw position from index finger tip
    const rawX = (landmarks[8].x - 0.5) * 2;
    const rawY = (landmarks[8].y - 0.5) * 2;
    
    // Apply exponential smoothing
    smoothedHandX = smoothedHandX * (1 - SMOOTHING_FACTOR) + rawX * SMOOTHING_FACTOR;
    smoothedHandY = smoothedHandY * (1 - SMOOTHING_FACTOR) + rawY * SMOOTHING_FACTOR;
    
    return { x: smoothedHandX, y: smoothedHandY };
}

// ==================================================
// USAGE EXAMPLE IN hands.onResults():
// ==================================================
/*
hands.onResults((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        
        // Get smoothed hand position
        const smoothPos = getSmoothHandPosition(landmarks);
        handX = smoothPos.x;
        handY = smoothPos.y;
        
        // Detect gestures with improved accuracy
        isFist = detectImprovedFist(landmarks);
        isPeace = detectImprovedPeace(landmarks, isFist);
        isPinch = detectImprovedPinch(landmarks);
        isOpenPalm = detectOpenPalm(landmarks);
        
        // Update your application based on gestures
        updateGestureIndicator();
    }
});
*/

// ==================================================
// QUALITY IMPROVEMENTS FOR 3D MODELS
// ==================================================

// For particle systems:
const IMPROVED_PARTICLE_COUNT = 12000; // Up from 8000

// For spheres (planets, atoms, etc):
const HIGH_QUALITY_SEGMENTS = 64; // Up from 32
// Usage: new THREE.SphereGeometry(radius, 64, 64);

// For tubes and curves:
const HIGH_QUALITY_TUBE_SEGMENTS = 128; // Up from 64
// Usage: new THREE.TubeGeometry(curve, 128, radius, 16, false);

// For better materials:
const IMPROVED_MATERIAL_SETTINGS = {
    roughness: 0.4,      // More realistic than 0.5
    metalness: 0.6,      // For metallic objects
    emissiveIntensity: 0.3, // Subtle glow
    transparent: true,
    opacity: 0.95
};

// ==================================================
// RECOMMENDED MediaPipe SETTINGS
// ==================================================
/*
hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.6,  // Increased from 0.5
    minTrackingConfidence: 0.6    // Increased from 0.5
});
*/

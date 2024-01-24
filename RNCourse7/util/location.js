export function getMapPreview(lat, lng) {
    const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
    if (!googleApiKey) {
        console.warn(
            'No EXPO_PUBLIC_GOOGLE_API_KEY environment variable. Create an ".env.local" file and copy-paste the Google API key in there, dummy!',
        );
    }
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${googleApiKey}`;
    return imagePreviewUrl;
}

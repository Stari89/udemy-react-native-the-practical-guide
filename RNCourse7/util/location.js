const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

function assertGoogleApiKey() {
    if (googleApiKey) {
        return;
    }
    throw new Error(
        'No EXPO_PUBLIC_GOOGLE_API_KEY environment variable. Create an ".env.local" file and copy-paste the Google API key in there, dummy!',
    );
}

export function getMapPreview(lat, lng) {
    assertGoogleApiKey();
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${googleApiKey}`;
    return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
    assertGoogleApiKey();
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch address!');
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
}

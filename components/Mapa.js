import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapItem = ({
	google,
    center,
	containerStyle,
	markers,
	zoom
}) => {
	return (
		<div className="relative flex flex-col w-full h-full">
			<Map
				google = {google}
				zoom = {zoom}
				initialCenter = {center}
				containerStyle = {containerStyle}
			>
                {
                    markers.map(({ lat, lng }) => (
                        <Marker 
							key={3 * lat + 5 * lng} 
							position = {{ lat, lng }}
						/>
                    ))
				}
			</Map>
		</div>
	)
}

export default GoogleApiWrapper({
	apiKey: process.env.API_KEY,
	language: 'ES'
})(MapItem)
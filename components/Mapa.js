import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapItem = ({
	google,
    center,
	containerStyle,
	markers,
	zoom
}) => {
	return (
		<div>
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

const loading = () => {
	return (
		<div>
			Cargando...
		</div>
	)
}

export default GoogleApiWrapper({
	apiKey: process.env.API_KEY,
	language: 'ES',
	LoadingContainer: loading
})(MapItem)
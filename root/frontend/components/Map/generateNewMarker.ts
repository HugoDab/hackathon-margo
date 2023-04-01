import {Map, Marker, Popup} from 'mapbox-gl';

let markersList: Marker[] = [];
export const generateNewMarker = ({
                                      lat,
                                      lng,
                                      map
                                  }: { lng: number, lat: number, map: Map }, title: string, description: string, markerColor: string, removable: boolean, operator?: string, bottle?: number, indoor?: number, city?: string) => {

    if (operator) operator = "The operator is: " + operator

    let bottleText = ""
    if (bottle === 0) bottleText = "Accepts bottle"
    if (bottle === 1) bottleText = "Refuses bottle"

    let indoorText = ""
    if (indoor === 0) indoorText = "The water point is indoor"
    if (indoor === 1) indoorText = "The water point is outdoor"

    const popUp = new Popup({closeButton: true, anchor: 'left',})
        .setHTML(`<div class="popup" style="color:black"><h2>${title}</h2><p>${operator}</p><p>${description}</p><p>${bottleText}</p><p>${indoorText}</p><p style="font-style:italic">${city}</p></div>`)

    const marker = new Marker({color: markerColor, scale: 1})
        .setLngLat([lng, lat])
        .setPopup(popUp)
        .addTo(map)

    if (removable) markersList.push(marker)
}

export function clearAllMarkers() {
    let newMarkersList = []
    for (const marker of markersList) {
        if (!marker.getPopup().isOpen()) {
            marker.remove()
        } else {
            newMarkersList.push(marker)
        }

    }
    markersList = newMarkersList;
}

export function getLngLatMarkerSelected() {
    for (const marker of markersList) {
        if (marker.getPopup().isOpen()) return marker.getLngLat();
    }
}
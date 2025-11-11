import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import warehouseData from "../../assets/assets/json/warehouses.json";

// Fix default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const BangladeshMap = forwardRef((props, ref) => {
  const center = [23.685, 90.3563];

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMarkerIcon = () => {
    let iconSize = [28, 28]; // desktop
    if (windowWidth < 640) iconSize = [18, 18]; // mobile
    else if (windowWidth < 1024) iconSize = [22, 22]; // tablet

    return new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: iconSize,
      iconAnchor: [iconSize[0] / 2, iconSize[1]],
      popupAnchor: [0, -iconSize[1] - 6],
    });
  };

  const markerIcon = getMarkerIcon();
  const markerRefs = useRef([]);

  const MapController = () => {
    const map = useMap();

    useImperativeHandle(ref, () => ({
      flyToDistrict: (districtName) => {
        const index = warehouseData.findIndex(
          (d) => d.district.toLowerCase() === districtName.toLowerCase()
        );
        if (index !== -1) {
          const district = warehouseData[index];
          const lat = Number(district.latitude);
          const lng = Number(district.longitude);
          map.flyTo([lat, lng], 12, { duration: 1.5 });

          setTimeout(() => {
            const popup = markerRefs.current[index];
            if (popup) popup.openPopup();
          }, 1600);
        } else {
          alert("District not found!");
        }
      },
    }));

    return null;
  };

  // Get popup options based on screen size
  const getPopupOptions = () => {
    if (windowWidth < 640) {
      return {
        maxWidth: windowWidth - 40,
        minWidth: 200,
        autoPan: true,
        autoPanPaddingTopLeft: [10, 80],
        autoPanPaddingBottomRight: [10, 80],
        keepInView: true,
        closeButton: true,
      };
    }
    return {
      maxWidth: 300,
      autoPan: true,
      autoPanPadding: [10, 10],
      keepInView: true,
    };
  };

  const popupOptions = getPopupOptions();

  return (
    <div className="w-full h-full">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {warehouseData.map((district, index) => (
          <Marker
            key={index}
            position={[Number(district.latitude), Number(district.longitude)]}
            icon={markerIcon}
            ref={(el) => (markerRefs.current[index] = el)}
          >
            <Popup {...popupOptions}>
              <div className="w-full">
                <h3 className="font-semibold text-sm sm:text-base mb-1">
                  {district.district}
                </h3>
                <p className="text-xs text-gray-600 mb-1">
                  Region: {district.region || "N/A"}
                </p>
                {Array.isArray(district.covered_area) && district.covered_area.length > 0 && (
                  <p className="text-xs text-gray-600 mb-2">
                    Areas: {district.covered_area.join(", ")}
                  </p>
                )}
                {district.flowchart && (
                  <a
                    href={district.flowchart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-xs inline-block mt-1"
                  >
                    View Flowchart
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController />
      </MapContainer>
    </div>
  );
});

export default BangladeshMap;